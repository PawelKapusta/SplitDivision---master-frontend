import React, { ReactElement, useEffect, useState } from "react";
import { withAdmin } from "../../hocs/withAdmin";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@components/spinner";
import {
    AdminButton,
    AdminUsersPage,
    Avatar,
    BlockButton,
    ButtonActions,
    DeleteButton,
    DeleteButtonActions,
    DeleteModalButton,
    DeleteModalContent,
    DeleteModalDescription,
    DeleteModalTitle,
    Title,
    UserCard,
    UserColumn,
    UserTitle,
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
import { useTranslation } from "react-i18next";

const Users = (): ReactElement => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
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
            showAlert(
                t("components.alert.messages.successDeleteUser"),
                "success",
            );
        } else if (successAdminUpdate) {
            showAlert(
                t("components.alert.messages.successUpdateUser"),
                "success",
            );
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
                ? (t("screens.admin.users.modal.admin.remove.title") as string)
                : (t("screens.admin.users.modal.admin.add.title") as string),
        );
        setAdminUserTextDescription(
            user && user?.is_admin
                ? (t(
                      "screens.admin.users.modal.admin.remove.description",
                  ) as string)
                : (t(
                      "screens.admin.users.modal.admin.add.description",
                  ) as string),
        );
        setAdminUserTextButton(
            user && user?.is_admin
                ? (t(
                      "screens.admin.users.modal.admin.remove.textButton",
                  ) as string)
                : (t(
                      "screens.admin.users.modal.admin.add.textButton",
                  ) as string),
        );
        handleAdminUserOpenModal();
        setUserIdToAdmin(id);
    };

    const onBlock = (id: string) => {
        const user = findUserById(id);
        setBlockUserTextTitle(
            user && user?.is_blocked
                ? (t("screens.admin.users.modal.block.remove.title") as string)
                : (t("screens.admin.users.modal.block.add.title") as string),
        );
        setBlockUserTextDescription(
            user && user?.is_blocked
                ? (t(
                      "screens.admin.users.modal.block.remove.description",
                  ) as string)
                : (t(
                      "screens.admin.users.modal.block.add.description",
                  ) as string),
        );
        setBlockUserTextButton(
            user && user?.is_blocked
                ? (t(
                      "screens.admin.users.modal.block.remove.textButton",
                  ) as string)
                : (t(
                      "screens.admin.users.modal.block.add.textButton",
                  ) as string),
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
                    <Title>{t("screens.admin.users.title")}</Title>
                    {!!users &&
                        users.map((user: User) => {
                            return (
                                <UserCard key={user.id}>
                                    <UserColumn>
                                        <Avatar>
                                            <img
                                                src={user && user?.avatar_image}
                                                alt="Avatar icon"
                                            />
                                        </Avatar>
                                    </UserColumn>
                                    <UserColumn>
                                        <UserTitle>
                                            {t(
                                                "screens.admin.users.labels.firstName",
                                            )}
                                        </UserTitle>
                                        <p>{user?.first_name}</p>
                                        <UserTitle>
                                            {t(
                                                "screens.admin.users.labels.lastName",
                                            )}
                                        </UserTitle>
                                        <p> {user?.last_name}</p>
                                    </UserColumn>
                                    <UserColumn>
                                        <UserTitle>
                                            {t(
                                                "screens.admin.users.labels.username",
                                            )}
                                        </UserTitle>
                                        <p>{user?.username}</p>
                                        <UserTitle>
                                            {t(
                                                "screens.admin.users.labels.email",
                                            )}
                                        </UserTitle>
                                        <p>{user.email}</p>
                                    </UserColumn>
                                    <UserColumn>
                                        <UserTitle>
                                            {t(
                                                "screens.admin.users.labels.phone",
                                            )}
                                        </UserTitle>
                                        <p>{user.phone}</p>
                                        <UserTitle>
                                            {t(
                                                "screens.admin.users.labels.gender",
                                            )}
                                        </UserTitle>
                                        <p>{user.gender}</p>
                                    </UserColumn>
                                    <UserColumn>
                                        <UserTitle>
                                            {t(
                                                "screens.admin.users.labels.birthDate",
                                            )}
                                        </UserTitle>
                                        <p>{user.birth_date}</p>
                                        <UserTitle>
                                            {t(
                                                "screens.admin.users.labels.service",
                                            )}
                                        </UserTitle>
                                        <p>{user.service}</p>
                                    </UserColumn>
                                    <UserColumn>
                                        <UserTitle>
                                            {t(
                                                "screens.admin.users.labels.isAdmin",
                                            )}
                                        </UserTitle>
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
                                        <UserTitle>
                                            {t(
                                                "screens.admin.users.labels.isBlocked",
                                            )}
                                        </UserTitle>
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
                                                        ? t(
                                                              "screens.admin.users.buttons.admin.remove",
                                                          )
                                                        : t(
                                                              "screens.admin.users.buttons.admin.add",
                                                          )}
                                                </AdminButton>
                                                <BlockButton
                                                    onClick={() =>
                                                        onBlock(user?.id)
                                                    }
                                                >
                                                    {user && user?.is_blocked
                                                        ? t(
                                                              "screens.admin.users.buttons.block.remove",
                                                          )
                                                        : t(
                                                              "screens.admin.users.buttons.block.add",
                                                          )}
                                                </BlockButton>
                                                <DeleteButton
                                                    onClick={() =>
                                                        onDelete(user?.id)
                                                    }
                                                >
                                                    {t(
                                                        "screens.admin.users.buttons.delete",
                                                    )}
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
                                {t("screens.admin.users.modal.delete.title")}
                            </DeleteModalTitle>
                            <DeleteModalDescription>
                                {t(
                                    "screens.admin.users.modal.delete.description",
                                )}
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
                                    />
                                    {t(
                                        "screens.admin.users.modal.delete.buttonText",
                                    )}
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
                    {users.length === 0 ? (
                        <h4>{t("screens.admin.users.noUsersText")}</h4>
                    ) : null}
                    <AlertWrapper />
                </AdminUsersPage>
            )}
        </div>
    );
};

export default withAdmin(Users);
