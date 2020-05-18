
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { bindings } from './infrastructure/config/inversify.config';
import './interfaces_adapters/controller/customer.controller'
import { PipeLineSetUp } from './infrastructure/config/middleware/pipeline-setup';

(async () => {

  const port = 8086;
  const container = new Container();
  await container.loadAsync(bindings);
  const server = new InversifyExpressServer(container);

  server.setConfig(PipeLineSetUp.configFn)
    .setErrorConfig(PipeLineSetUp.HandleError);


  const app = server.build();

  app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`)
  });

})();