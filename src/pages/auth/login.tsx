import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { selectAuthState } from "@redux/slices/authSlice";
import LoginForm from "@components/forms/LoginForm";
import AccessCard from "@components/AccessCard";
import {
    LoginCard,
    Form,
    Title,
    Description,
} from "@styles/pages/auth/login.styles";

const LoginPage = () => {
    const authState = useSelector(selectAuthState);
    const router = useRouter();

    if (authState.isAuthenticated) {
        router.push("/");
    }

    return (
        <LoginCard>
            <AccessCard imageSrc="/icons/login_image.svg">
                <Form>
                    <Title>Explore</Title>
                    <Description>Sign in and enjoy our platform!</Description>
                    <LoginForm />
                </Form>
            </AccessCard>
        </LoginCard>
    );
};

LoginPage.excludeLayout = true;

export default LoginPage;
