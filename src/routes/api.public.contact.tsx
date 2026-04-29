import { createFileRoute } from "@tanstack/react-router";

import { contactSubmissionSchema } from "@/lib/contact-schema";

const DESTINATION_EMAIL = "senkik@gmail.com";
const FROM_EMAIL = "Odontopediatría con amor <onboarding@resend.dev>";
const RESEND_GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

const jsonHeaders = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
} as const;

function createJsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const rawBody = await request.json();
          const parsed = contactSubmissionSchema.safeParse(rawBody);

          if (!parsed.success) {
            return createJsonResponse(
              {
                ok: false,
                message: "La información enviada no es válida.",
                fieldErrors: parsed.error.flatten().fieldErrors,
              },
              400,
            );
          }

          const lovableApiKey = process.env.LOVABLE_API_KEY;
          const resendApiKey = process.env.RESEND_API_KEY;

          if (!lovableApiKey || !resendApiKey) {
            return createJsonResponse(
              {
                ok: false,
                configured: false,
                message:
                  "El servicio de envío de correo aún no está configurado. Inténtalo más tarde.",
              },
              503,
            );
          }

          const { name, email, childrenAges, message } = parsed.data;

          const html = `
            <div style="font-family:Arial,sans-serif;color:#1f2937;line-height:1.6;">
              <h2 style="color:#0f172a;">Nueva solicitud desde la landing</h2>
              <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
              <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
              <p><strong>Edad de los hijos:</strong> ${escapeHtml(childrenAges)}</p>
              <p><strong>Mensaje:</strong></p>
              <p style="white-space:pre-wrap;background:#f8fafc;border-radius:8px;padding:12px;">${escapeHtml(message)}</p>
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
              <p style="font-size:12px;color:#6b7280;">Recibido el ${new Date().toLocaleString("es-MX")}</p>
            </div>
          `;

          const forwardResponse = await fetch(`${RESEND_GATEWAY_URL}/emails`, {
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

          if (!forwardResponse.ok) {
            const errorBody = await forwardResponse.text();
            console.error("Resend send failed", forwardResponse.status, errorBody);
            return createJsonResponse(
              {
                ok: false,
                configured: true,
                message:
                  "No fue posible completar el envío en este momento. Inténtalo de nuevo en unos minutos.",
              },
              502,
            );
          }

          return createJsonResponse(
            {
              ok: true,
              configured: true,
              message:
                "Gracias por contactarnos. Pronto revisaremos tu información para dar seguimiento.",
            },
            200,
          );
        } catch {
          return createJsonResponse(
            {
              ok: false,
              message:
                "Ocurrió un problema al procesar tu solicitud. Por favor, inténtalo nuevamente.",
            },
            500,
          );
        }
      },
    },
  },
});