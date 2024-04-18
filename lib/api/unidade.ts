import prisma from '../prisma';

import { NextApiRequest, NextApiResponse } from 'next';

import type { Unidade } from '@prisma/client';

interface AllUnidades {
  unidades: Array<Unidade>;
}

/**
 * Get Unidade
 *
 * Fetches & returns either a single or all unidades available depending on
 * whether a `unidadeId` query parameter is provided. If not all pacientes are
 * returned in descending order.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getUnidade(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<AllUnidades>> {
  const { unidadeId } = req.query;

  if (Array.isArray(unidadeId))
    return res.status(400).end('Bad request. Query parameters are not valid.');

  try {
    if (unidadeId) {
      const unidade = await prisma.unidade.findFirst({
        where: {
          id: unidadeId,
        },
      });
      return res.status(200).json(unidade);
    }

    const unidades = await prisma.unidade.findMany({
      // where: {
      //   empresaId: '8bf372b9-b553-4c80-9c65-956d6fef3661',
      // },
    });

    return res.status(200).json({
      unidades,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Get Unidades For Create Inicial
 *
 * Fetches & returns either a single or all unidades available depending on
 * whether a `unidadeId` query parameter is provided. If not all pacientes are
 * returned in descending order.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getUnidadeInicial(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<AllUnidades>> {
  const { unidadeId } = req.query;

  if (Array.isArray(unidadeId))
    return res.status(400).end('Bad request. Query parameters are not valid.');

  try {
    if (unidadeId) {
      const unidade = await prisma.unidade.findFirst({
        where: {
          id: unidadeId,
        },
      });
      return res.status(200).json(unidade);
    }

    const unidades = await prisma.unidade.findMany({
      where: {
        empresaId: 'df367fe7-388b-4be0-b51c-08a81e5f64df',
      },
    });

    return res.status(200).json({
      unidades,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

// /**
//  * Gets Unidades with Search
//  *
//  * Gets a Unidade from a search input in the frontend.
//  *
//  * @param req - Next.js API Request
//  * @param res - Next.js API Response
//  */
// export async function getUnidadesWithSearch(
//   req: NextApiRequest,
//   res: NextApiResponse,
//   session: Session
// ): Promise<void | NextApiResponse<Array<Unidade>>> {
//   const { search, unidadeId } = req.query;

//   if (typeof search !== 'string' || !search.trim()) {
//     return res
//       .status(400)
//       .end('Bad request. Search query parameter is not valid.');
//   }

//   if (Array.isArray(unidadeId))
//     return res.status(400).end('Bad request. Query parameters are not valid.');

//   try {
//     const unidades = await prisma.unidade.findMany({
//       where: {
//         name: {
//           contains: search,
//           mode: 'insensitive',
//         },
//       },
//     });
//     return res.status(200).json(unidades);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).end(error);
//   }
// }

/**
 * Create Unidade
 *
 * Create a Unidade.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function createUnidade(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{ unidadeId: string }>> {
  const { nameUnidades, empresaId } = req.body;

  if (!Array.isArray(nameUnidades) || !nameUnidades.length) {
    return res
      .status(400)
      .end('Bad request: nameUnidades should be a non-empty array.');
  }

  try {
    const unidadeIds: string[] = [];

    // Iterate through each name in the array and create a Unidade for each
    for (const nameUnidade of nameUnidades) {
      const response = await prisma.unidade.create({
        data: {
          nameUnidade: nameUnidade,
          empresaId: empresaId,
        },
      });

      unidadeIds.push(response.id);
    }

    return res.status(201).json({
      unidadeIds: unidadeIds,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Delete Unidade
 *
 * Deletes a unidade from the database using a provided `pacienteId` query
 * parameter.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function deleteUnidade(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  const { unidadeId } = req.query;

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

  if (!unidadeId || typeof unidadeId !== 'string') {
    return res
      .status(400)
      .json({ error: 'Missing or misconfigured unidade ID' });
  }

  try {
    const response = await prisma.unidade.delete({
      where: {
        id: unidadeId,
      },
    });
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Update Unidade
 *
 * Updates a unidade & all of its data using a collection of provided
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

export async function updateUnidade(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Unidade>> {
  const { unidadeId } = req.query;

  if (!unidadeId || typeof unidadeId !== 'string') {
    return res
      .status(400)
      .json({ error: 'Missing or misconfigured unidade ID' });
  }

  const { nameUnidade, empresaId } = req.body;

  try {
    const unidade = await prisma.unidade.update({
      where: {
        id: unidadeId,
      },
      data: {
        nameUnidade: nameUnidade,
        empresaId: empresaId,
      },
    });
    return res.status(200).json(unidade);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
