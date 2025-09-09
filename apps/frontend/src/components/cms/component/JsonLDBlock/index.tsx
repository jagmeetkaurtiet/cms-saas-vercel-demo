// JsonLDBlock.tsx
import { JsonLDBlockDataFragment, JsonLDBlockDataFragmentDoc } from "@gql/graphql";
import { CmsComponent } from "@remkoj/optimizely-cms-react";
import JsonLd from "./JsonScript";

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
  let cleaned: Record<string, any> | null = null;
  if (typeof data?.script === "string") {
    // Case 1: JSON wrapped in HTML string
    const withoutTags = data.script.replace(/<\/?[^>]+(>|$)/g, "").trim();
    try {
      cleaned = JSON.parse(withoutTags);
    } catch (err) {
      console.error("Failed to parse JSON-LD string:", err, withoutTags);
    }
  } else if (typeof data?.script === "object" && data?.script !== null) {
    // Case 2: Already JSON object
    cleaned = data.script;
  }

  return cleaned ? <JsonLd data={cleaned} /> : null;
 
};

JsonLDBlockComponent.displayName = "JsonLDBlock";
JsonLDBlockComponent.getDataFragment = () => ["JsonLDBlockData", JsonLDBlockDataFragmentDoc];
export default JsonLDBlockComponent;
