import React, { useEffect, useState } from "react";
import {
    CurrencyRow,
    Section,
    SectionRow,
    StatisticsPageScreens,
} from "@styles/statistics.styles";
import { SubscriptionStatisticsObj } from "../../types/subscription";
import { GroupStatisticsObj } from "../../types/group";
import { BillStatisticsObj } from "../../types/bill";
import {
    CommentStatisticsObj,
    SubcommentStatisticsObj,
} from "../../types/comment";
import {
    singleUserStatistics,
    SingleUserStatisticsInterface,
} from "../../types/user";
import {
    CRYPTO,
    cryptoCurrencyNames,
    FIAT,
    fiatCurrencyNames,
} from "../../types/currency";

export type TSingleUserStatisticsProp = {
    groups: GroupStatisticsObj[];
    bills: BillStatisticsObj[];
    comments: CommentStatisticsObj[];
    subcomments: SubcommentStatisticsObj[];
    subscriptions: SubscriptionStatisticsObj[];
};

const SingleUserStatistics = ({
    groups,
    bills,
    comments,
    subcomments,
    subscriptions,
}: TSingleUserStatisticsProp) => {
    const [singleUserStatisticsData, setSingleUserStatisticsData] =
        useState<SingleUserStatisticsInterface>(singleUserStatistics);

    useEffect(() => {
        let groupsNumber = 0;
        let billsNumber = 0;
        let commentsNumber = 0;
        let subcommentsNumber = 0;
        let subscriptionsNumber = 0;

        const currencyBillTypesNumber: { [key: string]: number } = {};
        const currencyBillCodesNumber: { [key: string]: number } = {};

        groups?.forEach((group) => {
            if (group) {
                groupsNumber += 1;
            }
        });

        bills?.forEach((bill) => {
            const type = bill.currency_type;
            const code = bill.currency_code;

            if (bill) {
                billsNumber += 1;
            }

            if (type in currencyBillTypesNumber) {
                currencyBillTypesNumber[type] += 1;
            } else {
                currencyBillTypesNumber[type] = 1;
            }

            if (code in currencyBillCodesNumber) {
                currencyBillCodesNumber[code] += 1;
            } else {
                currencyBillCodesNumber[code] = 1;
            }
        });

        comments?.forEach((comment) => {
            if (comment) {
                commentsNumber += 1;
            }
        });
        subcomments?.forEach((subcomment) => {
            if (subcomment) {
                subcommentsNumber += 1;
            }
        });

        subscriptions?.forEach((subscription) => {
            if (subscription) {
                subscriptionsNumber += 1;
            }
        });

        setSingleUserStatisticsData({
            groupsNumber: groupsNumber,
            billsNumber: billsNumber,
            currencyBillTypesNumber: currencyBillTypesNumber,
            currencyBillCodesNumber: currencyBillCodesNumber,
            commentsNumber: commentsNumber,
            subcommentsNumber: subcommentsNumber,
            subscriptionsNumber: subscriptionsNumber,
        });
    }, []);

    const getCurrencyTypeByCode = (code: string) => {
        const fiats = fiatCurrencyNames.map((currency) => currency.code);
        const cryptos = cryptoCurrencyNames.map((currency) => currency.code);

        if (fiats.includes(code)) {
            return FIAT;
        } else if (cryptos.includes(code)) {
            return CRYPTO;
        } else {
            return null;
        }
    };

    return (
        <StatisticsPageScreens
            style={{
                marginBottom: "10px",
            }}
        >
            <Section
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                }}
            >
                <SectionRow>
                    <h1>Groups</h1>
                    <h3>
                        The number of groups you belong to is:
                        <p>{singleUserStatisticsData.groupsNumber}</p>
                    </h3>
                    <h1>Subscriptions</h1>
                    <h3>
                        The number of subscriptions you bought is:
                        <p>{singleUserStatisticsData.subscriptionsNumber}</p>
                    </h3>
                </SectionRow>
                <SectionRow>
                    <h1>Bills</h1>
                    <h3>
                        The number of bills you belong to is
                        <p>{singleUserStatisticsData.billsNumber}</p>
                    </h3>
                    <h3>
                        Bills divided by type:
                        <p>
                            {Object.entries(
                                singleUserStatisticsData.currencyBillTypesNumber,
                            ).map(([type, number]) => {
                                return (
                                    <div key={type}>
                                        <p>
                                            {type}: {number}
                                        </p>
                                    </div>
                                );
                            })}
                        </p>
                    </h3>
                    <h3>
                        Bills divided by currency code:
                        <div style={{ marginTop: "10px" }}>
                            FIAT - green, CRYPTO - gold
                        </div>
                        <p>
                            {Object.entries(
                                singleUserStatisticsData.currencyBillCodesNumber,
                            ).map(([code, number]) => {
                                const type = getCurrencyTypeByCode(code);
                                const isFiat = type === FIAT;
                                const isCrypto = type === CRYPTO;

                                return (
                                    <div key={code}>
                                        <CurrencyRow
                                            isFiat={isFiat}
                                            isCrypto={isCrypto}
                                        >
                                            {code}: {number}
                                        </CurrencyRow>
                                    </div>
                                );
                            })}
                        </p>
                    </h3>
                </SectionRow>
                <SectionRow>
                    <h1>Comments</h1>
                    <h3>
                        The number of comments you wrote is:
                        <p>{singleUserStatisticsData.commentsNumber}</p>
                    </h3>
                    <h1>Subcomments</h1>
                    <h3>
                        The number of subcomments you wrote is:
                        <p>{singleUserStatisticsData.subcommentsNumber}</p>
                    </h3>
                </SectionRow>
            </Section>
        </StatisticsPageScreens>
    );
};

export default SingleUserStatistics;
