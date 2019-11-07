FROM alpine:latest as builder
ARG api_endpoint

RUN apk update && \
  apk upgrade
ENV APK_ADD="bash curl nodejs yarn" \
  APK_DEL="bash curl nodejs yarn" \
  npm_config_loglevel="silent" \
  REACT_APP_APIENDPOINT=${api_endpoint}
RUN apk add --no-cache ${APK_ADD}
WORKDIR /app
COPY . /app
RUN cd /app && \
  yarn install --slient --no-progress  && \
  yarn build && \
  cd /app && \
  rm -rf \
  /usr/share/man/* \
  /usr/includes/* \
  /var/cache/apk/* \
  /root/.npm/* \
  /usr/lib/node_modules/npm/man/* \
  /usr/lib/node_modules/npm/doc/* \
  /usr/lib/node_modules/npm/html/* \
  /usr/lib/node_modules/npm/scripts/* && \
  apk del ${APK_DEL} 

FROM alpine:latest
RUN apk update && \
  apk upgrade
ENV APK_ADD="bash curl nginx" \
  APK_DEL="curl" \
  REACT_APP_APIENDPOINT=${api_endpoint}
RUN apk add --no-cache ${APK_ADD} && \
  mkdir -p /run/nginx
COPY ./nginx/app.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
RUN apk del ${APK_DEL}
EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
