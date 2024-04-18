import {
  createHistorico,
  deleteHistorico,
  getHistorico,
  updateHistorico,
} from '../../../lib/api';

import { HttpMethod } from '../../../types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function post(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case HttpMethod.GET:
      //@ts-ignore
      return getHistorico(req, res);
    case HttpMethod.POST:
      //@ts-ignore
      return createHistorico(req, res);
    case HttpMethod.PUT:
      //@ts-ignore
      return updateHistorico(req, res);
    case HttpMethod.DELETE:
      //@ts-ignore
      return deleteHistorico(req, res);
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
