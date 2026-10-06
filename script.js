"use strict";

// Public outbound links only. Replace BETA_FORM_URL here; never put secrets here.
const SITE_CONFIG = Object.freeze({
  betaFormUrl: "BETA_FORM_URL",
  privacyUrl: "", // Full Privacy Policy URL when available (https).
  contactUrl: "", // Contact page (https) or mailto address when supplied.
});

function configuredUrl(value, allowEmail = false) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol === "https:" || (allowEmail && url.protocol === "mailto:")) return url;
  } catch {
    // Keep the readable in-page placeholder when configuration is missing/invalid.
  }
  return null;
}

function applyLinks(selector, url) {
  if (!url) return;
  document.querySelectorAll(selector).forEach((link) => {
    link.href = url.href;
    if (url.protocol === "https:") {
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

const privacyUrl = configuredUrl(SITE_CONFIG.privacyUrl);
const contactUrl = configuredUrl(SITE_CONFIG.contactUrl, true);
applyLinks("[data-privacy-link]", privacyUrl);
applyLinks("[data-contact-link]", contactUrl);
if (privacyUrl) document.querySelector("[data-privacy-placeholder]").hidden = true;
if (contactUrl) document.querySelector("[data-contact-placeholder]").hidden = true;
