import React, { useEffect } from "react";
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
import { fetchUsers, selectUserState } from "@redux/slices/userSlice";
import { useSession } from "next-auth/react";

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const { users } = useSelector(selectUserState);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    console.log(users);

    return (
        <div>
            <MainBox>
                <MainLeft />
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
