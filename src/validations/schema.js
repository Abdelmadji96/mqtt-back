import { z } from 'zod';

export const mongooseId = z.string().length(24);
export const string = z.string();
export const { object } = z;
