import {Schema, model, Document} from "mongoose";

export interface TagModel extends Document{
    name : string;
    count : number; // Counts the number of posts with this tag
    questions : Schema.Types.ObjectId[];
}