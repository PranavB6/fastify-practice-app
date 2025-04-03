import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

const fastify = Fastify({
  logger: {
    level: 'debug',
    transport: {
      target: 'pino-pretty',
    },
  },
});

fastify.route({
  method: 'GET',
  url: '/',
  schema: {
    querystring: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        excitement: { type: 'integer' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' },
          queryString: { type: 'object' },
        },
      },
    },
  },
  handler: async function (request, reply) {
    const response = reply.send({ hello: 'world', queryString: request.query });

    response.request.log.info('Here');

    return response;
  },
});

async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const body = request.body;

      console.log({ body });

      return reply.code(201).send(body);
    },
  });
}

fastify.register(userRoutes, {
  prefix: '/api/users',
});

['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, async () => {
    fastify.log.info('Shutting down...');
    await fastify.close();
    process.exit(0);
  });
});

async function main() {
  await fastify.listen({
    port: 3000,
    host: '0.0.0.0',
  });
}

main();
