import React, { useEffect } from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@redux/store";
import {
    fetchUser,
    fetchUsers,
    selectUserState,
} from "@redux/slices/userSlice";
import { logoutUser, selectAuthState } from "@redux/slices/authSlice";
import { Layout } from "../../layout/layout";
import { useSession } from "next-auth/react";
import { withAuth } from "../../hocs/withAuth";
import GroupForm from "@components/forms/group-form";
import { GroupContainer } from "@styles/pages/create/group.styles";
import { TDecodedJWTToken } from "../../types/jwt";
import { getDecodedJWTToken } from "../../utils/jwt";
import useAlert from "../../hocs/useAlert";

const Group: NextPage = () => {
    const dispatch = useDispatch();
    const { users } = useSelector(selectUserState);
    const { data: session, status } = useSession();
    const { isAuthenticated, token } = useSelector(selectAuthState);
    let decodedToken: TDecodedJWTToken, userId: string;
    if (isAuthenticated) {
        decodedToken = getDecodedJWTToken(token);
        userId = decodedToken.id;
    }
    console.log("session", session, status);
    useEffect(() => {
        dispatch(fetchUsers());
        console.log("userID", userId);
        dispatch(fetchUser(userId));
    }, [isAuthenticated]);
    console.log(users);

    return (
        <GroupContainer>
            <GroupForm />
        </GroupContainer>
    );
};

export default withAuth(Group);
