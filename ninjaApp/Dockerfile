# Base image
FROM node:6-alpine

# Add maintenance tools
RUN apk --no-cache add \
    bind-tools \
    curl \
    procps

# Create /app
WORKDIR /app

# Add files in 'this' directory to /app
ADD . /app

# Install node dependencies
RUN npm install

# Use port
EXPOSE 8000

# Launch 'npm start' on running container
CMD npm start
