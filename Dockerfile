FROM node:18.6

# Define the working director
WORKDIR /frontend

# Clone package.json and package-lock.json
COPY package*.json ./

# Set up all the dependencies
RUN npm install --legacy-peer-deps

# Globally set up Ember CLI
RUN npm install -g ember-cli

# Make the application’s port accessible
EXPOSE 4200

# Launch the application
ENTRYPOINT ["ember", "serve", "--proxy", "http://expense-tracker-dispatcher-1:80"]

# Clone all files
COPY . .
