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
import { withAuth } from "../hocs/withAuth";
import { useTranslation } from "react-i18next";

const Groups: NextPage = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, token } = useSelector(selectAuthState);
    const { isLoading, userGroups } = useSelector(selectGroupState);
    const { t } = useTranslation();
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
                    <h2>{t("screens.groups.title")}</h2>
                    {!!userGroups &&
                        userGroups.map((group: Group) => {
                            return <GroupCard key={group.id} group={group} />;
                        })}
                    {userGroups.length === 0 ? (
                        <h4>
                            {t("screens.groups.noGroupsText")}
                            <Link href="/create/group">
                                <span>{t("screens.groups.buttonText")}</span>
                            </Link>
                        </h4>
                    ) : null}
                </GroupsContainer>
            )}
        </div>
    );
};

export default withAuth(Groups);
