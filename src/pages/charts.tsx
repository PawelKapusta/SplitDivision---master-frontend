import React, { useEffect } from "react";
import { NextPage } from "next";
import { withPremium } from "../hocs/withPremium";
import { useRouter } from "next/router";
import {
    fetchCryptoCurrencies,
    selectCurrencyState,
} from "@redux/slices/currencySlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@components/spinner";
import { TCrypto } from "../types/currency";
import { ChartCoinDescriptionTitle, CurrencyCard } from "@styles/charts.styles";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const Charts: NextPage = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { isFetchCryptoCurrenciesLoading, cryptoCurrencies } =
        useSelector(selectCurrencyState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCryptoCurrencies());
    }, []);

    const handleButtonOnClick = (cryptoPath: string) => {
        router.replace(cryptoPath);
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <ChartCoinDescriptionTitle>
                {t("screens.charts.title")}
            </ChartCoinDescriptionTitle>
            {isFetchCryptoCurrenciesLoading ? (
                <Spinner isSmall />
            ) : cryptoCurrencies ? (
                cryptoCurrencies?.map((crypto: TCrypto) => {
                    const cryptoChartPath = `/chart/crypto/${crypto?.id}`;
                    return (
                        <CurrencyCard key={crypto?.id}>
                            <button
                                onClick={() =>
                                    handleButtonOnClick(cryptoChartPath)
                                }
                            >
                                <Image
                                    src={crypto?.image}
                                    alt="Crypto-icon"
                                    width={50}
                                    height={50}
                                />
                                {crypto?.name}
                            </button>
                        </CurrencyCard>
                    );
                })
            ) : null}
        </div>
    );
};

export default withPremium(Charts);
