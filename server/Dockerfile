# Use the official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy only dependency files and tsconfig.json first
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Compile TypeScript directly (this creates the dist/ folder with compiled code)
RUN npx tsc --project tsconfig.json && ls -l /app/dist

# Expose port 3000
EXPOSE 3000

# Start the application from the compiled code
CMD ["node", "dist/index.js"]
