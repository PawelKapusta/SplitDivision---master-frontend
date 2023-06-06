import React, { ReactElement } from "react";
import Image from "next/image";

import {
    Card,
    ImageContainer,
    CoinContainer,
    Coin,
} from "./access-card.styles";

export type TAccessCard = {
    imageSrc: string;
    children: React.ReactNode;
};

const AccessCard = ({ imageSrc, children }: TAccessCard): ReactElement => {
    return (
        <Card>
            <ImageContainer>
                <CoinContainer>
                    <Coin src="/icons/bitcoin.svg" alt="bitcoin-icon" />
                </CoinContainer>
                <Image
                    priority
                    src={imageSrc}
                    width={1000}
                    height={1000}
                    alt={`${imageSrc} image`}
                />
            </ImageContainer>
            {children}
        </Card>
    );
};

export default AccessCard;
