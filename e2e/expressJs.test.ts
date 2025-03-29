import 'reflect-metadata';
import request from 'supertest';
import { app, server } from '../src/app';
import AppDataSource from '../src/config/database';
import { Item } from '../src/entity/Item';
import { Repository } from 'typeorm';

let itemRepository: Repository<Item>;

beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    itemRepository = AppDataSource.getRepository(Item);
	await itemRepository.clear();
});

afterAll(async () => {
    if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
    }
	await new Promise(resolve => server.close(resolve)); // Este es el cierre explícito
});

describe('E2E Tests', () => {
    it('should get a response with status code 200', async () => {
        const response = await request(app).get('/api/ping');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ ok: true });
    });

    it('should return an empty list of items initially', async () => {
		const response = await request(app).get('/api/items');

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual([]);
	});
	
	it('should return a list of items after adding a new item', async () => {
		await itemRepository.save({ name: 'Item 1', price: 10 });

		const response3 = await request(app).get('/api/items');

		expect(response3.statusCode).toBe(200);
		expect(response3.body).toEqual(
		  expect.arrayContaining([
			expect.objectContaining({
			  id: expect.any(Number),
			  name: 'Item 1',
			  price: expect.any(String)
			})
		  ])
		);
	});

	it('should be able to create a new item and get it by id', async () => {
		const response = await request(app)
			.post('/api/items')
			.send({
				name: 'Item 1',
				price: 10
			});
	
		expect(response.statusCode).toBe(201);
		expect(response.body).toEqual(
			expect.objectContaining({
				id: expect.any(Number),
				name: 'Item 1',
				price: 10
			})
		);
	
		const itemId = response.body.id;
	
		const response2 = await request(app).get(`/api/items/${itemId}`);
	
		expect(response2.statusCode).toBe(200);
		expect(response2.body).toEqual(
			expect.objectContaining({
				id: expect.any(Number),
				name: 'Item 1',
				price: expect.any(String),
				createdAt: expect.any(String),
				updatedAt: expect.any(String)
			})
		);
	});
	
	it('should be able to update an item', async () => {
		const createResponse = await request(app)
			.post('/api/items')
			.send({
				name: 'Item 1',
				price: 10
			});
	
		expect(createResponse.statusCode).toBe(201);
		expect(createResponse.body).toEqual(
			expect.objectContaining({
				id: expect.any(Number),
				name: 'Item 1',
				price: expect.any(Number),
				createdAt: expect.any(String),
				updatedAt: expect.any(String)
			})
		);
	
		const itemId = createResponse.body.id;
	
		const updateResponse = await request(app)
			.patch(`/api/items/${itemId}`)
			.send({
				name: 'Item 1 updated',
				price: 20
			});
	
		expect(updateResponse.statusCode).toBe(200);
		expect(updateResponse.body).toEqual(
			expect.objectContaining({
				id: itemId,
				name: 'Item 1 updated',
				price: expect.any(Number),
				createdAt: expect.any(String),
				updatedAt: expect.any(String)
			})
		);
	
		const getResponse = await request(app).get(`/api/items/${itemId}`);
	
		expect(getResponse.statusCode).toBe(200);
		expect(getResponse.body).toEqual(
			expect.objectContaining({
				id: itemId,
				name: 'Item 1 updated',
				price: expect.stringMatching(/^\d+(\.\d+)?$/),
				createdAt: expect.any(String),
				updatedAt: expect.any(String)
			})
		);
	
		expect(Number(getResponse.body.price)).toBeGreaterThan(0);
	
		const currentTime = Date.now();
		const receivedUpdatedAt = new Date(getResponse.body.updatedAt).getTime();
		expect(receivedUpdatedAt).toBeLessThanOrEqual(currentTime);
	});
	
	it('should be able to delete an item', async () => {
		const createResponse = await request(app)
		  .post('/api/items')
		  .send({
			name: 'Item 1',
			price: 10
		  });
	
		expect(createResponse.statusCode).toBe(201);
		const createdItem = createResponse.body;
		expect(createdItem).toBeDefined();
	
		const deleteResponse = await request(app)
		  .delete(`/api/items/${createdItem.id}`);
	
		expect(deleteResponse.statusCode).toBe(204);
	
		const getResponse = await request(app)
		  .get(`/api/items/${createdItem.id}`);
	
		expect(getResponse.statusCode).toBe(404);
	});

	describe('Validations', () => {
		it('should validate required fields', async () => {
			jest.setTimeout(10000);
		  
			const response = await request(app)
			  .post('/api/items')
			  .send({
				name: 'Item 1'
			});
		  
			expect(response.statusCode).toBe(400);
			expect(response.body).toEqual({
				errors:[{
           			constraints: {
             			'isInt': 'price must be an integer number',
             			'min': 'price must not be less than 1',
           			},
           			'field': 'price',
         		}],
       			'message': 'validation failed',
			});
		});

		it('should not allow for negative pricing for new items', async () => {
			const response = await request(app)
			  .post('/api/items')
			  .send({
				name: 'Item 1',
				price: -10
			  });
		
			expect(response.statusCode).toBe(400);
		
			expect(response.body).toEqual({
				'message': 'validation failed',
				'errors': [
					{
						'field': 'price',
						'constraints': {
							'min': 'price must not be less than 1'
						}
					}
				]
			});
		});

		it('should not allow for negative pricing for updated items', async () => {
			const createdItemResponse = await request(app)
			  .post('/api/items')
			  .send({
				name: 'Item 1',
				price: 10
			  });
		
			const createdItem = createdItemResponse.body;
			expect(createdItem).toBeDefined();
		
			const response = await request(app)
			  .patch(`/api/items/${createdItem.id}`)
			  .send({
				name: 'Item 1 updated',
				price: -20
			  });
		
			expect(response.statusCode).toBe(400);
		
			expect(response.body).toEqual({
				message: 'validation failed',
				errors: [
				  {
					field: 'price',
					constraints: {
					  min: 'price must not be less than 1'
					}
				  }
				]
			});
		});
	});
});
