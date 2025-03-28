import { Config, Token, MongoIO } from '@{{arch.organization}}/{{arch.product}}-ts-api-utils';

export default class {{item.name | title}}Service {
    
  constructor() {
  }

  public static async Get{{item.name | title}}s(query: any, token: Token): Promise<any[]> {
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();

    // TODO: Check RBAC access with token

    // TODO: Adjust as needed
    const match = {status: {$ne: "Archived"}};
    const project = {_id: 1, name: 1};
    const order = {name: 1};

    // Get the {{item.name}} list
    const {{item.name}} = await mongoIO.getDocuments(config.TOPICS_COLLECTION_NAME, match, project, order);
    return {{item.name}};
  }

  public static async Get{{item.name | title}}(id: string, token: Token): Promise<any[]> {
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();

    // TODO: Check RBAC access with token

    // TODO - adjust as needed

    // Get the {{item.name}}
    const {{item.name}} = await mongoIO.getDocument(config.TOPICS_COLLECTION_NAME, id);
    if (!{{item.name}}) throw new Error(`Not Found: ${id}`);
    return {{item.name}};
  }
}