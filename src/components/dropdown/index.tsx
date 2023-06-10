import { useEffect, useState, ReactElement } from "react";
import Image from "next/image";
import {
    DropdownContainer,
    DropdownMenu,
    DropdownToggle,
    Avatar,
    AdminLinks,
} from "@components/dropdown/dropdown.styles";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectAuthState } from "@redux/slices/authSlice";
import { TDecodedJWTToken } from "../../types/jwt";
import { getDecodedJWTToken } from "../../utils/jwt";
import { fetchUser, selectUserState } from "@redux/slices/userSlice";
import Spinner from "@components/spinner";
import { useTranslation } from "react-i18next";

const Dropdown = (): ReactElement => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { isAuthenticated, token } = useSelector(selectAuthState);
    const { t } = useTranslation();
    let decodedToken: TDecodedJWTToken, userId: string;
    if (isAuthenticated) {
        decodedToken = getDecodedJWTToken(token);
        userId = decodedToken.id;
    }
    const { isLoading, user } = useSelector(selectUserState);
    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [isAuthenticated]);

    const logout = async () => {
        await dispatch(logoutUser());
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <DropdownContainer>
            <DropdownToggle onClick={toggleDropdown}>
                <Avatar>
                    <Image
                        priority
                        src="/icons/avatar.svg"
                        height={50}
                        width={50}
                        alt="Avatar icon"
                    />
                </Avatar>
            </DropdownToggle>
            {isOpen && (
                <DropdownMenu>
                    <a href="/profile">{t("components.dropdown.profile")}</a>
                    <a href="/groups">{t("components.dropdown.groups")}</a>
                    <a href="/bills">{t("components.dropdown.bills")}</a>
                    <a href="/statistics">
                        {t("components.dropdown.statistics")}
                    </a>
                    {isLoading ? (
                        <Spinner isSmall />
                    ) : user && user?.is_admin ? (
                        <AdminLinks>
                            <a href="/admin/users">
                                {t("components.dropdown.adminUsers")}
                            </a>
                            <a href="/admin/groups">
                                {t("components.dropdown.adminGroups")}
                            </a>
                            <a href="/admin/bills">
                                {t("components.dropdown.adminBills")}
                            </a>
                            <a href="/admin/faq">
                                {t("components.dropdown.adminFaq")}
                            </a>
                        </AdminLinks>
                    ) : null}
                    <a href="/settings">{t("components.dropdown.settings")}</a>
                    <a href="" onClick={() => logout()}>
                        {t("components.dropdown.logout")}
                    </a>
                </DropdownMenu>
            )}
        </DropdownContainer>
    );
};

export default Dropdown;
