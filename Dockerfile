FROM node:20.10.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
ADD . .
ENV NODE_ENV production
RUN npm run build
RUN npm prune --production
CMD ["npm", "start"]