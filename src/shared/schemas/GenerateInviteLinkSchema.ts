import * as z from 'zod';

export const GenerateInviteSchema = z.object({
  documentId: z.string().uuid(),
  permission: z.enum(['VIEW', 'EDIT']),
});
