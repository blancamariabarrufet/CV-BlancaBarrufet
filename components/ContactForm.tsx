"use client";

import { FormEvent, useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Failed to send message.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error: any) {
      console.error("Contact form error:", error);
      setStatus("error");
      setErrorMessage(error?.message || "Failed to send message. Please try again or email me directly.");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
