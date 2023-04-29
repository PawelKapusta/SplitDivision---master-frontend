import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "@redux/slices/authSlice";

type FormData = {
    email: string;
    password: string;
    confirmPassword: string;
};

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();
    const dispatch = useDispatch();
    const password = watch("password");

    const onSubmit: SubmitHandler<FormData> = (data) => {
        dispatch(registerUser({ email: data.email, password: data.password }));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                    })}
                />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div>
                <label>Confirm Password</label>
                <input
                    type="password"
                    {...register("confirmPassword", {
                        required: "Confirm Password is required",
                        validate: (value) =>
                            value === password || "The passwords do not match",
                    })}
                />
                {errors.confirmPassword && (
                    <p>{errors.confirmPassword.message}</p>
                )}
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
