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
      const results = await {{item.name | title}}Service.Get{{item.name | title}}s(req.query, token)
      res.status(200);
      res.json(results);
      console.info("Get{{item.name | title}}s Completed", JSON.stringify(breadcrumb));
    } catch (error) {
      const message = this.getMessage(error);
      res.status(500);
      res.json({error:message});
      console.warn("Get{{item.name | title}}s Failed:", message);
    }
  }

  public get{{item.name | title}} = async (req: Request, res: Response) => {
    try {
      const theId = req.params.{{item.name}}Id;
      const token = decodeToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const the{{item.name | title}} = await {{item.name | title}}Service.Get{{item.name | title}}(theId, token);
      res.status(200);
      res.json(the{{item.name | title}});
      console.info("Get{{item.name | title}} %s Completed with %s", theId, JSON.stringify(breadcrumb));
    } catch (error) {
      const message = this.getMessage(error);
      res.status(500);
      res.json({error:message});
      console.warn("Get{{item.name | title}} Failed:", message);
    }
    
  }

  public create{{item.name | title}} = async (req: Request, res: Response) => {
    try {
      const token = decodeToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const new{{item.name | title}} = await {{item.name | title}}Service.Insert{{item.name | title}}(req.body, token, breadcrumb);
      res.status(200);
      res.json(new{{item.name | title}});
      console.info("Insert{{item.name | title}} %s Completed with %s", new{{item.name | title}}._id, JSON.stringify(breadcrumb));
    } catch (error) {
      const message = this.getMessage(error);
      res.status(500);
      res.json({error:message});
      console.warn("Insert{{item.name | title}} Failed with %s", message);
    }
  }

  public update{{item.name | title}} = async (req: Request, res: Response) => {
    try {
      const id = req.params.{{item.name}}Id;
      const token = decodeToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const the{{item.name | title}} = await {{item.name | title}}Service.Update{{item.name | title}}(id, req.body, token, breadcrumb);
      res.status(200);
      res.json(the{{item.name | title}});
      console.info("Update {{item.name | title}} %s Completed with %s", id, JSON.stringify(breadcrumb));
    } catch (error) {
      const message = this.getMessage(error);
      res.status(500);
      res.json({error:message});
      console.warn("Update{{item.name | title}} Failed:", message);
    }
  }
  
  public getMessage(error: any): string {
    if (error instanceof Error) return error.message;
    return String(error);
  }
}