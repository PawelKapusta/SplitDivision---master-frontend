import React, { useEffect, useState, ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BillFormData } from "../../types/bill";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { MultiSelect } from "react-multi-select-component";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    Error,
    FormCard,
    Input,
    InputDescription,
    Title,
    UsersSelector,
    BillCardContainer,
    DateLabel,
    BillCustomDatePicker,
    CurrencySelectorContainer,
    CurrencySelector,
    CurrencyOption,
    DebtInput,
} from "@styles/pages/create/bill.styles";
import LoadingButton from "@components/loading-button";
import { BillSchema } from "../../types/schema";
import { createBill, selectBillState } from "@redux/slices/billSlice";
import {
    fetchUser,
    fetchUsers,
    selectUserState,
} from "@redux/slices/userSlice";
import { User } from "../../types/user";
import Spinner from "@components/spinner";
import useAlert from "../../hocs/useAlert";
import { getFormattedDate } from "../../utils/date";
import { TDecodedJWTToken } from "../../types/jwt";
import { getDecodedJWTToken } from "../../utils/jwt";
import { selectAuthState } from "@redux/slices/authSlice";
import {
    fiatCurrencyNames,
    FIAT,
    CRYPTO,
    Currency,
    cryptoCurrencyNames,
} from "../../types/currency";
import Flag from "react-world-flags";

export type TBillFormProps = {
    groupId: string;
    handleCloseModal: () => void;
};

const BillForm = ({
    groupId,
    handleCloseModal,
}: TBillFormProps): ReactElement => {
    const dispatch = useDispatch();
    const { showAlert, AlertWrapper } = useAlert();
    const { isAuthenticated, token } = useSelector(selectAuthState);
    const {
        isLoading: billLoading,
        createBillSuccess,
        error: billError,
    } = useSelector(selectBillState);
    const {
        isLoading: usersLoading,
        user,
        users,
    } = useSelector(selectUserState);
    let decodedToken: TDecodedJWTToken;
    let userId = "";
    if (isAuthenticated) {
        decodedToken = getDecodedJWTToken(token);
        userId = decodedToken.id;
    }
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
        new Date(),
    );
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
        new Date(),
    );
    const [selected, setSelected] = useState<
        { label: string; value: string }[]
    >([]);
    const [selectedType, setSelectedType] = useState(FIAT);
    const [selectedFiatCurrency, setSelectedFiatCurrency] = useState(
        fiatCurrencyNames
            ? fiatCurrencyNames[0]
            : {
                  code: "PLN",
                  name: "Polish Złoty",
              },
    );
    const [selectedCryptoCurrency, setSelectedCryptoCurrency] =
        useState<Currency>(
            cryptoCurrencyNames
                ? cryptoCurrencyNames[0]
                : {
                      code: "btc",
                      name: "Bitcoin",
                  },
        );

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<BillFormData>({
        resolver: yupResolver(BillSchema),
    });
    const options: { label: string; value: string }[] = [];

    useEffect(() => {
        setSelected([
            {
                label: `${user?.first_name} ${user?.last_name}  email: ${user?.email}`,
                value: `${user?.id}`,
            },
        ]);
        setValue("data_created", getFormattedDate(new Date()));
        setValue("data_end", getFormattedDate(new Date()));
    }, [user]);

    useEffect(() => {
        if (createBillSuccess) {
            showAlert("Successfully created a bill", "success");
            handleCloseModal();
        } else if (billError) {
            showAlert(billError, "error");
        }
    }, [createBillSuccess, billError]);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchUser(userId));
        }
    }, [dispatch, isAuthenticated, userId]);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchUsers());
        }
    }, [dispatch, isAuthenticated]);

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value);
    };

    const getCurrencies = () => {
        if (selectedType === FIAT) {
            return fiatCurrencyNames;
        } else if (selectedType === CRYPTO) {
            return cryptoCurrencyNames;
        } else {
            return [];
        }
    };

    users &&
        users?.map((user: User) =>
            options.push({
                label: `${user?.first_name} ${user?.last_name}  email: ${user?.email}`,
                value: `${user.id}`,
            }),
        );

    const onSubmit: SubmitHandler<BillFormData> = (data) => {
        if (selected.length < 2) {
            showAlert("Please select at least 2 people", "error");
        } else {
            data.currency_type = selectedType.toLowerCase();
            data.currency_code =
                selectedType === FIAT
                    ? selectedFiatCurrency?.code
                    : selectedCryptoCurrency?.code;
            data.owner_id = userId;
            data.group_id = groupId;
            data.usersIdList = selected.map((obj) => obj.value);
            dispatch(createBill(data));
        }
    };

    const handleStartDateChange = (datePicked: Date) => {
        setSelectedStartDate(datePicked);
        setValue("data_created", getFormattedDate(datePicked));
    };

    const handleEndDateChange = (datePicked: Date) => {
        setSelectedEndDate(datePicked);
        setValue("data_end", getFormattedDate(datePicked));
    };

    return (
        <BillCardContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Title>Create a bill</Title>
                <FormCard>
                    <Input
                        type="text"
                        {...register("name", {
                            required: "Name bill is required",
                        })}
                        placeholder="Bill name"
                    />
                    <Error>{errors.name && <p>{errors.name.message}</p>}</Error>
                    <InputDescription
                        {...register("description", {
                            required: "Bill description is required",
                        })}
                        placeholder="Bill description"
                    />
                    <Error>
                        {errors.description && (
                            <p>{errors.description.message}</p>
                        )}
                    </Error>
                    <DateLabel>Date start:</DateLabel>
                    <BillCustomDatePicker>
                        <DatePicker
                            dateFormat="yyyy-MM-dd"
                            selected={selectedStartDate}
                            onChange={handleStartDateChange}
                        />
                    </BillCustomDatePicker>
                    <Error>
                        {errors.data_created && (
                            <p>{errors.data_created.message}</p>
                        )}
                    </Error>
                    <DateLabel>Date end:</DateLabel>
                    <BillCustomDatePicker>
                        <DatePicker
                            dateFormat="yyyy-MM-dd"
                            selected={selectedEndDate}
                            onChange={handleEndDateChange}
                        />
                    </BillCustomDatePicker>
                    <Error>
                        {errors.data_end && <p>{errors.data_end.message}</p>}
                    </Error>
                    <CurrencySelectorContainer>
                        {selectedType === FIAT ? (
                            <img
                                src="/icons/fiat-icon.svg"
                                alt="fiat-icon.svg"
                            />
                        ) : (
                            <img
                                src="/icons/cryptocurrency-icon.svg"
                                alt="cryptocurrency-icon.svg"
                            />
                        )}
                        <DebtInput
                            type="number"
                            {...register("debt", {
                                required: "Debt is required",
                            })}
                            placeholder="Debt"
                        />
                        <CurrencySelector
                            id="selector1"
                            value={selectedType}
                            onChange={handleTypeChange}
                        >
                            <CurrencyOption value={FIAT} data-icon="icon-fiat">
                                Fiat
                            </CurrencyOption>
                            <CurrencyOption
                                value={CRYPTO}
                                data-icon="icon-crypto"
                            >
                                Cryptocurrency
                            </CurrencyOption>
                        </CurrencySelector>
                        {selectedType === FIAT && selectedFiatCurrency && (
                            <Flag
                                code={selectedFiatCurrency.code}
                                alt="Currency Flag"
                                height={50}
                                width={50}
                            />
                        )}
                        <CurrencySelector
                            id="selector2"
                            onChange={
                                selectedType == FIAT
                                    ? (e) => {
                                          const selectedCurrency =
                                              fiatCurrencyNames.find(
                                                  (currency: Currency) =>
                                                      currency.code ===
                                                      e.target.value,
                                              );
                                          setSelectedFiatCurrency(
                                              selectedCurrency || {
                                                  code: "PLN",
                                                  name: "Polish Złoty",
                                              },
                                          );
                                      }
                                    : (e) => {
                                          const selectedCurrency =
                                              cryptoCurrencyNames.find(
                                                  (currency: Currency) =>
                                                      currency.code ===
                                                      e.target.value,
                                              );
                                          setSelectedCryptoCurrency(
                                              selectedCurrency || {
                                                  code: "btc",
                                                  name: "Bitcoin",
                                              },
                                          );
                                      }
                            }
                        >
                            {getCurrencies().map((currency: Currency) => (
                                <CurrencyOption
                                    key={currency.code}
                                    value={currency.code}
                                >
                                    {currency.code} - {currency.name}
                                </CurrencyOption>
                            ))}
                        </CurrencySelector>
                    </CurrencySelectorContainer>
                    <Error>{errors.debt && <p>{errors.debt.message}</p>}</Error>
                    {billLoading && usersLoading ? (
                        <Spinner />
                    ) : (
                        <UsersSelector>
                            <MultiSelect
                                options={options}
                                value={selected}
                                onChange={setSelected}
                                isLoading={usersLoading}
                                labelledBy="Select users"
                                ClearIcon={
                                    <Image
                                        src="/icons/search_icon.svg"
                                        alt="Search icon"
                                        width={20}
                                        height={20}
                                        unoptimized
                                    />
                                }
                                ClearSelectedIcon={
                                    <Image
                                        src="/icons/delete_icon.svg"
                                        alt="Delete icon"
                                        width={20}
                                        height={20}
                                        unoptimized
                                    />
                                }
                            />
                        </UsersSelector>
                    )}
                    <Error>
                        {errors.usersIdList && (
                            <p>{errors.usersIdList.message}</p>
                        )}
                    </Error>
                    <LoadingButton
                        loading={billLoading}
                        disabled={false}
                        variety="CreateGroup"
                    >
                        {billLoading ? "Loading..." : "Create a bill"}
                    </LoadingButton>
                </FormCard>
                <AlertWrapper />
            </form>
        </BillCardContainer>
    );
};

export default BillForm;
