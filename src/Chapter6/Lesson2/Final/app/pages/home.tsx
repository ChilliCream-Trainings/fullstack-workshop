import { Catalog } from "@/app/components/catalog/catalog";
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
  return <Catalog />;
}
