FROM node:9.6.1

RUN mkdir /usr/src/angular_app
WORKDIR /usr/src/angular_app

RUN npm install -g @angular/cli

COPY . /usr/src/angular_app
RUN npm install

CMD ng serve --host 0.0.0.0 --port 4200
