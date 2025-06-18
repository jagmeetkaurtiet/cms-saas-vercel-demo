import { OptimizelyNextPage as CmsComponent } from "@remkoj/optimizely-cms-nextjs";
import {
  YTHomePageDataFragment,
  YTHomePageDataFragmentDoc,
} from "@/gql/graphql";
import {
  getServerContext,
  CmsContentArea,
} from "@remkoj/optimizely-cms-react/rsc";
import React from "react";

export const YTHomePage: CmsComponent<
  YTHomePageDataFragment
> = async ({ data }) => {
  getServerContext();

  return (
    <><h1 className="text-blue-500">{data.YTTitle}</h1><CmsContentArea items={data.YTMain} fieldName="MainContent" /></>
  );
};
YTHomePage.getDataFragment = () => [
  "YTHomePageData",
  YTHomePageDataFragmentDoc,
];

export default YTHomePage;