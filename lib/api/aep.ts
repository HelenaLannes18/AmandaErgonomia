import prisma from '../prisma';

import { NextApiRequest, NextApiResponse } from 'next';

import type { Ergonomica } from '@prisma/client';

interface AllErgonomicas {
  ergonomicas: Array<Ergonomica>;
}

/**
 * Get Ergonomica
 *
 * Fetches & returns either a single or all ergonomicas available depending on
 * whether a `ergonomicaId` query parameter is provided. If not all pacientes are
 * returned in descending order.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getErgonomica(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<AllErgonomicas>> {
  const { ergonomicaId, empresaId } = req.query;

  if (Array.isArray(ergonomicaId))
    return res.status(400).end('Bad request. Query parameters are not valid.');

  if (typeof empresaId !== 'string' || !empresaId.trim()) {
    return res
      .status(400)
      .end('Bad request. empresaId query parameter is not valid.');
  }

  try {
    if (ergonomicaId) {
      const ergonomica = await prisma.ergonomica.findFirst({
        where: {
          id: ergonomicaId,
        },
        
      });
      return res.status(200).json(ergonomica);
    }

    const ergonomicas = await prisma.ergonomica.findMany({
      where: {
        empresaId: empresaId
      }
    });

    return res.status(200).json({
      ergonomicas,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

// /**
//  * Gets Ergonomicas with Search
//  *
//  * Gets a Ergonomica from a search input in the frontend.
//  *
//  * @param req - Next.js API Request
//  * @param res - Next.js API Response
//  */
export async function getErgonomicasWithSearch(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Ergonomica>>> {
  const { search, ergonomicaId, empresaId } = req.query;

  if (typeof search !== 'string' || !search.trim()) {
    return res
      .status(400)
      .end('Bad request. Search query parameter is not valid.');
  }

  if (Array.isArray(ergonomicaId))
    return res.status(400).end('Bad request. Query parameters are not valid.');

  if (typeof empresaId !== 'string' || !empresaId.trim()) {
    return res
      .status(400)
      .end('Bad request. empresaId query parameter is not valid.');
  }

  try {
    const ergonomicas = await prisma.ergonomica.findMany({
      where: {
        id: {
          contains: search,
          mode: 'insensitive',
        },
        empresaId: empresaId
      },
    });
    return res.status(200).json(ergonomicas);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Create Ergonomica
 *
 * Create a Ergonomica.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function createErgonomica(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  ergonomicaId: string;
}>> {
  const {
    data_elaboracao,
    revisao_documento,
    jornada_trabalho,
    cargo,
    setor,
    tipo_atividade,
    variacao_turno,
    trabalho_noturno,
    descricao_ambiente_trab,
    numero_trabalhadores_expostos,
    tarefa_prescrita,
    tarefa_real,
    consideracoes_avaliador,
    posto_trabalho,
    ergonomista_responsavel,
    empresaId,
    area_avaliadaId,
    unidadeId,
    areaavaliadaName,
    unidadeName,
  } = req.body;

  try {
    const areasAvaliadasString = areaavaliadaName?.join(',');
    const unidadeString = unidadeName?.join(',');
    const response = await prisma.ergonomica.create({
      data: {
        empresaId: empresaId,
        area_avaliadaId: area_avaliadaId,
        unidadeId: unidadeId,
        //pegar em formato de data
        data_elaboracao: data_elaboracao,
        revisao_documento: revisao_documento, // Usar o valor formatado
        jornada_trabalho: jornada_trabalho,
        cargo: cargo,
        setor: setor,
        tipo_atividade: tipo_atividade,
        variacao_turno: variacao_turno,
        trabalho_noturno: trabalho_noturno,
        //@ts-ignore
        descricao_ambiente_trab: descricao_ambiente_trab,
        numero_trabalhadores_expostos: numero_trabalhadores_expostos,
        tarefa_prescrita: tarefa_prescrita,
        tarefa_real: tarefa_real,
        consideracoes_avaliador: consideracoes_avaliador,
        posto_trabalho: posto_trabalho,
        ergonomista_responsavel: ergonomista_responsavel,
        unidadeName: unidadeString,
        areaavaliadaName: areasAvaliadasString,
      },
    });

    return res.status(201).json({
      ergonomicaId: response.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Delete Ergonomica
 *
 * Deletes a ergonomica from the database using a provided `pacienteId` query
 * parameter.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function deleteErgonomica(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  const { ergonomicaId } = req.query;

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

  if (!ergonomicaId || typeof ergonomicaId !== 'string') {
    return res
      .status(400)
      .json({ error: 'Missing or misconfigured ergonomica ID' });
  }

  try {
    const response = await prisma.ergonomica.delete({
      where: {
        id: ergonomicaId,
      },
    });
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Update Ergonomica
 *
 * Updates a ergonomica & all of its data using a collection of provided
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

export async function updateErgonomica(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Ergonomica>> {
  const { ergonomicaId } = req.query;

  if (!ergonomicaId || typeof ergonomicaId !== 'string') {
    return res
      .status(400)
      .json({ error: 'Missing or misconfigured ergonomica ID' });
  }

  const {
    data_elaboracao,
    setor,
    revisao_documento,
    jornada_trabalho,
    cargo,
    tipo_atividade,
    variacao_turno,
    trabalho_noturno,
    descricao_ambiente_trab,
    numero_trabalhadores_expostos,
    tarefa_prescrita,
    tarefa_real,
    consideracoes_avaliador,
    posto_trabalho,
    ergonomista_responsavel,
    empresaId,
    area_avaliadaId,
    unidadeId,
  } = req.body;

  try {
    const ergonomica = await prisma.ergonomica.update({
      where: {
        id: ergonomicaId,
      },
      data: {
        data_elaboracao: data_elaboracao,
        revisao_documento: revisao_documento,
        jornada_trabalho: jornada_trabalho,
        cargo: cargo,
        tipo_atividade: tipo_atividade,
        variacao_turno: variacao_turno,
        trabalho_noturno: trabalho_noturno,
        setor: setor,
        //@ts-ignore
        descricao_ambiente_trab: descricao_ambiente_trab,
        numero_trabalhadores_expostos: numero_trabalhadores_expostos,
        tarefa_prescrita: tarefa_prescrita,
        tarefa_real: tarefa_real,
        consideracoes_avaliador: consideracoes_avaliador,
        posto_trabalho: posto_trabalho,
        ergonomista_responsavel: ergonomista_responsavel,
        empresaId: empresaId,
        area_avaliadaId: area_avaliadaId,
        unidadeId: unidadeId,
      },
    });
    return res.status(200).json(ergonomica);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
