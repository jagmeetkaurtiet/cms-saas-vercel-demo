import { JsonLDBlockDataFragment, JsonLDBlockDataFragmentDoc } from "@gql/graphql";
import { CmsComponent } from "@remkoj/optimizely-cms-react";
import JsonLd from "./JsonScript";

const JsonLDBlock: CmsComponent<Partial<JsonLDBlockDataFragment>> = ({
  data,
  inEditMode,
}) => {
    const jsonLdData = {
        "@context": data?.context,
        "@type": data.type ?? "WebSite",
        "name": data.name ,
        "url": data.seourl,
      };
  return (
    <>
    <JsonLd data={jsonLdData} />
  </>
  );
};

JsonLDBlock.displayName = "JsonLDBlock";
JsonLDBlock.getDataFragment = () => ["JsonLDBlockData", JsonLDBlockDataFragmentDoc];
export default JsonLDBlock;
