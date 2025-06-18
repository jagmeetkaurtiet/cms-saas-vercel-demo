import { OptimizelyNextPage as CmsComponent } from "@remkoj/optimizely-cms-nextjs";
import {
  DemoHeroBlockDataFragment,
  DemoHeroBlockDataFragmentDoc,
} from "@/gql/graphql";
import {
  getServerContext,
} from "@remkoj/optimizely-cms-react/rsc";
import React from "react";

export const DemoHero: CmsComponent<DemoHeroBlockDataFragment> = async ({
  data,
}) => {
  getServerContext();
  return (
    <section class="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-48 px-6 text-center">
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="relative z-10">
        <h2 class="text-5xl font-bold mb-6">{data.Title}</h2>
        <p class="text-xl mb-8 max-w-3xl mx-auto">
          {data.SubTitle}
        </p>
        <a
          href="#services"
          class="inline-block bg-yellow-500 text-black font-semibold py-3 px-8 rounded-full transition hover:bg-yellow-600"
        >
          Explore Our Services
        </a>
      </div>
    </section>
  );
};
DemoHero.getDataFragment = () => [
  "DemoYTPageData",
  DemoHeroBlockDataFragmentDoc,
];

export default DemoHero;
