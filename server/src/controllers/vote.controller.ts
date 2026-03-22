import { Request, Response } from "express";
import { VotePayload } from "../types/vote.type";

export const voteController = async (req: Request, res: Response) => {
    const data = req.body as VotePayload;
    
}