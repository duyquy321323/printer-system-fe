# Stage 1: Build the React app
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine

# Copy React build files from the previous build stage
COPY --from=build /app/build /usr/share/nginx/html

# Add custom Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port (dynamic from Railway)
EXPOSE 80

# Use dynamic port from environment
CMD ["sh", "-c", "envsubst '$PORT' < /etc/nginx/nginx.conf > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
