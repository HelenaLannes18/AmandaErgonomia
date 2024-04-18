import {
    createUser,
    getUser,
    updateUser,
} from '../../../lib/api';

import { HttpMethod } from '../../../types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function post(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case HttpMethod.GET:
            //@ts-ignore
            return getUser(req, res);
        case HttpMethod.POST:
            //@ts-ignore
            return createUser(req, res);
        case HttpMethod.PUT:
            //@ts-ignore
            return updateUser(req, res);
        default:
            res.setHeader('Allow', [
                HttpMethod.GET,
                HttpMethod.POST,
                HttpMethod.PUT,
            ]);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
