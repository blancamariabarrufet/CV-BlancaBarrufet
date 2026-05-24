"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    } else {
      console.error("EmailJS public key is missing.");
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    if (!formRef.current) {
      setStatus("error");
      setErrorMessage("Form reference is missing.");
      return;
    }

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const clientTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CLIENT_ID;
      const teamTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_TEAM_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !clientTemplateId || !teamTemplateId || !publicKey) {
        throw new Error("EmailJS configuration is missing. Please check your environment variables.");
      }

      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        to_email: "blancamariabarrufet@gmail.com",
      };

      await emailjs.send(serviceId, teamTemplateId, templateParams, publicKey);
      await emailjs.send(serviceId, clientTemplateId, templateParams, publicKey);

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error: any) {
      console.error("EmailJS error:", error);
      setStatus("error");

      let message = "Failed to send message. Please try again or email me directly.";
      if (error?.status === 412) {
        message = "EmailJS error: template not found or disabled.";
      } else if (error?.status === 403) {
        message = "EmailJS error: invalid public key.";
      } else if (error?.text) {
        message = `Error: ${error.text}`;
      } else if (error?.message) {
        message = error.message;
      }

      setErrorMessage(message);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="to_email" value="blancamariabarrufet@gmail.com" />

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" id="name">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="terminal-input"
            placeholder="Ada Lovelace"
            disabled={status === "sending"}
          />
        </Field>

        <Field label="Email" id="email">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="terminal-input"
            placeholder="ada@example.com"
            disabled={status === "sending"}
          />
        </Field>
      </div>

      <Field label="Message" id="message">
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="terminal-input resize-none"
          placeholder="Tell me about the role, project, or collaboration."
          disabled={status === "sending"}
        />
      </Field>

      {status === "success" && (
        <div className="module-muted border-[var(--accent)] px-3 py-2 text-xs text-[var(--ink)]">
          Message sent successfully. I will get back to you soon.
        </div>
      )}

      {status === "error" && <div className="module-muted px-3 py-2 text-xs text-[var(--ink)]">{errorMessage}</div>}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-dashed pt-4">
        <a href="mailto:blancamariabarrufet@gmail.com" className="text-xs text-[var(--ink-muted)] underline hover:text-[var(--accent)]">
          blancamariabarrufet@gmail.com
        </a>
        <button type="submit" disabled={status === "sending"} className="btn-terminal-primary disabled:cursor-not-allowed disabled:opacity-50">
          {status === "sending" ? "Sending" : "Send Message"}
        </button>
      </div>
    </form>
  );
};

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[10px] uppercase tracking-[0.14em] text-[var(--ink-muted)]">
        {label}
      </label>
      {children}
    </div>
  );
}

export default ContactForm;
