import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { selectAuthState } from "@redux/slices/authSlice";
import LoginForm from "@components/forms/LoginForm";
import AccessCard from "@components/access-card";
import {
    AuthContainer,
    Form,
    Title,
    Description,
} from "@styles/pages/auth/auth.styles";
import { useEffect } from "react";
import useAlert from "../../hocs/useAlert";

const LoginPage = () => {
    const { error, isAuthenticated } = useSelector(selectAuthState);
    const { showAlert, AlertWrapper } = useAlert();
    const router = useRouter();

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
                    <Title>Explore</Title>
                    <Description>Sign in and enjoy our platform!</Description>
                    <LoginForm />
                </Form>
            </AccessCard>
            <AlertWrapper />
        </AuthContainer>
    );
};

LoginPage.excludeLayout = true;

export default LoginPage;
