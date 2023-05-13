import { useEffect, useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
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
import { selectUserState } from "@redux/slices/userSlice";
import Spinner from "@components/spinner";

const schema = yup.object().shape(UpdateProfileSchema);

const ProfileForm = (): JSX.Element => {
    const { isLoading, user } = useSelector(selectUserState);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateUserFormValues>({
        resolver: yupResolver(schema),
    });
    // const dispatch = useDispatch();
    const [formState, setFormState] = useState({
        first_name: user?.first_name,
        last_name: user?.last_name,
        username: user?.username,
        email: user?.email,
        gender: user?.gender,
        phone: user?.phone,
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
        console.log("selectedDate", selectedDate);
        data.birth_date = selectedFormattedDate;
        console.log(formState);
        console.log("data to update", data);
        //dispatch(updateUser(user?.id, data));
    };

    useEffect(() => {
        console.log("selectedDate", selectedDate);
        console.log(user?.first_name);
        setFormState({
            first_name: user?.first_name,
            last_name: user?.last_name,
            username: user?.username,
            email: user?.email,
            gender: user?.gender,
            phone: user?.phone,
        });
        const date = new Date(user?.birth_date);
        console.log(user?.birth_date);
        console.log("date", date);
        //setSelectedDate(date);
    }, [isLoading]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {isLoading ? (
                <Spinner />
            ) : (
                <div>
                    <AvatarCard>
                        <img src={user?.avatar_image} alt="USer avatar image" />
                    </AvatarCard>
                    <FormCard>
                        <Input
                            type="text"
                            {...register("first_name", {
                                required: "First name is required",
                            })}
                            placeholder="First name"
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
                                required: "Last name is required",
                            })}
                            placeholder="Last name"
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
                                required: "Username is required",
                            })}
                            placeholder="Username"
                            value={formState?.username}
                            onChange={handleInputChange}
                        />
                        <Error>
                            {errors.username && (
                                <p>{errors.username.message}</p>
                            )}
                        </Error>
                        <Select {...register("gender")}>
                            <option value="">Select Gender</option>
                            <option
                                value="male"
                                defaultValue="male"
                                selected={formState?.gender === "male"}
                            >
                                Male
                            </option>
                            <option
                                value="female"
                                defaultValue="female"
                                selected={formState?.gender === "female"}
                            >
                                Female
                            </option>
                            <option
                                value="other"
                                defaultValue="other"
                                selected={formState?.gender === "other"}
                            >
                                Other
                            </option>
                        </Select>
                        <Error>
                            {errors.gender && <p>{errors.gender.message}</p>}
                        </Error>
                        <Input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            placeholder="Email"
                            value={formState?.email}
                            onChange={handleInputChange}
                        />
                        <Error>
                            {errors.email && <p>{errors.email.message}</p>}
                        </Error>
                        <Input
                            type="text"
                            {...register("phone", {
                                required: "Phone is required",
                            })}
                            placeholder="Phone"
                            value={formState?.phone}
                            onChange={handleInputChange}
                        />
                        <Error>
                            {errors.phone && <p>{errors.phone.message}</p>}
                        </Error>
                        <BirthLabel>Birth date:</BirthLabel>
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
                            {isLoading ? "Loading..." : "Update profile"}
                        </LoadingButton>
                    </FormCard>
                </div>
            )}
        </form>
    );
};

export default ProfileForm;
