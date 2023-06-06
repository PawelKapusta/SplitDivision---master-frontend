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
} from "@styles/pages/admin/admin.styles";
import useAlert from "../../hocs/useAlert";

import {
    deleteUser,
    fetchUsers,
    selectUserState,
} from "@redux/slices/userSlice";
import { User } from "../../types/user";
import styled from "styled-components";
import Image from "next/image";
import Modal from "@components/modal";

const Users = (): ReactElement => {
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState<string>();
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

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    console.log("users", users);

    const onDelete = (id: string) => {
        handleOpenModal();
        setUserIdToDelete(id);
    };

    const onBlock = () => {
        console.log("blocked");
    };

    const handleModalDeleteClick = () => {
        console.log("Delete");
        console.log("userIdToDelete", userIdToDelete);
        dispatch(deleteUser(userIdToDelete as string));
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
                                <CardContainer key={user.id}>
                                    <UserInfo>
                                        <Label>First Name:</Label>
                                        {user?.first_name}
                                    </UserInfo>
                                    <UserInfo>
                                        <Label>Last Name:</Label>
                                        {user?.last_name}
                                    </UserInfo>
                                    <UserInfo>
                                        <Label>Email:</Label>
                                        {user.email}
                                    </UserInfo>
                                    <UserInfo>
                                        <Label>Phone:</Label>
                                        {user.phone}
                                    </UserInfo>
                                    <UserInfo>
                                        <Label>Gender:</Label>
                                        {user.gender}
                                    </UserInfo>
                                    <ButtonContainer>
                                        <BlockButton onClick={onBlock}>
                                            Block
                                        </BlockButton>
                                        <DeleteButton
                                            onClick={() => onDelete(user?.id)}
                                        >
                                            Delete
                                        </DeleteButton>
                                    </ButtonContainer>
                                </CardContainer>
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
                    {users.length === 0 ? <h4>There are no users!</h4> : null}
                    <AlertWrapper />
                </AdminUsersPage>
            )}
        </div>
    );
};

export default withAdmin(Users);

const AdminUsersPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 90%;
`;

const CardContainer = styled.div`
    //display: flex;
    //flex-direction: column;
    //align-items: flex-start;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
    margin-top: 20px;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
`;

const Label = styled.span`
    font-weight: bold;
    margin-bottom: 0.25rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Button = styled.button`
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
`;

const BlockButton = styled(Button)`
    background-color: purple;
    color: #fff;
`;

const DeleteButton = styled(Button)`
    background-color: red;
    color: #fff;
`;
