import {{item.name}}Controller from './SourceController';
import {{item.name}}Service from '../services/{{item.name}}Service';
import { decodeToken, createBreadcrumb } from '@{{arch.organization}}/{{arch.product}}-ts-api-utils';
import { Request, Response } from 'express';

// Mock {{item.name}}Service
jest.mock('../services/{{item.name}}Service');

// Mock the utility module
jest.mock('@agile-learning-institute/mentorhub-ts-api-utils', () => ({
  decodeToken: jest.fn(),
  createBreadcrumb: jest.fn(),
}));

describe('{{item.name}}Controller', () => {
    let controller: {{item.name}}Controller;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        controller = new {{item.name}}Controller();

        mockRequest = {
            query: { name: 'Test Query' },
            params: { partnerId: 'partner123', personId: 'person456' },
            body: { name: 'New {{item.name}}' },
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
        const mockResults = [{ name: '{{item.name}} A' }, { name: '{{item.name}} B' }];

        (decodeToken as jest.Mock).mockReturnValue(mockToken);
        (createBreadcrumb as jest.Mock).mockReturnValue(mockBreadcrumb);
        ({{item.name}}Service.Find{{item.name}}s as jest.Mock).mockResolvedValue(mockResults);

        await controller.get{{item.name}}s(mockRequest as Request, mockResponse as Response);

        expect(decodeToken).toHaveBeenCalledWith(mockRequest);
        expect(createBreadcrumb).toHaveBeenCalledWith(mockToken, mockRequest);
        expect({{item.name}}Service.Find{{item.name}}s).toHaveBeenCalledWith(mockRequest.query, mockToken);
        expect(mockResponse.json).toHaveBeenCalledWith(mockResults);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should fetch a single partner successfully', async () => {
        const mockToken = { userId: 'user123', roles: ['admin'] };
        const mockBreadcrumb = { correlationId: 'test-correlation-id' };
        const mock{{item.name}} = { id: 'partner123', name: '{{item.name}} A' };

        (decodeToken as jest.Mock).mockReturnValue(mockToken);
        (createBreadcrumb as jest.Mock).mockReturnValue(mockBreadcrumb);
        ({{item.name}}Service.Find{{item.name}} as jest.Mock).mockResolvedValue(mock{{item.name}});

        await controller.get{{item.name}}(mockRequest as Request, mockResponse as Response);

        expect(decodeToken).toHaveBeenCalledWith(mockRequest);
        expect(createBreadcrumb).toHaveBeenCalledWith(mockToken, mockRequest);
        // expect({{item.name}}Service.Find{{item.name}}).toHaveBeenCalledWith(mockRequest.params.partnerId, mockToken);
        expect(mockResponse.json).toHaveBeenCalledWith(mock{{item.name}});
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should create a partner successfully', async () => {
        const mockToken = { userId: 'user123', roles: ['admin'] };
        const mockBreadcrumb = { correlationId: 'test-correlation-id' };
        const mockNew{{item.name}} = { _id: 'partner123', name: 'New {{item.name}}' };

        (decodeToken as jest.Mock).mockReturnValue(mockToken);
        (createBreadcrumb as jest.Mock).mockReturnValue(mockBreadcrumb);
        ({{item.name}}Service.Insert{{item.name}} as jest.Mock).mockResolvedValue(mockNew{{item.name}});

        await controller.create{{item.name}}(mockRequest as Request, mockResponse as Response);

        expect(decodeToken).toHaveBeenCalledWith(mockRequest);
        expect(createBreadcrumb).toHaveBeenCalledWith(mockToken, mockRequest);
        expect({{item.name}}Service.Insert{{item.name}}).toHaveBeenCalledWith(mockRequest.body, mockToken, mockBreadcrumb);
        expect(mockResponse.json).toHaveBeenCalledWith(mockNew{{item.name}});
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should update a partner successfully', async () => {
        const mockToken = { userId: 'user123', roles: ['admin'] };
        const mockBreadcrumb = { correlationId: 'test-correlation-id' };
        const mockUpdated{{item.name}} = { id: 'partner123', name: 'Updated {{item.name}}' };

        (decodeToken as jest.Mock).mockReturnValue(mockToken);
        (createBreadcrumb as jest.Mock).mockReturnValue(mockBreadcrumb);
        ({{item.name}}Service.Update{{item.name}} as jest.Mock).mockResolvedValue(mockUpdated{{item.name}});

        await controller.update{{item.name}}(mockRequest as Request, mockResponse as Response);

        expect(decodeToken).toHaveBeenCalledWith(mockRequest);
        expect(createBreadcrumb).toHaveBeenCalledWith(mockToken, mockRequest);
        // expect({{item.name}}Service.Update{{item.name}}).toHaveBeenCalledWith(mockRequest.params.partnerId, mockRequest.body, mockToken, mockBreadcrumb);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUpdated{{item.name}});
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should add a contact successfully', async () => {
        const mockToken = { userId: 'user123', roles: ['admin'] };
        const mockBreadcrumb = { correlationId: 'test-correlation-id' };
        const mockContact = { id: 'contact123', name: 'New Contact' };

        (decodeToken as jest.Mock).mockReturnValue(mockToken);
        (createBreadcrumb as jest.Mock).mockReturnValue(mockBreadcrumb);
        ({{item.name}}Service.AddContact as jest.Mock).mockResolvedValue(mockContact);

        await controller.addContact(mockRequest as Request, mockResponse as Response);

        expect(decodeToken).toHaveBeenCalledWith(mockRequest);
        expect(createBreadcrumb).toHaveBeenCalledWith(mockToken, mockRequest);
        // expect({{item.name}}Service.AddContact).toHaveBeenCalledWith(mockRequest.params.partnerId, mockRequest.params.personId, mockToken, mockBreadcrumb);
        expect(mockResponse.json).toHaveBeenCalledWith(mockContact);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should remove a contact successfully', async () => {
        const mockToken = { userId: 'user123', roles: ['admin'] };
        const mockBreadcrumb = { correlationId: 'test-correlation-id' };
        const mock{{item.name}} = { id: 'partner123', name: '{{item.name}} A' };

        (decodeToken as jest.Mock).mockReturnValue(mockToken);
        (createBreadcrumb as jest.Mock).mockReturnValue(mockBreadcrumb);
        ({{item.name}}Service.RemoveContact as jest.Mock).mockResolvedValue(mock{{item.name}});

        await controller.removeContact(mockRequest as Request, mockResponse as Response);

        expect(decodeToken).toHaveBeenCalledWith(mockRequest);
        expect(createBreadcrumb).toHaveBeenCalledWith(mockToken, mockRequest);
        // expect({{item.name}}Service.RemoveContact).toHaveBeenCalledWith(mockRequest.params.partnerId, mockRequest.params.personId, mockToken, mockBreadcrumb);
        expect(mockResponse.json).toHaveBeenCalledWith(mock{{item.name}});
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
});