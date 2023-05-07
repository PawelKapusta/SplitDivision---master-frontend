import React, { useEffect } from "react";
import { NextPage } from "next";
import ContactForm from "@components/forms/contact-form";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "@redux/slices/authSlice";
import { TDecodedJWTToken } from "../types/jwt";
import { getDecodedJWTToken } from "../utils/jwt";
import { fetchUser } from "@redux/slices/userSlice";

const Contact: NextPage = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, token } = useSelector(selectAuthState);
    let decodedToken: TDecodedJWTToken, userId: string;
    if (isAuthenticated) {
        decodedToken = getDecodedJWTToken(token);
        userId = decodedToken.id;
    }
    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [dispatch]);

    return (
        <div>
            <ContactForm />
        </div>
    );
};

export default Contact;
