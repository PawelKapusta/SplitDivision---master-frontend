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
