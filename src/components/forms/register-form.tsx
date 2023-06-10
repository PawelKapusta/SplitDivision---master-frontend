import { useState, ReactElement } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "@components/loading-button";
import { registerUser, selectAuthState } from "@redux/slices/authSlice";
import {
    Error,
    FormCard,
    Input,
    CustomDatePicker,
    RegisterDescription,
    Select,
    BirthLabel,
} from "@styles/pages/auth/auth.styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RegisterSchema } from "../../types/schema";
import { RegisterFormValues } from "../../types/user";
import { getFormattedDate } from "../../utils/date";
import { useTranslation } from "react-i18next";

const schema = yup.object().shape(RegisterSchema);

const RegisterForm = (): ReactElement => {
    const { t } = useTranslation();
    const { isLoading } = useSelector(selectAuthState);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedFormattedDate, setSelectedFormattedDate] = useState<string>(
        getFormattedDate(new Date()),
    );

    const handleDateChange = (datePicked: Date) => {
        console.log("date", datePicked);
        const formattedDate = datePicked.toISOString().split("T")[0];
        console.log("formattedDate", formattedDate);
        console.log("formattedDate 2", getFormattedDate(datePicked));
        setSelectedDate(datePicked);
        setSelectedFormattedDate(getFormattedDate(datePicked));
    };

    const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
        data.birth_date = selectedFormattedDate;
        console.log("data", data);
        dispatch(registerUser(data));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormCard isRegisterForm>
                <Input
                    type="text"
                    {...register("first_name", {
                        required: t(
                            "components.profileForm.inputs.firstName.nameRequired",
                        ) as string,
                    })}
                    placeholder={
                        t(
                            "components.profileForm.inputs.firstName.name",
                        ) as string
                    }
                />
                <Error>
                    {errors.first_name && <p>{errors.first_name.message}</p>}
                </Error>
                <Input
                    type="text"
                    {...register("last_name", {
                        required: t(
                            "components.profileForm.inputs.lastName.nameRequired",
                        ) as string,
                    })}
                    placeholder={
                        t(
                            "components.profileForm.inputs.lastName.name",
                        ) as string
                    }
                />
                <Error>
                    {errors.last_name && <p>{errors.last_name.message}</p>}
                </Error>
                <Input
                    type="password"
                    {...register("password", {
                        required: t(
                            "components.registerForm.inputs.password.nameRequired",
                        ) as string,
                    })}
                    placeholder={
                        t(
                            "components.registerForm.inputs.password.name",
                        ) as string
                    }
                />
                <Error>
                    {errors.password && <p>{errors.password.message}</p>}
                </Error>
                <Input
                    type="password"
                    {...register("confirm_password", {
                        required: t(
                            "components.registerForm.inputs.confirmPassword.nameRequired",
                        ) as string,
                    })}
                    placeholder={
                        t(
                            "components.registerForm.inputs.confirmPassword.name",
                        ) as string
                    }
                />
                <Error>
                    {errors.confirm_password && (
                        <p>{errors.confirm_password.message}</p>
                    )}
                </Error>
                <Input
                    type="text"
                    {...register("username", {
                        required: t(
                            "components.profileForm.inputs.username.nameRequired",
                        ) as string,
                    })}
                    placeholder={
                        t(
                            "components.profileForm.inputs.username.name",
                        ) as string
                    }
                />
                <Error>
                    {errors.username && <p>{errors.username.message}</p>}
                </Error>
                <Select {...register("gender")}>
                    <option value="">
                        {t("components.profileForm.select.title")}
                    </option>
                    <option value="male">
                        {t("components.profileForm.select.male")}
                    </option>
                    <option value="female">
                        {t("components.profileForm.select.female")}
                    </option>
                    <option value="other">
                        {t("components.profileForm.select.other")}
                    </option>
                </Select>
                <Error>{errors.gender && <p>{errors.gender.message}</p>}</Error>
                <Input
                    type="email"
                    {...register("email", {
                        required: t(
                            "components.profileForm.inputs.email.nameRequired",
                        ) as string,
                    })}
                    placeholder={
                        t("components.profileForm.inputs.email.name") as string
                    }
                />
                <Error>{errors.email && <p>{errors.email.message}</p>}</Error>
                <Input
                    type="text"
                    {...register("phone", {
                        required: t(
                            "components.profileForm.inputs.phone.nameRequired",
                        ) as string,
                    })}
                    placeholder={
                        t("components.profileForm.inputs.phone.name") as string
                    }
                />
                <Error>{errors.phone && <p>{errors.phone.message}</p>}</Error>
                <BirthLabel>{t("components.profileForm.birthDate")}</BirthLabel>
                <CustomDatePicker>
                    <DatePicker
                        dateFormat="yyyy-MM-dd"
                        selected={selectedDate}
                        onChange={handleDateChange}
                    />
                </CustomDatePicker>
                <Error>
                    {errors.birth_date && <p>{errors.birth_date.message}</p>}
                </Error>
                <LoadingButton
                    loading={isLoading}
                    disabled={false}
                    variety="Register"
                >
                    {isLoading
                        ? t(
                              "components.registerForm.registerButton.loadingButton",
                          )
                        : t("components.registerForm.registerButton.text")}
                </LoadingButton>
                <RegisterDescription>
                    <p>
                        {t("components.registerForm.textToLogin.text")}
                        <a href="/auth/login">
                            {t("components.registerForm.textToLogin.linkText")}
                        </a>
                        .
                    </p>
                </RegisterDescription>
            </FormCard>
        </form>
    );
};

export default RegisterForm;
