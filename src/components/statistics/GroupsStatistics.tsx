import React, { useEffect, useState } from "react";
import { StatisticsPageScreens } from "@styles/statistics.styles";
import {
    GroupsStatistics,
    groupsStatistics,
    GroupStatisticsObj,
} from "../../types/group";

export type TGroupsStatisticsProp = {
    groups: GroupStatisticsObj[];
};

const GroupsStatistics = ({ groups }: TGroupsStatisticsProp) => {
    const [groupsStatisticsData, setGroupsStatisticsData] =
        useState<GroupsStatistics>(groupsStatistics);

    useEffect(() => {
        let groupsNumber = 0;

        groups.forEach((group) => {
            if (group) {
                groupsNumber += 1;
            }
        });

        setGroupsStatisticsData({
            groupsNumber: groupsNumber,
        });
    }, []);

    return (
        <StatisticsPageScreens>
            <h1>Groups</h1>
            <h3>
                All groups in the application:
                <p>{groupsStatisticsData.groupsNumber}</p>
            </h3>
        </StatisticsPageScreens>
    );
};

export default GroupsStatistics;
