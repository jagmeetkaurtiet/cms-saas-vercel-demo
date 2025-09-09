// JsonLDBlock.tsx
import { JsonLDBlockDataFragment, JsonLDBlockDataFragmentDoc } from "@gql/graphql";
import { CmsComponent } from "@remkoj/optimizely-cms-react";
import JsonLd from "./JsonScript";

function parseJsonFromSimpleP(htmlString: string) {
  if (!htmlString) return null;

  const start = htmlString.indexOf("{");
  const end = htmlString.lastIndexOf("}");

  if (start === -1 || end === -1) return null;

  const jsonText = htmlString.slice(start, end + 1);

  try {
    return JSON.parse(jsonText);
  } catch (err) {
    console.error("Failed to parse JSON-LD:", err, jsonText);
    return null;
  }
}

const JsonLDBlockComponent: CmsComponent<JsonLDBlockDataFragment> = async ({ data }) => {
  // Build JSON-LD object
  const jsonLdData: Record<string, any> = {
    "@context": data?.context ?? "https://schema.org",
    "@type": data?.type ?? "WebSite",
  };

  // Only include keys if they have values
  if (data?.dateModified) jsonLdData.dateModified = data.dateModified;
  if (data?.datePublished) jsonLdData.datePublished = data.datePublished;
  if (data?.headline) jsonLdData.headline = data.headline;
  if (data?.image) jsonLdData.image = data.image;
  if (data?.seourl) jsonLdData.url = data.seourl; // SEO url should be "url" in schema.org
  if (data?.script) jsonLdData.script = data.script;
  const cleaned = parseJsonFromSimpleP(data.script);
  return cleaned ? <JsonLd data={cleaned} /> : null;
 
};

JsonLDBlockComponent.displayName = "JsonLDBlock";
JsonLDBlockComponent.getDataFragment = () => ["JsonLDBlockData", JsonLDBlockDataFragmentDoc];
export default JsonLDBlockComponent;
