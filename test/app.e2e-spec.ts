import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('authentication (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('user signup successfully', () => {
    const email = 'test@testnew.com';
    const name = 'test';
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, name, password: '123456' })
      .expect(201)
      .then((res) => {
        const { email, id, name } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
        expect(name).toEqual(name);
      });
  });
  it('signup as a new user and get the currently logged in user', async () => {
    const email = 'test@testnew.com';
    const name = 'test';
    const resp = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, name, password: '123456' })
      .expect(201);

    const cookie = resp.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email);
    expect(body.name).toEqual(name);
    expect(body.id).toBeDefined();
  });
});
