const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw7u7hBDakCpuDQqkwyX5Vn1a5p5Yzv0J1SSObS2MBJgLzV1dvxPvmwscxYAvOGsog0/exec";

async function postToGoogleBackend(payload) {
  const response = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  });

  return response;
}

async function startSession(data) {
  return postToGoogleBackend({
    type: "start_session",
    ...data
  });
}

async function savePracticeResult(data) {
  return postToGoogleBackend({
    type: "save_practice",
    ...data
  });
}

async function saveMainResult(data) {
  return postToGoogleBackend({
    type: "save_main",
    ...data
  });
}

async function saveHintResult(data) {
  return postToGoogleBackend({
    type: "save_hint",
    ...data
  });
}

async function completeSession(sessionId) {
  return postToGoogleBackend({
    type: "complete_session",
    session_id: sessionId
  });
}
