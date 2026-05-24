import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "https://menteviva-bwc9ejdthjhsfecn.swedencentral-01.azurewebsites.net/blanca";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    console.log("Sending message to backend:", message);

    // Call the backend endpoint
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    console.log("Backend response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error response:", errorText);
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Backend response data:", data);

    // Extract the message from the response
    const reply = data.response?.value || data.message || "I'm sorry, I couldn't process that request.";

    return NextResponse.json({
      reply,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { reply: "Sorry, there was an error connecting to the backend. Please try again." },
      { status: 200 }
    );
  }
}
