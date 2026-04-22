import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, MailCheck, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_CONFIG, contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";
import { submitContactForm } from "@/lib/contact.functions";

export function ContactForm() {
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
  const [submissionType, setSubmissionType] = useState<"success" | "error" | "pending-config" | null>(null);
  const submitContact = useServerFn(submitContactForm);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      childrenAges: "",
      message: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: ContactFormValues) {
    setSubmissionMessage(null);
    setSubmissionType(null);

    const result = await submitContact({ data: values });

    if (result.ok) {
      setSubmissionType("success");
      setSubmissionMessage(result.message);
      form.reset();
      return;
    }

    if (result.fieldErrors) {
      Object.entries(result.fieldErrors).forEach(([field, messages]) => {
        if (!messages?.length) {
          return;
        }

        form.setError(field as keyof ContactFormValues, {
          type: "server",
          message: messages[0],
        });
      });
    }

    setSubmissionType(result.configured === false ? "pending-config" : "error");
    setSubmissionMessage(
      result.configured === false
        ? `${result.message} Configura ${CONTACT_CONFIG.destinationEmailPlaceholder} y ${CONTACT_CONFIG.webhookUrlPlaceholder} para activar el envío.`
        : result.message,
    );
  }

  return (
    <div className="rounded-[28px] border border-border/70 bg-card/95 p-6 shadow-[0_24px_60px_-24px_color-mix(in_oklab,var(--brand)_40%,transparent)] backdrop-blur sm:p-8">
      <div className="mb-6 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">Solicita información</p>
        <h3 className="text-2xl font-semibold text-foreground sm:text-3xl">
          Cuéntanos sobre tu familia y te orientamos con calidez.
        </h3>
        <p className="text-sm leading-6 text-muted-foreground sm:text-base">
          Déjanos tus datos y tu mensaje. El formulario ya está listo para conectarse con tu correo de recepción.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Nombre</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="name"
                      placeholder="Nombre completo"
                      className="h-12 rounded-2xl border-border/80 bg-background/70 px-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      autoComplete="email"
                      placeholder="correo@ejemplo.com"
                      className="h-12 rounded-2xl border-border/80 bg-background/70 px-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="childrenAges"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Edad de sus hijos</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ej. 2 y 6 años"
                    className="h-12 rounded-2xl border-border/80 bg-background/70 px-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Notas / mensaje</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Cuéntanos si es una primera visita, una urgencia, dolor dental o una revisión preventiva."
                    className="min-h-[140px] rounded-3xl border-border/80 bg-background/70 px-4 py-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {submissionMessage ? (
            <div
              className={`flex items-start gap-3 rounded-3xl border px-4 py-3 text-sm leading-6 ${
                submissionType === "success"
                  ? "border-primary/30 bg-primary/10 text-foreground"
                  : submissionType === "pending-config"
                    ? "border-brand-strong/30 bg-brand/10 text-foreground"
                    : "border-destructive/20 bg-destructive/10 text-foreground"
              }`}
            >
              {submissionType === "success" ? (
                <MailCheck className="mt-0.5 size-5 shrink-0 text-primary" />
              ) : (
                <TriangleAlert className="mt-0.5 size-5 shrink-0 text-brand-strong" />
              )}
              <p>{submissionMessage}</p>
            </div>
          ) : null}

          <Button
            type="submit"
            size="lg"
            className="h-12 w-full rounded-full bg-primary px-6 text-base font-semibold shadow-[0_18px_32px_-18px_color-mix(in_oklab,var(--primary)_65%,transparent)] hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}