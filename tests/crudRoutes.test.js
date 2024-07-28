import request from 'supertest';
import express from 'express';
import expressRouter from '../routes/crudRoutes.js';
import EmployeeController from '../crud-operations-controller/employeeController.js';

// Create an express app and use the router
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use('/api', expressRouter);

// Mock the EmployeeController methods
jest.mock('../crud-operations-controller/employeeController.js', () => ({
    createEmployee: jest.fn((req, res) => res.status(201).send({ message: 'Employee created' })),
    getAllEmployees: jest.fn((req, res) => res.status(200).send([{ id: 1, name: 'John Doe' }])),
    getEmployeeById: jest.fn((req, res) => res.status(200).send({ id: req.params.id, name: 'John Doe' })),
    updateEmployee: jest.fn((req, res) => res.status(200).send({ message: 'Employee updated' })),
    deleteEmployee: jest.fn((req, res) => res.status(200).send({ message: 'Employee deleted' })),
}));

describe('CRUD Routes', () => {
    test('POST /api/employee should create an employee', async () => {
        const res = await request(app)
            .post('/api/employee')
            .send({ name: 'Jane Doe', email: 'jane.doe@example.com' });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Employee created');
    });

    test('GET /api/employee should return all employees', async () => {
        const res = await request(app).get('/api/employee');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([{ id: 1, name: 'John Doe' }]);
    });

    test('GET /api/employee/:id should return an employee by id', async () => {
        const res = await request(app).get('/api/employee/1');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', '1');
        expect(res.body).toHaveProperty('name', 'John Doe');
    });

    test('PUT /api/employee/:id should update an employee by id', async () => {
        const res = await request(app)
            .put('/api/employee/1')
            .send({ name: 'Jane Doe', email: 'jane.doe@example.com' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Employee updated');
    });

    test('DELETE /api/employee/:id should delete an employee by id', async () => {
        const res = await request(app).delete('/api/employee/1');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Employee deleted');
    });
});
