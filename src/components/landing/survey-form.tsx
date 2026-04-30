import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, MailCheck, TriangleAlert, ClipboardList } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitSurvey, surveySchema, type SurveyValues } from "@/lib/survey.functions";

export function SurveyForm() {
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
  const [submissionType, setSubmissionType] = useState<"success" | "error" | null>(null);
  const submit = useServerFn(submitSurvey);

  const form = useForm<SurveyValues>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      email: "",
      dentistType: undefined as unknown as SurveyValues["dentistType"],
      childrenCount: undefined as unknown as SurveyValues["childrenCount"],
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: SurveyValues) {
    setSubmissionMessage(null);
    setSubmissionType(null);

    const result = await submit({ data: values });

    if (result.ok) {
      setSubmissionType("success");
      setSubmissionMessage(result.message);
      form.reset();
      return;
    }

    setSubmissionType("error");
    setSubmissionMessage(result.message);
  }

  return (
    <div className="rounded-[30px] border border-border/70 bg-card/95 p-6 shadow-[0_24px_60px_-30px_color-mix(in_oklab,var(--brand)_40%,transparent)] backdrop-blur sm:p-8">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <ClipboardList className="size-6" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
            Encuesta breve
          </p>
          <h3 className="text-2xl font-semibold leading-tight text-foreground sm:text-[1.6rem]">
            ¿Nos ayudas con 30 segundos para conocer mejor a tu familia?
          </h3>
          <p className="text-sm leading-6 text-muted-foreground">
            Tus respuestas nos permiten orientar mejor a las familias que buscan atención dental infantil.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)} noValidate>
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

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="dentistType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">¿A qué dentista llevas a tus hijos?</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-2xl border-border/80 bg-background/70 px-4">
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="dentista_general">Dentista general</SelectItem>
                      <SelectItem value="odontopediatra">Odontopediatra</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="childrenCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">¿Cuántos hijos tienes?</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-2xl border-border/80 bg-background/70 px-4">
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5+">5 o más</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {submissionMessage ? (
            <div
              className={`flex items-start gap-3 rounded-3xl border px-4 py-3 text-sm leading-6 ${
                submissionType === "success"
                  ? "border-primary/30 bg-primary/10 text-foreground"
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
              "Enviar respuesta"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}