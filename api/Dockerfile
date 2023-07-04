FROM ruby:3.0

WORKDIR /usr/src/app

COPY ./manifeast ./

COPY ./start-server.sh ./
RUN chmod +x /usr/src/app/start-server.sh

COPY ./migrate.sh ./
RUN chmod +x /usr/src/app/migrate.sh

RUN bundle install

CMD [ "sh", "start-server.sh" ]
