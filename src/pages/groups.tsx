import React, { useEffect } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "@redux/slices/authSlice";
import { TDecodedJWTToken } from "../types/jwt";
import { getDecodedJWTToken } from "../utils/jwt";
import { fetchUserGroups, selectGroupState } from "@redux/slices/groupSlice";
import Spinner from "@components/spinner";
import GroupCard from "@components/cards/group-card";
import { Group } from "../types/group";
import { GroupsContainer } from "@styles/pages/groups.styles";

const Groups: NextPage = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, token } = useSelector(selectAuthState);
    const { isLoading, userGroups } = useSelector(selectGroupState);
    let decodedToken: TDecodedJWTToken, userId: string;
    if (isAuthenticated) {
        decodedToken = getDecodedJWTToken(token);
        userId = decodedToken.id;
    }
    useEffect(() => {
        dispatch(fetchUserGroups(userId));
    }, []);

    console.log(userGroups);
    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : (
                <GroupsContainer>
                    <h2>My groups</h2>
                    {!!userGroups &&
                        userGroups.map((group: Group) => {
                            return <GroupCard group={group} />;
                        })}
                    {userGroups.length === 0 ? (
                        <h4>
                            You don't have any groups. Please click here{" "}
                            <Link href="/create/group">
                                <span>Click here!</span>
                            </Link>
                        </h4>
                    ) : null}
                </GroupsContainer>
            )}
        </div>
    );
};

export default Groups;
