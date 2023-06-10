import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { TranslationSelect } from "@components/translation/translation.styles";

const Translation = (): ReactElement => {
    const { i18n } = useTranslation();
    const onLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(event.target.value);
        localStorage.setItem("language", event.target.value);
    };

    return (
        <TranslationSelect onChange={onLanguageChange} value={i18n.language}>
            <option value="en">English</option>
            <option value="pl">Polish</option>
            <option value="de">German</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
        </TranslationSelect>
    );
};
export default Translation;
