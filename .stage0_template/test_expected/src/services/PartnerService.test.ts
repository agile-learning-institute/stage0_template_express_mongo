import { ObjectId } from "mongodb";
import PartnerService from "./PartnerService";
import { MongoIO, Config, Token, Breadcrumb, createBreadcrumb } from "@agile-learning-institute/mentorhub-ts-api-utils";

// Mock dependencies
jest.mock("@agile-learning-institute/mentorhub-ts-api-utils", () => ({
  MongoIO: {
    getInstance: jest.fn()
  },
  Config: {
    getInstance: jest.fn(),
    PARTNERS_COLLECTION_NAME: "mockPartnersCollection"
  }
}));

describe("PartnerService", () => {
  let mockMongoIO: any;
  let mockConfig: any;

  beforeEach(() => {
    jest.resetAllMocks();

    // Mock MongoIO and Config instances
    mockMongoIO = {
      getDocuments: jest.fn(),
      getDocument: jest.fn(),
      insertDocument: jest.fn(),
      updateDocument: jest.fn()
    };
    mockConfig = {
      PARTNERS_COLLECTION_NAME: "partners"
    };

    (MongoIO.getInstance as jest.Mock).mockReturnValue(mockMongoIO);
    (Config.getInstance as jest.Mock).mockReturnValue(mockConfig);
  });

  describe("GetPartners", () => {
    it("should return a list of partners", async () => {
      const token: Token = { userId: "testUser", roles: ["admin"] };
      const query = {};
      const mockPartners = [{ _id: "1", name: "Partner 1" }, { _id: "2", name: "Partner 2" }];
      mockMongoIO.getDocuments.mockResolvedValue(mockPartners);

      const result = await PartnerService.GetPartners(query, token);

      expect(result).toEqual(mockPartners);
      expect(mockMongoIO.getDocuments).toHaveBeenCalledWith(
        "partners",
        { status: { $ne: "Archived" } },
        { _id: 1, name: 1 },
        { name: 1 }
      );
      expect(mockMongoIO.getDocuments).toHaveBeenCalledTimes(1);
    });
  });

  describe("GetPartner", () => {
    it("should return a specific partner by ID", async () => {
      const token: Token = { userId: "testUser", roles: ["admin"] };
      const id = "12345";
      const mockPartner = { _id: id, name: "Specific Partner" };
      mockMongoIO.getDocument.mockResolvedValue(mockPartner);

      const result = await PartnerService.GetPartner(id, token);

      expect(result).toEqual(mockPartner);
      expect(mockMongoIO.getDocument).toHaveBeenCalledWith("partners", id);
      expect(mockMongoIO.getDocument).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if the partner is not found", async () => {
      const token: Token = { userId: "testUser", roles: ["admin"] };
      const id = "nonexistentId";
      mockMongoIO.getDocument.mockResolvedValue(null);

      await expect(PartnerService.GetPartner(id, token)).rejects.toThrow(`Not Found: ${id}`);
      expect(mockMongoIO.getDocument).toHaveBeenCalledWith("partners", id);
      expect(mockMongoIO.getDocument).toHaveBeenCalledTimes(1);
    });
  });

  describe("CreatePartner", () => {
    it("should create a new partner and return the created partner", async () => {
      const token: Token = { userId: "testUser", roles: ["admin"] };
      const breadcrumb: Breadcrumb = { byUser: new ObjectId(), atTime: new Date(), fromIp: "ip", correlationId: "correl" };
      const data = { name: "New Partner" };
      const mockCreatedPartner = { _id: "newId", name: "New Partner", lastSaved: breadcrumb, status: "Active" };
  
      // Mock the methods
      mockMongoIO.insertDocument.mockResolvedValue(mockCreatedPartner);
      mockMongoIO.getDocument.mockResolvedValue(mockCreatedPartner);
  
      // Call the method
      const result = await PartnerService.CreatePartner(data, token, breadcrumb);
  
      // Assertions
      expect(result).toEqual(mockCreatedPartner);
      expect(mockMongoIO.insertDocument).toHaveBeenCalledWith("partners", {
        ...data,
        lastSaved: breadcrumb,
        status: "Active"
      });
      expect(mockMongoIO.insertDocument).toHaveBeenCalledTimes(1);
      expect(mockMongoIO.getDocument).toHaveBeenCalledWith("partners", mockCreatedPartner._id);
      expect(mockMongoIO.getDocument).toHaveBeenCalledTimes(1);
    });
  });

  describe("UpdatePartner", () => {
    it("should update an existing partner and return the updated partner", async () => {
      const token: Token = { userId: "testUser", roles: ["admin"] };
      const breadcrumb: Breadcrumb = { byUser: new ObjectId(), atTime: new Date(), fromIp: "ip", correlationId: "correl" };
      const id = "12345";
      const updates = { name: "Updated Partner" };
      const mockUpdatedPartner = { _id: id, ...updates, lastSaved: breadcrumb };

      mockMongoIO.updateDocument.mockResolvedValue(mockUpdatedPartner);
      mockMongoIO.getDocument.mockResolvedValue(mockUpdatedPartner);

      const result = await PartnerService.UpdatePartner(id, updates, token, breadcrumb);

      expect(result).toEqual(mockUpdatedPartner);
      expect(mockMongoIO.updateDocument).toHaveBeenCalledWith("partners", id, {
        ...updates,
        lastSaved: breadcrumb
      });
      expect(mockMongoIO.updateDocument).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if the partner to update is not found", async () => {
      const token: Token = { userId: "testUser", roles: ["admin"] };
      const breadcrumb: Breadcrumb = { byUser: new ObjectId(), atTime: new Date(), fromIp: "ip", correlationId: "correl" };
      const id = "nonexistentId";
      const updates = { name: "Nonexistent Partner" };

      mockMongoIO.updateDocument.mockResolvedValue(null);

      await expect(PartnerService.UpdatePartner(id, updates, token, breadcrumb)).rejects.toThrow(
        `Partner Not Found ${id}`
      );
      expect(mockMongoIO.updateDocument).toHaveBeenCalledWith("partners", id, {
        ...updates,
        lastSaved: breadcrumb
      });
      expect(mockMongoIO.updateDocument).toHaveBeenCalledTimes(1);
    });
  });
});