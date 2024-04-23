import { Suspense, useState } from "react";
import { graphql, useLazyLoadQuery, useRelayEnvironment } from "react-relay";
import { playgroundQuery } from "./__generated__/playgroundQuery.graphql";

export function Playground() {
  const relay = useRelayEnvironment();
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>();
  const productIds = [
    "UHJvZHVjdAppOTk=",
    "UHJvZHVjdAppOTU=",
    "UHJvZHVjdAppODg=",
    "UHJvZHVjdAppMw==",
    "UHJvZHVjdAppMjg=",
    "UHJvZHVjdAppMTg=",
    "UHJvZHVjdAppMTc=",
    "UHJvZHVjdAppNzQ=",
    "UHJvZHVjdAppNDk=",
    "UHJvZHVjdAppNTc=",
  ];

  const updateSelectedProductName = () => {
    relay.commitUpdate((s) => {
      s.get(selectedProduct!)?.setValue("New name", "name");
    });
  };

  console.log({
    store: relay.getStore(),
    source: relay.getStore().getSource().toJSON(),
  });

  return (
    <div className="playground">
      <h3>Select one of the following ids:</h3>
      <ul>
        {productIds.map((id) => (
          <li>
            <button key={id} onClick={() => setSelectedProduct(id)}>
              {id}
            </button>
          </li>
        ))}
      </ul>
      {selectedProduct && (
        <>
          <h3>Selected item:</h3>
          <div>
            <Suspense>
              {selectedProduct && <FetchProduct id={selectedProduct} />}
            </Suspense>
            <button onClick={() => updateSelectedProductName()}>
              Set name to "New Name"
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function FetchProduct({ id }: { id: string }) {
  const data = useLazyLoadQuery<playgroundQuery>(
    graphql`
      query playgroundQuery($id: ID!) {
        productById(id: $id) {
          ... on Product {
            id
            name
            imageUrl
            availableStock
          }
        }
      }
    `,
    { id }
  );

  return (
    <ul>
      <li>{data.productById?.id}</li>
      <li>{data.productById?.name}</li>
      <li>{data.productById?.imageUrl}</li>
      <li>{data.productById?.availableStock}</li>
    </ul>
  );
}
