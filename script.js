"use strict";

// Public links only. Keep native HTML hrefs in sync for visitors without JavaScript.
const SITE_CONFIG = Object.freeze({
  betaFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfAadJP1xt-i1OqV0ImKfK46w0DegLddaJQHyfiLhs2m8fxMQ/viewform?usp=publish-editor",
  groupUrl: "https://groups.google.com/g/snipstik-beta-testers",
  testingUrl: "https://play.google.com/apps/testing/tech.servinsystems.snipstik",
  storeUrl: "https://play.google.com/store/apps/details?id=tech.servinsystems.snipstik",
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

for (const [name, key] of [
  ["beta", "betaFormUrl"], ["group", "groupUrl"],
  ["testing", "testingUrl"], ["store", "storeUrl"],
]) {
  applyLinks(`[data-${name}-link]`, configuredUrl(SITE_CONFIG[key]));
}
applyLinks("[data-privacy-link]", configuredUrl(SITE_CONFIG.privacyUrl, false, true));
applyLinks("[data-contact-link]", configuredUrl(SITE_CONFIG.contactUrl, true));

// Manual, local-only reminders. Link clicks never mark a step complete.
const CHECKLIST_STORAGE_KEY = "snipstik.betaChecklist.v2";
const LEGACY_CHECKLIST_STORAGE_KEY = "snipstik.betaChecklist.v1";

function readChecklist(value, length) {
  try {
    const saved = JSON.parse(value);
    if (Array.isArray(saved) && saved.length === length && saved.every((step) => typeof step === "boolean")) return saved;
  } catch {
    // Ignore malformed state; stored text is never inserted into HTML.
  }
  return null;
}
const checklist = document.getElementById("beta-checklist");
if (checklist) {
  const inputs = [...checklist.querySelectorAll('input[name="beta-step"]')];
  const note = document.getElementById("checklist-storage-note");
  const savedNote = note.textContent;
  function storageUnavailable() {
    note.textContent = "Your browser couldn’t save progress. The checklist still works on this page; no signup information is stored.";
  }
  function renderProgress() {
    const completed = inputs.filter((input) => input.checked).length;
    document.getElementById("checklist-progress").textContent = `${completed}/${inputs.length} completed`;
    document.getElementById("beta-progress").value = completed;
  }
  let saved = null;
  let migrated = false;
  try {
    const stored = localStorage.getItem(CHECKLIST_STORAGE_KEY);
    saved = readChecklist(stored, inputs.length);
    if (stored === null) {
      const legacy = readChecklist(localStorage.getItem(LEGACY_CHECKLIST_STORAGE_KEY), 5);
      if (legacy) {
        // Old group/installation/form checks remain valid. Opening the testing
        // page is not proof of joining; "ready to test" is not proof of testing.
        saved = [legacy[1], false, legacy[3], false, false, legacy[0]];
        migrated = true;
      }
    }
  } catch {
    storageUnavailable();
  }
  if (saved) inputs.forEach((input, index) => { input.checked = saved[index]; });
  if (migrated) {
    try {
      localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(saved));
      localStorage.removeItem(LEGACY_CHECKLIST_STORAGE_KEY);
    } catch {
      // Preserve the migrated checks for this page even if saving is blocked.
      storageUnavailable();
    }
  }
  checklist.addEventListener("change", (event) => {
    if (!inputs.includes(event.target)) return;
    renderProgress();
    try {
      localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(inputs.map((input) => input.checked)));
      note.textContent = savedNote;
    } catch {
      storageUnavailable();
    }
  });
  document.getElementById("reset-checklist").addEventListener("click", () => {
    inputs.forEach((input) => { input.checked = false; });
    renderProgress();
    try {
      localStorage.removeItem(CHECKLIST_STORAGE_KEY);
      localStorage.removeItem(LEGACY_CHECKLIST_STORAGE_KEY);
      note.textContent = savedNote;
    } catch {
      storageUnavailable();
    }
  });
  renderProgress();
  checklist.hidden = false;
}
