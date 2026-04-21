const SUPABASE_URL = https://ooswemrfxzofsarcoeib.supabase.co
const SUPABASE_ANON_KEY = sb_publishable_renVzkJeNs8_Q4Y2ZNVbCQ_qNFc8L9w

async function insertRow(table, row) {
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
    throw new Error(`Insert into ${table} failed: ${text}`);
  }
}

async function completeSession(sessionId) {
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
    throw new Error(`Complete session failed: ${text}`);
  }
}
