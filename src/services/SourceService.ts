/**
 * Class {{item.name}}Service: This is a stateless static class that
 *    provides business logic and RBAC for the {{item.name}}Controller
 */
import { ObjectId } from "mongodb";
import {Config, Breadcrumb, Token, MongoIO} from '@agile-learning-institute/mentorhub-ts-api-utils';

export default class {{item.name}}Service {
    
  /**
   * Constructor 
   */
  constructor() {
  }

  public static async Find{{item.name}}s(query: any, token: Token): Promise<any[]> {
    // TODO: %20 Implement RBAC

    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();
    
    const match = {status: {$ne: "Archived"}}; // TODO - match from query
    const project = {_id: 1, name: 1};
    const order = {name: 1};
    const {{item.name}}s = await mongoIO.getDocuments(config.{{item.name}}S_COLLECTION_NAME, match, project, order);
    return {{item.name}}s;
  }

  public static async Find{{item.name}}(id: string, token: Token): Promise<any> {
    // Only staff have access
    if (!token.roles.includes("Staff")) throw new Error("Access Denied");
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();

    // Get the {{item.name}}
    const {{item.name}} = await mongoIO.getDocument(config.{{item.name}}S_COLLECTION_NAME, id);
    if (!{{item.name}}) throw new Error(`Not Found: ${id}`);

    // Lookup contactDetails
    let contactDetails = []
    if ({{item.name}}.contacts && {{item.name}}.contacts.length > 0) {
      const match = {$and: [
        {_id: {$in: {{item.name}}.contacts}}, 
        {status: {$ne: "Archived"}}
      ]}
      const project = {firstName: 1, lastName: 1, phone: 1, eMail: 1}
      const order = {lastName: 1, firstName: 1}
      contactDetails = await mongoIO.getDocuments(config.PEOPLE_COLLECTION_NAME, match, project, order)
    }

    // Add the details, remove the original property
    {{item.name}}.contactDetails = contactDetails;
    delete {{item.name}}.contacts
    return {{item.name}};
  }

  public static async Insert{{item.name}}(data: any, token: Token, breadcrumb: Breadcrumb): Promise<any> {
    // Only staff have access
    if (!token.roles.includes("Staff")) throw new Error("Access Denied");

    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();
    
    data.lastSaved = breadcrumb;
    data.status = "Active";
    data.contacts = [];
    const {{item.name}} = await mongoIO.insertDocument(config.{{item.name}}S_COLLECTION_NAME, data);
    return {{item.name}}Service.Find{{item.name}}({{item.name}}._id, token);
  }

  public static async Update{{item.name}}(id: string, updates: any, token: Token, breadcrumb: Breadcrumb): Promise<any> {
    // Only staff have access
    if (!token.roles.includes("Staff")) throw new Error("Access Denied");

    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();

    updates.lastSaved = breadcrumb;
    const {{item.name}} = await mongoIO.updateDocument(config.{{item.name}}S_COLLECTION_NAME, id, updates);
    if (!{{item.name}}) throw new Error(`{{item.name}} Not Found ${id}`);

    return {{item.name}}Service.Find{{item.name}}({{item.name}}._id, token);
  }

  public static async AddContact({{item.name}}Id: string, personId: string, token: Token, breadcrumb: Breadcrumb): Promise<any> {
    // Only staff have access
    if (!token.roles.includes("Staff")) throw new Error("Access Denied");
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();

    // Verify this is a valid person
    const person = await mongoIO.getDocument(config.PEOPLE_COLLECTION_NAME, personId);
    if (!person) throw new Error(`Person Not Found ${personId}`);

    // Verify this is a valid {{item.name}}
    const {{item.name}} = await mongoIO.getDocument(config.{{item.name}}S_COLLECTION_NAME, {{item.name}}Id);    
    if (!{{item.name}}) throw new Error(`{{item.name}} Not Found ${{{item.name}}Id}`);

    // Check for duplicate add
    const personObjectId = new ObjectId(personId);
    if ({{item.name}}.contacts.some((contact: ObjectId) => contact.equals(personObjectId))) {
      throw new Error("Duplicates not allowed");
    }    

    //  Update the {{item.name}}
    {{item.name}}.contacts.push(personObjectId)    
    const update = {
      contacts: {{item.name}}.contacts,
      lastSaved: breadcrumb
    }
    await mongoIO.updateDocument(config.{{item.name}}S_COLLECTION_NAME, {{item.name}}Id, update)

    // Return the person details for the person
    return {
      _id: person._id,
      firstName: person.firstName,
      lastName: person.lastName,
      eMail: person.eMail,
      phone: person.phone
    }
  }

  public static async RemoveContact({{item.name}}Id: string, personId: string, token: Token, breadcrumb: Breadcrumb): Promise<any> {
    // Only staff have access
    if (!token.roles.includes("Staff")) throw new Error("Access Denied");
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();

    // Verify this is a valid {{item.name}}
    const {{item.name}} = await mongoIO.getDocument(config.{{item.name}}S_COLLECTION_NAME, {{item.name}}Id);
    if (!{{item.name}}) throw new Error(`{{item.name}} Not Found ${{{item.name}}Id}`);

    // Confirm the contact exists
    const removeMe = new ObjectId(personId);
    const contacts = ({{item.name}}.contacts as ObjectId[]).filter((contact: ObjectId) => !contact.equals(removeMe));
    if ({{item.name}}.contacts.length === contacts.length) throw new Error(`Person Not Found ${personId}`);

    // Update the {{item.name}} record
    const update = {
      contacts: contacts,
      lastSaved: breadcrumb
    }
    await mongoIO.updateDocument(config.{{item.name}}S_COLLECTION_NAME, {{item.name}}Id, update)
    return {{item.name}}Service.Find{{item.name}}({{item.name}}Id, token);
  }
}
