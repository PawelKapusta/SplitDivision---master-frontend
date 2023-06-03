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
} from "@styles/pages/calculator.styles";

import {
    faMoneyBill,
    faCoins,
    faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";

const CryptoConverter = () => {
    const [cryptos, setCryptos] = useState([]);
    const [fromCrypto, setFromCrypto] = useState("");
    const [toCrypto, setToCrypto] = useState("");
    const [amount, setAmount] = useState(0);
    const [convertedAmount, setConvertedAmount] = useState(null);

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await axios.get(
                    "https://api.coingecko.com/api/v3/coins/list",
                );
                const cryptosData = response.data;
                setCryptos(cryptosData);
            } catch (error) {
                console.error("Error fetching cryptocurrencies:", error);
            }
        };

        fetchCryptos();
    }, []);

    const handleConvert = async () => {
        if (fromCrypto && toCrypto && amount) {
            try {
                const response = await axios.get(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${fromCrypto}&vs_currencies=${toCrypto}`,
                );
                const rates = response.data;
                const exchangeRate = rates[fromCrypto][toCrypto];
                const converted = amount * exchangeRate;
                setConvertedAmount(converted);
            } catch (error) {
                console.error("Error converting cryptocurrency:", error);
            }
        }
    };

    return (
        <div>
            <h2>Cryptocurrency Converter</h2>
            <div>
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                />
                <select
                    value={fromCrypto}
                    onChange={(e) => setFromCrypto(e.target.value)}
                >
                    <option value="">Select a cryptocurrency</option>
                    {cryptos.map((crypto) => (
                        <option key={crypto.id} value={crypto.id}>
                            {crypto.name} ({crypto.symbol})
                        </option>
                    ))}
                </select>
                <select
                    value={toCrypto}
                    onChange={(e) => setToCrypto(e.target.value)}
                >
                    <option value="">Select a cryptocurrency</option>
                    {cryptos.map((crypto) => (
                        <option key={crypto.id} value={crypto.id}>
                            {crypto.name} ({crypto.symbol})
                        </option>
                    ))}
                </select>
                <button onClick={handleConvert}>Convert</button>
            </div>
            {convertedAmount && <p>Converted Amount: {convertedAmount}</p>}
        </div>
    );
};

export default CryptoConverter;
