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

export const subscriptionsStatistics = {
    subscriptionsNumber: 0,
    subscriptionsBoughtNumber: 0,
};

export interface SubscriptionsStatistics {
    subscriptionsNumber: number;
    subscriptionsBoughtNumber: number;
}

export interface SubscriptionStatisticsObj {
    id: string;
    type: string;
    currency_type: string;
    currency_code: string;
    features: Record<string, unknown>;
}

export interface SubscriptionBoughtStatisticsObj {
    id: string;
    subscription_id: string;
    user_id: string;
}
