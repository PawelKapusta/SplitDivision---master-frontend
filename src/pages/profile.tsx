import type { NextPage } from "next";
import { withAuth } from "../hocs/withAuth";

const Profile: NextPage = () => {
    return <div>Profile</div>;
};

export default withAuth(Profile);
