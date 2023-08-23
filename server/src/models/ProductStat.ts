import mongoose from "mongoose";

interface IMonth {
    month: string;
    totalSales: number;
    totalUnits: number;
}
interface IDay {
    date: string;
    totalSales: number;
    totalUnits: number;
}
interface IProductStat {
    productId: string;
    yearlySalesTotal: number;
    yearlyTotalSoldUnits: number
    year: number;
    monthlyData: IMonth[];
    dailyData: IDay;
}
const ProductStatSchema = new mongoose.Schema<IProductStat>(
    {
        productId: {
            type: String,
            require: true
        },
        yearlySalesTotal: Number,
        yearlyTotalSoldUnits: Number,
        year: Number,
        monthlyData: [
            {
                month: String,
                totalSales: Number,
                totalUnits: Number
            }
        ],
        dailyData: {
            date: String,
            totalSales: Number,
            totalUnits: Number
        }
    }, { timestamps: true }
);
const ProductStat = mongoose.model<IProductStat>('ProductStat', ProductStatSchema);
export default ProductStat;