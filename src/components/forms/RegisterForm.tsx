import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "@redux/slices/authSlice";
import {
    Error,
    FormCard,
    Input,
    RegisterButton,
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

const schema = yup.object().shape(RegisterSchema);

const RegisterForm = (): JSX.Element => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedFormattedDate, setSelectedFormattedDate] =
        useState<string>("");

    const handleDateChange = (datePicked: Date) => {
        setSelectedDate(datePicked);
        const date = new Date(datePicked);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        console.log(date, year, month, day);
        const formattedDate = `${year}-${month}-${day}`;
        setSelectedFormattedDate(formattedDate);
    };

    const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
        console.log(data, "Adsadasdasdasdasd");
        console.log("selected", selectedFormattedDate);
        data.birth_date = selectedFormattedDate;
        console.log("data", data);
        dispatch(registerUser(data));
    };
    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormCard isRegisterForm>
                <Input
                    type="text"
                    {...register("first_name", {
                        required: "First name is required",
                    })}
                    placeholder="First name"
                />
                <Error>
                    {errors.first_name && <p>{errors.first_name.message}</p>}
                </Error>
                <Input
                    type="text"
                    {...register("last_name", {
                        required: "Last name is required",
                    })}
                    placeholder="Last name"
                />
                <Error>
                    {errors.last_name && <p>{errors.last_name.message}</p>}
                </Error>
                <Input
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                    })}
                    placeholder="Password"
                />
                <Error>
                    {errors.password && <p>{errors.password.message}</p>}
                </Error>
                <Input
                    type="password"
                    {...register("confirm_password", {
                        required: "Confirm Password is required",
                    })}
                    placeholder="Confirm password"
                />
                <Error>
                    {errors.confirm_password && (
                        <p>{errors.confirm_password.message}</p>
                    )}
                </Error>
                <Input
                    type="text"
                    {...register("username", {
                        required: "Username is required",
                    })}
                    placeholder="Username"
                />
                <Error>
                    {errors.username && <p>{errors.username.message}</p>}
                </Error>
                <Select {...register("gender")}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </Select>
                <Error>{errors.gender && <p>{errors.gender.message}</p>}</Error>
                <Input
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                    })}
                    placeholder="Email"
                />
                <Error>{errors.email && <p>{errors.email.message}</p>}</Error>
                <Input
                    type="text"
                    {...register("phone", {
                        required: "Phone is required",
                    })}
                    placeholder="Phone"
                />
                <Error>{errors.phone && <p>{errors.phone.message}</p>}</Error>
                <BirthLabel>Birth date:</BirthLabel>
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
                <RegisterButton type="submit">Register</RegisterButton>
                <RegisterDescription>
                    <p>
                        Already have account yet?{" "}
                        <a href="/auth/login">Sign In</a>.
                    </p>
                </RegisterDescription>
            </FormCard>
        </form>
    );
};

export default RegisterForm;
