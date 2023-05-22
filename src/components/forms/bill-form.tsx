import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BillFormData } from "../../types/bill";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { MultiSelect } from "react-multi-select-component";
import Image from "next/image";
import {
    Error,
    FormCard,
    Input,
    InputDescription,
    Title,
    UsersSelector,
    BillCardContainer,
    DateLabel,
} from "@styles/pages/create/bill.styles";
import { CustomDatePicker } from "@styles/pages/auth/auth.styles";
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
import DatePicker from "react-datepicker";
import { FileUpload } from "@mui/icons-material";

export type TBillFormProps = {
    groupId: string;
};
const BillForm = ({ groupId }: TBillFormProps): JSX.Element => {
    const dispatch = useDispatch();
    const { showAlert, AlertWrapper } = useAlert();
    const { isAuthenticated, token } = useSelector(selectAuthState);
    const {
        isLoading: billLoading,
        success: billSuccess,
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

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchUser(userId));
    }, []);
    console.log("userId", userId);
    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const [selected, setSelected] = useState([
        {
            label: `${user?.first_name} ${user?.last_name}  email: ${user?.email}`,
            value: `${user?.id}`,
        },
    ]);

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
    }, [user]);

    useEffect(() => {
        if (billSuccess) {
            showAlert("Successfully created a bill", "success");
        } else if (billError) {
            showAlert(billError, "error");
        }
    }, [billSuccess, billError]);

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
            data.usersIdList = selected.map((obj) => obj.value);
            console.log("data", data);
            // dispatch(createBill(data));
        }
    };

    const handleStartDateChange = (datePicked: Date) => {
        setSelectedStartDate(datePicked);
        //setSelectedFormattedDate(getFormattedDate(datePicked));
    };

    const handleEndDateChange = (datePicked: Date) => {
        setSelectedEndDate(datePicked);
        //setSelectedFormattedDate(getFormattedDate(datePicked));
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
                    <CustomDatePicker>
                        <DatePicker
                            dateFormat="yyyy-MM-dd"
                            selected={selectedStartDate}
                            onChange={handleStartDateChange}
                        />
                    </CustomDatePicker>
                    <DateLabel>Date end:</DateLabel>
                    <CustomDatePicker>
                        <DatePicker
                            dateFormat="yyyy-MM-dd"
                            selected={selectedEndDate}
                            onChange={handleEndDateChange}
                        />
                    </CustomDatePicker>

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
