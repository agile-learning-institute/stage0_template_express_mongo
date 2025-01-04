import {Config, Breadcrumb, Token, MongoIO} from '@agile-learning-institute/mentorhub-ts-api-utils';

export default class {{item.name | title}}Service {
    
  constructor() {
  }

  public static async Get{{item.name | title}}s(query: any, token: Token): Promise<any[]> {
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();

    // TODO: Implement RBAC
    // TODO: Add match from query
    // TODO: Tune projection as needed
    const match = {status: {$ne: "Archived"}}; 
    const project = {_id: 1, name: 1};
    const order = {name: 1};
    const {{item.name}}s = await mongoIO.getDocuments(config.PARTNERS_COLLECTION_NAME, match, project, order);
    return {{item.name}}s;
  }

  public static async Get{{item.name | title}}(id: string, token: Token): Promise<any> {
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();

    // TODO: Implement RBAC

    // Get the {{item.name}}
    const {{item.name}} = await mongoIO.getDocument(config.PARTNERS_COLLECTION_NAME, id);
    if (!{{item.name}}) throw new Error(`Not Found: ${id}`);
    return {{item.name}};
  }

  public static async Insert{{item.name | title}}(data: any, token: Token, breadcrumb: Breadcrumb): Promise<any> {
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();

    // TODO: Implement RBAC
    
    // TODO: Set default values
    data.lastSaved = breadcrumb;
    data.status = "Active";
    
    const {{item.name}} = await mongoIO.insertDocument(config.PARTNERS_COLLECTION_NAME, data);
    return {{item.name | title}}Service.Find{{item.name | title}}({{item.name}}._id, token);
  }

  public static async Update{{item.name | title}}(id: string, updates: any, token: Token, breadcrumb: Breadcrumb): Promise<any> {
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();

    // TODO: Implement RBAC

    // TODO: Set default values
    updates.lastSaved = breadcrumb;

    const {{item.name}} = await mongoIO.updateDocument(config.PARTNERS_COLLECTION_NAME, id, updates);
    if (!{{item.name}}) throw new Error(`{{item.name | title}} Not Found ${id}`);
    return {{item.name | title}}Service.Find{{item.name | title}}({{item.name}}._id, token);
  }
}