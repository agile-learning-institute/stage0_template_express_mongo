import {{item.name}}Service from '../services/{{item.name}}Service';
import { Request, Response } from 'express';
import { decodeToken, createBreadcrumb } from '@{{arch.organization}}/{{arch.product}}-ts-api-utils';

export default class {{item.name}}Controller {

  constructor() {
  }

  public get{{item.name}} = async (req: Request, res: Response) => {
    try {
      const token = decodeToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const results = await {{item.name}}Service.Find{{item.name}}(req.query, token);
      res.json(results);
      res.status(200);
      console.info("Get{{item.name}} Completed", JSON.stringify(breadcrumb));
    } catch (error) {
      res.status(500);
      console.error("Get{{item.name}} Failed", error);
    }
  }
}