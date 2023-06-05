import React, { useEffect, useState } from "react";
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

export type TGroupCardProps = {
    group: Group;
    isAdmin?: boolean;
};
const GroupCard = ({ group, isAdmin }: TGroupCardProps): JSX.Element => {
    const groupPath = `/group/${group.id}`;
    const router = useRouter();
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const { isLoading, deleteGroupSuccess, error } =
        useSelector(selectGroupState);
    const { showAlert, AlertWrapper } = useAlert();

    useEffect(() => {
        if (deleteGroupSuccess !== false) {
            showAlert("Successfully deleted group", "success");
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
                    <p>Created: {getFormattedDate(group.data_created)}</p>
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
                                <a href={groupPath}>Go</a>
                            </GoIconButton>
                        </Actions>
                    ) : null}
                </CardTitle>
                <Modal isOpen={modalOpen} onClose={handleCloseModal} isAdmin>
                    <DeleteModalContent>
                        <DeleteModalTitle>
                            Are you sure you want to delete this group?
                        </DeleteModalTitle>
                        <DeleteModalDescription>
                            This will delete all bills and connected with the
                            group data!
                        </DeleteModalDescription>
                        <DeleteButtonActions>
                            <DeleteModalButton onClick={handleModalDeleteClick}>
                                <Image
                                    src="/icons/delete_icon_white.svg"
                                    width={30}
                                    height={30}
                                    alt="Delete-icon.svg"
                                />{" "}
                                Yes please delete this group
                            </DeleteModalButton>
                        </DeleteButtonActions>
                    </DeleteModalContent>
                </Modal>
                <CardImage>
                    <Image
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
