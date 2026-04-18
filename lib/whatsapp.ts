export async function sendWhatsAppMessage(to: string, message: string) {
  // Common WhatsApp API Gateway in Indonesia (e.g., Fonnte)
  // You can replace this with your preferred provider
  const token = process.env.WHATSAPP_API_TOKEN;
  
  if (!token) {
    console.warn("WHATSAPP_API_TOKEN not configured. Skipping notification.");
    return;
  }

  try {
    const response = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: new URLSearchParams({
        target: to,
        message: message,
      }),
    });

    const result = await response.json();
    if (!result.status) {
      console.error("WhatsApp API Error:", result.reason);
    }
    return result;
  } catch (error) {
    console.error("Failed to send WhatsApp notification:", error);
  }
}

export const sendWhatsAppNotification = sendWhatsAppMessage;
