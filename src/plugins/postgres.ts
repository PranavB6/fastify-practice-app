import fp from 'fastify-plugin';
import postgres from 'postgres';

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    sql: ReturnType<typeof postgres>;
  }
}

export default fp(async (fastify, _opts) => {
  const sql = postgres('postgres://postgres:postgres@localhost:5432/postgres');

  fastify.decorate('sql', sql);

  fastify.addHook('onClose', async () => {
    console.log('Closing database connection');
    await sql.end();
  });
});
