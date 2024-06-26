import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { mergedContract } from './apis/mergedContract';
import { generateOpenApi } from '@ts-rest/open-api';
import { authContract } from './apis/auth/contract';
import { authRouter } from './apis/auth/router';
import { createExpressEndpoints } from '@ts-rest/express';
import { authMiddleware, buyerOnlyMiddleware, env, sellerOnlyMiddleware } from './utils';
import { buyerContract } from './apis/buyer/contract';
import { buyerRouter } from './apis/buyer/router';
import { sellerContract } from './apis/seller/contract';
import { sellerRouter } from './apis/seller/router';
//@ts-ignore
import { trim_all } from 'request_trimmer';
const app = express();
var jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(trim_all);
const openApiDocument = generateOpenApi(mergedContract, {
  info: {
    title: 'Zen-Admin ECommerce',
    version: '1.0.0',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'bearer',
        // name: 'Authorization', // optional
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
});
const port = env.PORT || 3000;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
createExpressEndpoints(authContract, authRouter, app);

// app.use(authMiddleware);
createExpressEndpoints(buyerContract, buyerRouter, app, {
  globalMiddleware: [authMiddleware, buyerOnlyMiddleware],
});
createExpressEndpoints(sellerContract, sellerRouter, app, {
  globalMiddleware: [authMiddleware, sellerOnlyMiddleware],
});

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
