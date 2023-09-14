import express from 'express';

import { deviceIdValidator } from '../validations/listen.js';
import { getMessages, subscribeToTopic } from '../controllers/listen.js';

export const router = express.Router();

router.get("/:id", deviceIdValidator, subscribeToTopic, getMessages);

export default router;
