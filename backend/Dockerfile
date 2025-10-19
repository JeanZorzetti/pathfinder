# ========================================
# Multi-stage Dockerfile for Production
# ========================================

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev deps for build)
RUN npm ci && \
    npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Remove dev dependencies after build
RUN npm prune --production

# ========================================
# Stage 2: Production
FROM node:20-alpine AS production

# Set environment
ENV NODE_ENV=production

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Copy built application from builder
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/package*.json ./

# Copy migration scripts and entrypoint
COPY --from=builder --chown=nestjs:nodejs /app/fix-xp-table.js ./
COPY --from=builder --chown=nestjs:nodejs /app/run-all-migrations.js ./
COPY --from=builder --chown=nestjs:nodejs /app/entrypoint.sh ./
RUN chmod +x entrypoint.sh

# Switch to non-root user
USER nestjs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:3001/api/v1/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application with entrypoint
ENTRYPOINT ["./entrypoint.sh"]
