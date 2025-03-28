import TopicService from '../services/TopicService';
import { Request, Response } from 'express';
import { decodeToken, createBreadcrumb } from '@agile-learning-institute/mentorhub-ts-api-utils';

export default class TopicController {

  constructor() {
  }

  public getTopics = async (req: Request, res: Response) => {
    try {
      const token = decodeToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const topics = await TopicService.GetTopics(req.query, token);
      res.status(200);
      res.json(topics);
      console.info("GetTopic Completed", JSON.stringify(breadcrumb));
    } catch (error) {
      const message = this.getMessage(error);
      res.status(500);
      res.json({error:message});
      console.warn("GetTopics Failed:", message);
    }

  public getTopic = async (req: Request, res: Response) => {
    try {
      const theId = req.params.topicId;
      const token = decodeToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const topic = await TopicService.GetTopic(theId, token);
      res.status(200);
      res.json(topic);
      console.info("GetTopic %s Completed with %s", theId, JSON.stringify(breadcrumb));
    } catch (error) {
      const message = this.getMessage(error);
      res.status(500);
      res.json({error:message});
      console.warn("GetTopic Failed:", message);
    }
}