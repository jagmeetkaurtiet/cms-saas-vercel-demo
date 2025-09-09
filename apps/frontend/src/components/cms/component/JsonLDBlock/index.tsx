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
  return <JsonLd data={jsonLdData.script} />;
 
};

JsonLDBlockComponent.displayName = "JsonLDBlock";
JsonLDBlockComponent.getDataFragment = () => ["JsonLDBlockData", JsonLDBlockDataFragmentDoc];
export default JsonLDBlockComponent;
