import {{item.name | title}}Service from '../services/{{item.name | title}}Service';
import { Request, Response } from 'express';
import { decodeToken, createBreadcrumb } from '@{{arch.organization}}/{{arch.product}}-ts-api-utils';

export default class {{item.name | title}}Controller {

  constructor() {
  }

  public get{{item.name | title}}s = async (req: Request, res: Response) => {
    try {
      const token = decodeToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const {{item.name}}s = await {{item.name | title}}Service.Get{{item.name | title}}s(req.query, token);
      res.status(200);
      res.json({{item.name}}s);
      console.info("Get{{item.name | title}} Completed", JSON.stringify(breadcrumb));
    } catch (error) {
      const message = this.getMessage(error);
      res.status(500);
      res.json({error:message});
      console.warn("Get{{item.name | title}}s Failed:", message);
    }

  public get{{item.name | title}} = async (req: Request, res: Response) => {
    try {
      const theId = req.params.{{item.name}}Id;
      const token = decodeToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const {{item.name}} = await {{item.name | title}}Service.Get{{item.name | title}}(theId, token);
      res.status(200);
      res.json({{item.name}});
      console.info("Get{{item.name | title}} %s Completed with %s", theId, JSON.stringify(breadcrumb));
    } catch (error) {
      const message = this.getMessage(error);
      res.status(500);
      res.json({error:message});
      console.warn("Get{{item.name | title}} Failed:", message);
    }
}