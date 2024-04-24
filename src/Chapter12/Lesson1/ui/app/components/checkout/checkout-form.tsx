import { graphql, useFragment } from "react-relay";
import "./checkout-form.css";
import { checkoutForm$key } from "./__generated__/checkoutForm.graphql";
import { useCheckout } from "./use-checkout";
import { CardType } from "./__generated__/useCheckoutMutation.graphql";
import { ErrorMessage } from "../shared/error-message";
import { Link } from "react-router-dom";

interface CheckoutFormProps {
  $ref: checkoutForm$key;
}

const formFields = {
  shippingAddress: {
    address: "shipping-address-street",
    city: "shipping-address-city",
    state: "shipping-address-state",
    zip: "shipping-address-zip",
    country: "shipping-address-country",
  },
  paymentMethod: {
    cardHolderName: "payment-method-card-holder-name",
    cardNumber: "payment-method-card-number",
    expirationDate: "payment-method-expiration-date",
    securityCode: "payment-method-security-code",
  },
};

export function CheckoutFrom({ $ref }: CheckoutFormProps) {
  const data = useFragment(
    graphql`
      fragment checkoutForm on Query {
        viewer {
          ...useCheckout_viewer
        }
      }
    `,
    $ref
  );
  const { handleCheckout, error, isInFlight } = useCheckout(data.viewer);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: any = event.target;
    const address = {
      street: formData[formFields.shippingAddress.address].value,
      city: formData[formFields.shippingAddress.city].value,
      state: formData[formFields.shippingAddress.state].value,
      zipCode: formData[formFields.shippingAddress.zip].value,
      country: formData[formFields.shippingAddress.country].value,
    };
    const paymentMethod = {
      cardHolderName: formData[formFields.paymentMethod.cardHolderName].value,
      cardNumber: formData[formFields.paymentMethod.cardNumber].value,
      expiration: formData[formFields.paymentMethod.expirationDate].value,
      securityNumber: formData[formFields.paymentMethod.securityCode].value,
      cardType: "AMEX" as CardType,
    };

    handleCheckout({ address, paymentMethod });
  };

  return (
    <div className="checkout">
      <form onSubmit={handleSubmit}>
        <div className="form">
          <CheckoutShippingAddress />
          <CheckoutPaymentMethod />
          <ErrorMessage error={error} />
          <CheckoutFormActions />
        </div>
      </form>
    </div>
  );
}

function CheckoutShippingAddress() {
  return (
    <div className="form-section">
      <h2>Shipping address</h2>
      <label>
        Address <input name={formFields.shippingAddress.address} type="text" />
      </label>
      <div className="form-group">
        <div className="form-group-item">
          <label>
            City
            <input name={formFields.shippingAddress.city} type="text" />
          </label>
        </div>
        <div className="form-group-item">
          <label>
            State
            <input name={formFields.shippingAddress.state} type="text" />
          </label>
        </div>
        <div className="form-group-item">
          <label>
            Zip code
            <input name={formFields.shippingAddress.zip} type="text" />
          </label>
        </div>
      </div>
      <div>
        <label>
          Country
          <input name={formFields.shippingAddress.country} type="text" />
        </label>
      </div>
    </div>
  );
}

function CheckoutPaymentMethod() {
  return (
    <div className="form-section">
      <h2>Payment method</h2>
      <label>
        Cardholder name
        <input name={formFields.paymentMethod.cardHolderName} type="text" />
      </label>
      <div className="form-group">
        <div className="form-group-item">
          <label>
            Card number
            <input
              name={formFields.paymentMethod.cardNumber}
              type="text"
              placeholder="0000 0000 0000 0000"
              pattern="[\d| ]{16,22}"
            />
          </label>
        </div>
        <div className="form-group-item">
          <label>
            Expiration date
            <input name={formFields.paymentMethod.expirationDate} type="date" />
          </label>
        </div>
        <div className="form-group-item">
          <label>
            Security code
            <input name={formFields.paymentMethod.securityCode} type="text" />
          </label>
        </div>
      </div>
    </div>
  );
}

function CheckoutFormActions() {
  return (
    <div className="form-section">
      <div className="form-buttons">
        <Link to="/cart" className="button button-secondary">
          <img role="presentation" src="icons/arrow-left.svg" />
          Back to the shopping bag
        </Link>
        <button className="button button-primary" type="submit">
          Place order
        </button>
      </div>
    </div>
  );
}
