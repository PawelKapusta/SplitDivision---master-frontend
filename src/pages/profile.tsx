import type { NextPage } from "next";
import { withAuth } from "../hocs/withAuth";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "@redux/slices/authSlice";
import { TDecodedJWTToken } from "../types/jwt";
import { getDecodedJWTToken } from "../utils/jwt";
import { useEffect } from "react";
import { fetchUser } from "@redux/slices/userSlice";
import ProfileForm from "@components/forms/profile-form";
import { ProfileCard } from "@styles/pages/profile.styles";

const Profile: NextPage = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, token } = useSelector(selectAuthState);
    let decodedToken: TDecodedJWTToken, userId: string;
    if (isAuthenticated) {
        decodedToken = getDecodedJWTToken(token);
        userId = decodedToken.id;
    }

    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [isAuthenticated]);

    return (
        <ProfileCard>
            <ProfileForm />
        </ProfileCard>
    );
};

export default withAuth(Profile);
