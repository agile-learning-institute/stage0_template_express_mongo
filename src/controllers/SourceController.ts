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
      const results = await {{item.name}}Service.Find{{item.name}}s(req.query, token)
      res.status(200);
      res.json(results);
      console.info("Get{{item.name}}s Completed", JSON.stringify(breadcrumb));
    } catch (error) {
      const message = this.getMessage(error);
      res.status(500);
      res.json({error:message});
      console.warn("Get{{item.name}}s Failed:", message);
    }
  }

  public get{{item.name}} = async (req: Request, res: Response) => {
    try {
      const theId = req.params.{{item.name}}Id;
      const token = decodeToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const the{{item.name}} = await {{item.name}}Service.Find{{item.name}}(theId, token);
      res.status(200);
      res.json(the{{item.name}});
      console.info("Get{{item.name}} %s Completed with %s", theId, JSON.stringify(breadcrumb));
    } catch (error) {
      const message = this.getMessage(error);
      res.status(500);
      res.json({error:message});
      console.warn("Get{{item.name}} Failed:", message);
    }
    
  }

  public create{{item.name}} = async (req: Request, res: Response) => {
    try {
      const token = decodeToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const new{{item.name}} = await {{item.name}}Service.Insert{{item.name}}(req.body, token, breadcrumb);
      res.status(200);
      res.json(new{{item.name}});
      console.info("Insert{{item.name}} %s Completed with %s", new{{item.name}}._id, JSON.stringify(breadcrumb));
    } catch (error) {
      const message = this.getMessage(error);
      res.status(500);
      res.json({error:message});
      console.warn("Insert{{item.name}} Failed with %s", message);
    }
  }

  public update{{item.name}} = async (req: Request, res: Response) => {
    try {
      const id = req.params.{{item.name}}Id;
      const token = decodeToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const the{{item.name}} = await {{item.name}}Service.Update{{item.name}}(id, req.body, token, breadcrumb);
      res.status(200);
      res.json(the{{item.name}});
      console.info("Update {{item.name}} %s Completed with %s", id, JSON.stringify(breadcrumb));
    } catch (error) {
      const message = this.getMessage(error);
      res.status(500);
      res.json({error:message});
      console.warn("Update{{item.name}} Failed:", message);
    }
  }
  public getMessage(error: any): string {
    if (error instanceof Error) return error.message;
    return String(error);
  }
}