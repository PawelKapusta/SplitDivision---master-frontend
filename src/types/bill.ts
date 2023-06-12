export interface Bill {
    id: string;
    name: string;
    description: string;
    data_created: Date | string;
    data_end: Date | string;
    bill_image: string;
    currency_type: string;
    currency_code: string;
    debt: number;
    code_qr: string;
    owner_id: string;
    group_id: string;
}

export interface BillsUsers {
    id: string;
    debt: number;
    is_regulated: boolean;
    user_id: string;
    bill_id: string;
}

export interface BillsUsersUpdateData {
    bill_id: string;
    user_id: string;
}

export interface BillUsersDebt {
    id: string;
    debt: number;
}

export interface BillFormData {
    name: string;
    description: string;
    data_created: Date | string;
    data_end: Date | string;
    bill_image: string;
    currency_type: string;
    currency_code: string;
    debt: number;
    code_qr: string;
    owner_id: string;
    group_id: string;
    usersIdList: string[];
    usersIdDebtList: BillUsersDebt[];
}

export interface UserSelectedDebts {
    [key: string]: number;
}

export const billsStatistics = {
    billsNumber: 0,
    currencyTypesNumber: {},
    currencyCodesNumber: {},
};

export interface BillsStatistics {
    billsNumber: number;
    currencyTypesNumber: { [key: string]: number };
    currencyCodesNumber: { [key: string]: number };
}

export interface BillStatisticsObj {
    id: string;
    name: string;
    description: string;
    data_created: Date | string;
    data_end: Date | string;
    bill_image: string;
    currency_type: string;
    currency_code: string;
    debt: number;
    code_qr: string;
    owner_id: string;
    group_id: string;
}
