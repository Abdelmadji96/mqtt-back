import { validateRequestParams } from 'zod-express-middleware';
import { object, string } from './schema.js';

const deviceIdSchema = object({
  id: string,
});

export const deviceIdValidator = validateRequestParams(deviceIdSchema);


