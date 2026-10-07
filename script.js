"use strict";

// Public links only. Configure the beta form here; never put secrets here.
const SITE_CONFIG = Object.freeze({
  betaFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfAadJP1xt-i1OqV0ImKfK46w0DegLddaJQHyfiLhs2m8fxMQ/viewform?usp=publish-editor",
  privacyUrl: "./privacy.html",
  contactUrl: "mailto:servinsystems@gmail.com",
});

function configuredUrl(value, allowEmail = false, allowLocal = false) {
  if (!value) return null;
  try {
    const url = new URL(value, allowLocal ? document.baseURI : undefined);
    if (allowLocal && value.startsWith("./") && url.origin === window.location.origin) return url;
    if (url.protocol === "https:" || (allowEmail && url.protocol === "mailto:")) return url;
  } catch {
    // Preserve the HTML fallback when configuration is missing/invalid.
  }
  return null;
}

function applyLinks(selector, url) {
  if (!url) return;
  document.querySelectorAll(selector).forEach((link) => {
    link.href = url.href;
    if (url.protocol === "https:" && url.origin !== window.location.origin) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", `${link.textContent.trim()} (opens in a new tab)`);
    }
  });
}

const betaUrl = configuredUrl(SITE_CONFIG.betaFormUrl);
applyLinks("[data-beta-link]", betaUrl);
if (betaUrl) {
  document.getElementById("signup-status").textContent = "Opens the beta signup form in a new tab. Nothing is submitted on this website.";
}

const privacyUrl = configuredUrl(SITE_CONFIG.privacyUrl, false, true);
const contactUrl = configuredUrl(SITE_CONFIG.contactUrl, true);
applyLinks("[data-privacy-link]", privacyUrl);
applyLinks("[data-contact-link]", contactUrl);
