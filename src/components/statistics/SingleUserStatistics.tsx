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
import { useTranslation } from "react-i18next";

export type TSingleUserStatisticsProp = {
    groups: GroupStatisticsObj[];
    bills: BillStatisticsObj[];
    comments: CommentStatisticsObj[];
    subcomments: SubcommentStatisticsObj[];
    subscriptions: SubscriptionStatisticsObj[];
    userId: string;
};

const SingleUserStatistics = ({
    groups,
    bills,
    comments,
    subcomments,
    subscriptions,
    userId,
}: TSingleUserStatisticsProp) => {
    const [singleUserStatisticsData, setSingleUserStatisticsData] =
        useState<SingleUserStatisticsInterface>(singleUserStatistics);
    const { t } = useTranslation();
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

        console.log("subscriptions", subscriptions);

        subscriptions?.forEach((subscription) => {
            if (subscription && subscription?.user_id === userId) {
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
                    <h1>{t("screens.statistics.components.group.title")}</h1>
                    <h3>
                        {t("screens.statistics.components.singleUser.groups")}
                        <p>{singleUserStatisticsData.groupsNumber}</p>
                    </h3>
                    <h1>
                        {t("screens.statistics.components.subscription.title")}
                    </h1>
                    <h3>
                        {t(
                            "screens.statistics.components.singleUser.subscriptions",
                        )}
                        <p>{singleUserStatisticsData.subscriptionsNumber}</p>
                    </h3>
                </SectionRow>
                <SectionRow>
                    <h1>{t("screens.statistics.components.bill.title")}</h1>
                    <h3>
                        {t("screens.statistics.components.singleUser.bills")}
                        <p>{singleUserStatisticsData.billsNumber}</p>
                    </h3>
                    <h3>
                        {t("screens.statistics.components.bill.dividedByType")}
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
                        {t("screens.statistics.components.bill.dividedByCode")}
                        <div style={{ marginTop: "10px" }}>
                            {t("screens.statistics.components.bill.legend")}
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
                    <h1>{t("screens.statistics.components.comment.title")}</h1>
                    <h3>
                        {t("screens.statistics.components.singleUser.comments")}
                        <p>{singleUserStatisticsData.commentsNumber}</p>
                    </h3>
                    <h1>
                        {t(
                            "screens.statistics.components.comment.titleSubcomments",
                        )}
                    </h1>
                    <h3>
                        {t(
                            "screens.statistics.components.singleUser.subcomments",
                        )}
                        <p>{singleUserStatisticsData.subcommentsNumber}</p>
                    </h3>
                </SectionRow>
            </Section>
        </StatisticsPageScreens>
    );
};

export default SingleUserStatistics;
