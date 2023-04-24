import type { NextPage } from "next";
import { selectAuthState, setAuthState } from "@redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "@redux/store";
import Link from "next/link";

const FAQ: NextPage = () => {
    return <div>FAQ</div>;
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ params }) => {
            // we can set the initial state from here
            await store.dispatch(setAuthState(false));

            console.log("State on server", store.getState());

            return {
                props: {
                    authState: false,
                },
            };
        },
);

export default FAQ;
