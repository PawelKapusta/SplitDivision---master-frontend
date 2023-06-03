import React, { useState } from "react";
import {
    Container,
    Converter,
    InputWrapper,
    Input,
    Button,
    CurrencyItem,
    Title,
    TitleCurrencyName,
    CurrencySelect,
    ButtonsList,
} from "@components/converter/fiat-converter.styles";
import Flag from "react-world-flags";
import { FiatCurrency } from "../../types/fiatCurrency";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchFiatConvertedAmount,
    selectCurrencyState,
} from "@redux/slices/currencySlice";
import Spinner from "@components/spinner";

const FiatConverter = () => {
    const {
        isLoading,
        isFiatConvertLoading,
        convertedFiatAmount,
        fiatCurrencies,
    } = useSelector(selectCurrencyState);
    const dispatch = useDispatch();
    const [fromCurrency, setFromCurrency] = useState<FiatCurrency | null>({
        code: "PLN",
        name: "Polish Złoty",
    });
    const [toCurrency, setToCurrency] = useState<FiatCurrency | null>({
        code: "USD",
        name: "United States Dollar",
    });
    const [amount, setAmount] = useState<number>(1);

    const handleSwapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const handleConvert = async () => {
        if (fromCurrency && toCurrency && amount) {
            dispatch(
                fetchFiatConvertedAmount(fromCurrency, toCurrency, amount),
            );
        }
    };

    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : (
                <Container>
                    <Converter>
                        <Title>
                            <h2>Currency Converter</h2>
                            <TitleCurrencyName>Fiat</TitleCurrencyName>
                            <img
                                src="/icons/exchange-icon-animated.gif"
                                alt="ExchangeIconAnimated.gif"
                            />
                            <TitleCurrencyName>Fiat</TitleCurrencyName>
                        </Title>
                        <InputWrapper>
                            <Input
                                type="number"
                                placeholder="Amount"
                                value={amount}
                                onChange={(e) =>
                                    setAmount(parseFloat(e.target.value))
                                }
                            />
                            <CurrencyItem>
                                {fromCurrency && (
                                    <Flag
                                        code={fromCurrency.code.substring(0, 2)}
                                        alt={fromCurrency.code}
                                        height={50}
                                        width={50}
                                    />
                                )}

                                <CurrencySelect
                                    value={fromCurrency?.code}
                                    onChange={(e) => {
                                        const selectedCurrency =
                                            fiatCurrencies.find(
                                                (currency: FiatCurrency) =>
                                                    currency.code ===
                                                    e.target.value,
                                            );
                                        setFromCurrency(
                                            selectedCurrency || null,
                                        );
                                    }}
                                >
                                    {fiatCurrencies &&
                                        fiatCurrencies.map(
                                            (currency: FiatCurrency) => (
                                                <option
                                                    key={currency.code}
                                                    value={currency.code}
                                                >
                                                    {currency.code} -{" "}
                                                    {currency.name}
                                                </option>
                                            ),
                                        )}
                                </CurrencySelect>
                            </CurrencyItem>
                        </InputWrapper>
                        <InputWrapper>
                            <Input
                                type="number"
                                placeholder="Converted Amount"
                                value={
                                    isFiatConvertLoading
                                        ? "Converting..."
                                        : convertedFiatAmount || ""
                                }
                                readOnly
                            />
                            <CurrencyItem>
                                {toCurrency && (
                                    <Flag
                                        code={toCurrency.code.substring(0, 2)}
                                        alt={toCurrency.code}
                                        height={50}
                                        width={50}
                                    />
                                )}
                                <CurrencySelect
                                    value={toCurrency?.code}
                                    onChange={(e) => {
                                        const selectedCurrency =
                                            fiatCurrencies.find(
                                                (currency: FiatCurrency) =>
                                                    currency.code ===
                                                    e.target.value,
                                            );
                                        setToCurrency(selectedCurrency || null);
                                    }}
                                >
                                    {fiatCurrencies &&
                                        fiatCurrencies.map(
                                            (currency: FiatCurrency) => (
                                                <option
                                                    key={currency.code}
                                                    value={currency.code}
                                                >
                                                    {currency.code} -{" "}
                                                    {currency.name}
                                                </option>
                                            ),
                                        )}
                                </CurrencySelect>
                            </CurrencyItem>
                        </InputWrapper>
                        <ButtonsList>
                            <Button onClick={handleConvert}>Convert</Button>
                            <Button onClick={handleSwapCurrencies}>
                                Swap{" "}
                                <img
                                    src="/icons/exchange-button-icon.svg"
                                    alt="ExchangeButtonIcon.gif"
                                />{" "}
                            </Button>
                        </ButtonsList>
                    </Converter>
                </Container>
            )}
        </div>
    );
};

export default FiatConverter;
