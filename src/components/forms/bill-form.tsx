import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BillFormData, UserSelectedDebts } from "../../types/bill";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { MultiSelect } from "react-multi-select-component";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    BillCardContainer,
    BillCustomDatePicker,
    CurrencyOption,
    CurrencySelector,
    CurrencySelectorContainer,
    DateLabel,
    DebtDivideEvenlyCheckbox,
    DebtInput,
    Error,
    FormCard,
    Input,
    InputDescription,
    SelectedUserDebtBox,
    SelectedUserDebtInput,
    SelectedUserDebtLabel,
    Title,
    UsersSelector,
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
    CRYPTO,
    cryptoCurrencyNames,
    Currency,
    FIAT,
    fiatCurrencyNames,
} from "../../types/currency";
import Flag from "react-world-flags";
import { fetchGroupUsers, selectGroupState } from "@redux/slices/groupSlice";
import { useTranslation } from "react-i18next";

export type TBillFormProps = {
    groupId: string;
    handleCloseModal: () => void;
};

const BillForm = ({
    groupId,
    handleCloseModal,
}: TBillFormProps): ReactElement => {
    const { t } = useTranslation();
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
    const { isLoading: groupLoading, groupUsers } =
        useSelector(selectGroupState);
    let decodedToken: TDecodedJWTToken;
    let userId = "";
    if (isAuthenticated) {
        decodedToken = getDecodedJWTToken(token);
        userId = decodedToken.id;
    }
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
        new Date(),
    );
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
        new Date(),
    );
    const [selected, setSelected] = useState<
        { label: string; value: string }[]
    >([]);
    const [selectedUserDebts, setSelectedUserDebts] =
        useState<UserSelectedDebts>({});

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
    const [debtEvenlyError, setDebtEvenlyError] = useState<string | null>(null);

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
            showAlert(
                t("components.alert.messages.successCreateBill"),
                "success",
            );
            handleCloseModal();
        } else if (billError) {
            showAlert(billError, "error");
        }
    }, [createBillSuccess, billError]);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchUsers());
            dispatch(fetchUser(userId));
            dispatch(fetchGroupUsers(groupId));
        }
    }, [dispatch, isAuthenticated, userId]);

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

    groupUsers &&
        groupUsers?.map(
            (user: User) =>
                !user?.is_blocked &&
                options.push({
                    label: `${user?.first_name} ${user?.last_name}  email: ${user?.email}`,
                    value: `${user.id}`,
                }),
        );

    const onSubmit: SubmitHandler<BillFormData> = (data) => {
        if (selected.length < 2) {
            showAlert(
                t("components.alert.messages.noEnoughPeopleError"),
                "error",
            );
        } else {
            data.currency_type = selectedType.toLowerCase();
            data.currency_code =
                selectedType === FIAT
                    ? selectedFiatCurrency?.code
                    : selectedCryptoCurrency?.code;
            data.owner_id = userId;
            data.group_id = groupId;
            if (Object.values(selectedUserDebts).length > 0) {
                const sum = selectedUserDebts
                    ? Object.values(selectedUserDebts).reduce(
                          (total, value) => (total || 0) + (value || 0),
                          0,
                      )
                    : -1;
                if (sum && sum > data.debt) {
                    setDebtEvenlyError(
                        t("components.billForm.errors.evenlyMoreError"),
                    );
                } else if (sum && sum < data.debt) {
                    setDebtEvenlyError(
                        t("components.billForm.errors.evenlyLessError"),
                    );
                } else {
                    setDebtEvenlyError(null);
                    data.usersIdDebtList =
                        Object.entries(selectedUserDebts).map(([id, debt]) => ({
                            id,
                            debt,
                        })) || {};
                }
            } else {
                const howManyUsersInBill = selected.length;
                const evenlyDebt = data.debt / howManyUsersInBill;
                data.usersIdDebtList = selected.map((user) => ({
                    id: user.value,
                    debt: evenlyDebt,
                }));
            }
            dispatch(createBill(data));
            handleCloseModal();
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

    const handleSelectedUserDebtsChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const { name, value } = event.target;
        setSelectedUserDebts((prev: any) => ({
            ...prev,
            [name]: parseFloat(value),
        }));
    };

    const handleDivideEvenlyDebt = () => {
        setIsChecked(!isChecked);
    };

    return (
        <BillCardContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Title>{t("components.billForm.title")}</Title>
                <FormCard>
                    <Input
                        type="text"
                        {...register("name", {
                            required: t(
                                "components.billForm.inputs.name.nameRequired",
                            ) as string,
                        })}
                        placeholder={
                            t("components.billForm.inputs.name.name") as string
                        }
                    />
                    <Error>{errors.name && <p>{errors.name.message}</p>}</Error>
                    <InputDescription
                        {...register("description", {
                            required: t(
                                "components.billForm.inputs.description.nameRequired",
                            ) as string,
                        })}
                        placeholder={
                            t(
                                "components.billForm.inputs.description.name",
                            ) as string
                        }
                    />
                    <Error>
                        {errors.description && (
                            <p>{errors.description.message}</p>
                        )}
                    </Error>
                    <DateLabel>{t("components.billForm.dateStart")}</DateLabel>
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
                    <DateLabel>{t("components.billForm.dateEnd")}</DateLabel>
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
                                required: t(
                                    "components.billForm.inputs.debt.nameRequired",
                                ) as string,
                            })}
                            placeholder={
                                t(
                                    "components.billForm.inputs.debt.name",
                                ) as string
                            }
                        />
                        <CurrencySelector
                            id="selector1"
                            value={selectedType}
                            onChange={handleTypeChange}
                        >
                            <CurrencyOption value={FIAT} data-icon="icon-fiat">
                                {t("components.billForm.fiat")}
                            </CurrencyOption>
                            <CurrencyOption
                                value={CRYPTO}
                                data-icon="icon-crypto"
                            >
                                {t("components.billForm.crypto")}
                            </CurrencyOption>
                        </CurrencySelector>
                        {selectedType === FIAT && selectedFiatCurrency && (
                            <Flag
                                code={selectedFiatCurrency.code.substring(0, 2)}
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
                        <Spinner isSmall />
                    ) : (
                        <UsersSelector>
                            <MultiSelect
                                options={options}
                                value={selected}
                                onChange={setSelected}
                                isLoading={usersLoading}
                                labelledBy={t(
                                    "components.billForm.select.label",
                                )}
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
                    <DebtDivideEvenlyCheckbox>
                        {t("components.billForm.debtEvenlyCheckbox")}
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleDivideEvenlyDebt}
                        />
                    </DebtDivideEvenlyCheckbox>
                    {usersLoading ? (
                        <Spinner isSmall />
                    ) : (
                        !isChecked &&
                        selected &&
                        selected.map((user) => (
                            <SelectedUserDebtBox key={user?.value}>
                                <SelectedUserDebtLabel key={user?.value + 1}>
                                    {user?.label}
                                </SelectedUserDebtLabel>{" "}
                                <SelectedUserDebtInput
                                    key={user?.value + 2}
                                    type="number"
                                    name={user?.value}
                                    value={selectedUserDebts[user?.value] || ""}
                                    onChange={handleSelectedUserDebtsChange}
                                />
                            </SelectedUserDebtBox>
                        ))
                    )}
                    <Error>{debtEvenlyError && <p>{debtEvenlyError}</p>}</Error>
                    <LoadingButton
                        loading={billLoading}
                        disabled={false}
                        variety="CreateGroup"
                        isBillForm
                    >
                        {billLoading
                            ? t(
                                  "components.billForm.createButton.loadingButton",
                              )
                            : t("components.billForm.createButton.text")}
                    </LoadingButton>
                </FormCard>
                <AlertWrapper />
            </form>
        </BillCardContainer>
    );
};

export default BillForm;
