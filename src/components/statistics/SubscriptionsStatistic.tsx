import React, { useEffect, useState } from "react";
import { StatisticsPageScreens } from "@styles/statistics.styles";
import {
    SubscriptionBoughtStatisticsObj,
    subscriptionsStatistics,
    SubscriptionsStatistics,
    SubscriptionStatisticsObj,
} from "../../types/subscription";

export type TSubscriptionsStatisticsProp = {
    subscriptions: SubscriptionStatisticsObj[];
    subscriptionsBought: SubscriptionBoughtStatisticsObj[];
};

const SubscriptionsStatistics = ({
    subscriptions,
    subscriptionsBought,
}: TSubscriptionsStatisticsProp) => {
    const [subscriptionsStatisticsData, setSubscriptionsStatisticsData] =
        useState<SubscriptionsStatistics>(subscriptionsStatistics);

    useEffect(() => {
        let subscriptionsNumber = 0;
        let subscriptionsBoughtNumber = 0;

        subscriptions.forEach((subscription) => {
            if (subscription) {
                subscriptionsNumber += 1;
            }
        });

        subscriptionsBought.forEach((subscriptionBought) => {
            if (subscriptionBought) {
                subscriptionsBoughtNumber += 1;
            }
        });

        setSubscriptionsStatisticsData({
            subscriptionsNumber: subscriptionsNumber,
            subscriptionsBoughtNumber: subscriptionsBoughtNumber,
        });
    }, []);

    return (
        <StatisticsPageScreens>
            <h1>Subscriptions</h1>
            <h3>
                All subscriptions in the application:
                <p>{subscriptionsStatisticsData.subscriptionsNumber}</p>
            </h3>
            <h3>
                All bought subscriptions in the application:
                <p>{subscriptionsStatisticsData.subscriptionsBoughtNumber}</p>
            </h3>
        </StatisticsPageScreens>
    );
};

export default SubscriptionsStatistics;
