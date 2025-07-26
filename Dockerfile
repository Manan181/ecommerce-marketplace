# Install dependencies only when needed
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

# Rebuild the source code only when needed
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy only necessary files
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# If you use a custom next.config.mjs, uncomment below:
# COPY --from=builder /app/next.config.mjs ./

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# Set environment variables (override in deployment as needed)
# ENV DATABASE_URL=your_db_url
# ENV NEXTAUTH_SECRET=your_secret

CMD ["npm", "start"]
