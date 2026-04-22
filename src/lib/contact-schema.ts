import { z } from "zod";

export const CONTACT_CONFIG = {
  destinationEmailPlaceholder: "DESTINATION_EMAIL",
  webhookUrlPlaceholder: "CONTACT_FORM_WEBHOOK_URL",
  whatsappNumber: "WHATSAPP_NUMBER",
  whatsappMessage:
    "Hola, me gustaría recibir información sobre una consulta de odontopediatría.",
} as const;

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Escribe un nombre completo.")
    .max(100, "El nombre debe tener menos de 100 caracteres."),
  email: z
    .string()
    .trim()
    .email("Ingresa un correo electrónico válido.")
    .max(255, "El correo debe tener menos de 255 caracteres."),
  childrenAges: z
    .string()
    .trim()
    .min(1, "Cuéntanos la edad de tus hijos.")
    .max(120, "La edad debe tener menos de 120 caracteres."),
  message: z
    .string()
    .trim()
    .min(10, "Compártenos un poco más sobre tu consulta.")
    .max(1500, "El mensaje debe tener menos de 1500 caracteres."),
});

export const contactSubmissionSchema = contactFormSchema.extend({
  source: z.string().trim().max(100).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;