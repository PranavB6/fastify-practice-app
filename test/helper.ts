import * as path from 'node:path';

import { FastifyInstance } from 'fastify';
import { build } from 'fastify-cli/helper';
import { Test } from 'tap';

const AppPath = path.join(__dirname, '..', 'src', 'app.ts');

// Fill in this config with all the configurations
// needed for testing the application
function config() {
  return {
    skipOverride: true, // Register our application with fastify-plugin
  };
}

async function buildApp(t: Test): Promise<FastifyInstance> {
  // you can set all the options supported by the fastify CLI command
  const argv = [AppPath];

  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  const app = await build(argv, config());

  // Tear down our app after we are done
  t.after(() => {
    void app.close();
  });

  return app;
}

export { buildApp, config };
