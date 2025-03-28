import { ObjectId } from "mongodb";
import {{item.name | title}}Service from "./{{item.name | title}}Service";
import { MongoIO, Config, Token, Breadcrumb, createBreadcrumb } from "@{{arch.organization}}/{{arch.product}}-ts-api-utils";

// Mock dependencies
jest.mock("@{{arch.organization}}/{{arch.product}}-ts-api-utils", () => ({
  MongoIO: {
    getInstance: jest.fn()
  },
  Config: {
    getInstance: jest.fn(),
    PARTNERS_COLLECTION_NAME: "mock{{item.name | title}}sCollection"
  }
}));

describe("{{item.name | title}}Service", () => {
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
      PARTNERS_COLLECTION_NAME: "{{item.name}}s"
    };

    (MongoIO.getInstance as jest.Mock).mockReturnValue(mockMongoIO);
    (Config.getInstance as jest.Mock).mockReturnValue(mockConfig);
  });

  describe("Get{{item.name | title}}s", () => {
    it("should return a list of {{item.name}}s", async () => {
      const token: Token = { userId: "testUser", roles: ["admin"] };
      const query = {};
      const mock{{item.name | title}}s = [{ _id: "1", name: "{{item.name | title}} 1" }, { _id: "2", name: "{{item.name | title}} 2" }];
      mockMongoIO.getDocuments.mockResolvedValue(mock{{item.name | title}}s);

      const result = await {{item.name | title}}Service.Get{{item.name | title}}s(query, token);

      expect(result).toEqual(mock{{item.name | title}}s);
      expect(mockMongoIO.getDocuments).toHaveBeenCalledWith(
        "{{item.name}}s",
        { status: { $ne: "Archived" } },
        { _id: 1, name: 1 },
        { name: 1 }
      );
      expect(mockMongoIO.getDocuments).toHaveBeenCalledTimes(1);
    });
  });

  describe("Get{{item.name | title}}", () => {
    it("should return a specific {{item.name}} by ID", async () => {
      const token: Token = { userId: "testUser", roles: ["admin"] };
      const id = "12345";
      const mock{{item.name | title}} = { _id: id, name: "Specific {{item.name | title}}" };
      mockMongoIO.getDocument.mockResolvedValue(mock{{item.name | title}});

      const result = await {{item.name | title}}Service.Get{{item.name | title}}(id, token);

      expect(result).toEqual(mock{{item.name | title}});
      expect(mockMongoIO.getDocument).toHaveBeenCalledWith("{{item.name}}s", id);
      expect(mockMongoIO.getDocument).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if the {{item.name}} is not found", async () => {
      const token: Token = { userId: "testUser", roles: ["admin"] };
      const id = "nonexistentId";
      mockMongoIO.getDocument.mockResolvedValue(null);

      await expect({{item.name | title}}Service.Get{{item.name | title}}(id, token)).rejects.toThrow(`Not Found: ${id}`);
      expect(mockMongoIO.getDocument).toHaveBeenCalledWith("{{item.name}}s", id);
      expect(mockMongoIO.getDocument).toHaveBeenCalledTimes(1);
    });
  });

  describe("Create{{item.name | title}}", () => {
    it("should create a new {{item.name}} and return the created {{item.name}}", async () => {
      const token: Token = { userId: "testUser", roles: ["admin"] };
      const breadcrumb: Breadcrumb = { byUser: new ObjectId(), atTime: new Date(), fromIp: "ip", correlationId: "correl" };
      const data = { name: "New {{item.name | title}}" };
      const mockCreated{{item.name | title}} = { _id: "newId", name: "New {{item.name | title}}", lastSaved: breadcrumb, status: "Active" };
  
      // Mock the methods
      mockMongoIO.insertDocument.mockResolvedValue(mockCreated{{item.name | title}});
      mockMongoIO.getDocument.mockResolvedValue(mockCreated{{item.name | title}});
  
      // Call the method
      const result = await {{item.name | title}}Service.Create{{item.name | title}}(data, token, breadcrumb);
  
      // Assertions
      expect(result).toEqual(mockCreated{{item.name | title}});
      expect(mockMongoIO.insertDocument).toHaveBeenCalledWith("{{item.name}}s", {
        ...data,
        lastSaved: breadcrumb,
        status: "Active"
      });
      expect(mockMongoIO.insertDocument).toHaveBeenCalledTimes(1);
      expect(mockMongoIO.getDocument).toHaveBeenCalledWith("{{item.name}}s", mockCreated{{item.name | title}}._id);
      expect(mockMongoIO.getDocument).toHaveBeenCalledTimes(1);
    });
  });

  describe("Update{{item.name | title}}", () => {
    it("should update an existing {{item.name}} and return the updated {{item.name}}", async () => {
      const token: Token = { userId: "testUser", roles: ["admin"] };
      const breadcrumb: Breadcrumb = { byUser: new ObjectId(), atTime: new Date(), fromIp: "ip", correlationId: "correl" };
      const id = "12345";
      const updates = { name: "Updated {{item.name | title}}" };
      const mockUpdated{{item.name | title}} = { _id: id, ...updates, lastSaved: breadcrumb };

      mockMongoIO.updateDocument.mockResolvedValue(mockUpdated{{item.name | title}});
      mockMongoIO.getDocument.mockResolvedValue(mockUpdated{{item.name | title}});

      const result = await {{item.name | title}}Service.Update{{item.name | title}}(id, updates, token, breadcrumb);

      expect(result).toEqual(mockUpdated{{item.name | title}});
      expect(mockMongoIO.updateDocument).toHaveBeenCalledWith("{{item.name}}s", id, {
        ...updates,
        lastSaved: breadcrumb
      });
      expect(mockMongoIO.updateDocument).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if the {{item.name}} to update is not found", async () => {
      const token: Token = { userId: "testUser", roles: ["admin"] };
      const breadcrumb: Breadcrumb = { byUser: new ObjectId(), atTime: new Date(), fromIp: "ip", correlationId: "correl" };
      const id = "nonexistentId";
      const updates = { name: "Nonexistent {{item.name | title}}" };

      mockMongoIO.updateDocument.mockResolvedValue(null);

      await expect({{item.name | title}}Service.Update{{item.name | title}}(id, updates, token, breadcrumb)).rejects.toThrow(
        `{{item.name | title}} Not Found ${id}`
      );
      expect(mockMongoIO.updateDocument).toHaveBeenCalledWith("{{item.name}}s", id, {
        ...updates,
        lastSaved: breadcrumb
      });
      expect(mockMongoIO.updateDocument).toHaveBeenCalledTimes(1);
    });
  });
});