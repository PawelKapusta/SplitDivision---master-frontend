import React from "react";
import {
    Description,
    Form,
    AuthContainer,
    Title,
} from "@styles/pages/auth/auth.styles";
import AccessCard from "@components/AccessCard";
import RegisterForm from "@components/forms/RegisterForm";

const RegisterPage = () => {
    return (
        <AuthContainer>
            <AccessCard imageSrc="/icons/auth_image.svg">
                <Form>
                    <Title>Explore</Title>
                    <Description>Sign up and enjoy our platform!</Description>
                    <RegisterForm />
                </Form>
            </AccessCard>
        </AuthContainer>
    );
};

RegisterPage.excludeLayout = true;

export default RegisterPage;
