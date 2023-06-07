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
} from "@styles/pages/admin/admin.styles";
import useAlert from "../../hocs/useAlert";

import {
    deleteUser,
    fetchUsers,
    selectUserState,
} from "@redux/slices/userSlice";
import { User } from "../../types/user";
import Image from "next/image";
import Modal from "@components/modal";

const Users = (): ReactElement => {
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalBlockUserOpen, setModalBlockUserOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState<string>();
    const [userIdToBlock, setUserIdToBlock] = useState<string>();
    const { isLoading, users, successDeleteUser, error } =
        useSelector(selectUserState);
    const { showAlert, AlertWrapper } = useAlert();

    useEffect(() => {
        if (successDeleteUser !== false) {
            showAlert("Successfully deleted user", "success");
        } else if (error) {
            showAlert(error.toString(), "error");
        }
    }, [successDeleteUser, error]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleBlockUSerOpenModal = () => {
        setModalBlockUserOpen(true);
    };

    const handleBlockUserCloseModal = () => {
        setModalBlockUserOpen(false);
    };

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    console.log("users", users);

    const onDelete = (id: string) => {
        handleOpenModal();
        setUserIdToDelete(id);
    };

    const onBlock = (id: string) => {
        console.log("blocked");
        console.log("id", id);
        console.log("id", id);
        handleBlockUSerOpenModal();
        setUserIdToBlock(id);
    };

    const handleModalDeleteClick = () => {
        console.log("Delete");
        console.log("userIdToDelete", userIdToDelete);
        dispatch(deleteUser(userIdToDelete as string));
        handleCloseModal();
    };

    const handleModalBlockUserClick = () => {
        console.log("Block");
        console.log("userIdToBlock", userIdToBlock);
        // dispatch(deleteUser(userIdToDelete as string));
        handleCloseModal();
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
                                    <ButtonActions>
                                        <BlockButton
                                            onClick={() => onBlock(user?.id)}
                                        >
                                            Block
                                        </BlockButton>
                                        <DeleteButton
                                            onClick={() => onDelete(user?.id)}
                                        >
                                            Delete
                                        </DeleteButton>
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
                                Are you sure you want to block this user?
                            </DeleteModalTitle>
                            <DeleteModalDescription>
                                This will block user in application!
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
                                    Yes please block this user
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
