import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
    ContactButtonRow,
    ContactCard,
    ContactRow,
} from "@styles/pages/contact.styles";
import LoadingButton from "@components/loading-button";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import useAlert from "../../hocs/useAlert";
import { createFaq, selectFaqState } from "@redux/slices/faqSlice";
import { useDispatch, useSelector } from "react-redux";

const FAQ: NextPage = () => {
    const [formState, setFormState] = useState({
        question: "",
        answer: "",
    });
    const { t } = useTranslation();
    const { showAlert, AlertWrapper } = useAlert();
    const dispatch = useDispatch();
    const { isLoading, success, error } = useSelector(selectFaqState);

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const faqsData = {
            question: formState?.question,
            answer: formState?.answer,
        };
        dispatch(createFaq(faqsData));
        setFormState({ question: "", answer: "" });
    };

    useEffect(() => {
        if (success) {
            showAlert(
                t("components.alert.messages.successCreateFAQ"),
                "success",
            );
        } else if (error) {
            showAlert(error.toString(), "error");
        }
    }, [success]);

    return (
        <div>
            <ContactCard>
                <form onSubmit={handleSubmit}>
                    <h1 style={{ textAlign: "center" }}>
                        {t("screens.admin.faq.title")}
                    </h1>
                    <ContactRow>
                        <label>{t("screens.admin.faq.label.question")}</label>
                        <input
                            type="text"
                            id="question"
                            name="question"
                            value={formState.question}
                            onChange={handleInputChange}
                            required
                        />
                    </ContactRow>
                    <ContactRow>
                        <label>{t("screens.admin.faq.label.answer")}</label>
                        <textarea
                            id="answer"
                            name="answer"
                            value={formState.answer}
                            onChange={handleInputChange}
                            required
                        />
                    </ContactRow>
                    <ContactButtonRow>
                        <LoadingButton
                            disabled={false}
                            loading={false}
                            variety="Contact"
                        >
                            {isLoading
                                ? t("screens.admin.faq.button.loadingText")
                                : t("screens.admin.faq.button.text")}
                        </LoadingButton>
                    </ContactButtonRow>
                </form>
                <AlertWrapper />
            </ContactCard>
        </div>
    );
};

export default FAQ;
