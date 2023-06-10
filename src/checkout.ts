import {
    loadStripe,
    RedirectToCheckoutOptions,
    Stripe,
} from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null> | null = null;

export async function goToCheckout({
    subscriptions,
}: {
    subscriptions: { price: string; quantity: number }[];
}): Promise<void> {
    const getStripeClient = (): Promise<Stripe | null> => {
        if (!stripePromise) {
            stripePromise = loadStripe(
                process.env.NEXT_PUBLIC_STRIPE_API_KEY || "Secret",
            );
        }
        return stripePromise;
    };
    const stripeClient: Stripe | null = await getStripeClient();
    if (stripeClient) {
        const checkoutOptions: RedirectToCheckoutOptions = {
            mode: "payment",
            lineItems: subscriptions,
            successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: window.location.origin,
        };
        await stripeClient.redirectToCheckout(checkoutOptions);
    }
}
