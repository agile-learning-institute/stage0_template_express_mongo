import PartnerService from '../services/PartnerService';
import { Request, Response } from 'express';
import { decodeToken, createBreadcrumb } from '@agile-learning-institute/mentorhub-ts-api-utils';

export default class PartnerController {

  constructor() {
  }

  public getPartners = async (req: Request, res: Response) => {
    try {
      const token = decodeToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const results = await PartnerService.GetPartners(req.query, token)
      res.status(200);
      res.json(results);
      console.info("GetPartners Completed", JSON.stringify(breadcrumb));
    } catch (error) {
      const message = this.getMessage(error);
      res.status(500);
      res.json({error:message});
      console.warn("GetPartners Failed:", message);
    }
  }

  public getPartner = async (req: Request, res: Response) => {
    try {
      const theId = req.params.partnerId;
      const token = decodeToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const thePartner = await PartnerService.GetPartner(theId, token);
      res.status(200);
      res.json(thePartner);
      console.info("GetPartner %s Completed with %s", theId, JSON.stringify(breadcrumb));
    } catch (error) {
      const message = this.getMessage(error);
      res.status(500);
      res.json({error:message});
      console.warn("GetPartner Failed:", message);
    }
    
  }

  public createPartner = async (req: Request, res: Response) => {
    try {
      const token = decodeToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const newPartner = await PartnerService.InsertPartner(req.body, token, breadcrumb);
      res.status(200);
      res.json(newPartner);
      console.info("InsertPartner %s Completed with %s", newPartner._id, JSON.stringify(breadcrumb));
    } catch (error) {
      const message = this.getMessage(error);
      res.status(500);
      res.json({error:message});
      console.warn("InsertPartner Failed with %s", message);
    }
  }

  public updatePartner = async (req: Request, res: Response) => {
    try {
      const id = req.params.partnerId;
      const token = decodeToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const thePartner = await PartnerService.UpdatePartner(id, req.body, token, breadcrumb);
      res.status(200);
      res.json(thePartner);
      console.info("Update Partner %s Completed with %s", id, JSON.stringify(breadcrumb));
    } catch (error) {
      const message = this.getMessage(error);
      res.status(500);
      res.json({error:message});
      console.warn("UpdatePartner Failed:", message);
    }
  }
  
  public getMessage(error: any): string {
    if (error instanceof Error) return error.message;
    return String(error);
  }
}