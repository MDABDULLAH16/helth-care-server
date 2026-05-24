import z from "zod";

export const createPatientSchema = z.object({
  password: z.string(),
  patient: z.object({
    name: z.string("Name is required"),
    email: z.email("email must be valid"),
    address: z.string().optional(),
  }),
});
