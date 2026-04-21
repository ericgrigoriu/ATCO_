const SUPABASE_URL = "https://ooswemrfxzofsarcoeib.supabase.co",
const SUPABASE_ANON_KEY = "sb_publishable_renVzkJeNs8_Q4Y2ZNVbCQ_qNFc8L9w";

console.log("api.js geladen");

window.insertRow = async function (table, row) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Prefer": "return=minimal"
    },
    body: JSON.stringify(row)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }
};

window.completeSession = async function (sessionId) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/sessions?session_id=eq.${encodeURIComponent(sessionId)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        completed_at: new Date().toISOString()
      })
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }
};

window.savePracticeResult = async function (data) {
  return window.insertRow("practice_responses", data);
};

window.saveMainResult = async function (data) {
  return window.insertRow("main_responses", data);
};

window.saveHintResult = async function (data) {
  return window.insertRow("hint_responses", data);
};
