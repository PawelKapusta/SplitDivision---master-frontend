import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { selectAuthState } from "@redux/slices/authSlice";
import LoginForm from "@components/forms/login-form";
import AccessCard from "@components/access-card";
import {
    AuthContainer,
    Form,
    Title,
    Description,
} from "@styles/pages/auth/auth.styles";
import { useEffect } from "react";
import useAlert from "../../hocs/useAlert";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const LoginPage: NextPage & {
    excludeLayout: boolean;
} = () => {
    const { error, isAuthenticated } = useSelector(selectAuthState);
    const { showAlert, AlertWrapper } = useAlert();
    const router = useRouter();
    const { t } = useTranslation();

    if (isAuthenticated) {
        router.push("/");
    }

    useEffect(() => {
        if (error !== null) {
            showAlert(error, "error");
        }
    }, [error]);

    return (
        <AuthContainer>
            <AccessCard imageSrc="/icons/auth_image.svg">
                <Form>
                    <Title>{t("screens.login.title")}</Title>
                    <Description>{t("screens.login.description")}</Description>
                    <LoginForm />
                </Form>
            </AccessCard>
            <AlertWrapper />
        </AuthContainer>
    );
};

LoginPage.excludeLayout = true;

export default LoginPage;
