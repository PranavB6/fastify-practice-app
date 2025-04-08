import {
  FastifyPluginAsyncTypebox,
  Type,
} from '@fastify/type-provider-typebox';

const example: FastifyPluginAsyncTypebox = async (
  fastify,
  _opts,
): Promise<void> => {
  fastify.get(
    '/',
    {
      schema: {
        querystring: Type.Object({
          name: Type.Optional(Type.String()),
          excitement: Type.Optional(Type.Number()),
        }),
      },
    },
    async function (request, _reply) {
      const name = request.query.name;
      const excitement = request.query.excitement;

      let replyString = 'This is an example.';

      if (name != null) {
        replyString += ` Name: '${name}'`;
      }

      if (excitement != null) {
        replyString += ` Excitement: '${excitement}'`;
      }

      return replyString;
    },
  );
};

export default example;
