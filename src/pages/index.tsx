import React, { useEffect } from "react";
import Image from "next/image";
import CardContent from "@components/card-content";
import {
    MainBox,
    MainLeft,
    MainRight,
    Title,
    Description,
    Cards,
    CardsRow,
    CardsTitle,
} from "@styles/pages/home.styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectUserState } from "@redux/slices/userSlice";
import { selectAuthState } from "@redux/slices/authSlice";
import { getDecodedJWTToken } from "../utils/jwt";
import { TDecodedJWTToken } from "../types/jwt";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { user, users } = useSelector(selectUserState);
    const { isAuthenticated, token } = useSelector(selectAuthState);
    let decodedToken: TDecodedJWTToken, userId: string;
    if (isAuthenticated) {
        decodedToken = getDecodedJWTToken(token);
        userId = decodedToken.id;
    }

    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [isAuthenticated]);

    return (
        <div>
            <MainBox>
                <MainLeft>
                    <Image
                        priority
                        src="/images/main-image.png"
                        alt="main-image.png"
                        width={500}
                        height={500}
                    />
                </MainLeft>
                <MainRight>
                    <Title>
                        {t("screens.home.mainTitle", {
                            name: "Split Division?",
                        })}
                    </Title>
                    <Description>{t("screens.home.description")}</Description>
                </MainRight>
            </MainBox>
            <CardsTitle>{t("screens.home.cardsTitle")}</CardsTitle>
            <Cards>
                <CardsRow>
                    <CardContent
                        src="/icons/home-page-account.svg"
                        text={t("screens.home.cards.freeAccount")}
                    />
                    <CardContent
                        src="/icons/home-page-currency-exchange.svg"
                        text={t("screens.home.cards.settle")}
                    />
                    <CardContent
                        src="/icons/home-page-dollar-bitcoin-exchange.svg"
                        text={t("screens.home.cards.crypto")}
                    />
                    <CardContent
                        src="/icons/home-page-subscriptions.svg"
                        text={t("screens.home.cards.expenses")}
                    />
                </CardsRow>
                <CardsRow>
                    <CardContent
                        src="/icons/home-page-stocks.svg"
                        text={t("screens.home.cards.stocks")}
                    />
                    <CardContent
                        src="/icons/home-page-create.svg"
                        text={t("screens.home.cards.groupsAndBills")}
                    />
                    <CardContent
                        src="/icons/home-page-statistics.svg"
                        text={t("screens.home.cards.statistics")}
                    />
                    <CardContent
                        src="/icons/home-page-expenses.svg"
                        text={t("screens.home.cards.comment")}
                    />
                </CardsRow>
            </Cards>
        </div>
    );
};

export default Home;
