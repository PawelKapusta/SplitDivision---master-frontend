import React from "react";
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

export type TBillCardProps = {
    bill: Bill;
};
const BillCard = ({ bill }: TBillCardProps): JSX.Element => {
    const groupPath = `/bill/${bill.id}`;

    return (
        <CardLink href={groupPath}>
            <CardContainer isBill>
                <CardTitle>
                    <p>{bill.name}</p>
                    <p>Created: {getFormattedDate(bill.data_created)}</p>
                    <p>Ends: {getFormattedDate(bill.data_end)}</p>
                </CardTitle>
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
