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

const Bills: NextPage = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, token } = useSelector(selectAuthState);
    const { isLoading, userBills } = useSelector(selectBillState);
    let decodedToken: TDecodedJWTToken, userId: string;
    if (isAuthenticated) {
        decodedToken = getDecodedJWTToken(token);
        userId = decodedToken.id;
    }
    useEffect(() => {
        dispatch(fetchUserBills(userId));
    }, []);

    console.log(userBills);
    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : (
                <BillsContainer>
                    <h2>My bills</h2>
                    {!!userBills &&
                        userBills.map((bill: Bill) => {
                            return <BillCard bill={bill} />;
                        })}
                    {userBills.length === 0 ? (
                        <h4>
                            You don't have any bills. Go to your groups{" "}
                            <Link href="/groups">
                                <span>Click here!</span>
                            </Link>
                        </h4>
                    ) : null}
                </BillsContainer>
            )}
        </div>
    );
};

export default withAuth(Bills);
