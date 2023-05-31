import React, { useEffect } from "react";
import {
    Description,
    Form,
    AuthContainer,
    Title,
} from "@styles/pages/auth/auth.styles";
import AccessCard from "@components/access-card";
import RegisterForm from "@components/forms/register-form";
import useAlert from "../../hocs/useAlert";
import { useSelector } from "react-redux";
import { selectAuthState } from "@redux/slices/authSlice";
import { useRouter } from "next/router";

const RegisterPage = () => {
    const { showAlert, AlertWrapper } = useAlert();
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
            showAlert("Successfully created account", "success");
        }
    }, [registerSuccess]);

    return (
        <AuthContainer>
            <AccessCard imageSrc="/icons/auth_image.svg">
                <Form>
                    <Title>Explore</Title>
                    <Description>Sign up and enjoy our platform!</Description>
                    <RegisterForm />
                </Form>
            </AccessCard>
            <AlertWrapper />
        </AuthContainer>
    );
};

RegisterPage.excludeLayout = true;

export default RegisterPage;
