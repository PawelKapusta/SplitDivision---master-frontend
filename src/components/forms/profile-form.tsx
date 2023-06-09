import { useEffect, useState, ChangeEvent, ReactElement } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "@components/loading-button";
import {
    Error,
    FormCard,
    Input,
    BirthLabel,
    AvatarCard,
} from "@styles/pages/profile.styles";
import { CustomDatePicker, Select } from "@styles/pages/auth/auth.styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UpdateProfileSchema } from "../../types/schema";
import { UpdateUserFormValues } from "../../types/user";
import { getFormattedDate } from "../../utils/date";
import { selectUserState, updateUser } from "@redux/slices/userSlice";
import Spinner from "@components/spinner";
import useAlert from "../../hocs/useAlert";
import { useTranslation } from "react-i18next";

const schema = yup.object().shape(UpdateProfileSchema);

const ProfileForm = (): ReactElement => {
    const { t } = useTranslation();
    const {
        isLoading,
        user,
        successUpdate,
        error: userError,
    } = useSelector(selectUserState);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateUserFormValues>({
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();
    const { showAlert, AlertWrapper } = useAlert();
    const [formState, setFormState] = useState({
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        username: user?.username || "",
        email: user?.email || "",
        gender: user?.gender || "",
        phone: user?.phone || "",
    });
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedFormattedDate, setSelectedFormattedDate] = useState<string>(
        getFormattedDate(new Date()),
    );

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleDateChange = (datePicked: Date) => {
        setSelectedDate(datePicked);
        setSelectedFormattedDate(getFormattedDate(datePicked));
    };

    const onSubmit: SubmitHandler<UpdateUserFormValues> = (data) => {
        data.first_name = formState?.first_name || user?.first_name;
        data.last_name = formState?.last_name || user?.last_name;
        data.username = formState?.username || user?.username;
        data.email = formState?.email || user?.email;
        data.gender = formState?.gender || user?.gender;
        data.phone = formState?.phone || user?.phone;
        data.birth_date = selectedFormattedDate;
        dispatch(updateUser(user?.id, data));
    };

    useEffect(() => {
        setFormState({
            first_name: user?.first_name,
            last_name: user?.last_name,
            username: user?.username,
            email: user?.email,
            gender: user?.gender,
            phone: user?.phone,
        });
        const date = new Date(user?.birth_date);
        //setSelectedDate(date);
    }, [user]);

    useEffect(() => {
        if (successUpdate !== false) {
            showAlert(
                t("components.alert.messages.successUpdateUser"),
                "success",
            );
        } else if (userError) {
            showAlert(userError.toString(), "error");
        }
    }, [successUpdate, userError]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {isLoading ? (
                <Spinner />
            ) : (
                <div>
                    <AvatarCard>
                        <img src={user?.avatar_image} alt="User avatar image" />
                    </AvatarCard>
                    <FormCard>
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
                            value={formState?.first_name}
                            onChange={handleInputChange}
                        />
                        <Error>
                            {errors.first_name && (
                                <p>{errors.first_name.message}</p>
                            )}
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
                            value={formState?.last_name}
                            onChange={handleInputChange}
                        />
                        <Error>
                            {errors.last_name && (
                                <p>{errors.last_name.message}</p>
                            )}
                        </Error>
                        {/*<Input*/}
                        {/*    type="password"*/}
                        {/*    {...register("password", {*/}
                        {/*        required: "Password is required",*/}
                        {/*    })}*/}
                        {/*    placeholder="Password"*/}
                        {/*/>*/}
                        {/*<Error>*/}
                        {/*    {errors.password && <p>{errors.password.message}</p>}*/}
                        {/*</Error>*/}
                        {/*<Input*/}
                        {/*    type="password"*/}
                        {/*    {...register("confirm_password", {*/}
                        {/*        required: "Confirm Password is required",*/}
                        {/*    })}*/}
                        {/*    placeholder="Confirm password"*/}
                        {/*/>*/}
                        {/*<Error>*/}
                        {/*    {errors.confirm_password && (*/}
                        {/*        <p>{errors.confirm_password.message}</p>*/}
                        {/*    )}*/}
                        {/*</Error>*/}
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
                            value={formState?.username}
                            onChange={handleInputChange}
                        />
                        <Error>
                            {errors.username && (
                                <p>{errors.username.message}</p>
                            )}
                        </Error>
                        <Select
                            {...register("gender")}
                            value={formState?.gender}
                            onChange={(e) =>
                                setFormState({
                                    ...formState,
                                    gender: e.target.value,
                                })
                            }
                        >
                            <option value="">
                                {t("components.profileForm.select.title")}
                            </option>
                            <option
                                value="male"
                                selected={formState?.gender === "male"}
                            >
                                {t("components.profileForm.select.male")}
                            </option>
                            <option
                                value="female"
                                selected={formState?.gender === "female"}
                            >
                                {t("components.profileForm.select.female")}
                            </option>
                            <option
                                value="other"
                                selected={formState?.gender === "other"}
                            >
                                {t("components.profileForm.select.other")}
                            </option>
                        </Select>
                        <Error>
                            {errors.gender && <p>{errors.gender.message}</p>}
                        </Error>
                        <Input
                            type="email"
                            {...register("email", {
                                required: t(
                                    "components.profileForm.inputs.email.nameRequired",
                                ) as string,
                            })}
                            placeholder={
                                t(
                                    "components.profileForm.inputs.email.name",
                                ) as string
                            }
                            value={formState?.email}
                            onChange={handleInputChange}
                        />
                        <Error>
                            {errors.email && <p>{errors.email.message}</p>}
                        </Error>
                        <Input
                            type="text"
                            {...register("phone", {
                                required: t(
                                    "components.profileForm.inputs.phone.nameRequired",
                                ) as string,
                            })}
                            placeholder={
                                t(
                                    "components.profileForm.inputs.phone.name",
                                ) as string
                            }
                            value={formState?.phone}
                            onChange={handleInputChange}
                        />
                        <Error>
                            {errors.phone && <p>{errors.phone.message}</p>}
                        </Error>
                        <BirthLabel>
                            {t("components.profileForm.birthDate")}
                        </BirthLabel>
                        <CustomDatePicker>
                            <DatePicker
                                dateFormat="yyyy-MM-dd"
                                selected={selectedDate}
                                onChange={handleDateChange}
                            />
                        </CustomDatePicker>
                        <Error>
                            {errors.birth_date && (
                                <p>{errors.birth_date.message}</p>
                            )}
                        </Error>
                        <LoadingButton
                            loading={isLoading}
                            disabled={false}
                            variety="UpdateProfile"
                        >
                            {isLoading
                                ? t(
                                      "components.profileForm.createButton.loadingButton",
                                  )
                                : t("components.profileForm.createButton.text")}
                        </LoadingButton>
                    </FormCard>
                </div>
            )}
            <AlertWrapper />
        </form>
    );
};

export default ProfileForm;
