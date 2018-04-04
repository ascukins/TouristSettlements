
export interface Spending {
        amount: number;
        comment: string;
        beneficiaries: string[];
}

export interface Tourist {
    name: string;
    spendings: Spending[];
}

export interface TouristSummary {
    name: string;
    spent: number;
    received: number;
//    balance: number;
}

