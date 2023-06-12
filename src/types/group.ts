export interface Group {
    id: string;
    name: string;
    description: string;
    data_created: Date | string;
}

export interface GroupFormData {
    name: string;
    description: string;
    data_created: Date | string;
    usersIdList: string[];
}

export const groupsStatistics = {
    groupsNumber: 0,
};

export interface GroupsStatistics {
    groupsNumber: number;
}

export interface GroupStatisticsObj {
    id: string;
    name: string;
    description: string;
    data_created: Date | string;
}
