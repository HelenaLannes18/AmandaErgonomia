import prisma from '../prisma';

import { NextApiRequest, NextApiResponse } from 'next';

import type { Perigo } from '@prisma/client';

interface AllPerigos {
  perigos: Array<Perigo>;
}

/**
 * Get Perigo
 *
 * Fetches & returns either a single or all perigos available depending on
 * whether a `perigoId` query parameter is provided. If not all pacientes are
 * returned in descending order.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getPerigo(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<AllPerigos>> {
  const { perigoId } = req.query;

  if (Array.isArray(perigoId))
    return res.status(400).end('Bad request. Query parameters are not valid.');

  try {
    if (perigoId) {
      const perigo = await prisma.perigo.findFirst({
        where: {
          id: perigoId,
        },
      });
      return res.status(200).json(perigo);
    }

    const perigos = await prisma.perigo.findMany({
      // where: {
      //   empresaId: 'wqdq',
      // },
    });

    return res.status(200).json({
      perigos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Gets Perigos with Search
 *
 * Gets a Perigo from a search input in the frontend.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getPerigosWithSearch(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Perigo>>> {
  const { search, perigoId } = req.query;

  if (typeof search !== 'string' || !search.trim()) {
    return res
      .status(400)
      .end('Bad request. Search query parameter is not valid.');
  }

  if (Array.isArray(perigoId))
    return res.status(400).end('Bad request. Query parameters are not valid.');

  try {
    const perigos = await prisma.perigo.findMany({
      where: {
        id: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
    return res.status(200).json(perigos);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Create Perigo
 *
 * Create a Perigo.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function createPerigo(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  perigoId: string;
}>> {
  const {
    fase_levantamento_preliminar,
    aspectos_ergonomico,
    fator,
    fontes,
    ha_pergios_externos,
    possiveis_lesoes,
    empresaId,
    areaavaliadaName,
    unidadeName,
  } = req.body;

  try {
    const areasAvaliadasString = areaavaliadaName?.join(',');
    const unidadeString = unidadeName?.join(',');
    const response = await prisma.perigo.create({
      data: {
        fase_levantamento_preliminar: fase_levantamento_preliminar,
        aspectos_ergonomico: aspectos_ergonomico,
        fator: fator,
        fontes: fontes,
        ha_pergios_externos: ha_pergios_externos,
        possiveis_lesoes: possiveis_lesoes,
        empresaId: empresaId,
        // area_avaliadaId: areaAvaliadaId,
        // unidadeId: unidadeId,
        unidadeName: unidadeString,
        areaavaliadaName: areasAvaliadasString,
      },
    });

    return res.status(201).json({
      perigoId: response.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Delete Perigo
 *
 * Deletes a perigo from the database using a provided `pacienteId` query
 * parameter.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function deletePerigo(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  const { perigoId } = req.query;

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

  if (!perigoId || typeof perigoId !== 'string') {
    return res
      .status(400)
      .json({ error: 'Missing or misconfigured perigo ID' });
  }

  try {
    const response = await prisma.perigo.delete({
      where: {
        id: perigoId,
      },
    });
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Update Perigo
 *
 * Updates a perigo & all of its data using a collection of provided
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

export async function updatePerigo(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Perigo>> {
  const { perigoId } = req.query;

  if (!perigoId || typeof perigoId !== 'string') {
    return res
      .status(400)
      .json({ error: 'Missing or misconfigured perigo ID' });
  }

  const {
    fase_levantamento_preliminar,
    aspectos_ergonomico,
    fator,
    fontes,
    ha_pergios_externos,
    possiveis_lesoes,
    empresaId,
    area_avaliadaId,
    unidadeId,
    unidadeName,
    areaavaliadaName,
  } = req.body;

  try {
    const areasAvaliadasString = areaavaliadaName?.join(',');
    const unidadesString = unidadeName?.join(',');

    const perigo = await prisma.perigo.update({
      where: {
        id: perigoId,
      },
      data: {
        fase_levantamento_preliminar: fase_levantamento_preliminar,
        aspectos_ergonomico: aspectos_ergonomico,
        fator: fator,
        fontes: fontes,
        ha_pergios_externos: ha_pergios_externos,
        possiveis_lesoes: possiveis_lesoes,
        empresaId: empresaId,
        area_avaliadaId,
        unidadeId,
        unidadeName: unidadesString,
        areaavaliadaName: areasAvaliadasString,
      },
    });
    return res.status(200).json(perigo);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
