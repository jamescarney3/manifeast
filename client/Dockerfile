# base stage - set working directory and install dependencies
FROM node:alpine as base
WORKDIR /app

COPY ./src ./src
COPY package.json .
COPY tsconfig.json .

RUN yarn install

# development stage - do nothing, docker compose will start the service
FROM base as development
RUN echo happy developing

# production stage - build production bundle, copy to nginx image, and turn on nginx
FROM base AS production-build
RUN NODE_ENV=production yarn build

FROM nginx:alpine as production
# copy production build client bundle to the directory where nginx will
# expect to serve it from
COPY --from=production-build /app/dist /usr/share/nginx/html

# copy startup script from source in order to substitute $PORT and $API_LOCATION
# vars in the nginx config file with envsubst
COPY startup.sh .

# copy nginx config file and replace $PORT instances with corresponding env var
COPY nginx.conf /etc/nginx/conf.d/configfile.template

# run startup script to replace config env vars described above and start nginx
CMD [ "sh", "startup.sh" ]
