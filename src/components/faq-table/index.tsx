import React from "react";
import { FAQTable, FAQList, FAQQuestion, FAQAnswer } from "./faq-table.styles";
import { useSelector } from "react-redux";
import { selectFaqState } from "@redux/slices/faqSlice";
import { FAQ } from "../../types/faq";

const FaqTable = () => {
    const { faqs } = useSelector(selectFaqState);
    return (
        <FAQTable>
            <h2>Frequently Asked Questions</h2>
            <FAQList>
                {!!faqs &&
                    faqs.map((faq: FAQ) => {
                        return (
                            <li key={faq.id}>
                                <FAQQuestion className="faq-question">
                                    {faq.question}
                                </FAQQuestion>
                                <FAQAnswer className="faq-answer">
                                    {faq.answer}
                                </FAQAnswer>
                            </li>
                        );
                    })}
            </FAQList>
        </FAQTable>
    );
};

export default FaqTable;
