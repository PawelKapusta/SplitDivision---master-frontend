import React, { ReactElement } from "react";
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
import { useTranslation } from "react-i18next";

const LoginForm = (): ReactElement => {
    const { t } = useTranslation();
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
                        required: t(
                            "components.loginForm.inputs.email.nameRequired",
                        ) as string,
                    })}
                    placeholder={
                        t("components.loginForm.inputs.email.name") as string
                    }
                />
                <Error>{errors.email && <p>{errors.email.message}</p>}</Error>
                <Input
                    type="password"
                    {...register("password", {
                        required: t(
                            "components.loginForm.inputs.password.nameRequired",
                        ) as string,
                    })}
                    placeholder={
                        t("components.loginForm.inputs.password.name") as string
                    }
                />
                <Error>
                    {errors.password && <p>{errors.password.message}</p>}
                </Error>
                <LoadingButton
                    loading={isLoading}
                    disabled={false}
                    variety="Login"
                >
                    {isLoading
                        ? t("components.loginForm.loginButton.loadingButton")
                        : t("components.loginForm.loginButton.text")}
                </LoadingButton>
                <OAuthLoginButton>Placeholder 1</OAuthLoginButton>
                <OAuthLoginButton>Placeholder 2</OAuthLoginButton>
                <RegisterDescription>
                    <p>
                        {t("components.loginForm.textToRegister.text")}
                        <a href="/auth/register">
                            {t("components.loginForm.textToRegister.linkText")}
                        </a>
                        .
                    </p>
                </RegisterDescription>
            </FormCard>
        </form>
    );
};

export default LoginForm;
