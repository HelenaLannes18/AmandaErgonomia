import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const users = await prisma.user.findMany();

    return res.status(200).json(users);
  } catch (error) {
    console.log({ error });
    return res.status(500).end();
  }
}
