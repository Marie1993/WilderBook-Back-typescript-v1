import { Request } from 'express';

import createError from 'http-errors';

function reqIsCorrect(req: Request): void {
  if (!req.body.name || !req.body.city || !req.body.skills) {
    throw createError(400, 'Requéte non conforme');
  }
}
export default reqIsCorrect;
