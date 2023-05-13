import React from "react";

import { Box, Container, Grid } from "@mui/material";

import { Link, Title, Column } from "./footer.styles";

const FooterContainer = (): JSX.Element => {
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
                            <Title>About Us</Title>
                            <Link href="#">Story</Link>
                            <Link href="#">Clients</Link>
                            <Link href="#">Testimonials</Link>
                        </Column>
                    </Grid>
                    <Grid item lg={3} md={3} xs={6}>
                        <Column>
                            <Title>Services</Title>
                            <Link href="#">Marketing</Link>
                            <Link href="#">Consulting</Link>
                            <Link href="#">Development</Link>
                            <Link href="#">Design</Link>
                        </Column>
                    </Grid>
                    <Grid item lg={3} md={3} xs={6}>
                        <Column>
                            <Title>Contact Us</Title>
                            <Link href="#">United States</Link>
                            <Link href="#">United Kingdom</Link>
                            <Link href="#">Australia</Link>
                            <Link href="#">Support</Link>
                        </Column>
                    </Grid>
                    <Grid item lg={3} md={3} xs={6}>
                        <Column>
                            <Title>Social</Title>
                            <Link href="#">Facebook</Link>
                            <Link href="#">Instagram</Link>
                            <Link href="#">Youtube</Link>
                            <Link href="#">Twitter</Link>
                        </Column>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default FooterContainer;
