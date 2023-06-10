import React, { ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import {
    CardContainer,
    CardImage,
    CardDescription,
    CardLink,
    CardTitle,
} from "./group-bill-card.styles";
import { Group } from "../../types/group";
import { getFormattedDate } from "../../utils/date";
import TextTruncate from "react-text-truncate";
import {
    DeleteIconButton,
    GoIconButton,
    Actions,
    DeleteModalContent,
    DeleteModalTitle,
    DeleteModalDescription,
    DeleteButtonActions,
    DeleteModalButton,
} from "@styles/pages/admin/admin.styles";
import { useRouter } from "next/router";
import Modal from "@components/modal";
import { deleteGroup, selectGroupState } from "@redux/slices/groupSlice";
import { useDispatch, useSelector } from "react-redux";
import useAlert from "../../hocs/useAlert";
import { useTranslation } from "react-i18next";

export type TGroupCardProps = {
    group: Group;
    isAdmin?: boolean;
};
const GroupCard = ({ group, isAdmin }: TGroupCardProps): ReactElement => {
    const groupPath = `/group/${group.id}`;
    const router = useRouter();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const { isLoading, deleteGroupSuccess, error } =
        useSelector(selectGroupState);
    const { showAlert, AlertWrapper } = useAlert();

    useEffect(() => {
        if (deleteGroupSuccess !== false) {
            showAlert(
                t("components.alert.messages.successDeleteGroup"),
                "success",
            );
        } else if (error) {
            showAlert(error.toString(), "error");
        }
    }, [deleteGroupSuccess, error]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const handleAdminGoClick = () => {
        router.replace(groupPath);
    };

    const handleModalDeleteClick = () => {
        console.log("Delete");
        dispatch(deleteGroup(group.id));
    };

    return (
        <CardLink href={isAdmin ? undefined : groupPath}>
            <CardContainer isAdmin={isAdmin}>
                <CardTitle>
                    <p>{group.name}</p>
                    <p>
                        {t("components.groupCard.dateCreated")}
                        {getFormattedDate(group.data_created)}
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
                                {t("components.groupCard.deleteButton")}
                            </DeleteIconButton>
                            <GoIconButton onClick={handleAdminGoClick}>
                                <Image
                                    src="/icons/right-arrow-icon.svg"
                                    width={30}
                                    height={30}
                                    alt="Go-icon.svg"
                                />
                                <a href={groupPath}>
                                    {t("components.groupCard.goButton")}
                                </a>
                            </GoIconButton>
                        </Actions>
                    ) : null}
                </CardTitle>
                <Modal
                    isOpen={modalOpen}
                    onClose={handleCloseModal}
                    isAdmin={isAdmin}
                >
                    <DeleteModalContent>
                        <DeleteModalTitle>
                            {t("components.modal.adminDeleteGroup.title")}
                        </DeleteModalTitle>
                        <DeleteModalDescription>
                            {t("components.modal.adminDeleteGroup.description")}
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
                                    "components.modal.adminDeleteGroup.deleteButtonText",
                                )}
                            </DeleteModalButton>
                        </DeleteButtonActions>
                    </DeleteModalContent>
                </Modal>
                <CardImage>
                    <Image
                        priority
                        src="/images/group-image.png"
                        width={1000}
                        height={100}
                        alt="Group-image.png"
                    />
                    <CardDescription>
                        <TextTruncate
                            line={1}
                            element="p"
                            truncateText="..."
                            text={group.description}
                        />
                    </CardDescription>
                </CardImage>
            </CardContainer>
            <AlertWrapper />
        </CardLink>
    );
};

export default GroupCard;
