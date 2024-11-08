import { type CliModule } from '../types.js'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

import { wellknownRoute, routeFile, flagsFile, optiFlags, sdkFile } from './_convention.js'

export const SetupCommand : CliModule = {
    command: "setup",
    describe: "Run the initial setup of Feature Experimentation for Next.JS (App Router) on Vercel",
    async handler(args, opts) {
        process.stdout.write(`🚧 Running initial feature experimentation setup\n\n`)
        const { nosrc, path: cwd, envfile, key, project, token } = args

        if (!fs.existsSync(cwd))
            throw new Error(`The specified working directory does not exist! - ${cwd}`)

        if (!nosrc && !fs.existsSync(path.join(cwd, 'src')))
            throw new Error(`The source folder does not exist and 'nosrc' was not specified!`)

        const wellKnownApi = path.resolve(path.join(cwd, nosrc ? '.' : 'src', wellknownRoute, routeFile))
        if (!fs.existsSync(wellKnownApi)) {
            process.stdout.write("Creating Vercel well-known API route\n")
            const dirname = path.dirname(wellKnownApi)
            fs.mkdirSync(dirname, { recursive: true })
            fs.writeFileSync(wellKnownApi, routeHandlerTpl)
        }

        const flagsProvider = path.resolve(path.join(cwd, nosrc ? '.' : 'src', flagsFile))
        if (!fs.existsSync(flagsProvider)) {
            process.stdout.write("Creating Next.JS flags provider\n")
            fs.writeFileSync(flagsProvider, flagsProviderTpl)
        }

        const userContextProvider = path.resolve(path.join(cwd, nosrc ? '.' : 'src', sdkFile))
        if (!fs.existsSync(userContextProvider)) {
            process.stdout.write("Creating Feature Experimentation User Context provider\n")
            fs.writeFileSync(userContextProvider, userContextProviderTpl)
        }

        const optiFlagsFile = path.resolve(path.join(cwd, optiFlags))
        if (!fs.existsSync(optiFlagsFile)) {
            process.stdout.write("Creating Optimizely FX Flags file\n")
            fs.writeFileSync(optiFlagsFile, "{}")
        }

        let envConfig = fs.existsSync(path.join(cwd, envfile)) ? fs.readFileSync(path.join(cwd, envfile)).toString() : ""
        let lineValue = ""
        if (lineValue = envConfig.match(new RegExp(`^OPTIMIZELY_FX_SDKKEY=(.+)$`, 'gm'))?.at(0)) {
            envConfig.replace(lineValue, `OPTIMIZELY_FX_SDKKEY=${ key }`)
        } else {
            process.stdout.write("Adding environment variable: OPTIMIZELY_FX_SDKKEY\n")
            envConfig += `\nOPTIMIZELY_FX_SDKKEY=${ key }`
        }
        if (lineValue = envConfig.match(new RegExp(`^OPTIMIZELY_FX_PROJECT=(.+)$`, 'gm'))?.at(0)) {
            envConfig.replace(lineValue, `OPTIMIZELY_FX_PROJECT=${ project }`)
        } else {
            process.stdout.write("Adding environment variable: OPTIMIZELY_FX_PROJECT\n")
            envConfig += `\nOPTIMIZELY_FX_PROJECT=${ project }`
        }
        if (lineValue = envConfig.match(new RegExp(`^OPTIMIZELY_FX_PAT=(.+)$`, 'gm'))?.at(0)) {
            envConfig.replace(lineValue, `OPTIMIZELY_FX_PAT=${ token }`)
        } else {
            process.stdout.write("Adding environment variable: OPTIMIZELY_FX_PAT\n")
            envConfig += `\nOPTIMIZELY_FX_PAT=${ token }`
        }
        if (!envConfig.match(new RegExp(`^FLAGS_SECRET=(.+)$`, 'gm'))?.at(0)) {
            process.stdout.write("Adding environment variable: FLAGS_SECRET\n")
            const randomToken = crypto.randomBytes(32).toString('base64url')
            envConfig += `\nFLAGS_SECRET=${ randomToken }`
        }
        process.stdout.write(`Updating ${ envfile }\n`)
        fs.writeFileSync(path.join(cwd, envfile), envConfig)

        process.stdout.write(`\n🚀 Done!\n`)

    }
}

export default SetupCommand

const routeHandlerTpl = `import { NextResponse, type NextRequest } from 'next/server';
import { verifyAccess, type ApiData } from '@vercel/flags';
import { unstable_getProviderData as getProviderData } from "@vercel/flags/next";
import * as flags from '../../../../flags'; 

export async function GET(request: NextRequest) {
    const access = await verifyAccess(request.headers.get('Authorization'));
    if (!access) return NextResponse.json(null, { status: 401 });

    //Retrieve the flags from the definitions file
    const provider = getProviderData(flags)

    // Update the options from Feature Experimentation
    // @ts-expect-error: Node-Types isn't loaded
    const accessToken = process.env.OPTIMIZELY_FX_PAT
    // @ts-expect-error: Node-Types isn't loaded
    const projectId = process.env.OPTIMIZELY_FX_PROJECT
    if (accessToken && projectId) {
        console.log(\`Credentials present, loading current flag variations from project \${ projectId }\`)
        provider.hints.push({key: "updated_opti_variants", text: "Using current Optimizely Feature Variations"})
        for(const flagKey of Object.getOwnPropertyNames(provider.definitions))
        {
            console.log(\`Updating for flag \${ flagKey }\`)
            const variations = await fetch(\`https://api.optimizely.com/flags/v1/projects/\${ projectId }/flags/\${flagKey}/variations?archived=false&per_page=100\`, { headers: { Authorization: \`Bearer \${ accessToken }\`}}).then(r => r.json())

            const newOptions = variations.items.map(item => 
            { 
                return {
                    label: item.name,
                    value: buildVariantValues(item)
                }
            })
            provider.definitions[flagKey].options = newOptions
        }
    } else {
        provider.hints.push({key: "opti_keys_missing", text: "Configure your Optimizely project id and a personal access token to see up-to-date feature options"})
    }

    return NextResponse.json<ApiData>(provider);
}

function buildVariantValues(variation: any, fieldName = "value") {
    const variantValues = {
        _enabled: variation.enabled
    }

    for (var entry of Object.getOwnPropertyNames(variation.variables)) {
        switch (variation.variables[entry].type) {
            case 'boolean':
                variantValues[entry] = variation.variables[entry][fieldName] == 'true'
                break;
            default:
                variantValues[entry] = variation.variables[entry][fieldName]
                break;
        }
    }

    return variantValues
}`

const flagsProviderTpl = `// Auto generated flags.ts from Optimizely Feature Experimentation
import { unstable_flag as flag } from '@vercel/flags/next';
import { type OptimizelyDecision } from '@optimizely/optimizely-sdk/lite';
import { getUserContext } from './${ path.basename(sdkFile, '.ts') }';

type TypedOptimizelyDecision<T extends { [variableKey: string]: unknown }> = Omit<OptimizelyDecision, 'variables' | 'userContext'> & {
  variables: T
}`

const userContextProviderTpl = `import { get } from '@vercel/edge-config'
import { headers } from 'next/headers'
import { createInstance  } from '@optimizely/optimizely-sdk/lite'

export async function getUserContext()
{
    const config = await get<string>('optimizely-fx-data-file')
    const headerData = await headers()
    const visitorId = headerData.get('x-visitorid')
    if (!visitorId)
        throw new Error("No visitor identifier provided by your middleware")
    const fx = createInstance({
        datafile: config
    })
    if (!fx) {
        throw new Error("Optimizely Feature Experimentation initialization failed")
    }
    const fx_ctx = fx?.createUserContext(visitorId, {})
    return fx_ctx
}

export default getUserContext
`