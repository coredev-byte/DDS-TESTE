"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { AlertCircle, Check, ChevronDown, RotateCcw } from "lucide-react";
import { site } from "@/config/site";
import { quoteServiceOptions } from "@/content/services";
import { quoteMessage, whatsappUrl, type QuoteFormData } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { buttonStyles } from "@/components/ui/button-styles";

type FieldName = keyof QuoteFormData;
type Errors = Partial<Record<FieldName, string>>;

const DETAILS_MAX = 600;

const initialValues: QuoteFormData = {
  name: "",
  propertyType: "",
  service: "",
  location: "",
  details: "",
};

const fieldOrder: FieldName[] = ["name", "propertyType", "service", "location", "details"];

function validate(values: QuoteFormData): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Informe seu nome.";
  if (!values.propertyType) errors.propertyType = "Selecione o tipo de imóvel.";
  if (!values.service) errors.service = "Selecione o serviço desejado.";
  if (values.location.trim().length < 2) errors.location = "Informe o bairro ou a cidade da obra.";
  if (values.details.length > DETAILS_MAX)
    errors.details = `Use no máximo ${DETAILS_MAX} caracteres.`;
  return errors;
}

const inputBase =
  "block w-full min-h-12 rounded-none border bg-ink px-4 text-base text-paper placeholder:text-paper/35 transition-[border-color,box-shadow] duration-200 focus:outline-none focus-visible:outline-none focus:border-gold focus:shadow-[0_0_0_1px_var(--color-gold)]";

function inputClass(hasError: boolean) {
  return `${inputBase} ${hasError ? "border-danger" : "border-paper/18 hover:border-paper/35"}`;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-danger">
      <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

export function QuoteForm() {
  const uid = useId();
  const ids = {
    name: `${uid}-name`,
    propertyType: `${uid}-type`,
    service: `${uid}-service`,
    location: `${uid}-location`,
    details: `${uid}-details`,
  };

  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<QuoteFormData>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const update = (field: FieldName, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    // Após a primeira tentativa, a validação acompanha a digitação.
    if (submitted) setErrors(validate(next));
  };

  const validateField = (field: FieldName) => {
    if (!submitted && !values[field]) return; // não acusa erro em campo apenas visitado
    const fieldError = validate(values)[field];
    setErrors((prev) => ({ ...prev, [field]: fieldError }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const result = validate(values);
    setErrors(result);

    const invalid = fieldOrder.filter((f) => result[f]);
    if (invalid.length) {
      setAnnouncement(
        invalid.length === 1
          ? "Há 1 campo para revisar."
          : `Há ${invalid.length} campos para revisar.`,
      );
      const first = invalid[0];
      const target =
        first === "propertyType"
          ? formRef.current?.querySelector<HTMLInputElement>(`input[name="propertyType"]`)
          : document.getElementById(ids[first]);
      target?.focus();
      return;
    }

    const url = whatsappUrl(quoteMessage(values));
    trackEvent("form_submit_whatsapp", {
      service: values.service,
      property_type: values.propertyType,
    });
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
    setAnnouncement("Mensagem pronta. A conversa com a DDS foi aberta no WhatsApp.");
    requestAnimationFrame(() => successRef.current?.focus());
  };

  const reset = () => {
    setSentUrl(null);
    setSubmitted(false);
    setErrors({});
    setAnnouncement("");
    requestAnimationFrame(() => document.getElementById(ids.name)?.focus());
  };

  const describedBy = (field: FieldName, extra?: string) =>
    [errors[field] ? `${ids[field]}-error` : null, extra].filter(Boolean).join(" ") || undefined;

  return (
    <div className="relative">
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>

      {sentUrl ? (
        <div
          ref={successRef}
          tabIndex={-1}
          className="flex min-h-[32rem] flex-col justify-center focus:outline-none"
        >
          <span className="inline-flex size-12 items-center justify-center rounded-full border border-gold/60 text-gold">
            <Check className="size-6" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <h3 className="text-h3 mt-6 text-paper">Sua mensagem está pronta.</h3>
          <p className="mt-3 max-w-[28rem] leading-relaxed text-paper/75">
            Abrimos o WhatsApp com as informações preenchidas. Para concluir, basta tocar em{" "}
            <strong className="font-semibold text-paper">enviar</strong> na conversa com{" "}
            {site.contact.personFirstName}.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={sentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles.primary}
              onClick={() =>
                trackEvent("whatsapp_click", { location: "form_success_reopen" })
              }
            >
              <WhatsAppIcon size={18} />
              Abrir o WhatsApp novamente
            </a>
            <button type="button" onClick={reset} className={buttonStyles.secondary}>
              <RotateCcw className="size-4" aria-hidden="true" />
              Editar informações
            </button>
          </div>
        </div>
      ) : (
        <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby={`${uid}-privacy`}>
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Nome */}
            <div className="sm:col-span-2">
              <label htmlFor={ids.name} className="block text-sm font-medium text-paper">
                Nome <span className="text-gold" aria-hidden="true">*</span>
              </label>
              <input
                id={ids.name}
                name="name"
                type="text"
                autoComplete="name"
                required
                aria-required="true"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={describedBy("name")}
                value={values.name}
                onChange={(e) => update("name", e.target.value)}
                onBlur={() => validateField("name")}
                className={`${inputClass(Boolean(errors.name))} mt-2`}
                placeholder="Como podemos te chamar?"
              />
              <FieldError id={`${ids.name}-error`} message={errors.name} />
            </div>

            {/* Tipo de imóvel */}
            <fieldset
              className="sm:col-span-2"
              aria-invalid={Boolean(errors.propertyType)}
              aria-describedby={describedBy("propertyType")}
            >
              <legend className="text-sm font-medium text-paper">
                Tipo de imóvel <span className="text-gold" aria-hidden="true">*</span>
              </legend>
              <div className="mt-2 grid grid-cols-1 gap-3 xs:grid-cols-2">
                {(["Residencial", "Comercial"] as const).map((option) => {
                  const checked = values.propertyType === option;
                  return (
                    <label
                      key={option}
                      className={`relative flex min-h-12 cursor-pointer items-center gap-3 border px-4 text-[0.9375rem] font-medium transition-colors duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-gold-light ${
                        checked
                          ? "border-gold bg-gold/10 text-paper"
                          : errors.propertyType
                            ? "border-danger text-paper/80"
                            : "border-paper/18 text-paper/80 hover:border-paper/35"
                      }`}
                    >
                      <input
                        type="radio"
                        name="propertyType"
                        value={option}
                        checked={checked}
                        required
                        onChange={(e) => update("propertyType", e.target.value)}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={`flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          checked ? "border-gold" : "border-paper/40"
                        }`}
                      >
                        <span
                          className={`size-2 rounded-full bg-gold transition-transform duration-200 ${
                            checked ? "scale-100" : "scale-0"
                          }`}
                        />
                      </span>
                      {option}
                    </label>
                  );
                })}
              </div>
              <FieldError id={`${ids.propertyType}-error`} message={errors.propertyType} />
            </fieldset>

            {/* Serviço */}
            <div>
              <label htmlFor={ids.service} className="block text-sm font-medium text-paper">
                Serviço desejado <span className="text-gold" aria-hidden="true">*</span>
              </label>
              <div className="relative mt-2">
                <select
                  id={ids.service}
                  name="service"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.service)}
                  aria-describedby={describedBy("service")}
                  value={values.service}
                  onChange={(e) => update("service", e.target.value)}
                  onBlur={() => validateField("service")}
                  className={`${inputClass(Boolean(errors.service))} appearance-none pr-11 ${
                    values.service ? "" : "text-paper/45"
                  }`}
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  {quoteServiceOptions.map((option) => (
                    <option key={option} value={option} className="bg-graphite text-paper">
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-paper/60"
                  aria-hidden="true"
                />
              </div>
              <FieldError id={`${ids.service}-error`} message={errors.service} />
            </div>

            {/* Local */}
            <div>
              <label htmlFor={ids.location} className="block text-sm font-medium text-paper">
                Bairro ou cidade <span className="text-gold" aria-hidden="true">*</span>
              </label>
              <input
                id={ids.location}
                name="location"
                type="text"
                autoComplete="address-level2"
                required
                aria-required="true"
                aria-invalid={Boolean(errors.location)}
                aria-describedby={describedBy("location")}
                value={values.location}
                onChange={(e) => update("location", e.target.value)}
                onBlur={() => validateField("location")}
                className={`${inputClass(Boolean(errors.location))} mt-2`}
                placeholder="Ex.: Alphaville, Barueri"
              />
              <FieldError id={`${ids.location}-error`} message={errors.location} />
            </div>

            {/* Detalhes */}
            <div className="sm:col-span-2">
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor={ids.details} className="block text-sm font-medium text-paper">
                  Conte um pouco sobre o projeto{" "}
                  <span className="font-normal text-stone">(opcional)</span>
                </label>
                <span
                  id={`${ids.details}-count`}
                  className={`tabular text-xs ${
                    values.details.length > DETAILS_MAX ? "text-danger" : "text-stone"
                  }`}
                >
                  {values.details.length}/{DETAILS_MAX}
                </span>
              </div>
              <textarea
                id={ids.details}
                name="details"
                rows={4}
                aria-invalid={Boolean(errors.details)}
                aria-describedby={describedBy("details", `${ids.details}-count`)}
                value={values.details}
                onChange={(e) => update("details", e.target.value)}
                onBlur={() => validateField("details")}
                className={`${inputClass(Boolean(errors.details))} mt-2 resize-y py-3 leading-relaxed`}
                placeholder="Ambientes, metragem aproximada, o que precisa ser feito…"
              />
              <FieldError id={`${ids.details}-error`} message={errors.details} />
            </div>
          </div>

          <button type="submit" className={`${buttonStyles.primary} mt-8 min-h-14 w-full text-base`}>
            <WhatsAppIcon size={20} />
            Enviar pelo WhatsApp
          </button>

          <p id={`${uid}-privacy`} className="mt-4 text-[0.8125rem] leading-relaxed text-stone">
            Nenhum dado é armazenado neste site. As informações são usadas apenas para montar a
            mensagem que você envia pelo seu WhatsApp para {site.contact.person}.
          </p>
        </form>
      )}
    </div>
  );
}
