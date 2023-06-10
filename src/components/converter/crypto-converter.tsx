import React, { useState, useEffect, ReactElement } from "react";
import {
    CRYPTO_DEFAULT_CODE_BITCOIN_SMALL,
    FIAT_DEFAULT_CODE_USD_SMALL,
    TCrypto,
} from "../../types/currency";
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
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCryptoCurrenciesRatesToFiatCurrencies,
    selectCurrencyState,
} from "@redux/slices/currencySlice";
import Spinner from "@components/spinner";
import useAlert from "../../hocs/useAlert";
import { useTranslation } from "react-i18next";

const CryptoConverter = (): ReactElement => {
    const {
        isFetchCryptoCurrenciesLoading,
        isSupportedFiatCurrenciesWithCryptoCurrenciesLoading,
        cryptoCurrencies,
        supportedFiatCurrenciesWithCryptoCurrencies,
        cryptoCurrenciesRatesToFiatCurrencies,
        isCryptoCurrenciesRatesToFiatCurrenciesLoading,
        error,
    } = useSelector(selectCurrencyState);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [total, setTotal] = useState(1);
    const [fiatCurrencyCode, setFiatCurrencyCode] = useState(
        FIAT_DEFAULT_CODE_USD_SMALL,
    );
    const [cryptoCurrencyCode, setCryptoCurrencyCode] = useState(
        CRYPTO_DEFAULT_CODE_BITCOIN_SMALL,
    );
    const [totalConverted, setTotalConverted] = useState(0);
    const { showAlert } = useAlert();

    useEffect(() => {
        if (error) {
            showAlert(error.toString(), "error");
        }
    }, [error]);

    useEffect(() => {
        if (
            cryptoCurrencies &&
            supportedFiatCurrenciesWithCryptoCurrencies &&
            cryptoCurrencies?.length > 0 &&
            supportedFiatCurrenciesWithCryptoCurrencies?.length > 0
        ) {
            const allCurrencies: string[] = [
                ...supportedFiatCurrenciesWithCryptoCurrencies,
                ...cryptoCurrencies.map(
                    (cryptoCurrency: TCrypto) => cryptoCurrency.id,
                ),
            ];
            dispatch(
                fetchCryptoCurrenciesRatesToFiatCurrencies(
                    cryptoCurrencies,
                    allCurrencies,
                ),
            );
        }
    }, [cryptoCurrencies, supportedFiatCurrenciesWithCryptoCurrencies]);

    const handleConvertClick = () => {
        let rate = 1;
        if (
            cryptoCurrenciesRatesToFiatCurrencies &&
            cryptoCurrenciesRatesToFiatCurrencies[
                cryptoCurrencyCode as string
            ]?.[fiatCurrencyCode]
        ) {
            rate =
                cryptoCurrenciesRatesToFiatCurrencies[cryptoCurrencyCode]?.[
                    fiatCurrencyCode
                ];
        }

        rate ? setTotalConverted(total * rate) : setTotalConverted(0);
    };

    return (
        <div>
            {isFetchCryptoCurrenciesLoading ||
            isSupportedFiatCurrenciesWithCryptoCurrenciesLoading ? (
                <Spinner isSmall />
            ) : (
                <CurrencyContainer>
                    <CurrencyConverter>
                        <Title>
                            <h2>
                                {t("screens.calculator.cryptoConverter.title")}
                            </h2>
                            <TitleCurrencyName>
                                {t("screens.calculator.cryptoConverter.crypto")}
                            </TitleCurrencyName>
                            <img
                                src="/icons/exchange-icon-animated.gif"
                                alt="ExchangeIconAnimated.gif"
                            />
                            <TitleCurrencyName>
                                {t("screens.calculator.cryptoConverter.fiat")}
                            </TitleCurrencyName>
                        </Title>
                        <CurrencyInputContainer>
                            <CurrencyInput
                                type="number"
                                value={total}
                                onChange={(e) =>
                                    setTotal(parseFloat(e.target.value))
                                }
                            />
                            <CurrencySelect
                                value={cryptoCurrencyCode}
                                onChange={(e) =>
                                    setCryptoCurrencyCode(e.target.value)
                                }
                            >
                                {cryptoCurrencies &&
                                    cryptoCurrencies?.map(
                                        (cryptoCurrency: TCrypto) => (
                                            <option
                                                key={cryptoCurrency.id}
                                                value={cryptoCurrency.id}
                                            >
                                                {cryptoCurrency.id.toUpperCase()}
                                            </option>
                                        ),
                                    )}
                            </CurrencySelect>
                            <CurrencySelect
                                value={fiatCurrencyCode}
                                onChange={(e) =>
                                    setFiatCurrencyCode(e.target.value)
                                }
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
                                    isCryptoCurrenciesRatesToFiatCurrenciesLoading
                                        ? (t(
                                              "screens.calculator.cryptoConverter.inputConvertingText",
                                          ) as string)
                                        : totalConverted.toFixed(4) || ""
                                }
                                readOnly
                            />
                            {fiatCurrencyCode.toUpperCase()}
                        </CurrencyOutput>
                        <CurrencyButton onClick={handleConvertClick}>
                            {t("screens.calculator.cryptoConverter.buttonText")}
                        </CurrencyButton>
                    </CurrencyConverter>
                </CurrencyContainer>
            )}
        </div>
    );
};

export default CryptoConverter;
