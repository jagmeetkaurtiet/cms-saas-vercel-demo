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
import JsonLDBlock from "../../component/JsonLDBlock";

export const YTHomePage: CmsComponent<
  YTHomePageDataFragment
> = async ({ data }) => {
  getServerContext();

  return (
    <> <html lang="en">
      <head>
      <link href="https:https://cdn1.polaris.com//assets/v2/themes/crp/v2/style/main.min.css?v=CaSHyoGfN0VG2iXHS3hd-CwDMFnS8aGxPE0lH3Goeck" rel="stylesheet" />
      <link href="https://cdn1.polaris.com/assets/v2/blocks/copy/description-generic/description-generic.min.css?v=fW8wrdTaicJjhYE2LNOCsbM2T1IrU4cNceZouMmFSys" rel="stylesheet" />
    <link href="https://cdn1.polaris.com/assets/v2/blocks/tools/video-carousel/video-carousel.min.css?v=PPZjoprwXR-z4w1J0uaTpbW70gHOcjMGu1i6xPuOVB8" rel="stylesheet" />
    <link href="https://cdn1.polaris.com/assets/v2/blocks/navigation/button-list/button-list.min.css?v=2RyE28fOFM-cN83NBTYZswJYCubSu4VRdCC4qaYa4pM" rel="stylesheet" />
    <link href="https://cdn1.polaris.com/assets/v2/blocks/copy/heading-generic/heading-generic.min.css?v=4Q3pKK1SkOsI6Z8llAj8eVU8xcgW3ws2tfCGQfjgFMY" rel="stylesheet" />
    <link href="https://cdn1.polaris.com/assets/v2/vendors/swiperjs/8.3.2/swiper-bundle.min.css?v=GMUWdelDwjSA1URASdweUFnclWCAUd0Aolx6CS8bPbs" rel="stylesheet" />
    <link href="https://cdn1.polaris.com/assets/v2/blocks/navigation/sub-navigation-simple/sub-navigation-simple.base.min.css?v=vYrpkNDhacVbwJsM2WI_klaT7HJ0TdDuYMgr_zFSlF8" rel="stylesheet" />
    <link href="https://cdn1.polaris.com/assets/v2/blocks/navigation/links-list/links-list.base.min.css?v=vyYtOw6Ue4KwmMvQWH3wpxh9TryZkS7JaF5C0bRcR9U" rel="stylesheet" />
    <link href="https://cdn1.polaris.com/assets/v2/blocks/wholegoods/wholegood-gallery/wholegood-gallery.min.css?v=JhGPF2npIfWESKOjwfCc0P0Ubz0sKtdyFBjr2IYAt60" rel="stylesheet" />
    <link href="https://cdn1.polaris.com/assets/v2/blocks/navigation/link-wrapper/link-wrapper.min.css?v=zV5jvpSORDROoRwMI7f9ujHtGG1h1is-ofwS-jMGldc" rel="stylesheet" />
    <link href="https://cdn1.polaris.com/assets/v2/blocks/tiles/tile-clickable-full/tile-clickable-full.base.min.css?v=JJbszIiau-VBvOGQXtDd96Iq9h58GAFQWgdL13vBao8" rel="stylesheet" />
    <link href="https://cdn1.polaris.com/assets/v2/blocks/navigation/header-simple/v2/navigation-drawer-complex-a/navigation-drawer-complex-a-v2.min.css?v=GlVAxEN6EPeBCBZLdHG4aWqWgq-9ESvv_tdiy1Aum18" rel="stylesheet" />
    <link href="https://cdn1.polaris.com/assets/v2/blocks/navigation/header-simple/v2/navigation-drawer-complex-pga/navigation-drawer-complex-pga.min.css?v=Fu9U_Aeg5AmL6XpnhcYAH3WXoes3sUhkzTAnZ-B2JtU" rel="stylesheet" />
    <link href="https://cdn1.polaris.com/assets/v2/blocks/navigation/header-simple/v2/navigation-drawer-complex-b/navigation-drawer-complex-b-v2.min.css?v=1-MqP9MSecq0ZOVTfiSw8BK_z-IpC9jRHu5xSEceAQc" rel="stylesheet" />

      </head>
      
        <body className={`bg-ghost-white dark:bg-vulcan dark:text-white overflow-x-hidden`}>
          <div className="flex min-h-screen flex-col justify-between">
                <h1 className="text-blue-500">{data.YTTitle}</h1>
                <CmsContentArea items={data.Content} fieldName="Content" />
                <CmsContentArea items={data.JsonLD} fieldName="JsonLD" />

          </div>
        </body>
    </html>
    </>
  );
};
YTHomePage.getDataFragment = () => [
  "YTHomePageData",
  YTHomePageDataFragmentDoc,
];

export default YTHomePage;