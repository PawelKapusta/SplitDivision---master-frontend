import React, { useEffect } from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@redux/store";
import { fetchUsers, selectUserState } from "@redux/userSlice";

const About: NextPage = () => {
    const dispatch = useDispatch();
    const { users } = useSelector(selectUserState);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    console.log(users);

    return <div>About page</div>;
};

export default About;
