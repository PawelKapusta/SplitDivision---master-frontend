import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
`;

const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const Input = styled.input`
    padding: 5px;
    margin-right: 10px;
`;

const Button = styled.button`
    padding: 5px 10px;
    background-color: #2196f3;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
`;

const Result = styled.p`
    font-size: 18px;
`;

const CryptoConverter = () => {
    const [amount, setAmount] = useState<number>(0);
    const [fiatCurrency, setFiatCurrency] = useState<string>("usd");
    const [cryptoCurrency, setCryptoCurrency] = useState<string>("bitcoin");
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
    const [cryptoList, setCryptoList] = useState<any[]>([]);
    const [fiatCurrencies, setFiatCurrencies] = useState<string[]>([]);
    const [exchangeRates, setExchangeRates] = useState<any>({});

    useEffect(() => {
        const fetchCryptoList = async () => {
            try {
                const response = await axios.get(
                    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1",
                );
                setCryptoList(response.data);
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
                const top100Fiats = response.data.slice(0, 100);
                setFiatCurrencies(top100Fiats);
            } catch (error) {
                console.error("Error fetching fiat currencies:", error);
            }
        };

        fetchFiatCurrencies();
    }, []);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const vsCurrencies = [
                    ...fiatCurrencies,
                    ...cryptoList.map((crypto) => crypto.id),
                ];
                const response = await axios.get(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoList
                        .map((crypto) => crypto.id)
                        .join(",")}&vs_currencies=${vsCurrencies.join(",")}`,
                );
                setExchangeRates(response.data);
            } catch (error) {
                console.error("Error fetching exchange rates:", error);
            }
        };

        if (cryptoList.length > 0 && fiatCurrencies.length > 0) {
            fetchExchangeRates();
        }
    }, [cryptoList, fiatCurrencies]);

    const handleConvert = () => {
        const rate = exchangeRates[cryptoCurrency]?.[fiatCurrency];

        if (rate) {
            const converted = amount * rate;
            setConvertedAmount(converted);
        } else {
            console.error(
                `Exchange rate not found for ${cryptoCurrency}-${fiatCurrency}`,
            );
        }
    };

    return (
        <Container>
            <Title>Crypto Converter</Title>
            <InputWrapper>
                <Input
                    type="number"
                    step="any"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                />
                <select
                    value={fiatCurrency}
                    onChange={(e) => setFiatCurrency(e.target.value)}
                >
                    <option value="usd">USD</option>
                    {/* Add the other 99 most popular fiat currencies as options */}
                </select>
                <select
                    value={cryptoCurrency}
                    onChange={(e) => setCryptoCurrency(e.target.value)}
                >
                    {cryptoList.map((crypto) => (
                        <option key={crypto.id} value={crypto.id}>
                            {crypto.symbol.toUpperCase()}
                        </option>
                    ))}
                </select>
                <Button onClick={handleConvert}>Convert</Button>
            </InputWrapper>
            {convertedAmount !== null && (
                <Result>
                    Converted Amount: {convertedAmount.toFixed(6)}{" "}
                    {fiatCurrency.toUpperCase()}
                </Result>
            )}
        </Container>
    );
};

export default CryptoConverter;
