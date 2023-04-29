import type { NextPage } from "next";
import { withAuth } from "../hocs/withAuth";

const FAQ: NextPage = () => {
    return <div>FAQ</div>;
};

export default withAuth(FAQ);
