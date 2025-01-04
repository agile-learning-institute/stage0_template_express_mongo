import TopicService from "./TopicService";
import { Config, Token, MongoIO } from "@agile-learning-institute/mentorhub-ts-api-utils";

// Mock dependencies
jest.mock("@agile-learning-institute/mentorhub-ts-api-utils", () => ({
  MongoIO: {
    getInstance: jest.fn()
  },
  Config: {
    getInstance: jest.fn(),
    TOPICS_COLLECTION_NAME: "mockTopicsCollection"
  }
}));

describe("TopicService", () => {
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
      TOPICS_COLLECTION_NAME: "topics"
    };

    (MongoIO.getInstance as jest.Mock).mockReturnValue(mockMongoIO);
    (Config.getInstance as jest.Mock).mockReturnValue(mockConfig);
  });

  describe("GetTopics", () => {
    it("should return a list of topics", async () => {
      // Arrange
      const token: Token = { userId: "testUser", roles: ["admin"] };
      const query = {};
      const mockTopics = [{ _id: "1", name: "Topic 1" }, { _id: "2", name: "Topic 2" }];
      mockMongoIO.getDocuments.mockResolvedValue(mockTopics);

      // Act
      const result = await TopicService.GetTopics(query, token);

      // Assert
      expect(result).toEqual(mockTopics);
      expect(mockMongoIO.getDocuments).toHaveBeenCalledWith(
        "topics",
        { status: { $ne: "Archived" } },
        { _id: 1, name: 1 },
        { name: 1 }
      );
      expect(mockMongoIO.getDocuments).toHaveBeenCalledTimes(1);
    });
  });

  describe("GetTopic", () => {
    it("should return a specific topic by ID", async () => {
      // Arrange
      const token: Token = { userId: "testUser", roles: ["admin"] };
      const id = "12345";
      const mockTopic = { _id: id, name: "Specific Topic" };
      mockMongoIO.getDocument.mockResolvedValue(mockTopic);

      // Act
      const result = await TopicService.GetTopic(id, token);

      // Assert
      expect(result).toEqual(mockTopic);
      expect(mockMongoIO.getDocument).toHaveBeenCalledWith("topics", id);
      expect(mockMongoIO.getDocument).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if the topic is not found", async () => {
      // Arrange
      const token: Token = { userId: "testUser", roles: ["admin"] };
      const id = "nonexistentId";
      mockMongoIO.getDocument.mockResolvedValue(null);

      // Act & Assert
      await expect(TopicService.GetTopic(id, token)).rejects.toThrow(`Not Found: ${id}`);
      expect(mockMongoIO.getDocument).toHaveBeenCalledWith("topics", id);
      expect(mockMongoIO.getDocument).toHaveBeenCalledTimes(1);
    });
  });
});