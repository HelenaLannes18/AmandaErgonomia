import {
  createAreaavaliada,
  deleteAreaavaliada,
  getAreaavaliada,
  updateAreaavaliada,
} from '../../../lib/api';

import { HttpMethod } from '../../../types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function post(req: NextApiRequest, res: NextApiResponse) {
  //@ts-ignore

  switch (req.method) {
    case HttpMethod.GET:
      //@ts-ignore
      return getAreaavaliada(req, res);
    case HttpMethod.POST:
      //@ts-ignore
      return createAreaavaliada(req, res);
    case HttpMethod.PUT:
      //@ts-ignore
      return updateAreaavaliada(req, res);
    case HttpMethod.DELETE:
      //@ts-ignore
      return deleteAreaavaliada(req, res);
    default:
      res.setHeader('Allow', [
        HttpMethod.GET,
        HttpMethod.POST,
        HttpMethod.DELETE,
        HttpMethod.PUT,
      ]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
