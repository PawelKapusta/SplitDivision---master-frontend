import React, { ReactElement, useEffect } from "react";
import { withAdmin } from "../../hocs/withAdmin";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@components/spinner";
import { Title } from "@styles/pages/admin/admin.styles";
import useAlert from "../../hocs/useAlert";
import { fetchBills, selectBillState } from "@redux/slices/billSlice";
import { Bill } from "../../types/bill";
import BillCard from "@components/cards/bill-card";
import { useTranslation } from "react-i18next";

const Bills = (): ReactElement => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { isLoading, bills } = useSelector(selectBillState);
    const { AlertWrapper } = useAlert();

    useEffect(() => {
        dispatch(fetchBills());
    }, []);

    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : (
                <div>
                    <Title>{t("screens.admin.bills.title")}</Title>
                    {!!bills &&
                        bills.map((bill: Bill) => {
                            return (
                                <BillCard key={bill?.id} bill={bill} isAdmin />
                            );
                        })}
                    {bills.length === 0 ? (
                        <h4>{t("screens.admin.bills.noBillsText")}</h4>
                    ) : null}
                    <AlertWrapper />
                </div>
            )}
        </div>
    );
};

export default withAdmin(Bills);
