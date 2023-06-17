import type { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFaqs, selectFaqState } from "@redux/slices/faqSlice";
import Spinner from "@components/spinner";
import FaqTable from "@components/faq-table";

const FAQ: NextPage = () => {
    const dispatch = useDispatch();
    const { isLoading, faqs } = useSelector(selectFaqState);

    useEffect(() => {
        dispatch(fetchFaqs());
    }, [dispatch]);

    return <div>{isLoading ? <Spinner /> : <FaqTable />}</div>;
};

export default FAQ;
