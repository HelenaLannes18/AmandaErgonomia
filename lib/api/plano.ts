import prisma from '../prisma';

import { NextApiRequest, NextApiResponse } from 'next';

import type { Plano } from '@prisma/client';

interface AllPlanos {
  planos: Array<Plano>;
}

/**
 * Get Plano
 *
 * Fetches & returns either a single or all planos available depending on
 * whether a `planoId` query parameter is provided. If not all pacientes are
 * returned in descending order.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getPlano(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<AllPlanos>> {
  const { planoId, empresaId } = req.query;

  if (Array.isArray(planoId))
    return res.status(400).end('Bad request. Query parameters are not valid.');

  if (typeof empresaId !== 'string' || !empresaId.trim()) {
    return res
      .status(400)
      .end('Bad request. empresaId query parameter is not valid.');
  }

  try {
    if (planoId) {
      const plano = await prisma.plano.findFirst({
        where: {
          id: planoId,
        },
      });
      return res.status(200).json(plano);
    }

    const planos = await prisma.plano.findMany({
      where: {
        empresaId: empresaId,
      },
    });

    return res.status(200).json({
      planos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Gets Planos with Search
 *
 * Gets a Plano from a search input in the frontend.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getPlanosWithSearch(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Plano>>> {
  const { search, planoId, empresaId } = req.query;

  if (typeof search !== 'string' || !search.trim()) {
    return res
      .status(400)
      .end('Bad request. Search query parameter is not valid.');
  }

  if (typeof empresaId !== 'string' || !empresaId.trim()) {
    return res
      .status(400)
      .end('Bad request. empresaId query parameter is not valid.');
  }

  if (Array.isArray(planoId))
    return res.status(400).end('Bad request. Query parameters are not valid.');

  try {
    const planos = await prisma.plano.findMany({
      where: {
        id: {
          contains: search,
          mode: 'insensitive',
        },
        empresaId: empresaId
      },
    });
    return res.status(200).json(planos);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Create Plano
 *
 * Create a Plano.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function createPlano(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  planoId: string;
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

  const {
    o_que_fazer,
    legislacao,
    origem_demanda,
    onde,
    porque,
    responsavel,
    quando,
    prazo,
    previsao_termino,
    termino_real,
    status,
    evidencia,
    empresaId,
    areaavaliadaName,
    unidadeName,
  } = req.body;

  try {
    const areasAvaliadasString = areaavaliadaName?.join(',');
    const unidadeString = unidadeName?.join(',');
    const response = await prisma.plano.create({
      data: {
        o_que_fazer: o_que_fazer,
        legislacao: legislacao,
        origem_demanda: origem_demanda,
        onde: onde,
        porque: porque,
        responsavel: responsavel,
        quando: quando,
        prazo: prazo,
        previsao_termino: previsao_termino,
        termino_real: termino_real,
        status: status,
        evidencia: evidencia,
        empresaId: empresaId,
        unidadeName: unidadeString,
        areaavaliadaName: areasAvaliadasString,
      },
    });

    return res.status(201).json({
      planoId: response.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Delete Plano
 *
 * Deletes a plano from the database using a provided `pacienteId` query
 * parameter.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function deletePlano(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  const { planoId } = req.query;

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

  if (!planoId || typeof planoId !== 'string') {
    return res.status(400).json({ error: 'Missing or misconfigured plano ID' });
  }

  try {
    const response = await prisma.plano.delete({
      where: {
        id: planoId,
      },
    });
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Update Plano
 *
 * Updates a plano & all of its data using a collection of provided
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

export async function updatePlano(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Plano>> {
  const { planoId } = req.query;

  if (!planoId || typeof planoId !== 'string') {
    return res.status(400).json({ error: 'Missing or misconfigured plano ID' });
  }

  const {
    o_que_fazer,
    legislacao,
    origem_demanda,
    onde,
    porque,
    responsavel,
    quando,
    prazo,
    previsao_termino,
    termino_real,
    status,
    evidencia,
    empresaId,
    area_avaliadaId,
    unidadeId,
    unidadeName,
    areaavaliadaName,
  } = req.body;

  try {
    const areasAvaliadasString = areaavaliadaName?.join(',');
    const unidadesString = unidadeName?.join(',');

    const plano = await prisma.plano.update({
      where: {
        id: planoId,
      },
      data: {
        o_que_fazer: o_que_fazer,
        legislacao: legislacao,
        origem_demanda: origem_demanda,
        onde: onde,
        porque: porque,
        responsavel: responsavel,
        quando: quando,
        prazo: prazo,
        previsao_termino: previsao_termino,
        termino_real: termino_real,
        status: status,
        evidencia: evidencia,
        empresaId: empresaId,
        area_avaliadaId: area_avaliadaId,
        unidadeId: unidadeId,
        unidadeName: unidadesString,
        areaavaliadaName: areasAvaliadasString,
      },
    });
    return res.status(200).json(plano);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
