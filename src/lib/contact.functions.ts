import { createServerFn } from "@tanstack/react-start";

import { contactFormSchema } from "@/lib/contact-schema";

type ContactSubmissionResult = {
  ok: boolean;
  configured?: boolean;
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

const DESTINATION_EMAIL = "senkik@gmail.com";
const FROM_EMAIL = "Odontopediatría con amor <onboarding@resend.dev>";
const RESEND_GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator(contactFormSchema)
  .handler(async ({ data }): Promise<ContactSubmissionResult> => {
    const lovableApiKey = process.env.LOVABLE_API_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!lovableApiKey || !resendApiKey) {
      return {
        ok: false,
        configured: false,
        message:
          "El servicio de envío de correo aún no está configurado. Inténtalo más tarde.",
      };
    }

    const { name, email, childrenAges, message } = data;

    const html = `
      <div style="font-family:Arial,sans-serif;color:#1f2937;line-height:1.6;">
        <h2 style="color:#0f172a;">Nueva solicitud desde la landing</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
        <p><strong>Edad de los hijos:</strong> ${escapeHtml(childrenAges)}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space:pre-wrap;background:#f8fafc;border-radius:8px;padding:12px;">${escapeHtml(message)}</p>
      </div>
    `;

    try {
      const response = await fetch(`${RESEND_GATEWAY_URL}/emails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lovableApiKey}`,
          "X-Connection-Api-Key": resendApiKey,
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [DESTINATION_EMAIL],
          reply_to: email,
          subject: `Nueva consulta de ${name} — Odontopediatría`,
          html,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Resend send failed", response.status, errorBody);
        return {
          ok: false,
          configured: true,
          message:
            "No fue posible completar el envío en este momento. Inténtalo de nuevo en unos minutos.",
        };
      }

      return {
        ok: true,
        configured: true,
        message:
          "Gracias por contactarnos. Pronto revisaremos tu información para dar seguimiento.",
      };
    } catch (error) {
      console.error("Unexpected error sending contact email", error);
      return {
        ok: false,
        configured: true,
        message:
          "Ocurrió un problema al procesar tu solicitud. Inténtalo nuevamente en unos minutos.",
      };
    }
  });