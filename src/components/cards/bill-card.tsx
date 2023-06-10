import React, { useEffect, useState, ReactElement } from "react";
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
import useAlert from "../../hocs/useAlert";
import { deleteBill, selectBillState } from "@redux/slices/billSlice";
import { FIAT } from "../../types/currency";
import { useTranslation } from "react-i18next";

export type TBillCardProps = {
    bill: Bill;
    isAdmin?: boolean;
};
const BillCard = ({ bill, isAdmin }: TBillCardProps): ReactElement => {
    const billPath = `/bill/${bill.id}`;
    const [modalOpen, setModalOpen] = useState(false);
    const router = useRouter();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { isLoading, deleteBillSuccess, error } =
        useSelector(selectBillState);
    const { showAlert, AlertWrapper } = useAlert();

    useEffect(() => {
        if (deleteBillSuccess !== false) {
            showAlert(
                t("components.alert.messages.successDeleteBill"),
                "success",
            );
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
                    <p>
                        {t("components.billCard.dateCreated")}
                        {getFormattedDate(bill.data_created)}
                    </p>
                    <p>
                        {t("components.billCard.dateEnd")}
                        {getFormattedDate(bill.data_end)}
                    </p>
                    {isAdmin ? (
                        <Actions>
                            <DeleteIconButton onClick={handleOpenModal}>
                                <Image
                                    src="/icons/delete_icon_white.svg"
                                    width={30}
                                    height={30}
                                    alt="Delete-icon.svg"
                                />
                                {t("components.billCard.deleteButton")}
                            </DeleteIconButton>
                            <GoIconButton onClick={handleAdminGoClick}>
                                <Image
                                    src="/icons/right-arrow-icon.svg"
                                    width={30}
                                    height={30}
                                    alt="Go-icon.svg"
                                />
                                <a href={billPath}>
                                    {t("components.billCard.goButton")}
                                </a>
                            </GoIconButton>
                        </Actions>
                    ) : null}
                </CardTitle>
                <Modal isOpen={modalOpen} onClose={handleCloseModal} isAdmin>
                    <DeleteModalContent>
                        <DeleteModalTitle>
                            {t("components.modal.adminDeleteBill.title")}
                        </DeleteModalTitle>
                        <DeleteModalDescription>
                            {t("components.modal.adminDeleteBill.description")}
                        </DeleteModalDescription>
                        <DeleteButtonActions>
                            <DeleteModalButton onClick={handleModalDeleteClick}>
                                <Image
                                    src="/icons/delete_icon_white.svg"
                                    width={30}
                                    height={30}
                                    alt="Delete-icon.svg"
                                />
                                {t(
                                    "components.modal.adminDeleteBill.deleteButtonText",
                                )}
                            </DeleteModalButton>
                        </DeleteButtonActions>
                    </DeleteModalContent>
                </Modal>
                <CardImage isBill>
                    <Image
                        priority
                        src={
                            bill?.currency_type.toUpperCase() === FIAT
                                ? "/images/bill_image_fiat.png"
                                : "/images/bill_image_crypto.png"
                        }
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
