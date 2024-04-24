import { graphql, useFragment, useMutation } from "react-relay";
import { useCheckout_viewer$key } from "./__generated__/useCheckout_viewer.graphql";
import {
  AddressInput,
  PaymentMethodInput,
  useCheckoutMutation,
} from "./__generated__/useCheckoutMutation.graphql";
import { useCallback, useState } from "react";

export function useCheckout($ref: useCheckout_viewer$key) {
  const data = useFragment(
    graphql`
      fragment useCheckout_viewer on Viewer {
        basket {
          items {
            quantity
            product {
              id
              price
            }
          }
        }
      }
    `,
    $ref
  );

  const [commit, isInFlight] = useMutation<useCheckoutMutation>(graphql`
    mutation useCheckoutMutation($input: CreateOrderInput!) {
      createOrder(input: $input) {
        order {
          id
        }
        errors {
          ... on InvalidProductIdError {
            message
            productId
          }
          ... on PriceChangedError {
            message
            product {
              price
              name
            }
          }
        }
      }
    }
  `);

  const [error, setError] = useState<string | null>(null);

  const handleCheckout = useCallback(
    (
      input: { address: AddressInput; paymentMethod: PaymentMethodInput },
      onSuccess?: () => {}
    ) => {
      if ((data.basket?.items.length ?? 0) === 0) {
        return;
      }

      commit({
        variables: {
          input: {
            items: data.basket!.items.map((item) => ({
              productId: item.product.id,
              unitPrice: item.product.price,
              units: item.quantity,
            })),
            address: input.address,
            paymentMethod: input.paymentMethod,
          },
        },
        onError(error) {
          setError("There was an error creating the order:\n" + error.message);
        },
        onCompleted(response, errors) {
          if (errors) {
            setError("There was a unexpected error. Please try again.");
            return;
          }

          if (response.createOrder.errors) {
            if (response.createOrder.errors.some((e) => e.message)) {
              setError(
                "There was an error creating the order:\n" +
                  response.createOrder.errors
                    .map((e) => e.message)
                    .filter((m) => m)
                    .join(", ")
              );
            } else {
              setError("There was a unexpected error. Please try again.");
            }
            return;
          }

          setError(null);
          onSuccess?.();
        },
      });
    },
    [data.basket, commit]
  );

  return {
    handleCheckout,
    isInFlight,
    error,
  };
}
