import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "@redux/slices/authSlice";

interface RegisterFormValues {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

const schema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    password: yup.string().required(),
    username: yup.string().required(),
    gender: yup.string().required(),
    service: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    birth_date: yup.date().required(),
});

const RegisterForm = () => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: RegisterFormValues) => {
        await dispatch(registerUser(data));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                First Name:
                <input {...register("first_name")} />
                {errors.first_name && <span>This field is required</span>}
            </label>
            <label>
                Last Name:
                <input {...register("last_name")} />
                {errors.last_name && <span>This field is required</span>}
            </label>
            <label>
                Email:
                <input {...register("email")} />
                {errors.email && (
                    <span>Please enter a valid email address</span>
                )}
            </label>
            <label>
                Password:
                <input type="password" {...register("password")} />
                {errors.password && <span>This field is required</span>}
            </label>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
