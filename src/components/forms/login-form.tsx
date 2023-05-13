import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectAuthState } from "@redux/slices/authSlice";
import { LoginFormData } from "../../types/user";
import {
    FormCard,
    Input,
    Error,
    OAuthLoginButton,
    RegisterDescription,
} from "@styles/pages/auth/auth.styles";
import LoadingButton from "@components/loading-button";

const LoginForm = (): JSX.Element => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();
    const dispatch = useDispatch();
    const { isLoading } = useSelector(selectAuthState);

    const onSubmit: SubmitHandler<LoginFormData> = (data) => {
        dispatch(loginUser(data));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormCard>
                <Input
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                    })}
                    placeholder="Email"
                />
                <Error>{errors.email && <p>{errors.email.message}</p>}</Error>
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
                <LoadingButton
                    loading={isLoading}
                    disabled={false}
                    variety="Login"
                >
                    {isLoading ? "Loading..." : "Login"}
                </LoadingButton>
                <OAuthLoginButton>Placeholder 1</OAuthLoginButton>
                <OAuthLoginButton>Placeholder 2</OAuthLoginButton>
                <RegisterDescription>
                    <p>
                        Don't have account yet?{" "}
                        <a href="/auth/register">Sign Up</a>.
                    </p>
                </RegisterDescription>
            </FormCard>
        </form>
    );
};

export default LoginForm;
