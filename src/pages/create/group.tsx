import React, { useEffect } from "react";
import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchUser,
    fetchUsers,
    selectUserState,
} from "@redux/slices/userSlice";
import { selectAuthState } from "@redux/slices/authSlice";
import { useSession } from "next-auth/react";
import { withAuth } from "../../hocs/withAuth";
import GroupForm from "@components/forms/group-form";
import { GroupContainer } from "@styles/pages/create/group.styles";
import { TDecodedJWTToken } from "../../types/jwt";
import { getDecodedJWTToken } from "../../utils/jwt";

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

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchUser(userId));
    }, [isAuthenticated]);

    return (
        <GroupContainer>
            <GroupForm />
        </GroupContainer>
    );
};

export default withAuth(Group);
