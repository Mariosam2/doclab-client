import type { Permission } from '@src/shared/enums/permission.enum';

export interface IPermission {
  documentId: string;
  permission: Permission;
}
