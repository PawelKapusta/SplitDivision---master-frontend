import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { withAuth } from "../../hocs/withAuth";
import { useRouter } from "next/router";
import {
    deleteBill,
    fetchBill,
    fetchBillUsers,
    selectBillState,
    updateBillsUsers,
} from "@redux/slices/billSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@components/spinner";
import Image from "next/image";
import { getFormattedDate } from "../../utils/date";
import Flag from "react-world-flags";
import Modal from "@components/modal";
import {
    Avatar,
    DeleteButtonActions,
    DeleteModalButton,
    DeleteModalContent,
    DeleteModalDescription,
    DeleteModalTitle,
} from "@styles/pages/admin/admin.styles";
import useAlert from "../../hocs/useAlert";
import {
    DeleteGroupButton,
    ListItem,
    ListItemText,
    PrimaryText,
    SecondaryText,
} from "@styles/pages/group/group.styles";
import {
    BillCardActions,
    BillCardContent,
    BillCardDescription,
    BillCardImage,
    BillCardTitle,
    BillCenterTitle,
    BillContainer,
    BillImageBox,
    BillImageCard,
    BillTotal,
    BillUsersContainer,
    CodeQrDownloadLink,
    Container,
    QRCodeBox,
    RegulateButton,
    RegulateSpan,
} from "@styles/pages/bill/bill.styles";
import { FIAT } from "../../types/currency";
import { User } from "../../types/user";
import Link from "next/link";
import { BillsUsers, BillsUsersUpdateData } from "../../types/bill";
import QRCode from "qrcode.react";
import { saveAs } from "file-saver";
import CommentsCard from "@components/comments-card";
import {
    fetchBillComments,
    selectCommentState,
} from "@redux/slices/commentSlice";
import { fetchUsers } from "@redux/slices/userSlice";
import { useTranslation } from "react-i18next";
import { TDecodedJWTToken } from "../../types/jwt";
import { getDecodedJWTToken } from "../../utils/jwt";
import { selectAuthState } from "@redux/slices/authSlice";
import { ALL_ACCESS, Subscription } from "../../types/subscription";
import {
    fetchUserSubscriptions,
    selectSubscriptionState,
} from "@redux/slices/subscriptionSlice";

const Bill: NextPage = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { billId } = router.query;
    const dispatch = useDispatch();
    const { isAuthenticated, token } = useSelector(selectAuthState);
    const { userSubscription, isUserSubscriptionsLoading } = useSelector(
        selectSubscriptionState,
    );
    const {
        isLoading,
        bill,
        error,
        deleteBillSuccess,
        billUsers,
        billsUsersSuccess,
    } = useSelector(selectBillState);
    const {
        error: commentsError,
        isLoading: commentsLoading,
        createCommentSuccess,
        createSubcommentSuccess,
        updateSubcommentSuccess,
        deleteSubcommentSuccess,
        isDeleteCommentLoading,
    } = useSelector(selectCommentState);
    let decodedToken: TDecodedJWTToken, userId: string;
    if (isAuthenticated) {
        decodedToken = getDecodedJWTToken(token);
        userId = decodedToken.id;
    }
    const [deleteBillModalOpen, setDeleteBillModalOpen] = useState(false);

    const { showAlert, AlertWrapper } = useAlert();
    const combinedUsersBills =
        billUsers &&
        billUsers?.users?.map((user: User) => {
            const matchedItem = billUsers?.billUsers?.find(
                (users_bills: BillsUsers) => users_bills.user_id === user.id,
            );
            return { ...user, ...matchedItem };
        });

    useEffect(() => {
        if (deleteBillSuccess !== false) {
            showAlert(
                t("components.alert.messages.successDeleteBill"),
                "success",
            );
        } else if (error) {
            showAlert(error.toString(), "error");
        } else if (commentsError) {
            showAlert(commentsError.toString(), "error");
        }
    }, [error, commentsError]);

    useEffect(() => {
        dispatch(fetchBill(billId as string));
        dispatch(fetchBillUsers(billId as string));
        dispatch(fetchUsers());
        dispatch(fetchUserSubscriptions(userId as string));
    }, [billId, billsUsersSuccess]);

    useEffect(() => {
        dispatch(fetchBillComments(billId as string));
    }, [
        billId,
        createCommentSuccess,
        createSubcommentSuccess,
        updateSubcommentSuccess,
        deleteSubcommentSuccess,
        deleteSubcommentSuccess,
    ]);

    const handleDeleteBillOpenModal = () => {
        setDeleteBillModalOpen(true);
    };

    const handleDeleteBillCloseModal = () => {
        setDeleteBillModalOpen(false);
    };

    const handleBillModalDeleteClick = () => {
        dispatch(deleteBill(billId as string));
        handleDeleteBillCloseModal();
        if (!deleteBillSuccess && !error) {
            router.replace("/bills");
        }
    };

    const handleRegulateButton = (
        bills_users: string,
        user_id: string,
        bill_id: string,
    ) => {
        const bills_usersUpdateData: BillsUsersUpdateData = {
            user_id: user_id,
            bill_id: bill_id,
        };
        dispatch(updateBillsUsers(bills_users, bills_usersUpdateData));
    };

    const hasFullAccess = (userSubscription: Subscription[]) => {
        return userSubscription.find(
            (subscription: Subscription) => subscription?.type === ALL_ACCESS,
        );
    };
    const hasUserAnySubscriptions =
        userSubscription && userSubscription?.length > 0;

    const downloadCodeQrClick = (
        data: string,
        filename = "bill_qr_code.png",
    ) => {
        const canvas = document.querySelector("canvas");
        const url = (canvas && canvas?.toDataURL("image/png")) || "";
        fetch(url)
            .then((res) => res.blob())
            .then((blob) => {
                saveAs(blob, filename || "bill_qr_code.png");
            });
    };

    const isOwner = (id: string) => {
        return id === userId;
    };

    return (
        <Container>
            {isLoading && isUserSubscriptionsLoading ? (
                <Spinner />
            ) : (
                <BillContainer>
                    <BillCardContent isLongDescription={false}>
                        <BillCardTitle>
                            <p>{bill?.name}</p>
                            <p>
                                <Image
                                    src="/icons/calendar-icon.svg"
                                    width={30}
                                    height={30}
                                    alt="Calendar-icon.svg"
                                />
                                {t("screens.bill.startDate")}
                                {getFormattedDate(bill?.data_created)}
                            </p>

                            <p>
                                <Image
                                    src="/icons/calendar-icon.svg"
                                    width={30}
                                    height={30}
                                    alt="Calendar-icon.svg"
                                />
                                {t("screens.bill.endDate")}
                                {getFormattedDate(bill?.data_end)}
                            </p>
                            <BillTotal>
                                {bill &&
                                    bill.currency_type
                                        .toLocaleString()
                                        .toUpperCase() === FIAT && (
                                        <Flag
                                            code={bill?.currency_code.substring(
                                                0,
                                                2,
                                            )}
                                            height={30}
                                            width={45}
                                        />
                                    )}
                                <p>
                                    {t("screens.bill.debt")}
                                    {bill?.debt} {bill?.currency_code}
                                </p>
                            </BillTotal>
                            <BillCardActions>
                                {/*<EditGroupButton>*/}
                                {/*    <Image*/}
                                {/*        src="/icons/edit-icon.svg"*/}
                                {/*        width={30}*/}
                                {/*        height={30}*/}
                                {/*        alt="Edit-icon.svg"*/}
                                {/*    />*/}
                                {/*</EditGroupButton>*/}
                                {bill && isOwner(bill?.owner_id) && (
                                    <DeleteGroupButton
                                        onClick={handleDeleteBillOpenModal}
                                    >
                                        <Image
                                            src="/icons/delete_icon_white.svg"
                                            width={30}
                                            height={30}
                                            alt="Delete-icon.svg"
                                        />
                                    </DeleteGroupButton>
                                )}
                            </BillCardActions>
                        </BillCardTitle>
                        <BillCardDescription isLongDescription={false}>
                            <p>{bill?.description}</p>
                        </BillCardDescription>
                        <Modal
                            isOpen={deleteBillModalOpen}
                            onClose={handleDeleteBillCloseModal}
                            isAdmin
                        >
                            <DeleteModalContent>
                                <DeleteModalTitle>
                                    {t("screens.bill.modal.title")}
                                </DeleteModalTitle>
                                <DeleteModalDescription>
                                    {t("screens.bill.modal.description")}
                                </DeleteModalDescription>
                                <DeleteButtonActions>
                                    <DeleteModalButton
                                        onClick={handleBillModalDeleteClick}
                                    >
                                        <Image
                                            src="/icons/delete_icon_white.svg"
                                            width={30}
                                            height={30}
                                            alt="Delete-icon.svg"
                                        />
                                        {t("screens.bill.modal.buttonText")}
                                    </DeleteModalButton>
                                </DeleteButtonActions>
                            </DeleteModalContent>
                        </Modal>
                        <BillCardImage>
                            <Image
                                src="/images/bill-content-image.png"
                                width={500}
                                height={500}
                                alt="Bill-content-image.png"
                            />
                        </BillCardImage>
                    </BillCardContent>
                    <BillCenterTitle>
                        {t("screens.bill.billMembersTitle")}
                    </BillCenterTitle>
                    <Container>
                        {isLoading ? (
                            <Spinner isSmall />
                        ) : (
                            <BillUsersContainer>
                                {combinedUsersBills &&
                                    combinedUsersBills.map(
                                        (bills_users: User & BillsUsers) => {
                                            return (
                                                <ListItem
                                                    key={bills_users?.id}
                                                    isBlocked={
                                                        bills_users?.is_blocked
                                                    }
                                                >
                                                    <Avatar>
                                                        <img
                                                            src={
                                                                bills_users?.avatar_image
                                                            }
                                                            alt="Avatar icon"
                                                        />
                                                    </Avatar>
                                                    <ListItemText
                                                        isBlocked={
                                                            bills_users?.is_blocked
                                                        }
                                                    >
                                                        <PrimaryText>
                                                            {
                                                                bills_users?.first_name
                                                            }{" "}
                                                            {
                                                                bills_users?.last_name
                                                            }
                                                        </PrimaryText>
                                                        <SecondaryText
                                                            isBlocked={
                                                                bills_users?.is_blocked
                                                            }
                                                        >
                                                            {bills_users?.email}
                                                        </SecondaryText>
                                                    </ListItemText>
                                                    <ListItemText
                                                        isBlocked={
                                                            bills_users?.is_blocked
                                                        }
                                                    >
                                                        <PrimaryText>
                                                            {t(
                                                                "screens.bill.labels.username",
                                                            )}
                                                            {
                                                                bills_users?.username
                                                            }
                                                        </PrimaryText>
                                                        <SecondaryText
                                                            isBlocked={
                                                                bills_users?.is_blocked
                                                            }
                                                        >
                                                            {t(
                                                                "screens.bill.labels.phone",
                                                            )}
                                                            {bills_users?.phone}
                                                        </SecondaryText>
                                                    </ListItemText>
                                                    <ListItemText
                                                        isBlocked={
                                                            bills_users?.is_blocked
                                                        }
                                                    >
                                                        <PrimaryText
                                                            isBlocked={
                                                                bills_users?.is_blocked
                                                            }
                                                        >
                                                            {bills_users &&
                                                            bills_users?.is_blocked ? (
                                                                <span>
                                                                    {t(
                                                                        "screens.bill.labels.userBlocked",
                                                                    )}
                                                                    <p>
                                                                        <Link href="/contact">
                                                                            {t(
                                                                                "screens.bill.labels.contactUs",
                                                                            )}
                                                                        </Link>
                                                                    </p>
                                                                </span>
                                                            ) : (
                                                                <span>
                                                                    <PrimaryText>
                                                                        {getFormattedDate(
                                                                            bills_users?.birth_date,
                                                                        )}
                                                                    </PrimaryText>
                                                                    <SecondaryText
                                                                        isBlocked={
                                                                            bills_users?.is_blocked
                                                                        }
                                                                    >
                                                                        {
                                                                            bills_users?.gender
                                                                        }
                                                                    </SecondaryText>
                                                                </span>
                                                            )}
                                                        </PrimaryText>
                                                    </ListItemText>
                                                    <ListItemText
                                                        isBlocked={
                                                            bills_users?.is_blocked
                                                        }
                                                    >
                                                        <PrimaryText
                                                            isRegulated={
                                                                bills_users?.is_regulated
                                                            }
                                                            isBlocked={
                                                                bills_users?.is_blocked
                                                            }
                                                        >
                                                            <span>
                                                                {t(
                                                                    "screens.bill.labels.debt",
                                                                )}
                                                                {parseFloat(
                                                                    bills_users &&
                                                                        bills_users?.debt.toString(),
                                                                )}{" "}
                                                                {
                                                                    bill?.currency_code
                                                                }
                                                            </span>
                                                        </PrimaryText>
                                                        <SecondaryText
                                                            isBlocked={
                                                                bills_users?.is_blocked
                                                            }
                                                        >
                                                            <RegulateSpan>
                                                                {t(
                                                                    "screens.bill.labels.isRegulated",
                                                                )}
                                                                {bills_users &&
                                                                bills_users?.is_regulated ? (
                                                                    <Image
                                                                        priority
                                                                        src="/icons/yes-icon.svg"
                                                                        height={
                                                                            20
                                                                        }
                                                                        width={
                                                                            20
                                                                        }
                                                                        alt="Yes icon"
                                                                    />
                                                                ) : (
                                                                    <RegulateSpan>
                                                                        <Image
                                                                            priority
                                                                            src="/icons/no-icon.svg"
                                                                            height={
                                                                                20
                                                                            }
                                                                            width={
                                                                                20
                                                                            }
                                                                            alt="No icon"
                                                                        />
                                                                        {combinedUsersBills &&
                                                                        userId ===
                                                                            bills_users?.user_id ? (
                                                                            <RegulateButton
                                                                                onClick={() =>
                                                                                    handleRegulateButton(
                                                                                        bills_users?.id,
                                                                                        bills_users?.user_id,
                                                                                        bills_users?.bill_id,
                                                                                    )
                                                                                }
                                                                            >
                                                                                {t(
                                                                                    "screens.bill.labels.regulate",
                                                                                )}
                                                                            </RegulateButton>
                                                                        ) : null}
                                                                    </RegulateSpan>
                                                                )}
                                                            </RegulateSpan>
                                                        </SecondaryText>
                                                    </ListItemText>
                                                </ListItem>
                                            );
                                        },
                                    )}
                            </BillUsersContainer>
                        )}
                    </Container>
                    {bill && bill?.bill_image ? (
                        <BillImageBox>
                            <BillImageCard
                                src={bill?.bill_image}
                                alt="Bill Image"
                            />
                        </BillImageBox>
                    ) : null}
                    <QRCodeBox>
                        <QRCode
                            value={bill?.code_qr}
                            size={290}
                            level={"H"}
                            includeMargin={true}
                        />
                    </QRCodeBox>
                    {hasUserAnySubscriptions &&
                    hasFullAccess(userSubscription) ? (
                        <CodeQrDownloadLink>
                            <a
                                onClick={() =>
                                    downloadCodeQrClick(
                                        bill?.code_qr,
                                        `Bill-${bill?.id}-code-qr.png`,
                                    )
                                }
                            >
                                {t("screens.bill.codeQrDownloadText")}
                            </a>
                        </CodeQrDownloadLink>
                    ) : null}
                    {isLoading || commentsLoading || isDeleteCommentLoading ? (
                        <Spinner isSmall />
                    ) : (
                        <CommentsCard billId={billId as string} />
                    )}

                    <AlertWrapper />
                </BillContainer>
            )}
        </Container>
    );
};

export default withAuth(Bill);
