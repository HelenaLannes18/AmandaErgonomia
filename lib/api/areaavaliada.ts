import prisma from '../prisma';

import { NextApiRequest, NextApiResponse } from 'next';

import type { Areaavaliada } from '@prisma/client';

interface AllAreaavaliadas {
  areaavaliadas: Array<Areaavaliada>;
}

/**
 * Get Areaavaliada
 *
 * Fetches & returns either a single or all areaavaliadas available depending on
 * whether a `areaavaliadaId` query parameter is provided. If not all pacientes are
 * returned in descending order.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getAreaavaliada(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<AllAreaavaliadas>> {
  const { areaavaliadaId } = req.query;

  if (Array.isArray(areaavaliadaId))
    return res.status(400).end('Bad request. Query parameters are not valid.');

  try {
    if (areaavaliadaId) {
      const areaavaliada = await prisma.areaavaliada.findFirst({
        where: {
          id: areaavaliadaId,
        },
      });
      return res.status(200).json(areaavaliada);
    }

    const areaavaliadas = await prisma.areaavaliada.findMany({
      // where: {
      //   empresaId: '8bf372b9-b553-4c80-9c65-956d6fef3661',
      // },
    });

    return res.status(200).json({
      areaavaliadas,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

// /**
//  * Gets Areaavaliadas with Search
//  *
//  * Gets a Areaavaliada from a search input in the frontend.
//  *
//  * @param req - Next.js API Request
//  * @param res - Next.js API Response
//  */
// export async function getAreaavaliadasWithSearch(
//   req: NextApiRequest,
//   res: NextApiResponse,
//   session: Session
// ): Promise<void | NextApiResponse<Array<Areaavaliada>>> {
//   const { search, areaavaliadaId } = req.query;

//   if (typeof search !== 'string' || !search.trim()) {
//     return res
//       .status(400)
//       .end('Bad request. Search query parameter is not valid.');
//   }

//   if (Array.isArray(areaavaliadaId))
//     return res.status(400).end('Bad request. Query parameters are not valid.');

//   try {
//     const areaavaliadas = await prisma.areaavaliada.findMany({
//       where: {
//         name: {
//           contains: search,
//           mode: 'insensitive',
//         },
//       },
//     });
//     return res.status(200).json(areaavaliadas);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).end(error);
//   }
// }

/**
 * Create Areaavaliada
 *
 * Create a Areaavaliada.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function createAreaavaliada(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  areaavaliadaId: string;
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

  const { nameAvaliadas, empresaId } = req.body;

  if (!Array.isArray(nameAvaliadas) || !nameAvaliadas.length) {
    return res
      .status(400)
      .end('Bad request: names should be a non-empty array.');
  }

  try {
    const areaavaliadaIds: string[] = [];

    for (const nameAvaliada of nameAvaliadas) {
      const response = await prisma.areaavaliada.create({
        data: {
          nameAvaliada: nameAvaliada,
          empresaId: empresaId,
        },
      });

      areaavaliadaIds.push(response.id);
    }

    return res.status(201).json({
      areaavaliadaId: areaavaliadaIds,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Delete Areaavaliada
 *
 * Deletes a areaavaliada from the database using a provided `pacienteId` query
 * parameter.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function deleteAreaavaliada(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  const { areaavaliadaId } = req.query;

  //   const email = session?.user?.email;
  //   if (typeof email !== 'string' || !email.trim()) {
  //     return res
  //       .status(400)
  //       .end('Bad request email query parameter is not valid.');
  //   }

  //   const user = await prisma.user.findUnique({
  //     where: {
  //       email: email,
  //     },
  //   });

  //   const userId = user?.id;

  //   if (typeof userId !== 'string' || !userId.trim()) {
  //     return res
  //       .status(400)
  //       .end('Bad request email query parameter is not valid.');
  //   }

  if (!areaavaliadaId || typeof areaavaliadaId !== 'string') {
    return res
      .status(400)
      .json({ error: 'Missing or misconfigured areaavaliada ID' });
  }

  try {
    const response = await prisma.areaavaliada.delete({
      where: {
        id: areaavaliadaId,
      },
    });
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Update Areaavaliada
 *
 * Updates a areaavaliada & all of its data using a collection of provided
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

export async function updateAreaavaliada(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Areaavaliada>> {
  const { areaavaliadaId } = req.query;

  if (!areaavaliadaId || typeof areaavaliadaId !== 'string') {
    return res
      .status(400)
      .json({ error: 'Missing or misconfigured areaavaliada ID' });
  }

  const { nameAvaliada, empresaId } = req.body;

  try {
    const areaavaliada = await prisma.areaavaliada.update({
      where: {
        id: areaavaliadaId,
      },
      data: {
        nameAvaliada: nameAvaliada,
        empresaId: empresaId,
      },
    });
    return res.status(200).json(areaavaliada);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
