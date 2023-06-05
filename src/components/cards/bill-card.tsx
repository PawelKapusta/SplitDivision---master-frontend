import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
    CardContainer,
    CardImage,
    CardDescription,
    CardLink,
    CardTitle,
    CardCost,
} from "./group-bill-card.styles";
import { Bill } from "../../types/bill";
import { getFormattedDate } from "../../utils/date";
import TextTruncate from "react-text-truncate";
import {
    Actions,
    DeleteButtonActions,
    DeleteIconButton,
    DeleteModalButton,
    DeleteModalContent,
    DeleteModalDescription,
    DeleteModalTitle,
    GoIconButton,
} from "@styles/pages/admin/admin.styles";
import { useRouter } from "next/router";
import Modal from "@components/modal";
import { useDispatch, useSelector } from "react-redux";
import { selectGroupState } from "@redux/slices/groupSlice";
import useAlert from "../../hocs/useAlert";
import { deleteBill, selectBillState } from "@redux/slices/billSlice";

export type TBillCardProps = {
    bill: Bill;
    isAdmin?: boolean;
};
const BillCard = ({ bill, isAdmin }: TBillCardProps): JSX.Element => {
    const billPath = `/bill/${bill.id}`;
    const [modalOpen, setModalOpen] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const { isLoading, deleteBillSuccess, error } =
        useSelector(selectBillState);
    const { showAlert, AlertWrapper } = useAlert();

    useEffect(() => {
        if (deleteBillSuccess !== false) {
            showAlert("Successfully deleted bill", "success");
        } else if (error) {
            showAlert(error.toString(), "error");
        }
    }, [deleteBillSuccess, error]);
    const handleAdminGoClick = () => {
        router.replace(billPath);
    };

    const handleModalDeleteClick = () => {
        console.log("Delete");
        dispatch(deleteBill(bill.id));
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <CardLink href={isAdmin ? undefined : billPath}>
            <CardContainer isBill isAdmin={isAdmin}>
                <CardTitle>
                    <p>{bill.name}</p>
                    <p>Created: {getFormattedDate(bill.data_created)}</p>
                    <p>Ends: {getFormattedDate(bill.data_end)}</p>
                    {isAdmin ? (
                        <Actions>
                            <DeleteIconButton onClick={handleOpenModal}>
                                <Image
                                    src="/icons/delete_icon_white.svg"
                                    width={30}
                                    height={30}
                                    alt="Delete-icon.svg"
                                />{" "}
                                Delete
                            </DeleteIconButton>
                            <GoIconButton onClick={handleAdminGoClick}>
                                <Image
                                    src="/icons/right-arrow-icon.svg"
                                    width={30}
                                    height={30}
                                    alt="Go-icon.svg"
                                />{" "}
                                <a href={billPath}>Go</a>
                            </GoIconButton>
                        </Actions>
                    ) : null}
                </CardTitle>
                <Modal isOpen={modalOpen} onClose={handleCloseModal} isAdmin>
                    <DeleteModalContent>
                        <DeleteModalTitle>
                            Are you sure you want to delete this bill?
                        </DeleteModalTitle>
                        <DeleteModalDescription>
                            This will delete all comments and connected with the
                            bill data!
                        </DeleteModalDescription>
                        <DeleteButtonActions>
                            <DeleteModalButton onClick={handleModalDeleteClick}>
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
                <CardImage isBill>
                    <Image
                        src="/images/bill-image.png"
                        width={1000}
                        height={100}
                        alt="Bill-image.png"
                    />
                    <CardDescription>
                        <TextTruncate
                            line={1}
                            element="p"
                            truncateText="..."
                            text={bill.description}
                        />
                    </CardDescription>
                </CardImage>
                <CardCost>
                    <p>
                        {bill.debt} {bill.currency_code}
                    </p>
                </CardCost>
            </CardContainer>
        </CardLink>
    );
};

export default BillCard;
