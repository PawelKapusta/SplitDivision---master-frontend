import React, { useEffect } from "react";
import Image from "next/image";
import CardContent from "@components/CardContent";
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

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const { user, users } = useSelector(selectUserState);
    const { isAuthenticated, token } = useSelector(selectAuthState);
    let decodedToken: TDecodedJWTToken, userId: string;
    if (isAuthenticated) {
        decodedToken = getDecodedJWTToken(token);
        userId = decodedToken.id;
    }

    useEffect(() => {
        console.log("here");
        dispatch(fetchUser(userId));
    }, [isAuthenticated]);

    console.log("user", user);

    return (
        <div>
            <MainBox>
                <MainLeft>
                    <Image
                        src="/images/main-image.png"
                        alt="main-image.png"
                        width={600}
                        height={600}
                        loading="lazy"
                    />
                </MainLeft>
                <MainRight>
                    <Title>What is Split Division?</Title>
                    <Description>
                        This is a website for people who are looking for modern
                        way of splitting money between each other. Here you can
                        settle your debt by fiat and crypto currency.
                    </Description>
                </MainRight>
            </MainBox>
            <CardsTitle>What features you can find in our website?</CardsTitle>
            <Cards>
                <CardsRow>
                    <CardContent
                        src="/icons/home-page-account.svg"
                        text="Create free account"
                    />
                    <CardContent
                        src="/icons/home-page-currency-exchange.svg"
                        text="Settle in different world currencies"
                    />
                    <CardContent
                        src="/icons/home-page-dollar-bitcoin-exchange.svg"
                        text="Possibility of settlement in cryptocurrencies"
                    />
                    <CardContent
                        src="/icons/home-page-subscriptions.svg"
                        text="Take control of your expenses"
                    />
                </CardsRow>
                <CardsRow>
                    <CardContent
                        src="/icons/home-page-stocks.svg"
                        text="Stocks exchange preview"
                    />
                    <CardContent
                        src="/icons/home-page-create.svg"
                        text="Create groups & bills"
                    />
                    <CardContent
                        src="/icons/home-page-statistics.svg"
                        text="Look into statistics"
                    />
                    <CardContent
                        src="/icons/home-page-expenses.svg"
                        text="Take control of your expenses"
                    />
                </CardsRow>
            </Cards>
        </div>
    );
};

export default Home;
