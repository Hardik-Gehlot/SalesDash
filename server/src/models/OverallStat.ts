import mongoose from "mongoose";

interface IDay{
    date: string;
    totalSales: number;
    totalUnits: number;
}
interface IMonth{
    month: string;
    totalSales: number;
    totalUnits: number;
}
interface IOverallStat {
    totalCustomers: number;
    yearlySalesTotal: number;
    yearlyTotalSoldUnits: number;
    year: number;
    monthlyData:IMonth[];
    dailyData: IDay[],
    salesByCategory: {
        [key: string]: number;
    }

}
const OverallStatSchema = new mongoose.Schema<IOverallStat>(
    {
        totalCustomers: Number,
        yearlySalesTotal: Number,
        yearlyTotalSoldUnits: Number,
        year: Number,
        monthlyData: [
            {
                month: String,
                totalSales: Number,
                totalUnits: Number,
            },
        ],
        dailyData: [{
            date: String,
            totalSales: Number,
            totalUnits: Number,
        }],
        salesByCategory: {
            type: Map,
            of: Number,
        }
    }, { timestamps: true }
);
const OverallStat = mongoose.model<IOverallStat>('OverallStat', OverallStatSchema);
export default OverallStat;