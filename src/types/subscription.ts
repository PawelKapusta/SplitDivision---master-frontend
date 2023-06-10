export interface Subscription {
    id: string;
    type: string;
    currency_type: string;
    currency_code: string;
    features: Record<string, unknown>;
}
