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
    BillImageContainer,
    BillImage,
    QRCodeBox,
    BillUsersContainer,
    BillCenterTitle,
    BillCardActions,
    CodeQrDownloadLink,
} from "@styles/pages/bill/bill.styles";
import { FIAT } from "../../types/currency";
import { User } from "../../types/user";
import Link from "next/link";
import { BillsUsers } from "../../types/bill";
import QRCode from "qrcode.react";
import { saveAs } from "file-saver";

const Bill: NextPage = () => {
    const router = useRouter();
    const { billId } = router.query;
    const dispatch = useDispatch();
    const { isLoading, bill, error, deleteBillSuccess, billUsers } =
        useSelector(selectBillState);
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
            showAlert("Successfully deleted bill", "success");
        } else if (error) {
            showAlert(error.toString(), "error");
        }
    }, [error]);

    console.log("bill", bill);
    console.log("billId", billId);
    useEffect(() => {
        dispatch(fetchBill(billId as string));
        dispatch(fetchBillUsers(billId as string));
    }, [billId]);

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
                                Start: {getFormattedDate(bill?.data_created)}
                            </p>

                            <p>
                                <Image
                                    src="/icons/calendar-icon.svg"
                                    width={30}
                                    height={30}
                                    alt="Calendar-icon.svg"
                                />
                                End: {getFormattedDate(bill?.data_end)}
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
                                    Debt: {bill?.debt} {bill?.currency_code}
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
                                    Are you sure you want to delete this bill?
                                </DeleteModalTitle>
                                <DeleteModalDescription>
                                    This will delete all comments and connected
                                    with the bill data!
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
                                        />{" "}
                                        Yes please delete this bill
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
                    <BillCenterTitle>Bill members</BillCenterTitle>
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
                                                            Username:{" "}
                                                            {user?.username}
                                                        </PrimaryText>
                                                        <SecondaryText
                                                            isBlocked={
                                                                user?.is_blocked
                                                            }
                                                        >
                                                            Phone: {user?.phone}
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
                                                                    User has
                                                                    been
                                                                    blocked!
                                                                    <p>
                                                                        <Link href="/contact">
                                                                            Contact
                                                                            us
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
                                                                Debt:{" "}
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
                                                                isRegulated:{" "}
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
                    {/*<BillImageContainer>*/}
                    {/*    <BillImage src={bill?.bill_image} alt="Bill Image" />*/}
                    {/*</BillImageContainer>*/}
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
                            {" "}
                            Click here to download QR{" "}
                        </a>
                    </CodeQrDownloadLink>
                    <AlertWrapper />
                </BillContainer>
            )}
        </Container>
    );
};

export default withAuth(Bill);
