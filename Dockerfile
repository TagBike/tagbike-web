# build environment
FROM node:10 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
COPY . /app
RUN yarn install
RUN yarn run build

# production environment
FROM node:10
RUN yarn global add serve
WORKDIR /app
COPY  --from=build /app/build .

EXPOSE 80
CMD ["serve", "-p", "80", "-s", "."]