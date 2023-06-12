import React, { useEffect } from "react";
import { NextPage } from "next";
import { withPremium } from "../hocs/withPremium";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, selectUserState } from "@redux/slices/userSlice";
import { useTranslation } from "react-i18next";
import { selectAuthState } from "@redux/slices/authSlice";
import {
    fetchBills,
    fetchUserBills,
    selectBillState,
} from "@redux/slices/billSlice";
import {
    ApplicationStatistics,
    Section,
    SectionRow,
    SectionTitle,
    StatisticsContent,
    StatisticsImage,
    StatisticsPage,
    Title,
} from "@styles/statistics.styles";
import Spinner from "@components/spinner";
import Image from "next/image";
import UsersStatistics from "@components/statistics/UsersStatistics";
import GroupsStatistics from "@components/statistics/GroupsStatistics";
import {
    fetchGroups,
    fetchUserGroups,
    selectGroupState,
} from "@redux/slices/groupSlice";
import BillsStatistics from "@components/statistics/BillsStatistics";
import {
    fetchComments,
    fetchSubcomments,
    fetchUserCommentsAndSubcomments,
    selectCommentState,
} from "@redux/slices/commentSlice";
import CommentsStatistics from "@components/statistics/CommentsStatistics";
import {
    fetchSubscriptions,
    fetchSubscriptionsBought,
    fetchUserSubscriptions,
    selectSubscriptionState,
} from "@redux/slices/subscriptionSlice";
import SubscriptionsStatistics from "@components/statistics/SubscriptionsStatistic";
import { TDecodedJWTToken } from "../types/jwt";
import { getDecodedJWTToken } from "../utils/jwt";
import SingleUserStatistics from "@components/statistics/SingleUserStatistics";

const Statistics: NextPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { isAuthenticated, token } = useSelector(selectAuthState);
    let decodedToken: TDecodedJWTToken, userId: string;
    if (isAuthenticated) {
        decodedToken = getDecodedJWTToken(token);
        userId = decodedToken.id;
    }
    const {
        isLoading: billLoading,
        bills,
        userBills,
    } = useSelector(selectBillState);
    const {
        isLoading: groupsLoading,
        groups,
        userGroups,
    } = useSelector(selectGroupState);
    const {
        isLoading: subscriptionsLoading,
        subscriptions,
        subscriptionsBought,
        subscriptionsUsers,
    } = useSelector(selectSubscriptionState);
    const {
        isLoading: commentsLoading,
        comments,
        subcomments,
        userCommentsAndSubcomments,
    } = useSelector(selectCommentState);
    const { isLoading: usersLoading, users } = useSelector(selectUserState);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchUsers());
            dispatch(fetchBills());
            dispatch(fetchGroups());
            dispatch(fetchComments());
            dispatch(fetchSubcomments());
            dispatch(fetchSubscriptions());
            dispatch(fetchSubscriptionsBought());
            dispatch(fetchUserGroups(userId as string));
            dispatch(fetchUserBills(userId as string));
            dispatch(fetchUserCommentsAndSubcomments(userId as string));
            dispatch(fetchUserSubscriptions(userId as string));
        }
    }, [dispatch, isAuthenticated]);

    return (
        <StatisticsPage>
            {billLoading ||
            usersLoading ||
            groupsLoading ||
            commentsLoading ||
            subscriptionsLoading ? (
                <Spinner isSmall />
            ) : (
                <StatisticsContent>
                    <Title>
                        <h1>{t("screens.statistics.title")}</h1>
                    </Title>
                    <StatisticsImage>
                        <Image
                            src="/images/statistics-title.png"
                            alt="statistics-title"
                            width={300}
                            height={300}
                        />
                    </StatisticsImage>
                    <ApplicationStatistics>
                        <SectionTitle>
                            {t("screens.statistics.yourStatistics")}
                        </SectionTitle>
                        <Section>
                            <SectionRow>
                                <SingleUserStatistics
                                    groups={userGroups}
                                    bills={userBills}
                                    comments={
                                        userCommentsAndSubcomments &&
                                        userCommentsAndSubcomments.userComments
                                    }
                                    subcomments={
                                        userCommentsAndSubcomments &&
                                        userCommentsAndSubcomments.userSubcomments
                                    }
                                    subscriptions={subscriptionsUsers}
                                />
                            </SectionRow>
                        </Section>
                        <SectionTitle>
                            {t("screens.statistics.appStatistics")}
                        </SectionTitle>
                        <Section>
                            <SectionRow>
                                <UsersStatistics users={users} />
                            </SectionRow>
                            <SectionRow>
                                <GroupsStatistics groups={groups} />
                                <BillsStatistics bills={bills} />
                            </SectionRow>
                            <SectionRow>
                                <CommentsStatistics
                                    comments={comments}
                                    subcomments={subcomments}
                                />
                                <SubscriptionsStatistics
                                    subscriptions={subscriptions}
                                    subscriptionsBought={subscriptionsBought}
                                />
                            </SectionRow>
                        </Section>
                    </ApplicationStatistics>
                </StatisticsContent>
            )}
        </StatisticsPage>
    );
};

export default withPremium(Statistics);
