import { SetMetadata } from '@nestjs/common';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export const ROLES_KEYS = 'roles';

export const Roles = (...roles: Role[]) => {
  return SetMetadata(ROLES_KEYS, roles);
};
