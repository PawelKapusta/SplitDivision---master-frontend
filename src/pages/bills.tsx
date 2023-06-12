import React, { useEffect } from "react";
import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "@redux/slices/authSlice";
import { TDecodedJWTToken } from "../types/jwt";
import { getDecodedJWTToken } from "../utils/jwt";
import { fetchUserBills, selectBillState } from "@redux/slices/billSlice";
import Spinner from "@components/spinner";
import { BillsContainer } from "@styles/pages/bills.styles";
import Link from "next/link";
import BillCard from "@components/cards/bill-card";
import { Bill } from "../types/bill";
import { withAuth } from "../hocs/withAuth";
import useAlert from "../hocs/useAlert";
import { useTranslation } from "react-i18next";

const Bills: NextPage = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, token } = useSelector(selectAuthState);
    const { isLoading, userBills } = useSelector(selectBillState);
    const { AlertWrapper } = useAlert();
    const { t } = useTranslation();
    let decodedToken: TDecodedJWTToken, userId: string;
    if (isAuthenticated) {
        decodedToken = getDecodedJWTToken(token);
        userId = decodedToken.id;
    }
    useEffect(() => {
        dispatch(fetchUserBills(userId));
    }, []);

    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : (
                <BillsContainer>
                    <h2>{t("screens.bills.title")}</h2>
                    {!!userBills &&
                        userBills.map((bill: Bill) => {
                            return <BillCard key={bill?.id} bill={bill} />;
                        })}
                    {userBills.length === 0 ? (
                        <h4>
                            {t("screens.bills.noBillsText")}
                            <Link href="/groups">
                                <span>{t("screens.bills.buttonText")}</span>
                            </Link>
                        </h4>
                    ) : null}
                </BillsContainer>
            )}
            <AlertWrapper />
        </div>
    );
};

export default withAuth(Bills);
