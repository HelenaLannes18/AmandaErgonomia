import prisma from '../prisma';

import { NextApiRequest, NextApiResponse } from 'next';

import type { Empresa } from '@prisma/client';

import { getAuth } from '@clerk/nextjs/server';

interface AllEmpresas {
  empresas: Array<Empresa>;
}

/**
 * Get Empresa
 *
 * Fetches & returns either a single or all empresas available depending on
 * whether a `empresaId` query parameter is provided. If not all pacientes are
 * returned in descending order.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getEmpresa(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<AllEmpresas>> {
  const { empresaId } = req.query;

  if (Array.isArray(empresaId))
    return res.status(400).end('Bad request. Query parameters are not valid.');

  try {
    if (empresaId) {
      const empresa = await prisma.empresa.findFirst({
        where: {
          id: empresaId,
        },
      });
      return res.status(200).json(empresa);
    }

    const empresas = await prisma.empresa.findMany({});

    return res.status(200).json({
      empresas,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Gets Empresas with Search
 *
 * Gets a Empresa from a search input in the frontend.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getEmpresasWithSearch(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Empresa>>> {
  const { search, empresaId } = req.query;

  if (typeof search !== 'string' || !search.trim()) {
    return res
      .status(400)
      .end('Bad request. Search query parameter is not valid.');
  }

  if (Array.isArray(empresaId))
    return res.status(400).end('Bad request. Query parameters are not valid.');

  try {
    const empresas = await prisma.empresa.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
    return res.status(200).json(empresas);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Create Empresa
 *
 * Create a Empresa.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function createEmpresa(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  empresaId: string;
}>> {
  const {
    name,
    email,
    cnpj,
    cidade,
    estado,
    responsavel_tecnico,
    registro_responsavel_tecnico,
    ramo_atividade,
    atividade_principal,
    cnae,
    grau_risco,
    nome_gestor_contrato,
    telefone_gestor_contrato,
    razao_social,
    email_gestor_contrato,
    ergonomista,
    ie,
    cep,
    endereco,
    bairro,
    telefone,
    habilitacao_responsavel_tecnico,
    setor,
    unidade,
    area_avaliada,
  } = req.body;

  try {
    const { userId } = getAuth(req);
    if (typeof userId !== 'string' || !userId.trim()) {
      return res
        .status(400)
        .end('Bad request. Search query parameter is not valid.');
    }
    const response = await prisma.empresa.create({
      data: {
        name: name,
        cnpj: cnpj,
        cidade: cidade,
        estado: estado,
        userId: "user_2fBY8FV2DUR2uEj1bqCZGSM8LU5",
        email: email,
        setor: setor,
        responsavel_tecnico: responsavel_tecnico,
        habilitacao_responsavel_tecnico: habilitacao_responsavel_tecnico,
        registro_responsavel_tecnico: registro_responsavel_tecnico,
        ramo_atividade: ramo_atividade,
        atividade_principal: atividade_principal,
        cnae: cnae,
        grau_risco: grau_risco,
        nome_gestor_contrato: nome_gestor_contrato,
        telefone_gestor_contrato: telefone_gestor_contrato,
        email_gestor_contrato: email_gestor_contrato,
        razao_social: razao_social,
        ergonomista: ergonomista,
        ie: ie,
        cep: cep,
        endereco: endereco,
        bairro: bairro,
        telefone: telefone,
        unidadeName: area_avaliada.join(','),
        areaavaliadaName: unidade.join(','),
      },
    });

    for (const unidadeSingle of unidade) {
      const addAreaAvaliada = await prisma.areaavaliada.create({
        data: {
          nameAvaliada: unidadeSingle,
          empresaId: response.id,
        },
      });
    }

    // fazer o mesmo para o setor tbm pois uma empresa pode ter varios setores

    for (const area of area_avaliada) {
      const addUnidade = await prisma.unidade.create({
        data: {
          nameUnidade: area,
          empresaId: response.id,
        },
      });
    }

    return res.status(201).json({
      empresaId: response.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Delete Empresa
 *
 * Deletes a empresa from the database using a provided `pacienteId` query
 * parameter.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function deleteEmpresa(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  const { empresaId } = req.query;

  if (!empresaId || typeof empresaId !== 'string') {
    return res
      .status(400)
      .json({ error: 'Missing or misconfigured empresa ID' });
  }

  try {
    const response = await prisma.empresa.delete({
      where: {
        id: empresaId,
      },
    });
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Update Empresa
 *
 * Updates a empresa & all of its data using a collection of provided
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

export async function updateEmpresa(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Empresa>> {
  const {
    name,
    email,
    cnpj,
    cidade,
    estado,
    responsavel_tecnico,
    registro_responsavel_tecnico,
    habilitacao_responsavel_tecnico,
    ramo_atividade,
    atividade_principal,
    cnae,
    grau_risco,
    nome_gestor_contrato,
    telefone_gestor_contrato,
    razao_social,
    email_gestor_contrato,
    ergonomista,
    ie,
    cep,
    endereco,
    bairro,
    telefone,
    setor,
    unidadeName,
    areaavaliadaName,
  } = req.body;

  const { empresaId } = req.query;

  if (!empresaId || typeof empresaId !== 'string') {
    return res
      .status(400)
      .json({ error: 'Missing or misconfigured empresa ID' });
  }

  const { userId } = getAuth(req);
  if (typeof userId !== 'string' || !userId.trim()) {
    return res
      .status(400)
      .end('Bad request. Search query parameter is not valid.');
  }

  try {
    const areasAvaliadasString = areaavaliadaName?.join(',');
    const unidadesString = unidadeName?.join(',');

    const response = await prisma.empresa.update({
      where: {
        id: empresaId,
      },
      data: {
        name: name,
        cnpj: cnpj,
        cidade: cidade,
        estado: estado,
        userId: "user_2fBY8FV2DUR2uEj1bqCZGSM8LU5",
        email: email,
        setor: setor,
        responsavel_tecnico: responsavel_tecnico,
        habilitacao_responsavel_tecnico: habilitacao_responsavel_tecnico,
        registro_responsavel_tecnico: registro_responsavel_tecnico,
        ramo_atividade: ramo_atividade,
        atividade_principal: atividade_principal,
        cnae: cnae,
        grau_risco: grau_risco,
        nome_gestor_contrato: nome_gestor_contrato,
        telefone_gestor_contrato: telefone_gestor_contrato,
        email_gestor_contrato: email_gestor_contrato,
        razao_social: razao_social,
        ergonomista: ergonomista,
        ie: ie,
        cep: cep,
        endereco: endereco,
        bairro: bairro,
        telefone: telefone,
        unidadeName: unidadesString,
        areaavaliadaName: areasAvaliadasString,
      },
    });

    return res.status(201).json({
      empresaId: response.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
