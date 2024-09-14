FROM node:22-alpine as stage

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm upgrade --global yarn
RUN yarn


FROM node:22-alpine as build

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm upgrade --global yarn
RUN yarn
RUN yarn run build

FROM node:22-alpine as production

WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist /usr/src/app/dist
COPY --from=build /usr/src/app/package.json /usr/src/app/package.json
ENV NODE_ENV=production
RUN npm install --production
CMD ["node", "dist/main.js"]
