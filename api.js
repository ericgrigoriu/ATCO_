const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwPmO1aao_GBLMG9CobgaEKm0G39wLeqbO12M38pFvtTwx58V_wvr2lMYFHYJ6F4J0A/exec";

window.postToGoogleBackend = async function (payload) {
  const response = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  });

  const text = await response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Keine gültige JSON-Antwort vom Google-Backend: " + text);
  }

  if (!response.ok) {
    throw new Error("HTTP " + response.status + ": " + text);
  }

  if (!data.ok) {
    throw new Error(data.error || "Google-Backend hat ok=false zurückgegeben.");
  }

  return data;
};

window.startSession = async function (data) {
  return window.postToGoogleBackend({
    type: "start_session",
    ...data
  });
};

window.savePracticeResult = async function (data) {
  return window.postToGoogleBackend({
    type: "save_practice",
    ...data
  });
};

window.saveMainResult = async function (data) {
  return window.postToGoogleBackend({
    type: "save_main",
    ...data
  });
};

window.saveHintResult = async function (data) {
  return window.postToGoogleBackend({
    type: "save_hint",
    ...data
  });
};

window.completeSession = async function (sessionId) {
  return window.postToGoogleBackend({
    type: "complete_session",
    session_id: sessionId
  });
};

window.saveFeedback = async function (data) {
  return window.postToGoogleBackend({
    type: "save_feedback",
    ...data
  });
};

