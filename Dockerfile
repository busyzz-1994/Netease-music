# build environment
FROM node:alpine as builder

WORKDIR /usr/src/app
ENV PATH ./node_modules/.bin:$PATH
COPY package.json yarn.lock .npmrc* ./
RUN yarn install
COPY . .

ARG CI_COMMIT_SHA
ENV REACT_APP_SHA=${CI_COMMIT_SHA}
RUN yarn build

# production environment
FROM nginx:stable

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
