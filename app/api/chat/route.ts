import { NextRequest, NextResponse } from "next/server";
import cvData from "@/data/cv.json";

// TODO: Connect to real backend
// Use environment variable for backend URL: process.env.CHAT_BACKEND_URL
// Example: const BACKEND_URL = process.env.CHAT_BACKEND_URL || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationId } = body;

    // TODO: Replace this mock logic with actual backend call
    // Example:
    // const response = await fetch(`${BACKEND_URL}/chat`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ message, conversationId }),
    // });
    // const data = await response.json();
    // return NextResponse.json(data);

    // Mock response logic for now
    const lowerMessage = message.toLowerCase();
    let reply = "";

    if (lowerMessage.includes("summarize") || lowerMessage.includes("summary")) {
      reply = `${cvData.profile.name} is a ${cvData.profile.headline} based in ${cvData.profile.location}. Currently working as an AI Chatbot Developer at Connecthink Innovation, developing enterprise AI chatbots with RAG architectures using LangGraph, LlamaIndex, and pgvector. Also serves as a University Collaborator teaching mathematics in the AI degree program. Strong background in software engineering, data, and business strategy.`;
    } else if (lowerMessage.includes("skill")) {
      const allSkills = [
        ...cvData.skills.languages,
        ...cvData.skills.frameworks,
        ...cvData.skills.tools,
      ];
      reply = `Technical skills include: ${allSkills.join(", ")}. Also proficient in ${cvData.skills.methods.join(", ")}.`;
    } else if (lowerMessage.includes("ai") || lowerMessage.includes("chatbot")) {
      const aiExp = cvData.experience.find((exp) => exp.company === "Connecthink Innovation, S.L.");
      if (aiExp) {
        reply = `AI Chatbot experience at ${aiExp.company} (${aiExp.start} - ${aiExp.end}):\n\n${aiExp.bullets.join("\n")}`;
      }
    } else if (lowerMessage.includes("download") || lowerMessage.includes("cv") || lowerMessage.includes("resume")) {
      reply = "You can download the full CV in PDF format by clicking the 'Download CV' button on the CV page, or scroll down to explore the interactive CV below!";
    } else if (lowerMessage.includes("education")) {
      const edu = cvData.education[0];
      reply = `${edu.program} from ${edu.school} (${edu.start} - ${edu.end}). ${edu.description}`;
    } else if (lowerMessage.includes("language")) {
      const langs = cvData.languages.map((l) => `${l.language} (${l.proficiency})`).join(", ");
      reply = `Languages: ${langs}`;
    } else if (lowerMessage.includes("certification")) {
      const certs = cvData.certifications.map((c) => c.name).join(", ");
      reply = `Certifications: ${certs}`;
    } else if (lowerMessage.includes("experience")) {
      reply = `Current positions:\n\n1. ${cvData.experience[0].title} at ${cvData.experience[0].company} (${cvData.experience[0].start} - ${cvData.experience[0].end})\n\n2. ${cvData.experience[1].title} at ${cvData.experience[1].company} (${cvData.experience[1].start} - ${cvData.experience[1].end})`;
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("email")) {
      reply = `You can reach out via email at ${cvData.profile.email}`;
    } else {
      reply = `I can help you learn about Blanca's experience, skills, education, and more. Try asking about:\n\n• AI chatbot experience\n• Technical skills\n• Education background\n• Languages and certifications\n• How to download the CV\n\nWhat would you like to know?`;
    }

    return NextResponse.json({
      reply,
      conversationId,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
