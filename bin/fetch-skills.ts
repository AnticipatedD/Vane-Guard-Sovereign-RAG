import * as fs from 'fs';
import * as path from 'path';

export async function fetchSkillsData(): Promise<void> {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const targetPath = path.join(process.cwd(), 'src/content/skills.json');

  console.log("Checking environment credentials for skill sync layer...");

  // Force an offline soft fallback loop if environment values are missing
  if (!token || !accountId || process.argv.includes('--soft')) {
    console.warn("⚠️ API keys missing or --soft flag detected. Loading offline fallback payload...");
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
    const response = await fetch(`https://cloudflare.com{accountId}/ai/skills`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error(`HTTP network error code: ${response.status}`);
    const data = await response.json();
    fs.writeFileSync(targetPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Network sync failure, dropping back to soft initialization:", error);
    fs.writeFileSync(targetPath, JSON.stringify({ skills: [], fallback: true }, null, 2));
  }
}

if (process.argv[1] === new URL(import.meta.url).pathname || process.argv[1].endsWith('fetch-skills.ts')) {
  fetchSkillsData().catch(() => process.exit(1));
}
