import * as fs from 'fs';
import * as path from 'path';

export async function fetchSkillsData(): Promise<void> {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const targetPath = path.join(process.cwd(), 'src/content/skills.json');

  console.log("Checking environment credentials for skill sync layer...");

  // Force an offline soft fallback loop if environment values are missing or offline flag passed
  const isSoftMode = process.argv.includes('--soft') || process.argv.includes('--offline');
  if (!token || !accountId || isSoftMode) {
    console.warn("⚠️ API keys missing or soft/offline mode detected. Loading offline fallback payload...");
    const fallbackData = {
      skills: ["Core ML Systems", "Vector Search Optimization", "Distributed Infrastructure Orchestration"],
      syncedAt: new Date().toISOString(),
      mode: "offline-mock-fallback"
    };
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, JSON.stringify(fallbackData, null, 2));
    return;
  }

  // Authentic fetch pipeline execution branch when tokens exist
  try {
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/skills`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    });
    if (!response.ok) throw new Error(`HTTP network error code: ${response.status}`);
    const data = await response.json();
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, JSON.stringify(data, null, 2));
    console.log("Successfully synced skills from Cloudflare API.");
  } catch (error) {
    console.error("Network sync failure, dropping back to soft initialization:", error);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, JSON.stringify({ skills: [], fallback: true }, null, 2));
  }
}

if (process.argv[1] === new URL(import.meta.url).pathname || process.argv[1].endsWith('fetch-skills.ts')) {
  fetchSkillsData().catch(() => process.exit(1));
}
