import Translation from "@components/translation";
import React from "react";
import { useTranslation } from "react-i18next";
import { SettingsPage, SettingRow } from "@styles/pages/settings.styles";
import Image from "next/image";

const Settings = () => {
    const { t } = useTranslation();
    return (
        <SettingsPage>
            <h1>Settings Page</h1>
            <SettingRow>
                <Image
                    src="/icons/language-icon.svg"
                    width={40}
                    height={50}
                    alt="Language-icon.svg"
                />
                <h3>Choose website language</h3>
                <Translation />
            </SettingRow>
            <h4>{t("test")}</h4>
            <SettingRow>
                <Image
                    src="/icons/premium-diamond-icon.svg"
                    width={40}
                    height={50}
                    alt="Premium-diamond--icon.svg"
                />
                <h3>Buy premium</h3>
                <button>Buy</button>
            </SettingRow>
        </SettingsPage>
    );
};

export default Settings;
