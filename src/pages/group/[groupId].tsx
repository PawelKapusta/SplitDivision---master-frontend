import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
    fetchGroup,
    fetchGroupUsers,
    fetchUserGroups,
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

const Group = (): JSX.Element => {
    const [isLongDescription, setIsLongDescription] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const dispatch = useDispatch();
    const { isLoading, group, groupUsers } = useSelector(selectGroupState);
    const {
        isLoading: billsLoading,
        groupBills,
        groupBillsSuccess,
    } = useSelector(selectBillState);
    const router = useRouter();
    const { groupId } = router.query;
    console.log(groupId);
    console.log("groupBills", groupBills);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        dispatch(fetchGroup(groupId as string));
        dispatch(fetchGroupUsers(groupId as string));
        dispatch(fetchGroupBills(groupId as string));
    }, [groupId]);

    useEffect(() => {
        setIsLongDescription(group?.description.length > 800);
    }, [group]);

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
                                <Image
                                    src="/icons/edit-icon.svg"
                                    width={30}
                                    height={30}
                                    alt="Edit-icon.svg"
                                />
                                <Image
                                    src="/icons/delete_icon_white.svg"
                                    width={30}
                                    height={30}
                                    alt="Delete-icon.svg"
                                />
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
                    <CreateBillButton onClick={handleOpenModal}>
                        <Image
                            src="/icons/plus-icon.svg"
                            width={30}
                            height={30}
                            alt="Plus-icon.svg"
                        />
                        Create a bill
                    </CreateBillButton>
                    <Modal isOpen={modalOpen} onClose={handleCloseModal}>
                        <BillForm groupId={group?.id} />
                    </Modal>
                    <CenterTitle>Group members</CenterTitle>
                    <Container>
                        {groupUsers &&
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
                                                Username: {user?.username}
                                            </PrimaryText>
                                            <SecondaryText
                                                isBlocked={user?.is_blocked}
                                            >
                                                Phone: {user?.phone}
                                            </SecondaryText>
                                        </ListItemText>
                                        <ListItemText
                                            isBlocked={user?.is_blocked}
                                        >
                                            <PrimaryText>
                                                {user && user?.is_blocked ? (
                                                    <span>
                                                        User has been blocked!
                                                        <p>
                                                            <Link href="/contact">
                                                                Contact us
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
                            })}
                    </Container>
                    <CenterTitle>Bills in this group</CenterTitle>
                    {billsLoading ? (
                        <Spinner isSmall />
                    ) : groupBillsSuccess ? (
                        groupBills.map((bill: Bill) => {
                            return <BillCard key={bill?.id} bill={bill} />;
                        })
                    ) : (
                        <h4>
                            Group doesn't have any bills yet. Please create a
                            bill.
                        </h4>
                    )}
                </GroupContainer>
            )}
        </div>
    );
};

export default withAuth(Group);
