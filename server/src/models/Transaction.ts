import mongoose from "mongoose";

interface ITransaction{
    userId:string;
    cost:string;
    products: any;
}
const TransactionSchema = new mongoose.Schema<ITransaction>(
    {
        userId:{
            type: String,
            require: true
        },
        cost: String,
        products: {
            type: [mongoose.Types.ObjectId],
            of: Number
        }
    }, { timestamps: true }
);
const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);
export default Transaction;