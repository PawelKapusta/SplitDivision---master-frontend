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
import { Bill } from "../../types/bill";
import { getFormattedDate } from "../../utils/date";
import TextTruncate from "react-text-truncate";

export type TBillCardProps = {
    bill: Bill;
};
const BillCard = ({ bill }: TBillCardProps): JSX.Element => {
    const groupPath = `/bill/${bill.id}`;
    //////////
    return (
        <GroupCardLink href={groupPath}>
            <GroupCardContainer>
                <GroupCardTitle>
                    <p>{bill.name}</p>
                    <p>Created: {getFormattedDate(bill.data_created)}</p>
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
                            text={bill.description}
                        />
                    </GroupCardDescription>
                </GroupCardImage>
            </GroupCardContainer>
        </GroupCardLink>
    );
};

export default BillCard;
