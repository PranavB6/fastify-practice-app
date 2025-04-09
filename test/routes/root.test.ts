import t from 'tap';

import { buildApp } from '../helper';

t.test('default root route', async (t) => {
  const app = await buildApp(t);

  t.test('GET /', async (t) => {
    const res = await app.inject({
      url: '/',
    });

    t.equal(res.statusCode, 200);
    t.same(JSON.parse(res.payload), { root: true });
  });
});
