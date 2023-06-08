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

const Dropdown = (): ReactElement => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { isAuthenticated, token } = useSelector(selectAuthState);
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
                    <a href="/profile">Profile</a>
                    <a href="/groups">Groups</a>
                    <a href="/bills">Bills</a>
                    <a href="/statistics">Statistics</a>
                    {isLoading ? (
                        <Spinner isSmall />
                    ) : user && user?.is_admin ? (
                        <AdminLinks>
                            <a href="/admin/users">All users</a>
                            <a href="/admin/groups">All groups</a>
                            <a href="/admin/bills">All bills</a>
                            <a href="/admin/faq">Create FAQ</a>
                        </AdminLinks>
                    ) : null}
                    <a href="" onClick={() => logout()}>
                        Logout
                    </a>
                </DropdownMenu>
            )}
        </DropdownContainer>
    );
};

export default Dropdown;
