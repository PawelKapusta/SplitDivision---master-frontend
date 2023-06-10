export interface Subscription {
    id: string;
    type: string;
    currency_type: string;
    currency_code: string;
    features: Record<string, unknown>;
}

export interface SubscriptionsUsers {
    id: string;
    subscription_id: string;
    user_id: string;
}

export interface UserSubscriptionFormData {
    user_id: string;
    subscription_id: string;
}

export const ALL_ACCESS = "ALL_ACCESS";
