import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { withAuth } from "../../hocs/withAuth";
import { useRouter } from "next/router";
import {
    deleteBill,
    fetchBill,
    fetchBillUsers,
    selectBillState,
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
    EditGroupButton,
    GroupCardActions,
    ListItem,
    ListItemText,
    PrimaryText,
    SecondaryText,
} from "@styles/pages/group/group.styles";
import {
    BillCardContent,
    BillCardDescription,
    BillCardImage,
    BillCardTitle,
    BillContainer,
    BillTotal,
    Container,
    QRCodeBox,
    BillUsersContainer,
    BillCenterTitle,
    BillCardActions,
    CodeQrDownloadLink,
    BillImageBox,
    BillImageCard,
} from "@styles/pages/bill/bill.styles";
import { FIAT } from "../../types/currency";
import { User } from "../../types/user";
import Link from "next/link";
import { BillsUsers } from "../../types/bill";
import QRCode from "qrcode.react";
import { saveAs } from "file-saver";
import CommentsCard from "@components/comments-card";
import {
    fetchBillComments,
    selectCommentState,
} from "@redux/slices/commentSlice";
import { fetchUsers } from "@redux/slices/userSlice";
import { useTranslation } from "react-i18next";

const Bill: NextPage = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { billId } = router.query;
    const dispatch = useDispatch();
    const { isLoading, bill, error, deleteBillSuccess, billUsers } =
        useSelector(selectBillState);
    const {
        error: commentsError,
        isLoading: commentsLoading,
        createCommentSuccess,
        createSubcommentSuccess,
        updateSubcommentSuccess,
    } = useSelector(selectCommentState);
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

    console.log("bill", bill);
    console.log("billId", billId);
    useEffect(() => {
        dispatch(fetchBill(billId as string));
        dispatch(fetchBillUsers(billId as string));
        dispatch(fetchUsers());
    }, [billId]);

    useEffect(() => {
        dispatch(fetchBillComments(billId as string));
    }, [
        billId,
        createCommentSuccess,
        createSubcommentSuccess,
        updateSubcommentSuccess,
    ]);

    const handleDeleteBillOpenModal = () => {
        setDeleteBillModalOpen(true);
    };

    const handleDeleteBillCloseModal = () => {
        setDeleteBillModalOpen(false);
    };

    const handleBillModalDeleteClick = () => {
        console.log("Delete");
        dispatch(deleteBill(billId as string));
        handleDeleteBillCloseModal();
        if (!deleteBillSuccess && !error) {
            router.replace("/bills");
        }
    };

    console.log("billUsers", billUsers);
    console.log("combinedUsersBills", combinedUsersBills);

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

    return (
        <Container>
            {isLoading ? (
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
                                <EditGroupButton>
                                    <Image
                                        src="/icons/edit-icon.svg"
                                        width={30}
                                        height={30}
                                        alt="Edit-icon.svg"
                                    />
                                </EditGroupButton>
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
                                        (user: User & BillsUsers) => {
                                            return (
                                                <ListItem
                                                    key={user?.id}
                                                    isBlocked={user?.is_blocked}
                                                >
                                                    <Avatar>
                                                        <img
                                                            src={
                                                                user?.avatar_image
                                                            }
                                                            alt="Avatar icon"
                                                        />
                                                    </Avatar>
                                                    <ListItemText
                                                        isBlocked={
                                                            user?.is_blocked
                                                        }
                                                    >
                                                        <PrimaryText>
                                                            {user?.first_name}{" "}
                                                            {user?.last_name}
                                                        </PrimaryText>
                                                        <SecondaryText
                                                            isBlocked={
                                                                user?.is_blocked
                                                            }
                                                        >
                                                            {user?.email}
                                                        </SecondaryText>
                                                    </ListItemText>
                                                    <ListItemText
                                                        isBlocked={
                                                            user?.is_blocked
                                                        }
                                                    >
                                                        <PrimaryText>
                                                            {t(
                                                                "screens.bill.labels.username",
                                                            )}
                                                            {user?.username}
                                                        </PrimaryText>
                                                        <SecondaryText
                                                            isBlocked={
                                                                user?.is_blocked
                                                            }
                                                        >
                                                            {t(
                                                                "screens.bill.labels.phone",
                                                            )}
                                                            {user?.phone}
                                                        </SecondaryText>
                                                    </ListItemText>
                                                    <ListItemText
                                                        isBlocked={
                                                            user?.is_blocked
                                                        }
                                                    >
                                                        <PrimaryText>
                                                            {user &&
                                                            user?.is_blocked ? (
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
                                                                            user?.birth_date,
                                                                        )}
                                                                    </PrimaryText>
                                                                    <SecondaryText
                                                                        isBlocked={
                                                                            user?.is_blocked
                                                                        }
                                                                    >
                                                                        {
                                                                            user?.gender
                                                                        }
                                                                    </SecondaryText>
                                                                </span>
                                                            )}
                                                        </PrimaryText>
                                                    </ListItemText>
                                                    <ListItemText
                                                        isBlocked={
                                                            user?.is_blocked
                                                        }
                                                    >
                                                        <PrimaryText
                                                            isRegulated={
                                                                user?.is_regulated
                                                            }
                                                        >
                                                            <span>
                                                                {t(
                                                                    "screens.bill.labels.debt",
                                                                )}
                                                                {parseFloat(
                                                                    user &&
                                                                        user?.debt.toString(),
                                                                )}{" "}
                                                                {
                                                                    bill?.currency_code
                                                                }
                                                            </span>
                                                        </PrimaryText>
                                                        <SecondaryText
                                                            isBlocked={
                                                                user?.is_blocked
                                                            }
                                                        >
                                                            <span>
                                                                {t(
                                                                    "screens.bill.labels.isRegulated",
                                                                )}
                                                                {user &&
                                                                user?.is_regulated ? (
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
                                                                )}
                                                            </span>
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
                    {isLoading || commentsLoading ? (
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
