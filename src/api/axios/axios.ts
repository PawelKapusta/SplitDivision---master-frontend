import { useSession } from "next-auth/react";
import axios from "axios";

export const useAuthAxios = () => {
    const { data: session } = useSession();

    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_URL,
        headers: {
            Authorization: `Bearer ${session}`,
        },
    });
};
