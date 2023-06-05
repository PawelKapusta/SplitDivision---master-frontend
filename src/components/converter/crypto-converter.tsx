import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    ConverterContainer,
    Title,
    ConverterForm,
    Input,
    Select,
    Button,
    Result,
    Icon,
    SwapIcon,
} from "./crypto-converter.styles";

import {
    faMoneyBill,
    faCoins,
    faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";

const CryptoConverter = () => {
    const [amount, setAmount] = useState("");
    const [fromCurrency, setFromCurrency] = useState("");
    const [toCurrency, setToCurrency] = useState("");
    const [conversionRate, setConversionRate] = useState(0);
    const [convertedAmount, setConvertedAmount] = useState("");
    const [cryptocurrencies, setCryptocurrencies] = useState<string[]>([]);

    useEffect(() => {
        const fetchCryptocurrencies = async () => {
            try {
                const response = await axios.get<any[]>(
                    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
                );

                const cryptoList = response.data.map((crypto) => crypto.id);
                setCryptocurrencies(cryptoList);
                console.log("cryptoList", cryptoList);
            } catch (error) {
                console.error("Error fetching cryptocurrencies:", error);
            }
        };

        fetchCryptocurrencies();
    }, []);

    const handleConvert = () => {
        const fetchConversionRate = async () => {
            try {
                const response = await axios.get<any[]>(
                    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
                );
                const cryptoList = response.data;

                const fromCrypto = cryptoList.find(
                    (crypto) => crypto.id === fromCurrency,
                );
                const toCrypto = cryptoList.find(
                    (crypto) => crypto.id === toCurrency,
                );

                if (fromCrypto && toCrypto) {
                    const fromPrice = fromCrypto.current_price;
                    const toPrice = toCrypto.current_price;

                    const conversionRate = fromPrice / toPrice;
                    setConversionRate(conversionRate);
                } else {
                    setConversionRate(0);
                }
            } catch (error) {
                console.error("Error fetching conversion rate:", error);
            }
        };

        if (fromCurrency && toCurrency) {
            fetchConversionRate();
        }
    };
    const convertCurrency = () => {
        if (!fromCurrency || !toCurrency) {
            return;
        }

        if (fromCurrency === toCurrency) {
            // No conversion needed for same currencies
            setConvertedAmount(amount);
            return;
        }

        const amountToConvert = 1; // Since we're converting between cryptocurrencies, the amount is fixed at 1.

        const fromCurrencyRate = conversionRate || 1;
        const toCurrencyRate = conversionRate ? 1 / conversionRate : 1;

        const convertedValue =
            (amountToConvert * toCurrencyRate) / fromCurrencyRate;
        setConvertedAmount(convertedValue.toFixed(8));
    };

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const getCurrencyIcon = (currency: string) => {
        return <Icon icon={faExchangeAlt} />;
    };

    return (
        <ConverterContainer>
            <Title>Cryptocurrency Converter</Title>
            <ConverterForm>
                <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                />
                <Select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                >
                    <option value="">Select From Currency</option>
                    {cryptocurrencies.map((crypto) => (
                        <option key={crypto} value={crypto}>
                            {crypto}
                        </option>
                    ))}
                </Select>
                <SwapIcon icon={faExchangeAlt} onClick={swapCurrencies} />
                <Select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                >
                    <option value="">Select To Currency</option>
                    {cryptocurrencies.map((crypto) => (
                        <option key={crypto} value={crypto}>
                            {crypto}
                        </option>
                    ))}
                </Select>
                <Button onClick={handleConvert}>Convert</Button>
            </ConverterForm>
            <Result>
                here
                {amount && conversionRate ? (
                    <>
                        {amount} {fromCurrency} = {convertedAmount} {toCurrency}
                    </>
                ) : null}
            </Result>
        </ConverterContainer>
    );
};

export default CryptoConverter;
