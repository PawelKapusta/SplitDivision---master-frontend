import React from "react";
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

export type TGroupCardProps = {
    group: Group;
};
const GroupCard = ({ group }: TGroupCardProps): JSX.Element => {
    const groupPath = `/group/${group.id}`;
    return (
        <CardLink href={groupPath}>
            <CardContainer>
                <CardTitle>
                    <p>{group.name}</p>
                    <p>Created: {getFormattedDate(group.data_created)}</p>
                </CardTitle>
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
        </CardLink>
    );
};

export default GroupCard;
