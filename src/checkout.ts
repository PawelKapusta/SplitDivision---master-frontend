import {
    loadStripe,
    Stripe,
    RedirectToCheckoutOptions,
} from "@stripe/stripe-js";
let stripePromise: Promise<Stripe | null> | null = null;
export async function checkout({
    lineItems,
}: {
    lineItems: any[];
}): Promise<void> {
    const getStripe = (): Promise<Stripe | null> => {
        if (!stripePromise) {
            stripePromise = loadStripe(
                process.env.NEXT_PUBLIC_STRIPE_API_KEY || "Secret",
            );
        }
        return stripePromise;
    };
    const stripe: Stripe | null = await getStripe();
    if (stripe) {
        const options: RedirectToCheckoutOptions = {
            mode: "payment",
            lineItems,
            successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: window.location.origin,
        };
        await stripe.redirectToCheckout(options);
    }
}
