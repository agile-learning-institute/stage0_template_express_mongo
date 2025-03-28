import {{item.name | title}}Controller from './{{item.name | title}}Controller';
import {{item.name | title}}Service from '../services/{{item.name | title}}Service';
import { decodeToken, createBreadcrumb } from '@{{arch.organization}}/{{arch.product}}-ts-api-utils';
import { Request, Response } from 'express';

// Mock {{item.name | title}}Service
jest.mock('../services/{{item.name | title}}Service');

// Mock the utility module
jest.mock('@{{arch.organization}}/{{arch.product}}-ts-api-utils', () => ({
  decodeToken: jest.fn(),
  createBreadcrumb: jest.fn(),
}));

describe('{{item.name | title}}Controller', () => {
    let controller: {{item.name | title}}Controller;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        controller = new {{item.name | title}}Controller();

        mockRequest = {
            query: { name: 'Test Query' },
            params: { partnerId: 'partner123', personId: 'person456' },
            body: { name: 'New {{item.name | title}}' },
            ip: '192.168.1.1',
            headers: { 'x-correlation-id': 'test-correlation-id' },
        };

        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch partners successfully', async () => {
        const mockToken = { userId: 'user123', roles: ['admin'] };
        const mockBreadcrumb = { correlationId: 'test-correlation-id' };
        const mockResults = [{ name: '{{item.name | title}} A' }, { name: '{{item.name | title}} B' }];

        (decodeToken as jest.Mock).mockReturnValue(mockToken);
        (createBreadcrumb as jest.Mock).mockReturnValue(mockBreadcrumb);
        ({{item.name | title}}Service.Find{{item.name | title}}s as jest.Mock).mockResolvedValue(mockResults);

        await controller.get{{item.name | title}}s(mockRequest as Request, mockResponse as Response);

        expect(decodeToken).toHaveBeenCalledWith(mockRequest);
        expect(createBreadcrumb).toHaveBeenCalledWith(mockToken, mockRequest);
        expect({{item.name | title}}Service.Find{{item.name | title}}s).toHaveBeenCalledWith(mockRequest.query, mockToken);
        expect(mockResponse.json).toHaveBeenCalledWith(mockResults);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should fetch a single partner successfully', async () => {
        const mockToken = { userId: 'user123', roles: ['admin'] };
        const mockBreadcrumb = { correlationId: 'test-correlation-id' };
        const mock{{item.name | title}} = { id: 'partner123', name: '{{item.name | title}} A' };

        (decodeToken as jest.Mock).mockReturnValue(mockToken);
        (createBreadcrumb as jest.Mock).mockReturnValue(mockBreadcrumb);
        ({{item.name | title}}Service.Find{{item.name | title}} as jest.Mock).mockResolvedValue(mock{{item.name | title}});

        await controller.get{{item.name | title}}(mockRequest as Request, mockResponse as Response);

        expect(decodeToken).toHaveBeenCalledWith(mockRequest);
        expect(createBreadcrumb).toHaveBeenCalledWith(mockToken, mockRequest);
        // expect({{item.name | title}}Service.Find{{item.name | title}}).toHaveBeenCalledWith(mockRequest.params.partnerId, mockToken);
        expect(mockResponse.json).toHaveBeenCalledWith(mock{{item.name | title}});
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should create a partner successfully', async () => {
        const mockToken = { userId: 'user123', roles: ['admin'] };
        const mockBreadcrumb = { correlationId: 'test-correlation-id' };
        const mockNew{{item.name | title}} = { _id: 'partner123', name: 'New {{item.name | title}}' };

        (decodeToken as jest.Mock).mockReturnValue(mockToken);
        (createBreadcrumb as jest.Mock).mockReturnValue(mockBreadcrumb);
        ({{item.name | title}}Service.Insert{{item.name | title}} as jest.Mock).mockResolvedValue(mockNew{{item.name | title}});

        await controller.create{{item.name | title}}(mockRequest as Request, mockResponse as Response);

        expect(decodeToken).toHaveBeenCalledWith(mockRequest);
        expect(createBreadcrumb).toHaveBeenCalledWith(mockToken, mockRequest);
        expect({{item.name | title}}Service.Insert{{item.name | title}}).toHaveBeenCalledWith(mockRequest.body, mockToken, mockBreadcrumb);
        expect(mockResponse.json).toHaveBeenCalledWith(mockNew{{item.name | title}});
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should update a partner successfully', async () => {
        const mockToken = { userId: 'user123', roles: ['admin'] };
        const mockBreadcrumb = { correlationId: 'test-correlation-id' };
        const mockUpdated{{item.name | title}} = { id: 'partner123', name: 'Updated {{item.name | title}}' };

        (decodeToken as jest.Mock).mockReturnValue(mockToken);
        (createBreadcrumb as jest.Mock).mockReturnValue(mockBreadcrumb);
        ({{item.name | title}}Service.Update{{item.name | title}} as jest.Mock).mockResolvedValue(mockUpdated{{item.name | title}});

        await controller.update{{item.name | title}}(mockRequest as Request, mockResponse as Response);

        expect(decodeToken).toHaveBeenCalledWith(mockRequest);
        expect(createBreadcrumb).toHaveBeenCalledWith(mockToken, mockRequest);
        // expect({{item.name | title}}Service.Update{{item.name | title}}).toHaveBeenCalledWith(mockRequest.params.partnerId, mockRequest.body, mockToken, mockBreadcrumb);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUpdated{{item.name | title}});
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

});