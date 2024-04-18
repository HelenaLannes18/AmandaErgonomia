import {
    createPerigo,
    deletePerigo,
    getPerigo,
    getPerigosWithSearch,
    updatePerigo,
} from '../../../lib/api';

import { HttpMethod } from '../../../types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function post(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case HttpMethod.GET:
            const {
                query: { search },
            } = req;
            if (search) {
                //@ts-ignore
                return getPerigosWithSearch(req, res);
            } else {
                //@ts-ignore
                return getPerigo(req, res);
            }
        case HttpMethod.POST:
            //@ts-ignore
            return createPerigo(req, res);
        case HttpMethod.PUT:
            //@ts-ignore
            return updatePerigo(req, res);
        case HttpMethod.DELETE:
            //@ts-ignore
            return deletePerigo(req, res);
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
