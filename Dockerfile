# Define a base image
FROM node:18

# Create a directory in the container where the app will be placed
WORKDIR /usr/src/app

# A wildcard is used to ensure package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Copy app source code to the container
COPY . .

# Compile TypeScript into JavaScript
RUN npm run build

# Bind the app to port 3000
EXPOSE 3000

# Define the command to run the app
CMD [ "node", "dist/index.js" ]
