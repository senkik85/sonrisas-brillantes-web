import { createFileRoute } from "@tanstack/react-router";

import { CONTACT_CONFIG, contactSubmissionSchema } from "@/lib/contact-schema";

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

          const destinationEmail =
            process.env.DESTINATION_EMAIL ?? CONTACT_CONFIG.destinationEmailPlaceholder;
          const webhookUrl = process.env.CONTACT_FORM_WEBHOOK_URL;

          if (!webhookUrl) {
            return createJsonResponse(
              {
                ok: false,
                configured: false,
                message:
                  "El formulario ya está preparado, pero aún falta conectar el envío real del correo.",
                placeholders: {
                  destinationEmail,
                  webhookUrl: CONTACT_CONFIG.webhookUrlPlaceholder,
                },
              },
              503,
            );
          }

          const forwardResponse = await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(process.env.CONTACT_FORM_WEBHOOK_SECRET
                ? {
                    Authorization: `Bearer ${process.env.CONTACT_FORM_WEBHOOK_SECRET}`,
                  }
                : {}),
            },
            body: JSON.stringify({
              ...parsed.data,
              destinationEmail,
              receivedAt: new Date().toISOString(),
            }),
          });

          if (!forwardResponse.ok) {
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