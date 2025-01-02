import PersonService from '../services/PersonService';
import { Request, Response } from 'express';
import { decodeToken, createBreadcrumb } from '@agile-learning-institute/mentorhub-ts-api-utils';

export default class PersonController {

  constructor() {
  }

  public getPerson = async (req: Request, res: Response) => {
    try {
      const token = decodeToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const results = await PersonService.FindPerson(req.query, token);
      res.json(results);
      res.status(200);
      console.info("GetPerson Completed", JSON.stringify(breadcrumb));
    } catch (error) {
      res.status(500);
      console.error("GetPerson Failed", error);
    }
  }
}