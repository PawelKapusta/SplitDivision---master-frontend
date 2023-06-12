import React, { useEffect, useState } from "react";
import { CurrencyRow, StatisticsPageScreens } from "@styles/statistics.styles";
import {
    billsStatistics,
    BillsStatistics,
    BillStatisticsObj,
} from "../../types/bill";
import {
    CRYPTO,
    cryptoCurrencyNames,
    FIAT,
    fiatCurrencyNames,
} from "../../types/currency";

export type TBillsStatisticsProp = {
    bills: BillStatisticsObj[];
};

const BillsStatistics = ({ bills }: TBillsStatisticsProp) => {
    const [billsStatisticsData, setBillsStatisticsData] =
        useState<BillsStatistics>(billsStatistics);

    useEffect(() => {
        let billsNumber = 0;
        const currencyTypesNumber: { [key: string]: number } = {};
        const currencyCodesNumber: { [key: string]: number } = {};

        bills.forEach((bill) => {
            const type = bill.currency_type;
            const code = bill.currency_code;

            if (bill) {
                billsNumber += 1;
            }

            if (type in currencyTypesNumber) {
                currencyTypesNumber[type] += 1;
            } else {
                currencyTypesNumber[type] = 1;
            }

            if (code in currencyCodesNumber) {
                currencyCodesNumber[code] += 1;
            } else {
                currencyCodesNumber[code] = 1;
            }
        });

        setBillsStatisticsData({
            billsNumber: billsNumber,
            currencyTypesNumber: currencyTypesNumber,
            currencyCodesNumber: currencyCodesNumber,
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
        <StatisticsPageScreens>
            <h1>Bills</h1>
            <h3>
                All bills in the application:
                <p>{billsStatisticsData.billsNumber}</p>
            </h3>
            <h3>
                Bills divided by type:
                <p>
                    {Object.entries(
                        billsStatisticsData.currencyTypesNumber,
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
                        billsStatisticsData.currencyCodesNumber,
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
        </StatisticsPageScreens>
    );
};

export default BillsStatistics;
