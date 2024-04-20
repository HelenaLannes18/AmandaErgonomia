import prisma from '../prisma';

import { NextApiRequest, NextApiResponse } from 'next';

import type { Risco } from '@prisma/client';

interface AllRiscos {
  riscos: Array<Risco>;
}

/**
 * Get Risco
 *
 * Fetches & returns either a single or all riscos available depending on
 * whether a `riscoId` query parameter is provided. If not all pacientes are
 * returned in descending order.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getRisco(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<AllRiscos>> {
  const { riscoId, empresaId } = req.query;

  if (typeof empresaId !== 'string' || !empresaId.trim()) {
    return res
      .status(400)
      .end('Bad request. empresaId query parameter is not valid.');
  }

  if (Array.isArray(riscoId))
    return res.status(400).end('Bad request. Query parameters are not valid.');

  try {
    if (riscoId) {
      const risco = await prisma.risco.findFirst({
        where: {
          id: riscoId,
        },
      });
      return res.status(200).json(risco);
    }

    const riscos = await prisma.risco.findMany({
      where: {
        empresaId: empresaId,
      },
    });

    return res.status(200).json({
      riscos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Gets Riscos with Search
 *
 * Gets a Risco from a search input in the frontend.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getRiscosWithSearch(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Risco>>> {
  const { search, riscoId, empresaId } = req.query;

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


  if (Array.isArray(riscoId))
    return res.status(400).end('Bad request. Query parameters are not valid.');

  try {
    const riscos = await prisma.risco.findMany({
      where: {
        id: {
          contains: search,
          mode: 'insensitive',
        },
        empresaId: empresaId
      },
    });
    return res.status(200).json(riscos);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Create Risco
 *
 * Create a Risco.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function createRisco(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  riscoId: string;
}>> {
  const {
    sugestacao_recomendacao,
    medidas_controle,
    necessita_aet,
    classificacao_riscos_probabilidade,
    classificacao_riscos_continuacao,
    classificacao_riscos_severidade,
    classificacao_riscos_classificacao,
    areaavaliadaName,
    unidadeName,
    images,
    empresaId,
  } = req.body;

  try {
    const areasAvaliadasString = areaavaliadaName?.join(',');
    const unidadeString = unidadeName?.join(',');
    const classificacao_riscos_probabilidadeString =
      classificacao_riscos_probabilidade?.join(',');
    const classificacao_riscos_continuacaoString =
      classificacao_riscos_continuacao?.join(',');
    const classificacao_riscos_severidadeString =
      classificacao_riscos_severidade?.join(',');
    const classificacao_riscos_classificacaoString =
      classificacao_riscos_classificacao?.join(',');

    // Criar o risco
    const response = await prisma.risco.create({
      data: {
        sugestacao_recomendacao,
        medidas_controle,
        necessita_aet,
        classificacao_riscos_probabilidade:
          classificacao_riscos_probabilidadeString,
        classificacao_riscos_continuacao:
          classificacao_riscos_continuacaoString,
        classificacao_riscos_severidade: classificacao_riscos_severidadeString,
        classificacao_riscos_classificacao:
          classificacao_riscos_classificacaoString,
        unidadeName: unidadeString,
        areaavaliadaName: areasAvaliadasString,
        empresaId: empresaId
      },
    });

    // Criar instância de imagem para cada URL de imagem
    const imagesPromises = images.map(async (image: any) => {
      await prisma.image.create({
        data: {
          url: image.url,
          riscoId: response.id,
        },
      });
    });

    // Aguardar todas as instâncias de imagem serem criadas
    await Promise.all(imagesPromises);

    // Retornar o ID do risco criado
    return res.status(201).json({
      riscoId: response.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Delete Risco
 *
 * Deletes a risco from the database using a provided `pacienteId` query
 * parameter.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function deleteRisco(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  const { riscoId } = req.query;

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

  if (!riscoId || typeof riscoId !== 'string') {
    return res.status(400).json({ error: 'Missing or misconfigured risco ID' });
  }

  try {
    const response = await prisma.risco.delete({
      where: {
        id: riscoId,
      },
    });
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Update Risco
 *
 * Updates a risco & all of its data using a collection of provided
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

export async function updateRisco(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Risco>> {
  const { riscoId } = req.query;

  if (!riscoId || typeof riscoId !== 'string') {
    return res.status(400).json({ error: 'Missing or misconfigured risco ID' });
  }

  const {
    sugestacao_recomendacao,
    medidas_controle,
    necessita_aet,
    classificacao_riscos_probabilidade,
    classificacao_riscos_continuacao,
    classificacao_riscos_severidade,
    classificacao_riscos_classificacao,
    images
  } = req.body;

  try {
    const classificacao_riscos_probabilidadeString =
      classificacao_riscos_probabilidade?.join(',');
    const classificacao_riscos_continuacaoString =
      classificacao_riscos_continuacao?.join(',');
    const classificacao_riscos_severidadeString =
      classificacao_riscos_severidade?.join(',');
    const classificacao_riscos_classificacaoString =
      classificacao_riscos_classificacao?.join(',');
    const risco = await prisma.risco.update({
      where: {
        id: riscoId,
      },
      data: {
        sugestacao_recomendacao: sugestacao_recomendacao,
        medidas_controle: medidas_controle,
        necessita_aet: necessita_aet,
        classificacao_riscos_probabilidade:
          classificacao_riscos_probabilidadeString,
        classificacao_riscos_continuacao:
          classificacao_riscos_continuacaoString,
        classificacao_riscos_severidade: classificacao_riscos_severidadeString,
        classificacao_riscos_classificacao:
          classificacao_riscos_classificacaoString,
      },
    });
    // Criar instância de imagem para cada URL de imagem
    const imagesPromises = images.map(async (image: any) => {
      await prisma.image.create({
        data: {
          url: image.url,
          riscoId: riscoId,
        },
      });
    });

    // Aguardar todas as instâncias de imagem serem criadas
    await Promise.all(imagesPromises);

    return res.status(200).json(risco);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
