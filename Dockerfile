# build environment
FROM node:alpine as builder

WORKDIR /usr/src/app
ENV PATH ./node_modules/.bin:$PATH
COPY . .
RUN npm install --unsafe-perm
RUN yarn build

# production environment
FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
