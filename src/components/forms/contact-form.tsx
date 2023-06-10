import React, { useState, ChangeEvent, FormEvent, ReactElement } from "react";
import emailjs from "emailjs-com";
import { useSelector } from "react-redux";
import { selectUserState } from "@redux/slices/userSlice";
import {
    ContactCard,
    ContactRow,
    ContactButtonRow,
    Title,
} from "@styles/pages/contact.styles";
import LoadingButton from "@components/loading-button";
import useAlert from "../../hocs/useAlert";
import { useTranslation } from "react-i18next";

const ContactForm = (): ReactElement => {
    const { t } = useTranslation();
    const [formState, setFormState] = useState({
        topic: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const { showAlert, AlertWrapper } = useAlert();
    const { user } = useSelector(selectUserState);
    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const from_name = user.email;
        const { topic, description } = formState;
        const serviceId =
            process.env.NEXT_PUBLIC_API_EMAIL_SERVICE_ID || "secret";
        const templateId =
            process.env.NEXT_PUBLIC_API_EMAIL_TEMPLATE_ID || "secret";
        const userId = process.env.NEXT_PUBLIC_API_EMAIL_USER_ID || "secret";

        console.log(serviceId, templateId, userId);
        console.log(topic, description);
        emailjs
            .send(
                serviceId,
                templateId,
                { topic, description, from_name },
                userId,
            )
            .then(
                (result) => {
                    console.log(result.text);
                    setFormState({ topic: "", description: "" });
                    setLoading(false);
                    showAlert(
                        t(
                            "components.alert.messages.successSentEmailToAdministrator",
                        ),
                        "success",
                    );
                },
                (error) => {
                    console.error(error.text);
                    setLoading(false);
                    showAlert(
                        t(
                            "components.alert.messages.errorSentEmailToAdministrator",
                        ),
                        "error",
                    );
                },
            );
    };

    return (
        <ContactCard>
            <form onSubmit={handleSubmit}>
                <Title>
                    <h1>{t("components.contactForm.title")}</h1>
                </Title>
                <ContactRow>
                    <label htmlFor="topic">
                        {t("components.contactForm.topic")}
                    </label>
                    <input
                        type="text"
                        id="topic"
                        name="topic"
                        value={formState.topic}
                        onChange={handleInputChange}
                        required
                    />
                </ContactRow>
                <ContactRow>
                    <label htmlFor="description">
                        {t("components.contactForm.description")}
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formState.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </ContactRow>
                <ContactButtonRow>
                    <LoadingButton
                        disabled={false}
                        loading={loading}
                        variety="Contact"
                    >
                        {loading
                            ? t("components.contactForm.button.loadingText")
                            : t("components.contactForm.button.text")}
                    </LoadingButton>
                </ContactButtonRow>
            </form>
            <AlertWrapper />
        </ContactCard>
    );
};

export default ContactForm;
