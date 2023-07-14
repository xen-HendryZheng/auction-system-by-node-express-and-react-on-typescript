FROM node:18-slim

WORKDIR /app

EXPOSE 3000

CMD ["npm", "run", "start:dev"]