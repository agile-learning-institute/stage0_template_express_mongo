import {Config, Token, MongoIO} from '@agile-learning-institute/mentorhub-ts-api-utils';

export default class TopicService {
    
  constructor() {
  }

  public static async GetTopics(query: any, token: Token): Promise<any[]> {
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();

    // TODO: Check RBAC access with token

    // TODO: Adjust as needed
    const match = {status: {$ne: "Archived"}};
    const project = {_id: 1, name: 1};
    const order = {name: 1};

    // Get the topic list
    const topic = await mongoIO.getDocuments(config.TOPICS_COLLECTION_NAME, match, project, order);
    return topic;
  }

  public static async GetTopic(id: string, token: Token): Promise<any[]> {
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();

    // TODO: Check RBAC access with token

    // TODO - adjust as needed

    // Get the topic
    const topic = await mongoIO.getDocument(config.TOPICS_COLLECTION_NAME, id);
    if (!topic) throw new Error(`Not Found: ${id}`);
    return topic;
  }
}