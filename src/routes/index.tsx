import { createFileRoute } from "@tanstack/react-router";
import {
  Baby,
  BadgeCheck,
  CalendarHeart,
  CheckCircle2,
  ClipboardPlus,
  HeartHandshake,
  HeartPulse,
  MailCheck,
  MapPin,
  MessageCircleHeart,
  ShieldCheck,
  SmilePlus,
  Sparkles,
  Star,
  Stethoscope,
} from "lucide-react";

import { ContactForm } from "@/components/landing/contact-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CONTACT_CONFIG } from "@/lib/contact-schema";
import portraitPrimary from "@/assets/dra-laura-portrait-1.png";
import portraitSecondary from "@/assets/dra-laura-portrait-2.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Odontopediatra en Aguascalientes | Dra. Laura Díaz de León" },
      {
        name: "description",
        content:
          "Atención dental infantil con calidez, prevención y confianza. Conoce servicios, dudas frecuentes y cómo agendar con una odontóloga pediatra en Aguascalientes.",
      },
      {
        property: "og:title",
        content: "Odontopediatría con amor | Dentista para niños en Aguascalientes",
      },
      {
        property: "og:description",
        content:
          "Landing informativa y de contacto para familias que buscan una odontopediatra con atención preventiva, humana y especializada en niños.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "PediatricDentist",
          name: "Dra. Laura Díaz de León",
          alternateName: "Odontopediatría con amor",
          description:
            "Odontopediatra en Aguascalientes con enfoque preventivo, trato amable y atención profesional para la salud dental infantil.",
          areaServed: {
            "@type": "City",
            name: "Aguascalientes",
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Aguascalientes",
            addressRegion: "Aguascalientes",
            streetAddress: "Calle 26 de marzo 302, Fracc. Del Valle I",
          },
          telephone: "[TELÉFONO]",
          email: "[EMAIL_DE_RECEPCIÓN]",
          url: "https://id-preview--a0121dec-6279-4bbd-815f-a9683a08b742.lovable.app/",
          medicalSpecialty: "Pediatric dentistry",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const whatsappHref = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(CONTACT_CONFIG.whatsappMessage)}`;

  const services = [
    "Valoración y revisión dental infantil",
    "Limpiezas dentales y control preventivo",
    "Prevención y detección de caries en niños",
    "Aplicación de flúor y selladores",
    "Tratamiento de caries y seguimiento clínico",
    "Urgencias dentales infantiles",
    "Orientación sobre hábitos orales y alimentación",
    "Revisiones periódicas del desarrollo dental",
  ];

  const reasons = [
    {
      title: "Prevención desde edades tempranas",
      text: "La odontopediatría ayuda a detectar cambios tempranos y a construir hábitos sanos desde la primera infancia.",
      icon: ShieldCheck,
    },
    {
      title: "Seguimiento del crecimiento dental",
      text: "Permite revisar cómo erupcionan los dientes, cómo evoluciona la mordida y cuándo conviene intervenir a tiempo.",
      icon: Sparkles,
    },
    {
      title: "Atención pensada para niños",
      text: "La comunicación, la paciencia y el manejo conductual cambian por completo la experiencia de consulta infantil.",
      icon: HeartHandshake,
    },
    {
      title: "Acompañamiento a madres y padres",
      text: "Además del tratamiento, recibes orientación clara para higiene, alimentación y cuidado diario en casa.",
      icon: MessageCircleHeart,
    },
  ];

  const visitMoments = [
    "Primera visita dental o aparición de los primeros dientes",
    "Dolor dental, sensibilidad o molestias al comer",
    "Caries visibles o sospecha de caries en niños",
    "Dientes fracturados o traumatismos por caídas",
    "Inflamación de encías o sangrado frecuente",
    "Mal aliento persistente",
    "Bruxismo, chuparse el dedo u otros hábitos orales",
    "Revisión preventiva y control del desarrollo dental",
    "Orientación sobre higiene, alimentación y rutina de cepillado",
    "Erupción dental tardía o dudas sobre el cambio de dientes",
  ];

  const benefits = [
    "Atención especializada para niños y niñas",
    "Trato amable, paciente y cercano",
    "Enfoque preventivo y educación familiar",
    "Comunicación clara para madres y padres",
    "Ambiente cálido, confiable y profesional",
    "Cuidado sensible de dientes temporales y permanentes",
  ];

  const reviews = [
    {
      quote:
        "Excelente atención con mi hija. La consulta fue muy tranquila, clara y con mucha paciencia en todo momento.",
      author: "Reseña de Google Maps",
    },
    {
      quote:
        "Nos explicaron cada paso de forma muy amable. Se nota la experiencia con niños y el enfoque preventivo.",
      author: "Reseña de Google Maps",
    },
    {
      quote:
        "Un trato cálido y profesional desde la primera visita. Mi hijo se sintió en confianza y nosotros también.",
      author: "Reseña de Google Maps",
    },
  ];

  const faqs = [
    {
      question: "¿A qué edad debe ser la primera consulta?",
      answer:
        "Lo ideal es acudir desde la aparición del primer diente o antes del primer año. Esa primera revisión ayuda a prevenir caries tempranas y a orientar a la familia desde el inicio.",
    },
    {
      question: "¿Cada cuánto tiempo debo llevar a mi hijo al dentista?",
      answer:
        "En muchos casos se recomienda una revisión cada seis meses, aunque la frecuencia puede variar según el riesgo de caries, hábitos y etapa de desarrollo dental.",
    },
    {
      question: "¿Qué pasa si solo tiene dientes de leche?",
      answer:
        "Los dientes temporales son fundamentales para masticar, hablar, mantener espacio para los dientes permanentes y acompañar el desarrollo saludable de la sonrisa infantil.",
    },
    {
      question: "¿Cómo sé si necesita una revisión?",
      answer:
        "Si notas dolor, manchas, sensibilidad, inflamación, mal aliento persistente o cambios en la mordida, es momento de evaluar. También conviene acudir aunque no haya molestias, como parte del cuidado preventivo.",
    },
    {
      question: "¿Qué hago si mi hijo tiene miedo al dentista?",
      answer:
        "Una odontopediatra adapta la consulta al ritmo de cada niño, explica con lenguaje sencillo y construye confianza paso a paso para que la experiencia sea más amable.",
    },
    {
      question: "¿Atienden urgencias?",
      answer:
        "Sí. Si hay dolor, golpes, inflamación o fracturas dentales, es importante buscar valoración lo antes posible para proteger la salud dental infantil.",
    },
    {
      question: "¿Qué incluye una valoración?",
      answer:
        "Incluye revisión clínica, orientación para madres y padres, valoración del desarrollo dental y una propuesta de seguimiento o tratamiento según las necesidades del niño o la niña.",
    },
  ];

  return (
    <div className="bg-background text-foreground">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Enviar mensaje por WhatsApp"
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary text-primary-foreground shadow-[0_24px_40px_-18px_color-mix(in_oklab,var(--primary)_70%,transparent)] transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:bottom-6 sm:right-6"
      >
        <MessageCircleHeart className="size-6" />
      </a>

      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold text-primary">Odontopediatría con amor</p>
            <p className="text-xs text-muted-foreground">Dra. Laura Díaz de León</p>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
            <a href="#doctora" className="transition-colors hover:text-foreground">Sobre la Dra. Laura</a>
            <a href="#servicios" className="transition-colors hover:text-foreground">Servicios</a>
            <a href="#faq" className="transition-colors hover:text-foreground">Preguntas frecuentes</a>
            <a href="#contacto" className="transition-colors hover:text-foreground">Contacto</a>
          </nav>
          <Button asChild className="hidden rounded-full px-5 sm:inline-flex">
            <a href="#contacto">Solicitar información</a>
          </Button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 -z-10 h-[540px] bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--surface-highlight)_80%,transparent),transparent_58%),radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--surface-warm)_75%,transparent),transparent_52%),linear-gradient(180deg,color-mix(in_oklab,var(--surface-soft)_95%,transparent),transparent)]" />
          <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-10 sm:px-6 md:pb-20 md:pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-20">
            <div className="flex flex-col justify-center">
              <Badge className="w-fit rounded-full border-transparent bg-brand/30 px-4 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-foreground shadow-none">
                Odontopediatra en Aguascalientes
              </Badge>
              <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Atención dental infantil con calidez, prevención y confianza.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                La <strong className="font-semibold text-foreground">Dra. Laura Díaz de León</strong>,
                odontóloga pediatra, acompaña a familias que buscan una revisión dental infantil
                cercana, clara y profesional para cuidar cada sonrisa desde sus primeros años.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 rounded-full px-6 text-base font-semibold">
                  <a href="#contacto">Solicitar información</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-border/80 bg-background/70 px-6 text-base font-semibold"
                >
                  <a href={whatsappHref} target="_blank" rel="noreferrer">
                    Enviar WhatsApp
                  </a>
                </Button>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  ["Especialidad", "Odontopediatría pediátrica con enfoque preventivo"],
                  ["Ubicación", "Calle 26 de marzo 302,\nFracc. Del Valle I\nAguascalientes"],
                  ["Contacto", "WhatsApp, formulario y atención con seguimiento"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[24px] border border-border/70 bg-card/80 p-4 shadow-sm backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{label}</p>
                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--brand)_30%,transparent),transparent_62%)]" />
              <div className="relative w-full max-w-[530px]">
                <div className="absolute -left-4 top-10 hidden h-32 w-32 rounded-full bg-brand/30 blur-3xl sm:block" />
                <div className="absolute -right-3 bottom-8 h-36 w-36 rounded-full bg-primary/20 blur-3xl" />
                <div className="relative overflow-hidden rounded-[36px] border border-border/70 bg-card p-3 shadow-[0_32px_90px_-40px_color-mix(in_oklab,var(--brand-strong)_40%,transparent)]">
                  <img
                    src={portraitPrimary}
                    alt="Dra. Laura Díaz de León sonriendo en su consultorio de odontopediatría"
                    className="aspect-[4/5] w-full rounded-[28px] object-cover object-center"
                    loading="eager"
                  />
                </div>
                <div className="absolute -bottom-6 left-4 max-w-[250px] rounded-[28px] border border-border/70 bg-background/95 p-4 shadow-lg backdrop-blur sm:left-[-1.25rem]">
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                      <HeartHandshake className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Un espacio pensado para familias</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        Prevención dental infantil, seguimiento cercano y trato amable en cada visita.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="doctora">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative overflow-hidden rounded-[36px] border border-border/70 bg-card p-3 shadow-[0_32px_80px_-44px_color-mix(in_oklab,var(--brand-strong)_40%,transparent)]">
              <img
                src={portraitSecondary}
                alt="Retrato profesional de la Dra. Laura Díaz de León para su sitio de odontopediatría"
                className="aspect-[4/5] w-full rounded-[28px] object-cover object-center"
                loading="lazy"
              />
            </div>
            <div>
              <Badge className="rounded-full border-transparent bg-primary/10 px-4 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-primary shadow-none">
                Sobre la Dra. Laura
              </Badge>
              <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
                Preparación profesional y sensibilidad para atender a cada niño con paciencia.
              </h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                La <strong className="font-semibold text-foreground">Dra. Laura Díaz de León</strong>
                acompaña a madres y padres que desean una atención especializada en salud dental infantil,
                con un enfoque humano, preventivo y cercano para que cada consulta sea una experiencia de confianza.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  ["Experiencia", "[AÑOS_DE_EXPERIENCIA] acompañando sonrisas infantiles"],
                  ["Formación", "[UNIVERSIDAD / ESPECIALIDAD]"],
                  ["Certificaciones", "[CERTIFICACIONES]"],
                  ["Atención", "Consulta con trato amable, explicación clara y enfoque familiar"],
                ].map(([title, detail]) => (
                  <div key={title} className="rounded-[26px] border border-border/70 bg-surface-soft/70 p-5">
                    <p className="text-sm font-semibold text-foreground">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-soft/60 py-16">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <Card className="rounded-[30px] border-border/70 bg-card/90 shadow-none">
              <CardHeader className="space-y-4">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Stethoscope className="size-6" />
                </div>
                <CardTitle className="text-2xl">¿Qué es la odontopediatría?</CardTitle>
              </CardHeader>
              <CardContent className="text-base leading-8 text-muted-foreground">
                La odontopediatría es la rama de la odontología enfocada en la salud bucal infantil.
                Una odontopediatra no solo revisa dientes: también acompaña el crecimiento dental,
                orienta a la familia y adapta la atención a la etapa y necesidades de cada niño.
                <br />
                <br />
                Por eso, una consulta pediátrica no es igual a una revisión dental general. Implica
                conocimiento específico sobre desarrollo, prevención, hábitos y manejo conductual infantil.
              </CardContent>
            </Card>

            <Card className="rounded-[30px] border-border/70 bg-card/90 shadow-none">
              <CardHeader className="space-y-4">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-brand/25 text-brand-foreground">
                  <Baby className="size-6" />
                </div>
                <CardTitle className="text-2xl">¿Por qué es importante que los niños sean revisados por una especialista?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {reasons.map(({ title, text, icon: Icon }) => (
                    <div key={title} className="rounded-[24px] border border-border/70 bg-background/70 p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-foreground">{title}</h3>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div>
              <Badge className="rounded-full border-transparent bg-brand/30 px-4 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-foreground shadow-none">
                Cuándo acudir
              </Badge>
              <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
                Señales y momentos en los que sí conviene llevar a tu hijo o hija con una odontopediatra.
              </h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                Si alguna vez has pensado “todavía está muy pequeño”, “solo son dientes de leche” o
                “mejor lo llevo después”, esta guía está pensada para darte claridad. La prevención dental
                infantil funciona mejor cuando se inicia a tiempo.
              </p>
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {visitMoments.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[24px] border border-border/70 bg-card p-4 shadow-sm">
                  <CheckCircle2 className="mt-1 size-5 shrink-0 text-primary" />
                  <p className="text-sm leading-6 text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-warm/55 py-16" id="servicios">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <Badge className="rounded-full border-transparent bg-primary/10 px-4 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-primary shadow-none">
                Servicios de odontopediatría
              </Badge>
              <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
                Servicios pensados para cuidar, prevenir y acompañar el desarrollo dental infantil.
              </h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                Esta sección puede ampliarse fácilmente después. Por ahora, reúne los servicios más buscados
                por familias que necesitan un dentista para niños con enfoque especializado.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {services.map((service, index) => (
                <Card key={service} className="rounded-[28px] border-border/70 bg-card/95 shadow-none">
                  <CardHeader className="space-y-4">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-brand/25 text-brand-foreground">
                      {index % 4 === 0 ? (
                        <HeartPulse className="size-5" />
                      ) : index % 4 === 1 ? (
                        <SmilePlus className="size-5" />
                      ) : index % 4 === 2 ? (
                        <ClipboardPlus className="size-5" />
                      ) : (
                        <CalendarHeart className="size-5" />
                      )}
                    </div>
                    <CardTitle className="text-lg leading-7">{service}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <div className="mt-8">
              <Button asChild size="lg" className="h-12 rounded-full px-6 text-base font-semibold">
                <a href="#contacto">Quiero recibir información</a>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-[34px] border border-border/70 bg-card p-6 sm:p-8">
            <div>
              <Badge className="rounded-full border-transparent bg-brand/30 px-4 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-foreground shadow-none">
                Diferenciadores
              </Badge>
              <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
                Una atención dental infantil especializada, clara y verdaderamente cercana.
              </h2>
              <div className="mt-8 grid gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 rounded-[22px] bg-surface-soft/70 p-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <BadgeCheck className="size-5" />
                    </div>
                    <p className="text-sm leading-6 text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-soft/50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <Badge className="rounded-full border-transparent bg-primary/10 px-4 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-primary shadow-none">
                Opiniones de familias
              </Badge>
              <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
                Tres reseñas de 5 estrellas para reforzar confianza antes del contacto.
              </h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                Aquí colocaremos testimonios reales extraídos de Google Maps. Por ahora dejé tres espacios listos para reemplazarlos por las opiniones finales.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {reviews.map((review, index) => (
                <Card key={index} className="rounded-[28px] border-border/70 bg-card/95 shadow-none">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-primary">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star key={starIndex} className="size-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-5 text-base leading-7 text-foreground">“{review.quote}”</p>
                    <p className="mt-5 text-sm font-medium text-muted-foreground">{review.author}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-soft/60 py-16" id="faq">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="rounded-full border-transparent bg-primary/10 px-4 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-primary shadow-none">
                Preguntas frecuentes
              </Badge>
              <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
                Respuestas claras para dudas reales de madres y padres.
              </h2>
            </div>

            <Accordion type="single" collapsible className="mt-10 rounded-[30px] border border-border/70 bg-card px-6 py-2">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`} className="border-border/60">
                  <AccordionTrigger className="py-5 text-base font-semibold text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-7 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="contacto">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-6">
              <Badge className="rounded-full border-transparent bg-brand/30 px-4 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-foreground shadow-none">
                Contacto y seguimiento
              </Badge>
              <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
                Agenda una primera conversación y recibe orientación sobre la atención que necesita tu hijo.
              </h2>
              <p className="text-base leading-8 text-muted-foreground">
                Puedes escribir por WhatsApp o completar el formulario. La experiencia quedó lista para
                conectar un servicio real de correo con placeholders claros: <strong className="text-foreground">DESTINATION_EMAIL</strong>
                y <strong className="text-foreground">CONTACT_FORM_WEBHOOK_URL</strong>.
              </p>

              <div className="rounded-[30px] border border-border/70 bg-card p-6">
                <div className="grid gap-5">
                  {[
                    { label: "Correo de recepción", value: "DESTINATION_EMAIL", icon: MailCheck },
                    { label: "Dirección", value: "Calle 26 de marzo 302, Fracc. Del Valle I", icon: MapPin },
                    { label: "Horarios", value: "[HORARIOS]", icon: CalendarHeart },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label}>
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{label}</p>
                          <p className="text-sm text-muted-foreground">{value}</p>
                        </div>
                      </div>
                      <Separator className="mt-5" />
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="h-12 rounded-full px-6 text-base font-semibold">
                    <a href={whatsappHref} target="_blank" rel="noreferrer">
                      Enviar WhatsApp
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-full border-border/80 bg-background/70 px-6 text-base font-semibold"
                  >
                    <a href="mailto:DESTINATION_EMAIL">Escribir por correo</a>
                  </Button>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70 bg-surface-soft/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} Odontopediatría con amor · Dra. Laura Díaz de León ·
            Odontopediatría infantil en Aguascalientes.
          </p>
          <p>URL sugerida: /odontopediatra-en-aguascalientes</p>
        </div>
      </footer>
    </div>
  );
}
