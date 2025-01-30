import * as dotenv from 'dotenv';
dotenv.config();

import {ApplicationConfig, RestaurantSystemApplication} from './application';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new RestaurantSystemApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  return app;
}

if (require.main === module) {
  main().catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}