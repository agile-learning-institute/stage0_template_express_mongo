/**
 * Class {{item.name}}Service: This is a stateless static class that
 *    provides business logic and RBAC for the {{item.name}}Controller
 */
import {Config, Token, MongoIO} from '@agile-learning-institute/mentorhub-ts-api-utils';

export default class {{item.name}}Service {
    
  /**
   * Constructor 
   */
  constructor() {
  }

  public static async Find{{item.name}}(query: any, token: Token): Promise<any[]> {
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();
    const match = {status: {$ne: "Archived"}}; // TODO - match from query
    const project = {_id: 1, firstName: 1, lastName: 1, phone: 1, eMail: 1 };
    const order = {userName: 1};
    const {{item.name}} = await mongoIO.getDocuments(config.{{item.name}}_COLLECTION_NAME, match, project, order);
    return {{item.name}};
  }
}
