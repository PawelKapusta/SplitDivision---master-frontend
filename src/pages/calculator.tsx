import React, { useEffect } from "react";
import CryptoConverter from "@components/converter/crypto-converter";
import { NextPage } from "next";
import FiatConverter from "@components/converter/fiat-converter";
import {
    fetchCryptoCurrencies,
    fetchFiatCurrencies,
    fetchSupportedFiatCurrenciesWithCryptoCurrencies,
} from "@redux/slices/currencySlice";
import { useDispatch } from "react-redux";
import { CalculatorContainer } from "@styles/pages/calculator.styles";
import useAlert from "../hocs/useAlert";
const Calculator: NextPage = () => {
    const dispatch = useDispatch();
    const { AlertWrapper } = useAlert();
    useEffect(() => {
        dispatch(fetchFiatCurrencies());
        dispatch(fetchCryptoCurrencies());
        dispatch(fetchSupportedFiatCurrenciesWithCryptoCurrencies());
    }, []);

    return (
        <CalculatorContainer>
            <FiatConverter />
            <CryptoConverter />
            <AlertWrapper />
        </CalculatorContainer>
    );
};

export default Calculator;
