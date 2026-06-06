export async function onRequestPost(context) {
  const { request, env } = context;

  // Parse form data
  const formData = await request.formData();
  const name = formData.get("name")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim() || "";
  const message = formData.get("message")?.toString().trim() || "";

  // Basic validation
  if (!name || !email || !message) {
    return new Response("Missing required fields", { status: 400 });
  }

  // Send email via Cloudflare Email Routing
  const emailContent = `From: ${name} <${email}>

${message}

---
Sent via bichael.uk contact form`;

  await fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: "mike@bichael.uk", name: "Michael Polom" }],
          dkim_domain: "bichael.uk",
          dkim_selector: "mailchannels",
          dkim_private_key: env.DKIM_PRIVATE_KEY,
        },
      ],
      from: {
        email: "contact@bichael.uk",
        name: "bichael.uk contact form",
      },
      reply_to: { email: email, name: name },
      subject: `New message from ${name}`,
      content: [{ type: "text/plain", value: emailContent }],
    }),
  });

  // Redirect to thank you page
  return Response.redirect(new URL("/", request.url).toString(), 302);
}