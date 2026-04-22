import { createServerFn } from "@tanstack/react-start";

import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";

type ContactSubmissionResult = {
  ok: boolean;
  configured?: boolean;
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
  placeholders?: {
    destinationEmail: string;
    webhookUrl: string;
  };
};

export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator(contactFormSchema)
  .handler(async ({ data }): Promise<ContactSubmissionResult> => {
    const response = await fetch(`${new URL("/api/public/contact", "http://localhost").pathname}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        source: "landing-odontopediatria",
      } satisfies ContactFormValues & { source: string }),
    });

    const result = (await response.json()) as ContactSubmissionResult;

    if (!response.ok) {
      return result;
    }

    return result;
  });