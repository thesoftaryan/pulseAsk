import { model, Schema, Document, Types} from "mongoose";

type VoteType = 1 | -1;

export type TargetType = "question" | "answer";

interface VoteInterface extends Document{
    userId: Types.ObjectId;
    targetId: Types.ObjectId;
    targetType: TargetType;
    value: VoteType;
}

const VoteSchema = new Schema<VoteInterface>({
    userId:{
        type: Schema.Types.ObjectId,
        required: true,
    },
    targetId: {
        type: Schema.Types.ObjectId,
        required: true,    
    },
    targetType: {
        type: String,
        enum: ["question", "answer"],
        required: true,
    },
    value: {
        type: Number,
        enum:[1, -1],
        required: true,
    }
},
{timestamps: true}
);

export const Vote = model<VoteInterface>("Vote", VoteSchema);