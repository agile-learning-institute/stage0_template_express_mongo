import {{item.name | title}}Service from '../services/{{item.name | title}}Service';
import { Request, Response } from 'express';
import { decodeToken, createBreadcrumb } from '@{{arch.organization}}/{{arch.product}}-ts-api-utils';

export default class {{item.name | title}}Controller {

  constructor() {
  }

  public get{{item.name | title}} = async (req: Request, res: Response) => {
    try {
      const token = decodeToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const results = await {{item.name | title}}Service.Find{{item.name | title}}(req.query, token);
      res.json(results);
      res.status(200);
      console.info("Get{{item.name | title}} Completed", JSON.stringify(breadcrumb));
    } catch (error) {
      res.status(500);
      console.error("Get{{item.name | title}} Failed", error);
    }
  }
}