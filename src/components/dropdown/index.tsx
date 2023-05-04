import { useState } from "react";
import Image from "next/image";
import {
    DropdownContainer,
    DropdownMenu,
    DropdownToggle,
    Avatar,
} from "@components/dropdown/dropdown.styles";
import { useDispatch } from "react-redux";
import { logoutUser } from "@redux/slices/authSlice";

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

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
                    <a href="" onClick={() => logout()}>
                        Logout
                    </a>
                </DropdownMenu>
            )}
        </DropdownContainer>
    );
};

export default Dropdown;
