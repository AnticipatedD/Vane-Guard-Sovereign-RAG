FROM node:24-bookworm-slim

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@11 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

EXPOSE 1111

CMD ["pnpm", "exec", "astro", "preview", "--host", "0.0.0.0", "--port", "1111"]
