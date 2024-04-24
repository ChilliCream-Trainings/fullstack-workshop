import { Catalog } from "@/app/components/catalog/catalog";
import { graphql, useLazyLoadQuery } from "react-relay";
import { homeQuery } from "./__generated__/homeQuery.graphql";
import { Title } from "../components/structural/title";

export default function Home() {
  return (
    <>
      <Title
        title="Ready for a new adventure?"
        subtitle="Start the season with the latest in clothing and equipment."
      />
      <Content />
    </>
  );
}

function Content() {
  const data = useLazyLoadQuery<homeQuery>(
    graphql`
      query homeQuery {
        ...catalog
      }
    `,
    {}
  );

  return <Catalog $ref={data} />;
}
