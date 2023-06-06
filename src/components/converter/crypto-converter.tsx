import React, { useState, useEffect, ReactElement } from "react";
import axios from "axios";
import { TCrypto } from "../../types/currency";
import {
    CurrencyContainer,
    Title,
    CurrencyConverter,
    CurrencyInputContainer,
    CurrencyInput,
    CurrencyButton,
    TitleCurrencyName,
    CurrencySelect,
    CurrencyOutput,
} from "@components/converter/fiat-converter.styles";

const CryptoConverter = (): ReactElement => {
    const [cryptoCurrencyList, setCryptoCurrencyList] = useState<TCrypto[]>([]);
    const [allFiatCurrencies, setAllFiatCurrencies] = useState([]);
    const [rates, setRates] = useState();
    const [total, setTotal] = useState(1);
    const [fiatCurrencyCode, setFiatCurrencyCode] = useState("usd");
    const [cryptoCurrencyCode, setCryptoCurrencyCode] = useState("bitcoin");
    const [totalConverted, setTotalConverted] = useState(0);

    useEffect(() => {
        const fetchCryptoList = async () => {
            try {
                const response = await axios.get(
                    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1",
                );
                setCryptoCurrencyList(response.data);
            } catch (error) {
                console.error("Error fetching cryptocurrency list:", error);
            }
        };

        fetchCryptoList();
    }, []);

    useEffect(() => {
        const fetchFiatCurrencies = async () => {
            try {
                const response = await axios.get(
                    "https://api.coingecko.com/api/v3/simple/supported_vs_currencies",
                );
                const data = response.data.slice(0, 100);
                setAllFiatCurrencies(data);
            } catch (error) {
                console.error("Error fetching fiat currencies:", error);
            }
        };

        fetchFiatCurrencies();
    }, []);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const currencies: string[] = [
                    ...allFiatCurrencies,
                    ...cryptoCurrencyList.map((crypto: TCrypto) => crypto.id),
                ];
                const response = await axios.get(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoCurrencyList
                        .map((crypto: TCrypto) => crypto.id)
                        .join(",")}&vs_currencies=${currencies.join(",")}`,
                );
                console.log("rate", response.data);
                console.log("rate", typeof response.data);
                setRates(response.data);
            } catch (error) {
                console.error("Error fetching exchange rates:", error);
            }
        };

        if (cryptoCurrencyList.length > 0 && allFiatCurrencies.length > 0) {
            fetchExchangeRates();
        }
    }, [cryptoCurrencyList, allFiatCurrencies]);

    const handleConvert = () => {
        let rate = 1;
        if (rates && rates[cryptoCurrencyCode as string]?.[fiatCurrencyCode]) {
            rate = rates[cryptoCurrencyCode]?.[fiatCurrencyCode];
        }

        console.log("rate", rate);

        if (rate) {
            const converted = total * rate;
            setTotalConverted(converted);
        } else {
            console.error(
                `Exchange rate not found for ${cryptoCurrencyCode}-${fiatCurrencyCode}`,
            );
        }
    };

    console.log("cryptoCurrencyList", cryptoCurrencyList);
    const temp = false;
    return (
        <CurrencyContainer>
            <CurrencyConverter>
                <Title>
                    <h2>Crypto Converter</h2>
                    <TitleCurrencyName>Crypto</TitleCurrencyName>
                    <img
                        src="/icons/exchange-icon-animated.gif"
                        alt="ExchangeIconAnimated.gif"
                    />
                    <TitleCurrencyName>Fiat</TitleCurrencyName>
                </Title>
                <CurrencyInputContainer>
                    <CurrencyInput
                        type="number"
                        value={total}
                        onChange={(e) => setTotal(parseFloat(e.target.value))}
                    />
                    <CurrencySelect
                        value={cryptoCurrencyCode}
                        onChange={(e) => setCryptoCurrencyCode(e.target.value)}
                    >
                        {cryptoCurrencyList.map((crypto) => (
                            <option key={crypto.id} value={crypto.id}>
                                {crypto.id.toUpperCase()}
                            </option>
                        ))}
                    </CurrencySelect>
                    <CurrencySelect
                        value={fiatCurrencyCode}
                        onChange={(e) => setFiatCurrencyCode(e.target.value)}
                    >
                        <option value="usd">USD</option>
                        <option value="eur">Euro</option>
                        <option value="gbp">GBP</option>
                        <option value="pln">PLN</option>
                    </CurrencySelect>
                </CurrencyInputContainer>
                <CurrencyOutput>
                    <CurrencyInput
                        type="number"
                        placeholder="Converted total"
                        value={
                            temp ? "Converting..." : totalConverted.toFixed(4)
                        }
                        readOnly
                    />
                    {fiatCurrencyCode.toUpperCase()}
                </CurrencyOutput>
                <CurrencyButton onClick={handleConvert}>Convert</CurrencyButton>
            </CurrencyConverter>
        </CurrencyContainer>
    );
};

export default CryptoConverter;
