import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
    deleteGroup,
    fetchGroup,
    fetchGroupUsers,
    selectGroupState,
} from "@redux/slices/groupSlice";
import {
    GroupContainer,
    GroupCardContent,
    GroupCardTitle,
    GroupCardDescription,
    GroupCardImage,
    CreateBillButton,
    GroupCardActions,
    CenterTitle,
    Container,
    ListItem,
    ListItemText,
    PrimaryText,
    SecondaryText,
    DeleteGroupButton,
    EditGroupButton,
} from "@styles/pages/group/group.styles";
import { getFormattedDate } from "../../utils/date";
import Spinner from "@components/spinner";
import Avatar from "@mui/material/Avatar";
import { User } from "../../types/user";
import Modal from "@components/modal";
import BillForm from "@components/forms/bill-form";
import { withAuth } from "../../hocs/withAuth";
import { fetchGroupBills, selectBillState } from "@redux/slices/billSlice";
import { Bill } from "../../types/bill";
import BillCard from "@components/cards/bill-card";
import { NextPage } from "next";
import {
    DeleteButtonActions,
    DeleteModalButton,
    DeleteModalContent,
    DeleteModalDescription,
    DeleteModalTitle,
} from "@styles/pages/admin/admin.styles";
import useAlert from "../../hocs/useAlert";
import { useTranslation } from "react-i18next";

const Group: NextPage = () => {
    const [isLongDescription, setIsLongDescription] = useState(false);
    const [createBillModalOpen, setCreateBillModalOpen] = useState(false);
    const [deleteGroupModalOpen, setDeleteGroupModalOpen] = useState(false);
    const { showAlert, AlertWrapper } = useAlert();
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const { isLoading, group, groupUsers, deleteGroupSuccess } =
        useSelector(selectGroupState);
    const {
        isLoading: billsLoading,
        groupBills,
        groupBillsSuccess,
        error,
    } = useSelector(selectBillState);
    const { createBillSuccess } = useSelector(selectBillState);
    const router = useRouter();
    const { groupId } = router.query;
    console.log(groupId);
    console.log("groupBills", groupBills);

    useEffect(() => {
        if (error) {
            showAlert(error.toString(), "error");
        }
    }, [error]);

    const handleCreateBillOpenModal = () => {
        setCreateBillModalOpen(true);
    };

    const handleCreateBillCloseModal = () => {
        setCreateBillModalOpen(false);
    };

    const handleDeleteGroupOpenModal = () => {
        setDeleteGroupModalOpen(true);
    };

    const handleDeleteGroupCloseModal = () => {
        setDeleteGroupModalOpen(false);
    };

    const handleGroupModalDeleteClick = () => {
        console.log("Delete");
        dispatch(deleteGroup(group.id));
        handleDeleteGroupCloseModal();
        if (!error) {
            router.replace("/groups");
        }
    };

    useEffect(() => {
        dispatch(fetchGroup(groupId as string));
        dispatch(fetchGroupUsers(groupId as string));
        dispatch(fetchGroupBills(groupId as string));
    }, [groupId, createBillSuccess]);

    useEffect(() => {
        if (groupBillsSuccess) {
            handleCreateBillCloseModal();
        }
    }, [groupBillsSuccess]);

    useEffect(() => {
        setIsLongDescription(group?.description.length > 800);
    }, [group]);
    console.log("groupBills", groupBills);
    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : (
                <GroupContainer>
                    <GroupCardContent isLongDescription={isLongDescription}>
                        <GroupCardTitle>
                            <p>{group?.name}</p>
                            <p>
                                <Image
                                    src="/icons/calendar-icon.svg"
                                    width={30}
                                    height={30}
                                    alt="Calendar-icon.svg"
                                />
                                {getFormattedDate(group?.data_created)}
                            </p>
                            <GroupCardActions>
                                <EditGroupButton>
                                    <Image
                                        src="/icons/edit-icon.svg"
                                        width={30}
                                        height={30}
                                        alt="Edit-icon.svg"
                                    />
                                </EditGroupButton>
                                <DeleteGroupButton
                                    onClick={handleDeleteGroupOpenModal}
                                >
                                    <Image
                                        src="/icons/delete_icon_white.svg"
                                        width={30}
                                        height={30}
                                        alt="Delete-icon.svg"
                                    />
                                </DeleteGroupButton>
                            </GroupCardActions>
                        </GroupCardTitle>
                        <GroupCardDescription
                            isLongDescription={isLongDescription}
                        >
                            <p>{group?.description}</p>
                        </GroupCardDescription>
                        <GroupCardImage>
                            <Image
                                src="/images/group-content-image.png"
                                width={300}
                                height={300}
                                alt="Group-content-image.png"
                            />
                        </GroupCardImage>
                    </GroupCardContent>
                    <CreateBillButton onClick={handleCreateBillOpenModal}>
                        <Image
                            src="/icons/plus-icon.svg"
                            width={30}
                            height={30}
                            alt="Plus-icon.svg"
                        />
                        {t("screens.group.createBillButtonText")}
                    </CreateBillButton>
                    <Modal
                        isOpen={createBillModalOpen}
                        onClose={handleCreateBillCloseModal}
                        isAdmin={false}
                    >
                        <BillForm
                            groupId={group?.id}
                            handleCloseModal={handleCreateBillCloseModal}
                        />
                    </Modal>
                    <Modal
                        isOpen={deleteGroupModalOpen}
                        onClose={handleDeleteGroupCloseModal}
                        isAdmin
                    >
                        <DeleteModalContent>
                            <DeleteModalTitle>
                                {t("screens.group.modal.title")}
                            </DeleteModalTitle>
                            <DeleteModalDescription>
                                {t("screens.group.modal.description")}
                            </DeleteModalDescription>
                            <DeleteButtonActions>
                                <DeleteModalButton
                                    onClick={handleGroupModalDeleteClick}
                                >
                                    <Image
                                        src="/icons/delete_icon_white.svg"
                                        width={30}
                                        height={30}
                                        alt="Delete-icon.svg"
                                    />
                                    {t("screens.group.modal.buttonText")}
                                </DeleteModalButton>
                            </DeleteButtonActions>
                        </DeleteModalContent>
                    </Modal>
                    <CenterTitle>
                        {t("screens.group.groupMemberTitle")}
                    </CenterTitle>
                    <Container>
                        {isLoading ? (
                            <Spinner isSmall />
                        ) : (
                            groupUsers &&
                            groupUsers.map((user: User) => {
                                return (
                                    <ListItem
                                        key={user?.id}
                                        isBlocked={user?.is_blocked}
                                    >
                                        <Avatar>
                                            <img
                                                src={user?.avatar_image}
                                                alt="Avatar icon"
                                            />
                                        </Avatar>
                                        <ListItemText
                                            isBlocked={user?.is_blocked}
                                        >
                                            <PrimaryText>
                                                {user?.first_name}{" "}
                                                {user?.last_name}
                                            </PrimaryText>
                                            <SecondaryText
                                                isBlocked={user?.is_blocked}
                                            >
                                                {user?.email}
                                            </SecondaryText>
                                        </ListItemText>
                                        <ListItemText
                                            isBlocked={user?.is_blocked}
                                        >
                                            <PrimaryText>
                                                {t(
                                                    "screens.group.labels.username",
                                                )}
                                                {user?.username}
                                            </PrimaryText>
                                            <SecondaryText
                                                isBlocked={user?.is_blocked}
                                            >
                                                {t(
                                                    "screens.group.labels.phone",
                                                )}
                                                {user?.phone}
                                            </SecondaryText>
                                        </ListItemText>
                                        <ListItemText
                                            isBlocked={user?.is_blocked}
                                        >
                                            <PrimaryText>
                                                {user && user?.is_blocked ? (
                                                    <span>
                                                        {t(
                                                            "screens.group.labels.userBlocked",
                                                        )}
                                                        <p>
                                                            <Link href="/contact">
                                                                {t(
                                                                    "screens.group.labels.contactUs",
                                                                )}
                                                            </Link>
                                                        </p>
                                                    </span>
                                                ) : (
                                                    <span>
                                                        <PrimaryText>
                                                            {getFormattedDate(
                                                                user?.birth_date,
                                                            )}
                                                        </PrimaryText>
                                                        <SecondaryText
                                                            isBlocked={
                                                                user?.is_blocked
                                                            }
                                                        >
                                                            {user?.gender}
                                                        </SecondaryText>
                                                    </span>
                                                )}
                                            </PrimaryText>
                                        </ListItemText>
                                    </ListItem>
                                );
                            })
                        )}
                    </Container>
                    <CenterTitle>
                        {" "}
                        {t("screens.group.labels.billsTitle")}
                    </CenterTitle>
                    {billsLoading ? (
                        <Spinner isSmall />
                    ) : groupBills?.length > 0 ? (
                        groupBills.map((bill: Bill) => {
                            return <BillCard key={bill?.id} bill={bill} />;
                        })
                    ) : (
                        <h4>{t("screens.group.labels.noBillsText")}</h4>
                    )}
                </GroupContainer>
            )}
            <AlertWrapper />
        </div>
    );
};

export default withAuth(Group);
