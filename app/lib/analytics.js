export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

export function trackWhatsAppClick({ source = "unknown", phone = "", label = "" } = {}) {
  trackEvent("click_whatsapp", {
    source,
    label,
    phone: String(phone).replace(/\D/g, ""),
  });
}
