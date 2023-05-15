import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    GroupCardContainer,
    GroupCardTitle,
    GroupCardImage,
    GroupCardDescription,
    GroupCardLink,
} from "./group-card.styles";
import { Group } from "../../types/group";
import { getFormattedDate } from "../../utils/date";
import TextTruncate from "react-text-truncate";

export type TGroupCardProps = {
    group: Group;
};
const GroupCard = ({ group }: TGroupCardProps): JSX.Element => {
    const groupPath = `/group/${group.id}`;
    return (
        <GroupCardLink href={groupPath}>
            <GroupCardContainer>
                <GroupCardTitle>
                    <p>{group.name}</p>
                    <p>Created: {getFormattedDate(group.data_created)}</p>
                </GroupCardTitle>
                <GroupCardImage>
                    <Image
                        src="/images/group-image.png"
                        width={1000}
                        height={100}
                        alt="Group-image.png"
                    />
                    <GroupCardDescription>
                        <TextTruncate
                            line={1}
                            element="p"
                            truncateText="..."
                            text={group.description}
                        />
                    </GroupCardDescription>
                </GroupCardImage>
            </GroupCardContainer>
        </GroupCardLink>
    );
};

export default GroupCard;
