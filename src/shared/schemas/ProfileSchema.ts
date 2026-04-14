import * as z from 'zod';

export const ProfileSchema = z.object({
  firstname: z.string().min(1, 'Firstname cannot be empty'),
  lastname: z.string().min(1, 'Lastname cannot be empty'),
  username: z.string().min(4, 'Username must be at least 4 characters'),
  email: z.email('Invalid email format: example@mail.com'),
});

export type ProfileFormPayload = z.infer<typeof ProfileSchema>;
