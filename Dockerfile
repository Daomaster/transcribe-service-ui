FROM node:10.12-alpine AS angular-builder
COPY . /source/
WORKDIR /source
RUN npm install && npm run build

FROM nginx:alpine
# delete the default html from nginx image
RUN rm -rf /usr/share/nginx/html/*
COPY nginx /etc/nginx/conf.d
COPY --from=angular-builder /source/dist/transcribe-service-ui /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
