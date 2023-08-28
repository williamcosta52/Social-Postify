import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { MediasFactories } from './factories/medias.factory';
import { PostsFactory } from './factories/posts.factory';
import { faker } from '@faker-js/faker';
import { PublicationFactory } from './factories/publication.factory';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let mediaFactory: MediasFactories;
  let postsFactory: PostsFactory;
  let publicationFactory: PublicationFactory;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        PrismaModule,
        MediasFactories,
        PostsFactory,
        PublicationFactory,
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    mediaFactory = app.get(MediasFactories);
    postsFactory = app.get(PostsFactory);
    publicationFactory = app.get(PublicationFactory);
    app.useGlobalPipes(new ValidationPipe());
    await prisma.medias.deleteMany();
    await prisma.posts.deleteMany();
    await prisma.publication.deleteMany();
    await app.init();
  });
  it("/health => should return status 200 and a message 'i'm okay!'", async () => {
    const { status, text } = await request(app.getHttpServer()).get('/health');
    expect(status).toBe(HttpStatus.OK);
    expect(text).toBe("i'm okay!");
  });
  describe('medias route', () => {
    it('POST /medias => should create a post', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/medias')
        .send({
          title: 'Oie',
          username: 'test',
        });
      expect(status).toBe(HttpStatus.CREATED);
      expect(body).not.toBe(null);
    });
    it('GET /medias => should return the medias', async () => {
      await mediaFactory.createMedia();
      const { status, body } = await request(app.getHttpServer()).get(
        '/medias',
      );
      expect(status).toBe(HttpStatus.OK);
      expect(body).toHaveLength(1);
    });
    it('GET /medias/:id => should return a status 404 when id do not exist', async () => {
      await mediaFactory.createMedia();
      const { status } = await request(app.getHttpServer()).get('/medias/1');
      expect(status).toBe(HttpStatus.NOT_FOUND);
    });
    it('GET /medias/:id => should return a media', async () => {
      const media = await mediaFactory.createMedia();
      const { status, body } = await request(app.getHttpServer()).get(
        `/medias/${media.id}`,
      );
      expect(status).toBe(HttpStatus.OK);
      expect(body).not.toBe(null);
    });
    it("PUT /medias/:id => should not update a media when id doesn't exist", async () => {
      const { status } = await request(app.getHttpServer()).get(`/medias/1`);
      expect(status).toBe(HttpStatus.NOT_FOUND);
    });
    it('DELETE /medias/:id => should delete a media', async () => {
      const media = await mediaFactory.createMedia();
      const { status } = await request(app.getHttpServer()).delete(
        `/medias/${media.id}`,
      );
      expect(status).toBe(HttpStatus.OK);
    });
  });
  describe('posts route', () => {
    it('POST /posts => should create a post', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/posts')
        .send({
          text: faker.word.words(),
          title: faker.word.words(),
        });
      expect(status).toBe(HttpStatus.CREATED);
      expect(body).not.toBe(null);
    });
    it('GET /posts => should return the posts', async () => {
      await postsFactory.createPost();
      const { status, body } = await request(app.getHttpServer()).get('/posts');
      expect(status).toBe(HttpStatus.OK);
      expect(body).toHaveLength(1);
    });
    it('GET /posts/:id => should return a status 404 when id do not exist', async () => {
      await postsFactory.createPost();
      const { status } = await request(app.getHttpServer()).get('/medias/1');
      expect(status).toBe(HttpStatus.NOT_FOUND);
    });
    it('PUT /posts/:id => should update a post', async () => {
      const post = await postsFactory.createPost();
      const { status, body } = await request(app.getHttpServer())
        .put(`/posts/${post.id}`)
        .send({
          text: faker.word.words(),
          title: faker.word.words(),
        });
      expect(status).toBe(HttpStatus.OK);
      expect(body).not.toBe(null);
    });
    it('DELETE /posts/:id => cannot delete a media if id does not exist', async () => {
      const { status } = await request(app.getHttpServer()).delete('/posts/1');
      expect(status).toBe(HttpStatus.NOT_FOUND);
    });
  });
  describe('publication route', () => {
    it('POST /publications => should create a publication', async () => {
      const media = await mediaFactory.createMedia();
      const post = await postsFactory.createPost();
      const date = new Date();
      const { status } = await request(app.getHttpServer())
        .post('/publications')
        .send({
          mediaId: media.id,
          postId: post.id,
          date: date,
        });
      expect(status).toBe(HttpStatus.CREATED);
    });
    it('GET /publications => should return publications', async () => {
      const media = await mediaFactory.createMedia();
      const post = await postsFactory.createPost();
      const date = new Date();
      await publicationFactory.createPublication(media.id, post.id, date);
      const { status } = await request(app.getHttpServer()).get(
        '/publications',
      );
      expect(status).toBe(HttpStatus.OK);
    });
    it('GET /publications/:id => should return a specific publication', async () => {
      const media = await mediaFactory.createMedia();
      const post = await postsFactory.createPost();
      const date = new Date();
      const publication = await publicationFactory.createPublication(
        media.id,
        post.id,
        date,
      );
      const { status, body } = await request(app.getHttpServer()).get(
        `/publications/${publication.id}`,
      );
      expect(status).toBe(HttpStatus.OK);
      expect(body).not.toBe(null);
    });
    it('PUT /publications/:id => cannot update when publication has posted', async () => {
      const media = await mediaFactory.createMedia();
      const post = await postsFactory.createPost();
      const date = faker.date.past();
      const publication = await publicationFactory.createPublication(
        media.id,
        post.id,
        date,
      );
      const { status } = await request(app.getHttpServer())
        .put(`/publications/${publication.id}`)
        .send({
          mediaId: media.id,
          postId: post.id,
          date: faker.date.future(),
        });
      expect(status).toBe(HttpStatus.FORBIDDEN);
    });
    it('DELETE /publications/:id => should delete a publication', async () => {
      const media = await mediaFactory.createMedia();
      const post = await postsFactory.createPost();
      const date = new Date();
      const publication = await publicationFactory.createPublication(
        media.id,
        post.id,
        date,
      );
      const { status } = await request(app.getHttpServer()).delete(
        `/publications/${publication.id}`,
      );
      expect(status).toBe(HttpStatus.OK);
    });
  });
});
