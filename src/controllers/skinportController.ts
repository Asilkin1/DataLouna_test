//  Controller for skinport related tasks
import { Request, Response } from "express";
import { getSkinportItems } from "../services/skinportService";

export const getSkinportData = async(req:Request, res: Response) => {

    try {
        const items = await getSkinportItems();
        res.status(200).json(items);

    }catch(error){
        res.status(500).json({message: 'Unable to fetch Skinport data', error});
    }

}