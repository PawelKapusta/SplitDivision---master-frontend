import React, { ReactElement, useEffect, useState } from "react";
import { withAdmin } from "../../hocs/withAdmin";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@components/spinner";
import {
    DeleteButtonActions,
    DeleteModalButton,
    DeleteModalContent,
    DeleteModalDescription,
    DeleteModalTitle,
    Title,
    UserCard,
    UserTitle,
    UserColumn,
    Avatar,
    AdminUsersPage,
    ButtonActions,
    BlockButton,
    DeleteButton,
    AdminButton,
} from "@styles/pages/admin/admin.styles";
import useAlert from "../../hocs/useAlert";

import {
    adminUpdateUser,
    deleteUser,
    fetchUsers,
    selectUserState,
} from "@redux/slices/userSlice";
import { AdminUpdateUserFormValues, User } from "../../types/user";
import Image from "next/image";
import Modal from "@components/modal";

const Users = (): ReactElement => {
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalBlockUserOpen, setModalBlockUserOpen] = useState(false);
    const [modalAdminUserOpen, setModalAdminUserOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState<string>();
    const [userIdToBlock, setUserIdToBlock] = useState<string>();
    const [userIdToAdmin, setUserIdToAdmin] = useState<string>();
    const [blockUserTextTitle, setBlockUserTextTitle] = useState<string>();
    const [blockUserTextDescription, setBlockUserTextDescription] =
        useState<string>();
    const [blockUserTextButton, setBlockUserTextButton] = useState<string>();
    const [adminUserTextTitle, setAdminUserTextTitle] = useState<string>();
    const [adminUserTextDescription, setAdminUserTextDescription] =
        useState<string>();
    const [adminUserTextButton, setAdminUserTextButton] = useState<string>();

    const { isLoading, users, successDeleteUser, successAdminUpdate, error } =
        useSelector(selectUserState);
    const { showAlert, AlertWrapper } = useAlert();

    useEffect(() => {
        if (successDeleteUser !== false) {
            showAlert("Successfully deleted user", "success");
        } else if (successAdminUpdate) {
            showAlert("Successfully updated user", "success");
        } else if (error) {
            showAlert(error.toString(), "error");
        }
    }, [successDeleteUser, error]);

    const findUserById = (id: string) => {
        return users.find((user: User) => user.id === id);
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleBlockUserOpenModal = () => {
        setModalBlockUserOpen(true);
    };

    const handleBlockUserCloseModal = () => {
        setModalBlockUserOpen(false);
    };

    const handleAdminUserOpenModal = () => {
        setModalAdminUserOpen(true);
    };

    const handleAdminUserCloseModal = () => {
        setModalAdminUserOpen(false);
    };

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const onDelete = (id: string) => {
        handleOpenModal();
        setUserIdToDelete(id);
    };

    const onAdmin = (id: string) => {
        const user = findUserById(id);
        setAdminUserTextTitle(
            user && user?.is_admin
                ? "Are you sure you want to remove administrator role to this user?"
                : "Are you sure you want to add administrator role to this user?",
        );
        setAdminUserTextDescription(
            user && user?.is_admin
                ? "This will remove user all administrator functionalities in application!"
                : "This will add user all functionalities in application!",
        );
        setAdminUserTextButton(
            user && user?.is_admin
                ? "Yes please remove administrator this user"
                : "Yes please add administrator this user",
        );
        handleAdminUserOpenModal();
        setUserIdToAdmin(id);
    };

    const onBlock = (id: string) => {
        const user = findUserById(id);
        setBlockUserTextTitle(
            user && user?.is_blocked
                ? "Are you sure you want to unblock this user?"
                : "Are you sure you want to block this user?",
        );
        setBlockUserTextDescription(
            user && user?.is_blocked
                ? "This will give back all features to this user!"
                : "This will block user in application!",
        );
        setBlockUserTextButton(
            user && user?.is_blocked
                ? "Yes please unblock this user"
                : "Yes please block this user",
        );
        handleBlockUserOpenModal();
        setUserIdToBlock(id);
    };

    const handleModalDeleteClick = () => {
        dispatch(deleteUser(userIdToDelete as string));
        handleCloseModal();
    };

    const handleModalBlockUserClick = () => {
        const user = findUserById(userIdToBlock as string);
        let userToBlock: Partial<AdminUpdateUserFormValues> = {};
        if (user.is_blocked) {
            userToBlock = {
                is_blocked: false,
            };
        } else {
            userToBlock = {
                is_blocked: true,
            };
        }
        dispatch(adminUpdateUser(userIdToBlock as string, userToBlock));
        handleBlockUserCloseModal();
    };

    const handleModalAdminUserClick = () => {
        const user = findUserById(userIdToAdmin as string);
        let userToAdmin: Partial<AdminUpdateUserFormValues> = {};
        if (user.is_admin) {
            userToAdmin = {
                is_admin: false,
            };
        } else {
            userToAdmin = {
                is_admin: true,
            };
        }
        dispatch(adminUpdateUser(userIdToAdmin as string, userToAdmin));
        handleAdminUserCloseModal();
    };

    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : (
                <AdminUsersPage>
                    <Title>All users</Title>
                    {!!users &&
                        users.map((user: User) => {
                            return (
                                <UserCard key={user.id}>
                                    <UserColumn>
                                        <Avatar>
                                            <Image
                                                priority
                                                src={
                                                    (user &&
                                                        user?.avatar_image) ||
                                                    "/icons/avatar.svg"
                                                }
                                                height={80}
                                                width={80}
                                                alt="Avatar icon"
                                            />
                                        </Avatar>
                                    </UserColumn>
                                    <UserColumn>
                                        <UserTitle>First Name:</UserTitle>
                                        <p>{user?.first_name}</p>
                                        <UserTitle>Last Name:</UserTitle>
                                        <p> {user?.last_name}</p>
                                    </UserColumn>
                                    <UserColumn>
                                        <UserTitle>Username:</UserTitle>
                                        <p>{user?.username}</p>
                                        <UserTitle>Email:</UserTitle>
                                        <p>{user.email}</p>
                                    </UserColumn>
                                    <UserColumn>
                                        <UserTitle>Phone:</UserTitle>
                                        <p>{user.phone}</p>
                                        <UserTitle>Gender:</UserTitle>
                                        <p>{user.gender}</p>
                                    </UserColumn>
                                    <UserColumn>
                                        <UserTitle>Birth Date:</UserTitle>
                                        <p>{user.birth_date}</p>
                                        <UserTitle>Service:</UserTitle>
                                        <p>{user.service}</p>
                                    </UserColumn>
                                    <UserColumn>
                                        <UserTitle>Is admin::</UserTitle>
                                        <p>
                                            {user && user?.is_admin ? (
                                                <Image
                                                    priority
                                                    src="/icons/yes-icon.svg"
                                                    height={40}
                                                    width={40}
                                                    alt="Yes icon"
                                                />
                                            ) : (
                                                <Image
                                                    priority
                                                    src="/icons/no-icon.svg"
                                                    height={40}
                                                    width={40}
                                                    alt="No icon"
                                                />
                                            )}
                                        </p>
                                    </UserColumn>
                                    <UserColumn>
                                        <UserTitle>Is blocked::</UserTitle>
                                        <p>
                                            {user && user?.is_blocked ? (
                                                <Image
                                                    priority
                                                    src="/icons/yes-icon.svg"
                                                    height={40}
                                                    width={40}
                                                    alt="Yes icon"
                                                />
                                            ) : (
                                                <Image
                                                    priority
                                                    src="/icons/no-icon.svg"
                                                    height={40}
                                                    width={40}
                                                    alt="No icon"
                                                />
                                            )}
                                        </p>
                                    </UserColumn>
                                    <ButtonActions>
                                        {user &&
                                        user?.id !==
                                            process.env
                                                .NEXT_PUBLIC_ADMIN_USER_ID ? (
                                            <div>
                                                <AdminButton
                                                    onClick={() =>
                                                        onAdmin(user?.id)
                                                    }
                                                >
                                                    {user && user?.is_admin
                                                        ? "Remove Admin"
                                                        : "Make Admin"}
                                                </AdminButton>
                                                <BlockButton
                                                    onClick={() =>
                                                        onBlock(user?.id)
                                                    }
                                                >
                                                    {user && user?.is_blocked
                                                        ? "Unblock"
                                                        : "Block"}
                                                </BlockButton>
                                                <DeleteButton
                                                    onClick={() =>
                                                        onDelete(user?.id)
                                                    }
                                                >
                                                    Delete
                                                </DeleteButton>
                                            </div>
                                        ) : null}
                                    </ButtonActions>
                                </UserCard>
                            );
                        })}
                    <Modal
                        isOpen={modalOpen}
                        onClose={handleCloseModal}
                        isAdmin
                    >
                        <DeleteModalContent>
                            <DeleteModalTitle>
                                Are you sure you want to delete this user?
                            </DeleteModalTitle>
                            <DeleteModalDescription>
                                This will delete all groups and connected with
                                the user data!
                            </DeleteModalDescription>
                            <DeleteButtonActions>
                                <DeleteModalButton
                                    onClick={handleModalDeleteClick}
                                >
                                    <Image
                                        src="/icons/delete_icon_white.svg"
                                        width={30}
                                        height={30}
                                        alt="Delete-icon.svg"
                                    />{" "}
                                    Yes please delete this user
                                </DeleteModalButton>
                            </DeleteButtonActions>
                        </DeleteModalContent>
                    </Modal>
                    <Modal
                        isOpen={modalBlockUserOpen}
                        onClose={handleBlockUserCloseModal}
                        isAdmin
                    >
                        <DeleteModalContent>
                            <DeleteModalTitle>
                                {blockUserTextTitle}
                            </DeleteModalTitle>
                            <DeleteModalDescription>
                                {blockUserTextDescription}
                            </DeleteModalDescription>
                            <DeleteButtonActions>
                                <DeleteModalButton
                                    onClick={handleModalBlockUserClick}
                                    isBlock
                                >
                                    <Image
                                        src="/icons/block-icon.svg"
                                        width={30}
                                        height={30}
                                        alt="Block-icon.svg"
                                    />{" "}
                                    {blockUserTextButton}
                                </DeleteModalButton>
                            </DeleteButtonActions>
                        </DeleteModalContent>
                    </Modal>
                    <Modal
                        isOpen={modalAdminUserOpen}
                        onClose={handleAdminUserCloseModal}
                        isAdmin
                    >
                        <DeleteModalContent>
                            <DeleteModalTitle>
                                {adminUserTextTitle}
                            </DeleteModalTitle>
                            <DeleteModalDescription>
                                {adminUserTextDescription}
                            </DeleteModalDescription>
                            <DeleteButtonActions>
                                <DeleteModalButton
                                    onClick={handleModalAdminUserClick}
                                    isAdmin
                                >
                                    <Image
                                        src="/icons/admin-icon.svg"
                                        width={30}
                                        height={30}
                                        alt="
                                        admin-icon.svg"
                                    />{" "}
                                    {adminUserTextButton}
                                </DeleteModalButton>
                            </DeleteButtonActions>
                        </DeleteModalContent>
                    </Modal>
                    {users.length === 0 ? <h4>There are no users!</h4> : null}
                    <AlertWrapper />
                </AdminUsersPage>
            )}
        </div>
    );
};

export default withAdmin(Users);
