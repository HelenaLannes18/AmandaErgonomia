import prisma from '../prisma';

import { NextApiRequest, NextApiResponse } from 'next';

import type { Image } from '@prisma/client';

interface AllImages {
  images: Array<Image>;
}

/**
 * Get Image
 *
 * Fetches & returns either a single or all images available depending on
 * whether a `imageId` query parameter is provided. If not all pacientes are
 * returned in descending order.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getImage(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<AllImages>> {
  const { imageId } = req.query;

  if (Array.isArray(imageId))
    return res.status(400).end('Bad request. Query parameters are not valid.');

  try {
    if (imageId) {
      const image = await prisma.image.findFirst({
        where: {
          id: imageId,
        },
      });
      return res.status(200).json(image);
    }

    const images = await prisma.image.findMany({});

    return res.status(200).json({
      images,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Get Image By Risco
 *
 * Fetches & returns either a single or all images available depending on
 * whether a `imageId` query parameter is provided. If not all pacientes are
 * returned in descending order.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getImageByRisco(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<AllImages>> {
  const { riscoId } = req.query;

  if (Array.isArray(riscoId))
    return res.status(400).end('Bad request. Query parameters are not valid.');

  try {
    const images = await prisma.image.findMany({
      where: {
        riscoId: riscoId,
      },
    });

    return res.status(200).json({
      images,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Create Image
 *
 * Create a Image.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function createImage(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  imageId: string;
}>> {
  const { url, riscoId } = req.body;

  try {
    const response = await prisma.image.create({
      data: {
        url: url,
        riscoId: riscoId,
      },
    });

    return res.status(201).json({
      imageId: response.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Delete Image
 *
 * Deletes a image from the database using a provided `pacienteId` query
 * parameter.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function deleteImage(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  const { imageId } = req.query;

  if (!imageId || typeof imageId !== 'string') {
    return res.status(400).json({ error: 'Missing or misconfigured image ID' });
  }

  try {
    const response = await prisma.image.delete({
      where: {
        id: imageId,
      },
    });
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
