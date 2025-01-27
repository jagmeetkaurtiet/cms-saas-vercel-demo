import { extractSettings } from "@remkoj/optimizely-cms-react/rsc";
import { DefaultGridComponent } from "../displayTemplates";

enum GridWidths {
    default = "container mx-auto px-8",
    narrow = "max-w-3xl w-full mx-auto px-8",
    wide = "max-w-7xl w-full mx-auto px-8",
    full = "w-full"
}

enum VSpacings {
    small = "py-4 md:py-8 lg:py-12",
    large = "py-8 md:py-16 lg:py-24"
}

enum ColorClasses {
    black = 'bg-vulcan dark:bg-vulcan-85 text-white prose-h3:text-white prose-h2:text-white prose-figcaption:text-white prose-blockquote:text-white',
    blue = 'bg-azure dark:bg-transparent dark:border-y-azure dark:border-y-4 text-white prose-h3:text-white prose-h2:text-white prose-figcaption:text-white prose-blockquote:text-white',
    green = 'bg-verdansk dark:bg-transparent dark:border-y-azure dark:border-y-4 text-white prose-h3:text-white prose-h2:text-white prose-figcaption:text-white prose-blockquote:text-white',
    orange = 'bg-tangy dark:bg-transparent dark:border-y-azure dark:border-y-4 text-white prose-h3:text-white prose-h2:text-white prose-figcaption:text-white prose-blockquote:text-white',
    purple = 'bg-people-eater dark:bg-transparent dark:border-y-azure dark:border-y-4 text-white prose-h3:text-white prose-h2:text-white prose-figcaption:text-white prose-blockquote:text-white',
    lightred = 'bg-paleruby dark:bg-transparent dark:border-y-azure dark:border-y-4 text-white prose-h3:text-white prose-h2:text-white prose-figcaption:text-white prose-blockquote:text-white',
    lightgrey = 'bg-light-grey dark:bg-transparent dark:border-y-azure dark:border-y-4 text-white prose-h3:text-white prose-h2:text-white prose-figcaption:text-white prose-blockquote:text-white',
}

export const DefaultGrid : DefaultGridComponent = ({ data, layoutProps, children, ...htmlProps }) => {
    const {
        gridWidth = "default",
        vSpacing = "default",
        sectionColor = "default"
    } = extractSettings(layoutProps);

    // Standard (no-color section)
    if (sectionColor == 'default') {
        const cssClasses = ["vb:section vb:section:DefaultGrid"]
        cssClasses.push(GridWidths[gridWidth] ?? '')
        cssClasses.push("flex flex-col")
        cssClasses.push(VSpacings[vSpacing] ?? '')

        return <section className={ cssClasses.filter(x => x && x.length > 0).join(' ')} {...htmlProps}>
            { children }
        </section>;
    }

    const mainClasses = ["vb:section vb:section:DefaultGrid flex flex-col w-full"]
    mainClasses.push(VSpacings[vSpacing] ?? '')
    mainClasses.push(ColorClasses[sectionColor] ?? '')
    return <section className={ mainClasses.filter(x => x && x.length > 0).join(' ')} {...htmlProps}>
        <div className={ GridWidths[gridWidth] ?? '' }>
            { children }
        </div>
    </section>
}

export default DefaultGrid;