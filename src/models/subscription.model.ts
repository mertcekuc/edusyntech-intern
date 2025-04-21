export interface Subscription{
    subscriptionId: string;
    userId: string;
    platform: string;
    subscriptionToken: string;
    subscriptionStatus: string;
    startDate: Date;
    endDate: Date;
    cancelDate: Date;
    plan: string;
    offer: string;
    region: string;
    currency: string;
    price: number;
    monthlyPrice: number;
    priceInUsd: number;
    monthlyPriceInUsd: number;
    paymentBetweenDates: number | null;
};
    