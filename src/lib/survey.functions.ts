import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SPREADSHEET_ID = "1mpqLRumm_V44RIMgUJFbmyRfDkbzGzthJidx3XyXD2c";
const SHEET_NAME = "Hoja 1";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

export const surveySchema = z.object({
  email: z
    .string()
    .trim()
    .email("Ingresa un correo electrónico válido.")
    .max(255, "El correo debe tener menos de 255 caracteres."),
  dentistType: z.enum(["dentista_general", "odontopediatra"], {
    errorMap: () => ({ message: "Selecciona una opción." }),
  }),
  childrenCount: z.enum(["1", "2", "3", "4", "5+"], {
    errorMap: () => ({ message: "Selecciona una opción." }),
  }),
});

export type SurveyValues = z.infer<typeof surveySchema>;

type SurveyResult = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

const dentistLabels: Record<SurveyValues["dentistType"], string> = {
  dentista_general: "Dentista general",
  odontopediatra: "Odontopediatra",
};

export const submitSurvey = createServerFn({ method: "POST" })
  .inputValidator(surveySchema)
  .handler(async ({ data }): Promise<SurveyResult> => {
    const lovableApiKey = process.env.LOVABLE_API_KEY;
    const sheetsApiKey = process.env.GOOGLE_SHEETS_API_KEY;

    if (!lovableApiKey || !sheetsApiKey) {
      return {
        ok: false,
        message: "El servicio aún no está configurado. Inténtalo más tarde.",
      };
    }

    const timestamp = new Date().toLocaleString("es-MX", {
      timeZone: "America/Mexico_City",
    });

    const range = `${SHEET_NAME}!A:D`;
    // IMPORTANT: do NOT encodeURIComponent the range — the gateway/Sheets API
    // requires the colon and exclamation to remain as-is. fetch() will encode
    // the space in "Hoja 1" to %20 automatically.
    const url = `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lovableApiKey}`,
          "X-Connection-Api-Key": sheetsApiKey,
        },
        body: JSON.stringify({
          values: [
            [
              timestamp,
              data.email,
              dentistLabels[data.dentistType],
              data.childrenCount,
            ],
          ],
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Google Sheets append failed", response.status, errorBody);
        return {
          ok: false,
          message:
            "No fue posible guardar tu respuesta en este momento. Inténtalo de nuevo en unos minutos.",
        };
      }

      return {
        ok: true,
        message: "¡Gracias! Tu respuesta nos ayuda a entender mejor a las familias.",
      };
    } catch (error) {
      console.error("Unexpected error sending survey", error);
      return {
        ok: false,
        message:
          "Ocurrió un problema al enviar tu respuesta. Inténtalo nuevamente en unos minutos.",
      };
    }
  });