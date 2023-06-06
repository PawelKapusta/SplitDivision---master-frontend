import React, { ReactElement } from "react";
import Image from "next/image";

import { LogoContainer } from "@components/logo/logo.styles";

const Logo = (): ReactElement => {
    return (
        <LogoContainer>
            <Image
                src="/images/logo.png"
                alt="logoImage"
                width="175"
                height="95"
            />
        </LogoContainer>
    );
};

export default Logo;
