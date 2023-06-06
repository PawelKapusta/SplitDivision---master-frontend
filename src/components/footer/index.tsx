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
                            <Link href="#">Careers</Link>
                            <Link href="#">Investors</Link>
                            <Link href="#">Company Blog</Link>
                        </Column>
                    </Grid>
                    <Grid item lg={3} md={3} xs={6}>
                        <Column>
                            <Title>Top Cities</Title>
                            <Link href="#">Cracow</Link>
                            <Link href="#">San Diego</Link>
                            <Link href="#">London</Link>
                            <Link href="#">Chicago</Link>
                        </Column>
                    </Grid>
                    <Grid item lg={3} md={3} xs={6}>
                        <Column>
                            <Title>Services</Title>
                            <Link href="#">Development</Link>
                            <Link href="#">Stage</Link>
                            <Link href="#">Production</Link>
                        </Column>
                    </Grid>
                    <Grid item lg={3} md={3} xs={6}>
                        <Column>
                            <Title>Social</Title>
                            <Link href="#">Instagram</Link>
                            <Link href="#">Twitter</Link>
                            <Link href="#">Facebook</Link>
                            <Link href="#">Linkedin</Link>
                        </Column>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default FooterContainer;
