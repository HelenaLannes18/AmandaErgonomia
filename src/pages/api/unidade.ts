import {
  createUnidade,
  deleteUnidade,
  getUnidade,
  getUnidadeInicial,
  updateUnidade,
} from '../../../lib/api';

import { HttpMethod } from '../../../types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function post(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case HttpMethod.GET:
      //@ts-ignore
      return getUnidadeInicial(req, res);
    case HttpMethod.POST:
      //@ts-ignore
      return createUnidade(req, res);
    case HttpMethod.PUT:
      //@ts-ignore
      return updateUnidade(req, res);
    case HttpMethod.DELETE:
      //@ts-ignore
      return deleteUnidade(req, res);
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
