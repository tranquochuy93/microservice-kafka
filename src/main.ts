import { env } from '~config/env.config'; // Should be on top

env.ROOT_PATH = __dirname;

import { Bootstrap } from '~core/bootstraps/bootstraps';

async function startApp() {
  const bootstrap = new Bootstrap();
  await bootstrap.initApp();
  bootstrap.initPipes();
  // bootstrap.initCors();
  // bootstrap.buildSwagger();
  // bootstrap.initStaticAsset();
  // bootstrap.initJsonBodyLimit();
  bootstrap.initMicroservice();
  await bootstrap.start();
  // await bootstrap.enableHotReload();
}

startApp()
  .then(() => console.log('Init app success'))
  .catch(console.error);
