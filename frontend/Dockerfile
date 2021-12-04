FROM node:12.22.7-alpine3.12
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build"]