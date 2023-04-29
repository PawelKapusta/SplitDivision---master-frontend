import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "@redux/slices/authSlice";
import { LoginFormData } from "../../types/user";

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();
    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<LoginFormData> = (data) => {
        dispatch(loginUser(data));
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
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
