import React from "react";
import { NextPage } from "next";
import { withPremium } from "../hocs/withPremium";

const Statistics: NextPage = () => {
    return <div>statistics</div>;
};

export default withPremium(Statistics);
