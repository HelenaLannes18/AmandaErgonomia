import {
  createRisco,
  deleteRisco,
  getRisco,
  getRiscosWithSearch,
  updateRisco,
} from '../../../lib/api';

import { HttpMethod } from '../../../types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function post(req: NextApiRequest, res: NextApiResponse) {
  //@ts-ignore
  //   if (!session) return res.status(401).end();

  switch (req.method) {
    case HttpMethod.GET:
      const {
        query: { search },
      } = req;
      if (search) {
        //@ts-ignore
        return getRiscosWithSearch(req, res);
      } else {
        //@ts-ignore
        return getRisco(req, res);
      }
    case HttpMethod.POST:
      //@ts-ignore
      return createRisco(req, res);
    case HttpMethod.PUT:
      //@ts-ignore
      return updateRisco(req, res);
    case HttpMethod.DELETE:
      //@ts-ignore
      return deleteRisco(req, res);
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
