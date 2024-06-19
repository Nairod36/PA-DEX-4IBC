FROM node:alpine as build-react-stage
WORKDIR /app
COPY ./front-dex /app
RUN npm install --force
RUN npm run build

FROM nginx:latest
COPY --from=build-react-stage /app/build /usr/share/nginx/html
