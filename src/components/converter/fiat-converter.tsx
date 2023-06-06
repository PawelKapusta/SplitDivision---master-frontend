import React, { useState, ReactElement } from "react";
import {
    CurrencyContainer,
    CurrencyConverter,
    CurrencyInputContainer,
    CurrencyInput,
    CurrencyButton,
    CurrencyItem,
    Title,
    TitleCurrencyName,
    CurrencySelect,
    ButtonsList,
} from "@components/converter/fiat-converter.styles";
import Flag from "react-world-flags";
import { Currency } from "../../types/currency";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchFiatConvertedAmount,
    selectCurrencyState,
} from "@redux/slices/currencySlice";
import Spinner from "@components/spinner";

const FiatConverter = (): ReactElement => {
    const {
        isLoading,
        isFiatConvertLoading,
        convertedFiatAmount,
        fiatCurrencies,
    } = useSelector(selectCurrencyState);
    const dispatch = useDispatch();
    const [fromFiat, setFromFiat] = useState<Currency | null>({
        code: "PLN",
        name: "Polish Złoty",
    });
    const [toFiat, setToFiat] = useState<Currency | null>({
        code: "USD",
        name: "United States Dollar",
    });
    const [total, setTotal] = useState<number>(1);

    const handleSwapCurrencies = () => {
        setFromFiat(toFiat);
        setToFiat(fromFiat);
    };

    const handleConvert = async () => {
        if (fromFiat && toFiat && total) {
            dispatch(fetchFiatConvertedAmount(fromFiat, toFiat, total));
        }
    };

    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : (
                <CurrencyContainer>
                    <CurrencyConverter>
                        <Title>
                            <h2>Currency Converter</h2>
                            <TitleCurrencyName>Fiat</TitleCurrencyName>
                            <img
                                src="/icons/exchange-icon-animated.gif"
                                alt="ExchangeIconAnimated.gif"
                            />
                            <TitleCurrencyName>Fiat</TitleCurrencyName>
                        </Title>
                        <CurrencyInputContainer>
                            <CurrencyInput
                                type="number"
                                placeholder="Total"
                                value={total}
                                onChange={(e) =>
                                    setTotal(parseFloat(e.target.value))
                                }
                            />
                            <CurrencyItem>
                                {fromFiat && (
                                    <Flag
                                        code={fromFiat.code.substring(0, 2)}
                                        alt={fromFiat.code}
                                        height={50}
                                        width={50}
                                    />
                                )}

                                <CurrencySelect
                                    value={fromFiat?.code}
                                    onChange={(e) => {
                                        const selected = fiatCurrencies.find(
                                            (currency: Currency) =>
                                                currency.code ===
                                                e.target.value,
                                        );
                                        setFromFiat(selected || null);
                                    }}
                                >
                                    {fiatCurrencies &&
                                        fiatCurrencies.map(
                                            (currency: Currency) => (
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
                        </CurrencyInputContainer>
                        <CurrencyInputContainer>
                            <CurrencyInput
                                type="number"
                                placeholder="Converted total"
                                value={
                                    isFiatConvertLoading
                                        ? "Converting..."
                                        : convertedFiatAmount || ""
                                }
                                readOnly
                            />
                            <CurrencyItem>
                                {toFiat && (
                                    <Flag
                                        code={toFiat.code.substring(0, 2)}
                                        alt={toFiat.code}
                                        height={50}
                                        width={50}
                                    />
                                )}
                                <CurrencySelect
                                    value={toFiat?.code}
                                    onChange={(e) => {
                                        const selected = fiatCurrencies.find(
                                            (currency: Currency) =>
                                                currency.code ===
                                                e.target.value,
                                        );
                                        setToFiat(selected || null);
                                    }}
                                >
                                    {fiatCurrencies &&
                                        fiatCurrencies.map(
                                            (currency: Currency) => (
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
                        </CurrencyInputContainer>
                        <ButtonsList>
                            <CurrencyButton onClick={handleConvert}>
                                Convert
                            </CurrencyButton>
                            <CurrencyButton onClick={handleSwapCurrencies}>
                                Swap{" "}
                                <img
                                    src="/icons/exchange-button-icon.svg"
                                    alt="ExchangeButtonIcon.gif"
                                />{" "}
                            </CurrencyButton>
                        </ButtonsList>
                    </CurrencyConverter>
                </CurrencyContainer>
            )}
        </div>
    );
};

export default FiatConverter;
