import os

TEST_DOCS_SECTION = """
## Offline Testing Guide

This repository enforces offline-first testing guarantees. You can run the entire test suite on a fresh clone without configuring external Cloudflare network credentials or `.env` files:

```bash
pnpm install --frozen-lockfile
pnpm test -- --run
```
"""

def patch_readme(filepath="README.md"):
    if not os.path.exists(filepath):
        print(f"File {filepath} not found.")
        return
        
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
        
    if "## Offline Testing Guide" not in content:
        content += "\n" + TEST_DOCS_SECTION.strip() + "\n"
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Successfully appended offline testing section to {filepath}")
    else:
        print("Offline testing section already present in README.md.")

if __name__ == "__main__":
    patch_readme()
