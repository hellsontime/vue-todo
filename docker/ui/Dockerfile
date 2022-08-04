FROM node:14-alpine AS builder

WORKDIR /app

COPY ../../ui/package.json ./
COPY ../../ui/package-lock.json ./

RUN npm install

COPY ../../ui/ .

RUN  npm run build

FROM nginx:alpine

# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./app/dist /usr/share/nginx/html

ARG VUE_APP_API_HOST
RUN echo "VUE_APP_API_HOST: $VUE_APP_API_HOST"
ENV VUE_APP_API_HOST=$VUE_APP_API_HOST

ARG VUE_APP_API_BASE_PATH
RUN echo "VUE_APP_API_BASE_PATH=$VUE_APP_API_BASE_PATH"
ENV VUE_APP_API_BASE_PATH=$VUE_APP_API_BASE_PATH

ARG PORT
ENV PORT=$PORT

ARG EXTERNAL_PORT
ENV EXTERNAL_PORT=$EXTERNAL_PORT

EXPOSE $EXTERNAL_PORT
EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]