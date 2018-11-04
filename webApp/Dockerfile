FROM node:9.6.1 as builder

RUN mkdir /usr/src/angular_app
WORKDIR /usr/src/angular_app

COPY . /usr/src/angular_app
RUN npm install
RUN npm install -g @angular/cli

# CMD ng build --prod
# CMD ls


###


# CMD ng serve --host 0.0.0.0 --port 4200

# # STEP 1 build static website
# FROM node:alpine as builder
# RUN apk update && apk add --no-cache make git
# # Create app directory
# WORKDIR /app
# # Install app dependencies
# COPY package.json package-lock.json  /app/
# RUN cd /app && npm set progress=false && npm install && npm rebuild node-sass
# # Copy project files into the docker image
# COPY .  /app
# RUN cd /app && npm run build

# FROM node:9.6.1

# RUN mkdir /usr/src/angular_app
# WORKDIR /usr/src/angular_app

# RUN npm install -g @angular/cli

# COPY . /usr/src/angular_app
# RUN npm install

# CMD ng build --prod

# # # STEP 2 build a small nginx image with static website
# FROM nginx:alpine
# ## Remove default nginx website
# RUN rm -rf /usr/share/nginx/html/*
# ## From 'builder' copy website to default nginx public folder
# COPY dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


# FROM nginx:alpine

# COPY nginx.conf /etc/nginx/nginx.conf

# WORKDIR /usr/share/nginx/html
# COPY /usr/src/angular_app/webApp/dist/webApp/ .

# base image
FROM nginx:1.13.9-alpine
# copy artifact build from the 'build environment'
COPY --from=builder /usr/src/angular_app/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/angular_app/dist/webApp /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]