FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/node_modules /usr/share/nginx/html/.git /usr/share/nginx/html/tailwind-input.css /usr/share/nginx/html/tailwind.config.js /usr/share/nginx/html/package*.json
EXPOSE 80
