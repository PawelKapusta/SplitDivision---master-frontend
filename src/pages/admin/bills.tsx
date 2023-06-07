import React, { ReactElement, useEffect } from "react";
import { withAdmin } from "../../hocs/withAdmin";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@components/spinner";
import { Title } from "@styles/pages/admin/admin.styles";
import useAlert from "../../hocs/useAlert";
import { fetchBills, selectBillState } from "@redux/slices/billSlice";
import { Bill } from "../../types/bill";
import BillCard from "@components/cards/bill-card";

const Bills = (): ReactElement => {
    const dispatch = useDispatch();
    const { isLoading, bills } = useSelector(selectBillState);
    const { AlertWrapper } = useAlert();
    useEffect(() => {
        dispatch(fetchBills());
    }, []);

    console.log("bills", bills);

    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : (
                <div>
                    <Title>All bills</Title>
                    {!!bills &&
                        bills.map((bill: Bill) => {
                            return (
                                <BillCard key={bill?.id} bill={bill} isAdmin />
                            );
                        })}
                    {bills.length === 0 ? <h4>There are no bills!</h4> : null}
                    <AlertWrapper />
                </div>
            )}
        </div>
    );
};

export default withAdmin(Bills);