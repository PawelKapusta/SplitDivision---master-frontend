import React, { useEffect } from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@redux/store";
import { fetchUsers, selectUserState } from "@redux/slices/userSlice";
import { logoutUser } from "@redux/slices/authSlice";
import { Layout } from "../layout/layout";
import { useSession } from "next-auth/react";
const About: NextPage = () => {
    const dispatch = useDispatch();
    const { users } = useSelector(selectUserState);
    const { data: session, status } = useSession();
    console.log("session", session, status);
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    console.log(users);

    return (
        <div>
            <button onClick={() => dispatch(logoutUser())}>Logout</button>
        </div>
    );
};

export default About;
