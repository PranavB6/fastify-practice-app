import * as assert from 'node:assert';
import { test } from 'node:test';

import { build } from '../helper';

test('example is loaded', async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: '/example',
  });

  assert.equal(res.payload, 'This is an example.');
});

test('example with querystring', async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: '/example?name=John&excitement=10',
  });

  assert.equal(
    res.payload,
    `This is an example. Name: 'John' Excitement: '10'`,
  );
});

test('example with querystring and no name', async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: '/example?excitement=10',
  });

  assert.equal(res.payload, `This is an example. Excitement: '10'`);
});

test('example with querystring and no excitement', async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: '/example?name=John',
  });

  assert.equal(res.payload, `This is an example. Name: 'John'`);
});
