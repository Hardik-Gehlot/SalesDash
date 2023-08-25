import mongoose from "mongoose";

interface IJoin{
    type: mongoose.Types.ObjectId;
    ref: 'User' | 'Transaction';
}
interface IAffiliateStat extends Document {
    userId: IJoin;
    affiliateSales: IJoin;
    createdAt: Date;
    updatedAt: Date;
  }

const AffiliateStatSchema = new mongoose.Schema<IAffiliateStat>(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    affiliateSales: {
      type: [mongoose.Types.ObjectId],
      ref: "Transaction",
    },
  },
  { timestamps: true }
);

const AffiliateStat = mongoose.model<IAffiliateStat>("AffiliateStat", AffiliateStatSchema);
export default AffiliateStat;