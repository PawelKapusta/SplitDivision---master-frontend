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
}
