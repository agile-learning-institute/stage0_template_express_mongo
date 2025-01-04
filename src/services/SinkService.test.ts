import {{item.name | title}}Service from "./{{item.name | title}}Service";
import { Config, Token, MongoIO } from "@{{arch.organization}}/{{arch.product}}-ts-api-utils";

// Mock dependencies
jest.mock("@agile-learning-institute/mentorhub-ts-api-utils", () => ({
  MongoIO: {
    getInstance: jest.fn()
  },
  Config: {
    getInstance: jest.fn(),
    TOPICS_COLLECTION_NAME: "mock{{item.name | title}}sCollection"
  }
}));

describe("{{item.name | title}}Service", () => {
  let mockMongoIO: any;
  let mockConfig: any;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.resetAllMocks();

    // Mock MongoIO and Config instances
    mockMongoIO = {
      getDocuments: jest.fn(),
      getDocument: jest.fn()
    };
    mockConfig = {
      TOPICS_COLLECTION_NAME: "{{item.name}}s"
    };

    (MongoIO.getInstance as jest.Mock).mockReturnValue(mockMongoIO);
    (Config.getInstance as jest.Mock).mockReturnValue(mockConfig);
  });

  describe("Get{{item.name | title}}s", () => {
    it("should return a list of {{item.name}}s", async () => {
      // Arrange
      const token: Token = { userId: "testUser", roles: ["admin"] };
      const query = {};
      const mock{{item.name | title}}s = [{ _id: "1", name: "{{item.name | title}} 1" }, { _id: "2", name: "{{item.name | title}} 2" }];
      mockMongoIO.getDocuments.mockResolvedValue(mock{{item.name | title}}s);

      // Act
      const result = await {{item.name | title}}Service.Get{{item.name | title}}s(query, token);

      // Assert
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
      // Arrange
      const token: Token = { userId: "testUser", roles: ["admin"] };
      const id = "12345";
      const mock{{item.name | title}} = { _id: id, name: "Specific {{item.name | title}}" };
      mockMongoIO.getDocument.mockResolvedValue(mock{{item.name | title}});

      // Act
      const result = await {{item.name | title}}Service.Get{{item.name | title}}(id, token);

      // Assert
      expect(result).toEqual(mock{{item.name | title}});
      expect(mockMongoIO.getDocument).toHaveBeenCalledWith("{{item.name}}s", id);
      expect(mockMongoIO.getDocument).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if the {{item.name}} is not found", async () => {
      // Arrange
      const token: Token = { userId: "testUser", roles: ["admin"] };
      const id = "nonexistentId";
      mockMongoIO.getDocument.mockResolvedValue(null);

      // Act & Assert
      await expect({{item.name | title}}Service.Get{{item.name | title}}(id, token)).rejects.toThrow(`Not Found: ${id}`);
      expect(mockMongoIO.getDocument).toHaveBeenCalledWith("{{item.name}}s", id);
      expect(mockMongoIO.getDocument).toHaveBeenCalledTimes(1);
    });
  });
});