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
      where: {
        empresaId: '8bf372b9-b553-4c80-9c65-956d6fef3661',
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
): Promise<void | NextApiResponse<{
  unidadeId: string;
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

  const { name, empresaId } = req.body;

  try {
    const response = await prisma.unidade.create({
      data: {
        //@ts-ignore
        name: name,
        empresaId: empresaId,
      },
    });

    return res.status(201).json({
      unidadeId: response.id,
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

  const { name, empresaId } = req.body;

  try {
    const unidade = await prisma.unidade.update({
      where: {
        id: unidadeId,
      },
      data: {
        //@ts-ignore
        name: name,
        empresaId: empresaId,
      },
    });
    return res.status(200).json(unidade);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
