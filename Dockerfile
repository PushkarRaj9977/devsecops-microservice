# --- Build stage ---
FROM node:20-alpine AS builder
WORKDIR /app

# Add a user/group for security
RUN addgroup -S app && adduser -S -G app app

# Install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY . .

# Change ownership
RUN chown -R app:app /app

# --- Runtime stage ---
FROM node:20-alpine AS runner
WORKDIR /app

# Create same user
RUN addgroup -S app && adduser -S -G app app

# Copy only built app & node_modules
COPY --from=builder --chown=app:app /app /app

USER app
EXPOSE 3000

# Run with read-only FS (enforced at runtime)
CMD ["node", "src/index.js"]
