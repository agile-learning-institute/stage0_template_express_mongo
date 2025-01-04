import { Config, Breadcrumb, Token, MongoIO } from '@agile-learning-institute/mentorhub-ts-api-utils';

export default class PartnerService {
    
  constructor() {
  }

  public static async GetPartners(query: any, token: Token): Promise<any[]> {
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();

    // TODO: Implement RBAC
    // TODO: Add match from query
    // TODO: Tune projection as needed
    const match = {status: {$ne: "Archived"}}; 
    const project = {_id: 1, name: 1};
    const order = {name: 1};
    const partners = await mongoIO.getDocuments(config.PARTNERS_COLLECTION_NAME, match, project, order);
    return partners;
  }

  public static async GetPartner(id: string, token: Token): Promise<any> {
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();

    // TODO: Implement RBAC

    // Get the partner
    const partner = await mongoIO.getDocument(config.PARTNERS_COLLECTION_NAME, id);
    if (!partner) throw new Error(`Not Found: ${id}`);
    return partner;
  }

  public static async InsertPartner(data: any, token: Token, breadcrumb: Breadcrumb): Promise<any> {
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();

    // TODO: Implement RBAC
    
    // TODO: Set default values
    data.lastSaved = breadcrumb;
    data.status = "Active";
    
    const partner = await mongoIO.insertDocument(config.PARTNERS_COLLECTION_NAME, data);
    return PartnerService.FindPartner(partner._id, token);
  }

  public static async UpdatePartner(id: string, updates: any, token: Token, breadcrumb: Breadcrumb): Promise<any> {
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();

    // TODO: Implement RBAC

    // TODO: Set default values
    updates.lastSaved = breadcrumb;

    const partner = await mongoIO.updateDocument(config.PARTNERS_COLLECTION_NAME, id, updates);
    if (!partner) throw new Error(`Partner Not Found ${id}`);
    return PartnerService.FindPartner(partner._id, token);
  }
}