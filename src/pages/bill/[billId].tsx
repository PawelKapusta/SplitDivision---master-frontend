import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { withAuth } from "../../hocs/withAuth";
import { useRouter } from "next/router";
import {
    deleteBill,
    fetchBill,
    selectBillState,
} from "@redux/slices/billSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@components/spinner";
import Image from "next/image";
import { getFormattedDate } from "../../utils/date";
import Flag from "react-world-flags";
import Modal from "@components/modal";
import {
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
} from "@styles/pages/group/group.styles";
import {
    BillCardContent,
    BillCardDescription,
    BillCardImage,
    BillCardTitle,
    BillContainer,
    BillAmount,
    Container,
    BillImageContainer,
    BillImage,
    BillQRCode,
    QRCode,
} from "@styles/pages/bill/bill.styles";
import { FIAT } from "../../types/currency";

const Bill: NextPage = () => {
    const router = useRouter();
    const { billId } = router.query;
    const dispatch = useDispatch();
    const { isLoading, bill, error, deleteBillSuccess } =
        useSelector(selectBillState);
    const [deleteBillModalOpen, setDeleteBillModalOpen] = useState(false);
    const { showAlert, AlertWrapper } = useAlert();

    useEffect(() => {
        if (deleteBillSuccess !== false) {
            showAlert("Successfully deleted bill", "success");
        } else if (error) {
            showAlert(error.toString(), "error");
        }
    }, [error]);

    console.log("bill", bill);
    useEffect(() => {
        dispatch(fetchBill(billId as string));
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
                            <BillAmount>
                                <p>
                                    {" "}
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
                                </p>
                                <p>
                                    <strong>Debt:</strong> {bill?.debt}{" "}
                                    {bill?.currency_code}
                                </p>
                            </BillAmount>
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
                                    onClick={handleDeleteBillOpenModal}
                                >
                                    <Image
                                        src="/icons/delete_icon_white.svg"
                                        width={30}
                                        height={30}
                                        alt="Delete-icon.svg"
                                    />
                                </DeleteGroupButton>
                            </GroupCardActions>
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

                    {/*<BillImageContainer>*/}
                    {/*    <BillImage src={bill?.bill_image} alt="Bill Image" />*/}
                    {/*</BillImageContainer>*/}
                    {/*<BillQRCode>*/}
                    {/*    <QRCode src={bill?.code_qr} alt="QR Code" />*/}
                    {/*</BillQRCode>*/}
                    <AlertWrapper />
                </BillContainer>
            )}
        </Container>
    );
};

export default withAuth(Bill);
