import React from "react";
import Image from "next/image";

import { Card, CardText } from "@styles/pages/home.styles";

export type TCardContent = {
    src: string;
    text: string;
};

const CardContent = ({ src, text }: TCardContent): JSX.Element => {
    return (
        <Card>
            <Image
                priority
                src={src}
                height={35}
                width={35}
                alt={`${text} icon`}
            />
            <CardText>{text}</CardText>
        </Card>
    );
};

export default CardContent;
