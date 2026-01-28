"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
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

  // Initialize EmailJS
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
      console.log("EmailJS initialized with public key");
    } else {
      console.error("EmailJS public key is missing!");
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    if (!formRef.current) {
      setStatus("error");
      setErrorMessage("Form reference is missing");
      return;
    }

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const clientTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CLIENT_ID;
      const teamTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_TEAM_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      console.log("EmailJS config check:", {
        serviceId,
        clientTemplateId,
        teamTemplateId,
        publicKey,
        hasServiceId: !!serviceId,
        hasClientTemplateId: !!clientTemplateId,
        hasTeamTemplateId: !!teamTemplateId,
        hasPublicKey: !!publicKey,
      });

      if (!serviceId || !clientTemplateId || !teamTemplateId || !publicKey) {
        throw new Error("EmailJS configuration is missing. Please check your environment variables.");
      }

      console.log("Attempting to send emails via EmailJS...");

      // Prepare template parameters explicitly
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        to_email: "blancamariabarrufet@gmail.com",
      };

      console.log("Template params:", templateParams);

      // Send email to team (you)
      console.log("Sending notification email to team...");
      const teamResponse = await emailjs.send(
        serviceId,
        teamTemplateId,
        templateParams,
        publicKey
      );
      console.log("Team email sent:", teamResponse);

      // Send auto-reply to client (user)
      console.log("Sending auto-reply to client...");
      const clientResponse = await emailjs.send(
        serviceId,
        clientTemplateId,
        templateParams,
        publicKey
      );
      console.log("Client email sent:", clientResponse);

      console.log("EmailJS SUCCESS: Both emails sent!");
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (error: any) {
      console.error("EmailJS FULL ERROR:", error);
      console.error("Error status:", error?.status);
      console.error("Error text:", error?.text);
      console.error("Error type:", typeof error);
      console.error("Error keys:", Object.keys(error || {}));

      setStatus("error");

      let message = "Failed to send message. Please try again or email me directly.";

      if (error?.status === 412) {
        message = "EmailJS error: Template not found or disabled. Please check your template ID.";
      } else if (error?.status === 403) {
        message = "EmailJS error: Invalid public key. Please check your configuration.";
      } else if (error?.text) {
        message = `Error: ${error.text}`;
      } else if (error?.message) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      } else {
        message = `Error sending email. Status: ${error?.status || 'unknown'}`;
      }

      setErrorMessage(message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Hidden field for team email recipient */}
        <input type="hidden" name="to_email" value="blancamariabarrufet@gmail.com" />

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="John Doe"
            disabled={status === "sending"}
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="john@example.com"
            disabled={status === "sending"}
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="input-field resize-none"
            placeholder="Tell me about your project or inquiry..."
            disabled={status === "sending"}
          />
        </div>

        {/* Status Messages */}
        {status === "success" && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            <p className="font-medium">Message sent successfully!</p>
            <p className="text-sm mt-1">Thank you for reaching out. I'll get back to you soon.</p>
          </div>
        )}

        {status === "error" && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <p className="font-medium">Error sending message</p>
            <p className="text-sm mt-1">{errorMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {status === "sending" ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Send Message
            </>
          )}
        </button>
      </form>

      {/* Alternative Contact */}
      <div className="mt-8 pt-8 border-t border-gray-200 text-center">
        <p className="text-gray-600 mb-4">Or reach out directly via email:</p>
        <a
          href="mailto:blancamariabarrufet@gmail.com"
          className="text-gray-900 font-semibold hover:underline"
        >
          blancamariabarrufet@gmail.com
        </a>
      </div>
    </div>
  );
};

export default ContactForm;
