import React, { ReactElement } from "react";

import { Box, Container, Grid } from "@mui/material";

import { Link, Title, Column } from "./footer.styles";
import { useTranslation } from "react-i18next";

const FooterContainer = (): ReactElement => {
    const { t } = useTranslation();
    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
                backgroundColor: "#eaaf57",
                paddingTop: "25px",
                paddingBottom: "10px",
            }}
        >
            <Container>
                <Grid container spacing={2} justifyContent="space-between">
                    <Grid item lg={3} md={3} xs={6}>
                        <Column>
                            <Title>
                                {t("components.footer.aboutUs.title")}
                            </Title>
                            <Link href="#">
                                {t("components.footer.aboutUs.careers")}
                            </Link>
                            <Link href="#">
                                {t("components.footer.aboutUs.investors")}
                            </Link>
                            <Link href="#">
                                {t("components.footer.aboutUs.blog")}
                            </Link>
                        </Column>
                    </Grid>
                    <Grid item lg={3} md={3} xs={6}>
                        <Column>
                            <Title>
                                {t("components.footer.topCities.title")}
                            </Title>
                            <Link href="#">
                                {t("components.footer.topCities.cracow")}
                            </Link>
                            <Link href="#">
                                {t("components.footer.topCities.sanDiego")}
                            </Link>
                            <Link href="#">
                                {t("components.footer.topCities.london")}
                            </Link>
                            <Link href="#">
                                {t("components.footer.topCities.chicago")}
                            </Link>
                        </Column>
                    </Grid>
                    <Grid item lg={3} md={3} xs={6}>
                        <Column>
                            <Title>
                                {t("components.footer.services.title")}
                            </Title>
                            <Link href="#">
                                {t("components.footer.services.development")}
                            </Link>
                            <Link href="#">
                                {t("components.footer.services.stage")}
                            </Link>
                            <Link href="#">
                                {t("components.footer.services.production")}
                            </Link>
                        </Column>
                    </Grid>
                    <Grid item lg={3} md={3} xs={6}>
                        <Column>
                            <Title>{t("components.footer.social.title")}</Title>
                            <Link href="#">
                                {t("components.footer.social.instagram", {
                                    instagram: "Instagram",
                                })}
                            </Link>
                            <Link href="#">
                                {t("components.footer.social.twitter", {
                                    twitter: "Twitter",
                                })}
                            </Link>
                            <Link href="#">
                                {t("components.footer.social.facebook", {
                                    facebook: "Facebook",
                                })}
                            </Link>
                            <Link href="#">
                                {t("components.footer.social.linkedin", {
                                    linkedin: "Linkedin",
                                })}
                            </Link>
                        </Column>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default FooterContainer;
