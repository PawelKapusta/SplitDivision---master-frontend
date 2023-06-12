import React, { ChangeEvent, useEffect, useState } from "react";
import { NextPage } from "next";
import {
    CategoryScale,
    Chart,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import { useRouter } from "next/router";
import { Line } from "react-chartjs-2";
import moment from "moment";
import {
    fetchCryptoCurrencies,
    fetchCryptoCurrenciesToChart,
    fetchCryptoCurrencyData,
    selectCurrencyState,
} from "@redux/slices/currencySlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@components/spinner";
import { TCrypto } from "../../../types/currency";
import Image from "next/image";
import {
    ChartCoinDescriptionTitle,
    ChartContent,
    ChartDescriptionCard,
    ChartSelect,
    ChartTitle,
} from "@styles/charts.styles";
import { useTranslation } from "react-i18next";

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
);
const CryptoChart: NextPage = () => {
    const router = useRouter();
    const { cryptoId } = router.query;
    const dispatch = useDispatch();
    const [daysNumber, setDaysNumber] = useState<number | "">(7);
    const { t } = useTranslation();
    const {
        isFetchCryptoCurrenciesLoading,
        cryptoCurrencies,
        cryptoCurrenciesToChart,
        isCryptoCurrenciesToChartLoading,
        cryptoCurrencyData,
        isCryptoCurrencyDataLoading,
    } = useSelector(selectCurrencyState);

    useEffect(() => {
        dispatch(fetchCryptoCurrencies());
        dispatch(
            fetchCryptoCurrenciesToChart(
                cryptoId as string,
                daysNumber as number,
            ),
        );
        dispatch(fetchCryptoCurrencyData(cryptoId as string));
    }, [cryptoId, daysNumber]);

    const coinData =
        cryptoCurrenciesToChart &&
        cryptoCurrenciesToChart?.prices?.map((value: [number, number]) => ({
            x: value[0],
            y: value[1].toFixed(2),
        }));

    const options = {
        responsive: true,
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: "Days",
                    color: "#eaaf57",
                    font: { weight: "bold", size: 18 },
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: "Price",
                    color: "#eaaf57",
                    font: { weight: "bold", size: 18 },
                },
            },
        },
    };
    const chartData = {
        labels:
            coinData &&
            coinData.map((value: [number, number]) =>
                moment(value.x).format("MMM DD"),
            ),
        datasets: [
            {
                fill: true,
                label: cryptoId && cryptoId.toString().toUpperCase(),
                data:
                    coinData &&
                    coinData.map((value: [number, number]) => value.y),
                borderColor: "#35A2EB",
                backgroundColor: "#35a2eb80",
            },
        ],
    };

    const cryptoImageSrc =
        cryptoCurrencies &&
        cryptoCurrencies.find((currency: TCrypto) => currency.id === cryptoId);

    const handleDaysChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setDaysNumber(value === "" ? "" : Number(value));
    };

    return (
        <div>
            {isFetchCryptoCurrenciesLoading ||
            isCryptoCurrenciesToChartLoading ||
            isCryptoCurrencyDataLoading ? (
                <Spinner isSmall />
            ) : (
                <ChartContent>
                    <ChartTitle>
                        <Image
                            src={cryptoImageSrc && cryptoImageSrc?.image}
                            alt="Crypto-icon"
                            width={50}
                            height={50}
                        />
                        <ChartSelect
                            value={daysNumber}
                            onChange={handleDaysChange}
                        >
                            <option value={7}>
                                {t("screens.charts.crypto.days.7days")}
                            </option>
                            <option value={30}>
                                {t("screens.charts.crypto.days.30days")}
                            </option>
                            <option value={90}>
                                {t("screens.charts.crypto.days.90days")}
                            </option>
                            <option value={180}>
                                {t("screens.charts.crypto.days.180days")}
                            </option>
                            <option value={365}>
                                {t("screens.charts.crypto.days.365days")}
                            </option>
                        </ChartSelect>
                    </ChartTitle>
                    <Line options={options} data={chartData && chartData} />
                    <ChartCoinDescriptionTitle>
                        {t("screens.charts.crypto.description")}
                    </ChartCoinDescriptionTitle>
                    <ChartDescriptionCard>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: cryptoCurrencyData?.description?.en,
                            }}
                        />
                    </ChartDescriptionCard>
                </ChartContent>
            )}
        </div>
    );
};

export default CryptoChart;
