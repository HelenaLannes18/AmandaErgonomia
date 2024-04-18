import {
    getImage,
    createImage,
    deleteImage,
    getImageByRisco,
} from '../../../lib/api';

import { HttpMethod } from '../../../types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function post(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case HttpMethod.GET:
            const {
                query: { riscoId },
            } = req;
            if (riscoId) {
                //@ts-ignore
                return getImageByRisco(req, res);
            } else {
                //@ts-ignore
                return getImage(req, res);
            }
        case HttpMethod.POST:
            //@ts-ignore
            return createImage(req, res);
        case HttpMethod.DELETE:
            //@ts-ignore
            return deleteImage(req, res);
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
