import React, { useEffect, useState } from "react";
import { StatisticsPageScreens } from "@styles/statistics.styles";
import {
    GroupsStatistics,
    groupsStatistics,
    GroupStatisticsObj,
} from "../../types/group";
import { useTranslation } from "react-i18next";

export type TGroupsStatisticsProp = {
    groups: GroupStatisticsObj[];
};

const GroupsStatistics = ({ groups }: TGroupsStatisticsProp) => {
    const [groupsStatisticsData, setGroupsStatisticsData] =
        useState<GroupsStatistics>(groupsStatistics);
    const { t } = useTranslation();
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
            <h1>{t("screens.statistics.components.group.title")}</h1>
            <h3>
                {t("screens.statistics.components.group.groups")}
                <p>{groupsStatisticsData.groupsNumber}</p>
            </h3>
        </StatisticsPageScreens>
    );
};

export default GroupsStatistics;
