import React, { useState, ReactElement, useEffect } from "react";
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
    fetchFiatConvertedTotal,
    selectCurrencyState,
} from "@redux/slices/currencySlice";
import Spinner from "@components/spinner";
import useAlert from "../../hocs/useAlert";
import { useTranslation } from "react-i18next";

const FiatConverter = (): ReactElement => {
    const {
        isLoading,
        isFiatConvertLoading,
        convertedFiatTotal,
        fiatCurrencies,
        error,
    } = useSelector(selectCurrencyState);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { showAlert } = useAlert();
    const [fromFiat, setFromFiat] = useState<Currency | null>({
        code: "PLN",
        name: "Polish Złoty",
    });
    const [toFiat, setToFiat] = useState<Currency | null>({
        code: "USD",
        name: "United States Dollar",
    });
    const [total, setTotal] = useState<number>(1);

    useEffect(() => {
        if (error) {
            showAlert(error.toString(), "error");
        }
    }, [error]);

    const handleSwapCurrenciesClick = () => {
        setFromFiat(toFiat);
        setToFiat(fromFiat);
    };

    const handleConvertClick = async () => {
        if (fromFiat && toFiat && total) {
            dispatch(fetchFiatConvertedTotal(fromFiat, toFiat, total));
        }
    };

    return (
        <div>
            {isLoading ? (
                <Spinner isSmall />
            ) : (
                <CurrencyContainer>
                    <CurrencyConverter>
                        <Title>
                            <h2>
                                {t("screens.calculator.fiatConverter.title")}
                            </h2>
                            <TitleCurrencyName>
                                {t("screens.calculator.fiatConverter.fiat")}
                            </TitleCurrencyName>
                            <img
                                src="/icons/exchange-icon-animated.gif"
                                alt="ExchangeIconAnimated.gif"
                            />
                            <TitleCurrencyName>
                                {t("screens.calculator.fiatConverter.fiat")}
                            </TitleCurrencyName>
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
                                            (fiatCurrency: Currency) =>
                                                fiatCurrency.code ===
                                                e.target.value,
                                        );
                                        setFromFiat(selected || null);
                                    }}
                                >
                                    {fiatCurrencies &&
                                        fiatCurrencies.map(
                                            (fiatCurrency: Currency) => (
                                                <option
                                                    key={fiatCurrency.code}
                                                    value={fiatCurrency.code}
                                                >
                                                    {fiatCurrency.code} -{" "}
                                                    {fiatCurrency.name}
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
                                        ? (t(
                                              "screens.calculator.fiatConverter.inputConvertingText",
                                          ) as string)
                                        : convertedFiatTotal || ""
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
                                            (fiatCurrency: Currency) =>
                                                fiatCurrency.code ===
                                                e.target.value,
                                        );
                                        setToFiat(selected || null);
                                    }}
                                >
                                    {fiatCurrencies &&
                                        fiatCurrencies.map(
                                            (fiatCurrency: Currency) => (
                                                <option
                                                    key={fiatCurrency.code}
                                                    value={fiatCurrency.code}
                                                >
                                                    {fiatCurrency.code} -{" "}
                                                    {fiatCurrency.name}
                                                </option>
                                            ),
                                        )}
                                </CurrencySelect>
                            </CurrencyItem>
                        </CurrencyInputContainer>
                        <ButtonsList>
                            <CurrencyButton onClick={handleConvertClick}>
                                {t(
                                    "screens.calculator.fiatConverter.convertButton",
                                )}
                            </CurrencyButton>
                            <CurrencyButton onClick={handleSwapCurrenciesClick}>
                                {t(
                                    "screens.calculator.fiatConverter.swapButton",
                                )}
                                <img
                                    src="/icons/exchange-button-icon.svg"
                                    alt="ExchangeButtonIcon.gif"
                                />
                            </CurrencyButton>
                        </ButtonsList>
                    </CurrencyConverter>
                </CurrencyContainer>
            )}
        </div>
    );
};

export default FiatConverter;
