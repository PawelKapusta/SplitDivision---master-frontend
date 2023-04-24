import React from "react";
import Head from "next/head";

import { Layout } from "../layout/layout";
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

const Home: React.FC = () => {
    return (
        <div>
            <Head>
                <title>Split Division</title>
                <meta property="og:title" content="My page title" key="title" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="icon" href="/icons/website-icon.svg" />
            </Head>
            <Layout>
                <MainBox>
                    <MainLeft />
                    <MainRight>
                        <Title>What is Split Division?</Title>
                        <Description>
                            This is a website for people who are looking for
                            modern way of splitting money between each other.
                            Here you can settle your debt by fiat and crypto
                            currency.
                        </Description>
                    </MainRight>
                </MainBox>
                <CardsTitle>
                    What features you can find in our website?
                </CardsTitle>
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
            </Layout>
        </div>
    );
};

export default Home;
