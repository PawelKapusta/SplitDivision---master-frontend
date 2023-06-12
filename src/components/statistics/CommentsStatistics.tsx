import React, { useEffect, useState } from "react";
import { StatisticsPageScreens } from "@styles/statistics.styles";
import {
    commentsStatistics,
    CommentsStatistics,
    CommentStatisticsObj,
    SubcommentStatisticsObj,
} from "../../types/comment";

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
            <h1>Comments</h1>
            <h3>
                All comments in the application:
                <p>{commentsStatisticsData.commentsNumber}</p>
            </h3>
            <h3>
                All subcomments in the application:
                <p>{commentsStatisticsData.subcommentsNumber}</p>
            </h3>
        </StatisticsPageScreens>
    );
};

export default CommentsStatistics;
