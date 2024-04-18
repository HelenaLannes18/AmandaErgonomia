import prisma from '../prisma';

import { NextApiRequest, NextApiResponse } from 'next';

import type { Historico } from '@prisma/client';

interface AllHistoricos {
  historicos: Array<Historico>;
}

/**
 * Get Historico
 *
 * Fetches & returns either a single or all historicos available depending on
 * whether a `historicoId` query parameter is provided. If not all pacientes are
 * returned in descending order.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getHistorico(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<AllHistoricos>> {
  const { historicoId } = req.query;

  if (Array.isArray(historicoId))
    return res.status(400).end('Bad request. Query parameters are not valid.');

  try {
    if (historicoId) {
      const historico = await prisma.historico.findFirst({
        where: {
          id: historicoId,
        },
      });
      return res.status(200).json(historico);
    }

    const historicos = await prisma.historico.findMany({
      where: {
        empresaId: '8bf372b9-b553-4c80-9c65-956d6fef3661',
      },
    });

    return res.status(200).json({
      historicos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

// /**
//  * Gets Historicos with Search
//  *
//  * Gets a Historico from a search input in the frontend.
//  *
//  * @param req - Next.js API Request
//  * @param res - Next.js API Response
//  */
// export async function getHistoricosWithSearch(
//   req: NextApiRequest,
//   res: NextApiResponse,
//   session: Session
// ): Promise<void | NextApiResponse<Array<Historico>>> {
//   const { search, historicoId } = req.query;

//   if (typeof search !== 'string' || !search.trim()) {
//     return res
//       .status(400)
//       .end('Bad request. Search query parameter is not valid.');
//   }

//   if (Array.isArray(historicoId))
//     return res.status(400).end('Bad request. Query parameters are not valid.');

//   try {
//     const historicos = await prisma.historico.findMany({
//       where: {
//         name: {
//           contains: search,
//           mode: 'insensitive',
//         },
//       },
//     });
//     return res.status(200).json(historicos);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).end(error);
//   }
// }

/**
 * Create Historico
 *
 * Create a Historico.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function createHistorico(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  historicoId: string;
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

  const { revisao, data, executado, verificado, descricao, empresaId } =
    req.body;

  try {
    const response = await prisma.historico.create({
      data: {
        revisao: revisao,
        data: data,
        executado: executado,
        verificado: verificado,
        descricao: descricao,
        empresaId: empresaId,
      },
    });

    return res.status(201).json({
      historicoId: response.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Delete Historico
 *
 * Deletes a historico from the database using a provided `pacienteId` query
 * parameter.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function deleteHistorico(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  const { historicoId } = req.query;

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

  if (!historicoId || typeof historicoId !== 'string') {
    return res
      .status(400)
      .json({ error: 'Missing or misconfigured historico ID' });
  }

  try {
    const response = await prisma.historico.delete({
      where: {
        id: historicoId,
      },
    });
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Update Historico
 *
 * Updates a historico & all of its data using a collection of provided
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

export async function updateHistorico(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Historico>> {
  const { historicoId } = req.query;

  if (!historicoId || typeof historicoId !== 'string') {
    return res
      .status(400)
      .json({ error: 'Missing or misconfigured historico ID' });
  }

  const { revisao, data, executado, verificado, descricao, empresaId } =
    req.body;

  try {
    const historico = await prisma.historico.update({
      where: {
        id: historicoId,
      },
      data: {
        revisao: revisao,
        data: data,
        executado: executado,
        verificado: verificado,
        descricao: descricao,
        empresaId: empresaId,
      },
    });
    return res.status(200).json(historico);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
