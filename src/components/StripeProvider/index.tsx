"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import React, { FC, PropsWithChildren, useMemo } from "react";

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      console.error("Stripe publishable key is not set");
      return Promise.resolve(null);
    }
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

interface StripeProviderProps extends PropsWithChildren {
  clientSecret?: string;
}

const StripeProvider: FC<StripeProviderProps> = ({ children, clientSecret }) => {
  const stripe = useMemo(() => getStripe(), []);

  const options = useMemo(() => {
    if (!clientSecret) return undefined;
    return {
      clientSecret,
      appearance: {
        theme: "stripe" as const,
        variables: {
          colorPrimary: "#7e52ff",
          colorBackground: "#ffffff",
          colorText: "#30313d",
          colorDanger: "#ef233c",
          fontFamily: "var(--font-mont), system-ui, sans-serif",
          spacingUnit: "4px",
          borderRadius: "16px",
        },
      },
    };
  }, [clientSecret]);

  // If clientSecret is provided, wrap with Elements
  if (clientSecret && options) {
    return (
      <Elements stripe={stripe} options={options}>
        {children}
      </Elements>
    );
  }

  // Otherwise, just render children (Stripe is still loaded for other uses)
  return <>{children}</>;
};

export default StripeProvider;
