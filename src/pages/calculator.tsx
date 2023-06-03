import React, { useEffect } from "react";
import CryptoConverter from "@components/converter/crypto-converter";
import { NextPage } from "next";
import FiatConverter from "@components/converter/fiat-converter";
import { fetchFiatCurrencies } from "@redux/slices/currencySlice";
import { useDispatch } from "react-redux";
const Calculator: NextPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchFiatCurrencies());
    }, []);

    return (
        <div>
            <FiatConverter />
            <CryptoConverter />
        </div>
    );
};

export default Calculator;
