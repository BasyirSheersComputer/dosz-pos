# Stage 1: Build
FROM node:18 as builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve using NGINX
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Add your custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files to nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
