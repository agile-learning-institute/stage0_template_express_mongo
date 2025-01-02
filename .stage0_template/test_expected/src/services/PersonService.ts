/**
 * Class PersonService: This is a stateless static class that
 *    provides business logic and RBAC for the PersonController
 */
import {Config, Token, MongoIO} from '@agile-learning-institute/mentorhub-ts-api-utils';

export default class PersonService {
    
  /**
   * Constructor 
   */
  constructor() {
  }

  public static async FindPerson(query: any, token: Token): Promise<any[]> {
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();
    const match = {status: {$ne: "Archived"}}; // TODO - match from query
    const project = {_id: 1, firstName: 1, lastName: 1, phone: 1, eMail: 1 };
    const order = {userName: 1};
    const person = await mongoIO.getDocuments(config.PERSON_COLLECTION_NAME, match, project, order);
    return person;
  }
}