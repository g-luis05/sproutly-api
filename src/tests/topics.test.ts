import request from 'supertest';
import { createTestApp, authenticateUser } from './helpers';
import { title } from 'node:process';
import { start } from 'node:repl';

const app = createTestApp();

describe('Topics CRUD', () => {
    let accessToken: string;
    let userId : string;

    beforeEach(async () => {
        const auth = await authenticateUser(app, 'topic-test@example.com');
        accessToken = auth.accessToken;
        userId = auth.userId;
    });

    describe('POST /api/v1/topics', () => {
        it('should create topic when authenticated', async () => {
            const response = await request(app)
                .post('/api/v1/topics')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({ title: 'Test Topic', description: 'Test Topic Description' })
                .expect(201);
            
            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe('Test Topic');
            expect(response.body.userId).toBe(userId);
        });

        it('should reject when not authenticated', async () => {
            await request(app)
                .post('/api/v1/topics')
                .send({ title: 'Test Topic' })
                .expect(401);
        });

        it('should reject invalid data', async () => {
            await request(app)
                .post('/api/v1/topics')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({ title: '' })
                .expect(400); 
        });
    });

    describe('GET /api/v1/topics', () => {
        it('should list only user topics', async () => {
            await request(app)
                .post('/api/v1/topics')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({ title: 'Topic 1'});

            await request(app)
                .post('/api/v1/topics')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({ title: 'Topic 2'});

            const otherUser = await authenticateUser(app,
                'other-user@example.com'
            );
            await request(app)
                .post('/api/v1/topics')
                .set('Authorization', `Bearer ${otherUser.accessToken}`)
                .send({ title: 'Topic 1 from other user'});

            const response = await request(app)
                .get('/api/v1/topics')
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200);
            
            expect(response.body).toHaveLength(2);
            expect(response.body.every((t: any) => t.userId === userId)).toBe(true);
        });
    });

    describe('DELETE /api/v1/topics/:id', () => {
        it('should delete and cascade to decisions', async () => {
            const topicRes = await request(app)
                .post('/api/v1/topics')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({ title: 'To delete' });
            
            const topicId = topicRes.body.id;

            await request(app)
                .post('/api/v1/decisions')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({ title: 'To delete child',
                    description: 'To delete child description'
                });

            await request(app)
                .delete(`/api/v1/topics/${topicId}`)
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200);

            await request(app)
                .get(`/api/v1/topics/${topicId}/decisions`)
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(404);
        });
    });
});