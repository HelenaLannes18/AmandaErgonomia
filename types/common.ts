import type { User } from '@prisma/client';
import type { PropsWithChildren } from 'react';

export type WithChildren<T = {}> = T & PropsWithChildren<{}>;

export type WithClassName<T = {}> = T & {
  className?: string;
};
