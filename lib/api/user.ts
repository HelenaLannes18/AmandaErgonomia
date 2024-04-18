import prisma from '../prisma';

import { NextApiRequest, NextApiResponse } from 'next';

import type { User } from '@prisma/client';

interface AllUsers {
  users: Array<User>;
}

/**
 * Get User
 *
 * Fetches & returns either a single or all users available depending on
 * whether a `userId` query parameter is provided. If not all pacientes are
 * returned in descending order.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<AllUsers>> {
  const { userId } = req.query;

  if (Array.isArray(userId))
    return res.status(400).end('Bad request. Query parameters are not valid.');

  try {
    if (userId) {
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
      return res.status(200).json(user);
    }

    const users = await prisma.user.findMany({});

    return res.status(200).json({
      users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

// /**
//  * Gets Users with Search
//  *
//  * Gets a User from a search input in the frontend.
//  *
//  * @param req - Next.js API Request
//  * @param res - Next.js API Response
//  */
// export async function getUsersWithSearch(
//   req: NextApiRequest,
//   res: NextApiResponse,
//   session: Session
// ): Promise<void | NextApiResponse<Array<User>>> {
//   const { search, userId } = req.query;

//   if (typeof search !== 'string' || !search.trim()) {
//     return res
//       .status(400)
//       .end('Bad request. Search query parameter is not valid.');
//   }

//   if (Array.isArray(userId))
//     return res.status(400).end('Bad request. Query parameters are not valid.');

//   try {
//     const users = await prisma.user.findMany({
//       where: {
//         name: {
//           contains: search,
//           mode: 'insensitive',
//         },
//       },
//     });
//     return res.status(200).json(users);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).end(error);
//   }
// }

/**
 * Create User
 *
 * Create a User.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  userId: string;
}>> {
  // const emailuser = session?.user?.email;
  // if (typeof emailuser !== 'string' || !emailuser.trim()) {
  //   return res
  //     .status(400)
  //     .end('Bad request emailuser query parameter is not valid.');
  // }

  // const user = await prisma.user.findUnique({
  //   where: {
  //     email: emailuser,
  //   },
  // });

  // const userId = user?.id;

  // if (typeof userId !== 'string' || !userId.trim()) {
  //   return res
  //     .status(400)
  //     .end('Bad request userID query parameter is not valid.');
  // }

  const { name, email, password, image } = req.body;

  try {
    const response = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        image: image,
      },
    });

    return res.status(201).json({
      userId: response.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Update User
 *
 * Updates a user & all of its data using a collection of provided
 * query parameters. These include the following:
 *  - id
 *  - title
 *  - description
 *  - content
 *  - slug
 *  - image
 *  - imageBlurhash
 *  - published
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */

export async function updateUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<User>> {
  const { userId } = req.query;

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'Missing or misconfigured user ID' });
  }

  const { name, email, password, image } = req.body;

  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
        email: email,
        password: password,
        image: image,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
