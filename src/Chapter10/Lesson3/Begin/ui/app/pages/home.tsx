import { Catalog } from "@/app/components/catalog/catalog";
import { Title } from "../components/structural/title";
import { useLoaderData } from "react-router-dom";
import { usePreloadedQuery } from "react-relay";
import { homeQuery } from "./__generated__/homeQuery.graphql";
import query from "./home-query";

export default function Home() {
  const ref = useLoaderData() as any;
  const data = usePreloadedQuery<homeQuery>(query, ref);

  return (
    <>
      <Title
        title="Ready for a new adventure?"
        subtitle="Start the season with the latest in clothing and equipment."
      />
      <Catalog $ref={data} />
    </>
  );
}
