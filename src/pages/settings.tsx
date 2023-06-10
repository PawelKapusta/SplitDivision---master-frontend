import Translation from "@components/translation";
import React from "react";
import { useTranslation } from "react-i18next";
import { SettingsPage, SettingRow } from "@styles/pages/settings.styles";
import Image from "next/image";

const Settings = () => {
    const { t } = useTranslation();
    return (
        <SettingsPage>
            <h1>{t("screens.settings.title")}</h1>
            <SettingRow>
                <Image
                    src="/icons/language-icon.svg"
                    width={40}
                    height={50}
                    alt="Language-icon.svg"
                />
                <h3>{t("screens.settings.chooseLanguageText")}</h3>
                <Translation />
            </SettingRow>
            <SettingRow>
                <Image
                    src="/icons/premium-diamond-icon.svg"
                    width={40}
                    height={50}
                    alt="Premium-diamond--icon.svg"
                />
                <h3>{t("screens.settings.buyPremium")}</h3>
                <button>{t("screens.settings.buttonBuyText")}</button>
            </SettingRow>
        </SettingsPage>
    );
};

export default Settings;
