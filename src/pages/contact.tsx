import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import ContactForm from "@components/forms/contact-form";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "@redux/slices/authSlice";
import { TDecodedJWTToken } from "../types/jwt";
import { getDecodedJWTToken } from "../utils/jwt";
import { fetchUser, selectUserState } from "@redux/slices/userSlice";
import Modal from "@components/modal";
import {
    DeleteButtonActions,
    DeleteModalButton,
    DeleteModalContent,
    DeleteModalDescription,
    DeleteModalTitle,
} from "@styles/pages/admin/admin.styles";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const Contact: NextPage = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, token } = useSelector(selectAuthState);
    const [modalOpen, setModalOpen] = useState(false);
    const { t } = useTranslation();
    let decodedToken: TDecodedJWTToken, userId: string;
    if (isAuthenticated) {
        decodedToken = getDecodedJWTToken(token);
        userId = decodedToken.id;
    }
    const { user } = useSelector(selectUserState);

    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [dispatch]);

    useEffect(() => {
        if (user && user?.is_blocked) {
            setModalOpen(true);
        }
    }, [user]);

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleOkModalClick = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <ContactForm />
            <Modal isOpen={modalOpen} onClose={handleCloseModal} isAdmin>
                <DeleteModalContent>
                    <DeleteModalTitle>
                        {t("screens.contact.modal.title")}
                    </DeleteModalTitle>
                    <DeleteModalDescription>
                        {t("screens.contact.modal.description")}
                    </DeleteModalDescription>
                    <DeleteButtonActions>
                        <DeleteModalButton
                            onClick={handleOkModalClick}
                            isWarningBlock
                        >
                            <Image
                                src="/icons/delete_icon_white.svg"
                                width={30}
                                height={30}
                                alt="Delete-icon.svg"
                            />
                            {t("screens.contact.modal.buttonText")}
                        </DeleteModalButton>
                    </DeleteButtonActions>
                </DeleteModalContent>
            </Modal>
        </div>
    );
};

export default Contact;
