import { FastifyPluginAsync } from 'fastify';

import items from '../db/items.js';

const itemsRoutes: FastifyPluginAsync = async (fastify, _opts) => {
  fastify.get('/', async function (request, reply) {
    return reply.send(items);
  });
};

export default itemsRoutes;
