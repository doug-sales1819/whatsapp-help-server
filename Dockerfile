FROM node:20-alpine

WORKDIR /var/app

RUN npm -i -g pnpm && \
    rm -rf node_modules && \
    rm pnpm-lock.yaml

COPY . .

RUN pnpm install && \
    pnpm build

ENTRYPOINT [ "pnpm", "start:prod" ]