import React, { useEffect } from "react";
import {
    AuthContainer,
    Description,
    Form,
    Title,
} from "@styles/pages/auth/auth.styles";
import AccessCard from "@components/access-card";
import RegisterForm from "@components/forms/register-form";
import useAlert from "../../hocs/useAlert";
import { useSelector } from "react-redux";
import { selectAuthState } from "@redux/slices/authSlice";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const RegisterPage: NextPage & { excludeLayout: true } = () => {
    const { showAlert, AlertWrapper } = useAlert();
    const { t } = useTranslation();
    const router = useRouter();
    const { error, isAuthenticated, registerSuccess } =
        useSelector(selectAuthState);

    if (isAuthenticated) {
        router.push("/");
    }

    if (registerSuccess) {
        router.push("/auth/login");
    }

    useEffect(() => {
        if (error !== null) {
            showAlert(error, "error");
        }
    }, [error]);

    useEffect(() => {
        if (registerSuccess) {
            showAlert(
                t("components.alert.messages.successCreateUser"),
                "success",
            );
        }
    }, []);

    return (
        <AuthContainer>
            <AccessCard imageSrc="/icons/auth_image.svg">
                <Form>
                    <Title>{t("screens.register.title")}</Title>
                    <Description>
                        {t("screens.register.description")}
                    </Description>
                    <RegisterForm />
                </Form>
            </AccessCard>
            <AlertWrapper />
        </AuthContainer>
    );
};

RegisterPage.excludeLayout = true;

export default RegisterPage;
