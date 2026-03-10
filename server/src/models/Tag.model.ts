import {Schema, model, Document} from "mongoose";

export interface TagModel extends Document{
    name : string;
    questions : Schema.Types.ObjectId[];
}