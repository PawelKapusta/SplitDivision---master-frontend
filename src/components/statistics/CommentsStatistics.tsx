import React, { useEffect, useState } from "react";
import { StatisticsPageScreens } from "@styles/statistics.styles";
import {
    commentsStatistics,
    CommentsStatistics,
    CommentStatisticsObj,
    SubcommentStatisticsObj,
} from "../../types/comment";
import { useTranslation } from "react-i18next";

export type TCommentsStatisticsProp = {
    comments: CommentStatisticsObj[];
    subcomments: SubcommentStatisticsObj[];
};

const CommentsStatistics = ({
    comments,
    subcomments,
}: TCommentsStatisticsProp) => {
    const [commentsStatisticsData, setCommentsStatisticsData] =
        useState<CommentsStatistics>(commentsStatistics);
    const { t } = useTranslation();
    useEffect(() => {
        let commentsNumber = 0;
        let subcommentsNumber = 0;

        comments.forEach((comment) => {
            if (comment) {
                commentsNumber += 1;
            }
        });
        subcomments.forEach((subcomment) => {
            if (subcomment) {
                subcommentsNumber += 1;
            }
        });

        setCommentsStatisticsData({
            commentsNumber: commentsNumber,
            subcommentsNumber: subcommentsNumber,
        });
    }, []);

    return (
        <StatisticsPageScreens>
            <h1>{t("screens.statistics.components.comment.title")}</h1>
            <h3>
                {t("screens.statistics.components.comment.comments")}
                <p>{commentsStatisticsData.commentsNumber}</p>
            </h3>
            <h3>
                {t("screens.statistics.components.comment.subcomments")}
                <p>{commentsStatisticsData.subcommentsNumber}</p>
            </h3>
        </StatisticsPageScreens>
    );
};

export default CommentsStatistics;
