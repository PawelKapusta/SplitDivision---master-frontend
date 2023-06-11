import React from "react";
import { NextPage } from "next";
import { withPremium } from "../hocs/withPremium";

const Charts: NextPage = () => {
    return <div>Charts</div>;
};

export default withPremium(Charts);
