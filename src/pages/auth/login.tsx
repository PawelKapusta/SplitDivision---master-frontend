import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { selectAuthState } from "@redux/slices/authSlice";
import LoginForm from "@components/forms/LoginForm";

const LoginPage = () => {
    const authState = useSelector(selectAuthState);
    const router = useRouter();

    if (authState.isAuthenticated) {
        router.push("/"); // Redirect to homepage if the user is already authenticated
    }

    return (
        <div>
            <h1>Login not excluded</h1>
            <LoginForm />
        </div>
    );
};

LoginPage.excludeLayout = true;

export default LoginPage;
