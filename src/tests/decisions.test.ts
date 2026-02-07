import request from 'supertest';
import { createTestApp, authenticateUser, createTestTopic } from './helpers';


const app  = createTestApp();

describe('Decisions Hierarchy', () => {
    let accessToken: string;
    let topicId: string;

    beforeEach(async () => {
        const auth = await authenticateUser(app, 'decision-test@example.com');
        accessToken = auth.accessToken;

        const topic = await createTestTopic(app, accessToken);
        topicId = topic.id;
    });

    describe('POST /api/v1/decisions', () => {
        it('should create root decision', async () => {
            const response = await request(app)
                .post('/api/v1/decisions')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    topicId,
                    title: 'Root Test Decision',
                    description: 'Root Test Decision Description',
                })
                .expect(201);

            expect(response.body.parentId).toBeNull();
        });

        it('should create child decision', async () => {
            const parentRes = await request(app)
                .post('/api/v1/decisions')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    topicId,
                    title: 'Parent',
                    description: 'Parent Description',
                });

            const parentId = parentRes.body.id;

            const childRes = await request(app)
                .post('/api/v1/decisions')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    topicId,
                    parentId,
                    title: 'Child',
                    description: 'Child Decision Description',
                })
                .expect(201);

            expect(childRes.body.parentId).toBe(parentId);
        });
    });

    describe('GET /api/v1/decisions/:id/children', () => {
        it('should get all children of a decision', async () => {
            const parentRes = await request(app)
                .post('api/v1/decisions')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    topicId,
                    title: 'Parent',
                    description: 'Test',
                });

            const parentId = parentRes.body.id;

            await request(app)
                .post('api/v1/decisions')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({ topicId, parentId, title: 'Child 1', description: 'Test 1' });

            await request(app)
                .post('api/v1/decisions')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({ topicId, parentId, title: 'Child 2', description: 'Test 2' });

            await request(app)
                .post('api/v1/decisions')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({ topicId, parentId, title: 'Child 3', description: 'Test 3' });

            const response = await request(app)
                .get(`/api/v1/decisions/${parentId}/children`)
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200);

            expect(response.body).toHaveLength(3);
        });
    });

    describe('Security - Cross-user access', () => {
        it('should not allow accessing other user decisions', async () => {
            
            const decisionRes = await request(app)
                .post('/api/v1/decisions')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    topicId,
                    title: 'Test Private Decision',
                    description: 'Test Private Decision',
                });

            const decisionId = decisionRes.body.id;

            const otherUser = await authenticateUser(app, 'hacker@example.com');

            await request(app)
                .patch(`/api/v1/decisions/${decisionId}`)
                .set('Authorization', `Bearer ${otherUser.accessToken}`)
                .send({ title: 'Hacked' })
                .expect(403);
        });
    });
});

