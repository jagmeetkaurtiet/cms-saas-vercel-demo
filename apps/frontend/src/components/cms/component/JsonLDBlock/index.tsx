import { JsonLDBlockDataFragment, JsonLDBlockDataFragmentDoc } from "@gql/graphql";
import { CmsComponent } from "@remkoj/optimizely-cms-react";
import JsonLd from "./JsonScript";

const JsonLDBlock: CmsComponent<Partial<JsonLDBlockDataFragment>> = ({
  data,
  inEditMode,
}) => {
    const jsonLdData = {
        "@context": data?.context || "https://schema.org",
        "@type": data.type ?? "WebSite",
        "dateModified": data.dateModified ,
        "datePublished": data.datePublished,
        "headline": data.headline,
        "image": data.image,
        "seourl": data.seourl,
      };
  return (
    <>
    <p>Hello</p>
    <JsonLd data={jsonLdData} />
  </>
  );
};

JsonLDBlock.displayName = "JsonLDBlock";
JsonLDBlock.getDataFragment = () => ["JsonLDBlockData", JsonLDBlockDataFragmentDoc];
export default JsonLDBlock;
