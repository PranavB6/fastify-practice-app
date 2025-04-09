import t from 'tap';

import { buildApp } from '../helper';

t.test('/example', async (t) => {
  const app = await buildApp(t);

  t.test('example is loaded', async (t) => {
    const res = await app.inject({
      url: '/example',
    });

    t.equal(res.payload, 'This is an example.');
  });

  t.test('example with querystring', async (t) => {
    const res = await app.inject({
      url: '/example?name=John&excitement=10',
    });

    t.equal(res.payload, `This is an example. Name: 'John' Excitement: '10'`);
  });

  t.test('example with querystring and no name', async (t) => {
    const res = await app.inject({
      url: '/example?excitement=10',
    });

    t.equal(res.payload, `This is an example. Excitement: '10'`);
  });

  t.test('example with querystring and no excitement', async (t) => {
    const res = await app.inject({
      url: '/example?name=John',
    });

    t.equal(res.payload, `This is an example. Name: 'John'`);
  });
});
