import React, { useEffect, useState } from "react";
import {
    UsersStatistics,
    usersStatistics,
    UserStatisticsObj,
} from "../../types/user";
import { StatisticsPageScreens } from "@styles/statistics.styles";

export type TUsersStatisticsProp = {
    users: UserStatisticsObj[];
};

const UsersStatistics = ({ users }: TUsersStatisticsProp) => {
    const [usersStatisticsData, setUsersStatisticsData] =
        useState<UsersStatistics>(usersStatistics);

    useEffect(() => {
        let usersNumber = 0;
        let adminUsers = 0;
        let blockedUsers = 0;
        const usersServices: { [key: string]: number } = {
            website: 0,
            facebook: 0,
            google: 0,
            slack: 0,
        };
        const usersGenders: { [key: string]: number } = {
            male: 0,
            female: 0,
            other: 0,
        };

        users.forEach((user) => {
            const service = user.service;
            const gender = user.gender;

            if (user) {
                usersNumber += 1;
            }

            if (user.is_admin) {
                adminUsers += 1;
            }

            if (user.is_blocked) {
                blockedUsers += 1;
            }

            if (service in usersServices) {
                usersServices[service] += 1;
            }

            if (gender in usersGenders) {
                usersGenders[gender] += 1;
            }
        });

        setUsersStatisticsData({
            usersNumber: usersNumber,
            adminUsers: adminUsers,
            blockedUsers: blockedUsers,
            services: usersServices,
            gender: usersGenders,
        });
    }, []);

    return (
        <StatisticsPageScreens>
            <h1>Users</h1>
            <h3>
                All users in the application:
                <p>{usersStatisticsData.usersNumber}</p>
            </h3>
            <h3>
                Admin users in the application:
                <p>{usersStatisticsData.adminUsers}</p>
            </h3>
            <h3>
                Blocked users in the application:
                <p> {usersStatisticsData.blockedUsers}</p>
            </h3>
            <h3>
                Users divided by services:
                <p>
                    {Object.entries(usersStatisticsData.services).map(
                        ([service, number]) => {
                            return (
                                <div>
                                    <p>
                                        {service}: {number}
                                    </p>
                                </div>
                            );
                        },
                    )}
                </p>
            </h3>
            <h3>
                Users divided by gender:
                <p>
                    {Object.entries(usersStatisticsData.gender).map(
                        ([gender, number]) => {
                            return (
                                <div>
                                    <p>
                                        {gender}: {number}
                                    </p>
                                </div>
                            );
                        },
                    )}
                </p>
            </h3>
        </StatisticsPageScreens>
    );
};

export default UsersStatistics;
