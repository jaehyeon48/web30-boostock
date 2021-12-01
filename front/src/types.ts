export enum ORDER_TYPE {
	ASK = 1,
	BID = 2,
}

export enum BALANCE_TYPE {
	DEPOSIT = 1,
	WITHDRAW = 2,
}

export enum STATUS_TYPE {
	PENDING = 1,
	PROCEEDING = 2,
	FINISHED = 3,
	CANCELED = 4,
}

export interface IChartItem {
	createdAt: number;
	priceStart: number;
	priceEnd: number;
	priceLow: number;
	priceHigh: number;
	amount: number;
}
