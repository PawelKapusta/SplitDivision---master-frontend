import React, { ReactElement } from "react";
import { FAQTable, FAQList, FAQQuestion, FAQAnswer } from "./faq-table.styles";
import { useSelector } from "react-redux";
import { selectFaqState } from "@redux/slices/faqSlice";
import { FAQ } from "../../types/faq";
import { useTranslation } from "react-i18next";

const FaqTable = (): ReactElement => {
    const { faqs } = useSelector(selectFaqState);
    const { t } = useTranslation();
    return (
        <FAQTable>
            <h2>{t("screens.faq.title")}</h2>
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
