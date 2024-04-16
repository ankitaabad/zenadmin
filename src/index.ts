import express from 'express';
import bodyParser from "body-parser"

import swaggerUi from 'swagger-ui-express'
import { mergedContract } from './apis/mergedContract';
import { generateOpenApi } from '@ts-rest/open-api';
import { authContract } from './apis/auth/contract';
import { authRouter } from './apis/auth/router';
import { createExpressEndpoints } from '@ts-rest/express';
import { env } from './utils';
const app = express();
var jsonParser = bodyParser.json()

app.use(jsonParser);

const openApiDocument = generateOpenApi(mergedContract, {
  info: {
    title: 'Assignment',
    version: '1.0.0',
  },
});
const port = env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
createExpressEndpoints(authContract, authRouter, app);
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
