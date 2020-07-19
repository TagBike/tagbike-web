FROM mhart/alpine-node:10 AS builder
WORKDIR /app
COPY . /app
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
RUN npm install --quiet node-gyp -g
RUN yarn && yarn build

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
#COPY --from=builder /app/build .
CMD ["serve", "-p", "80", "-s", "./build"]