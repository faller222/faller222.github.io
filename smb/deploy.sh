#!/bin/bash

# Deploy script for SMB Gestion Heroku application

# Colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== SMB Gestion Heroku Deployment Script ===${NC}"
echo -e "${YELLOW}This script will deploy your application to Heroku${NC}"

# Step 1: Make sure all changes are committed
echo -e "\n${GREEN}Step 1: Checking for uncommitted changes...${NC}"
git status

read -p "Do you want to commit any pending changes? (y/n): " commit_changes
if [ "$commit_changes" = "y" ]; then
  read -p "Enter commit message: " commit_message
  git add .
  git commit -m "$commit_message"
  echo -e "${GREEN}Changes committed successfully!${NC}"
fi

# Step 2: Deploy to Heroku using git subtree
echo -e "\n${GREEN}Step 2: Deploying to Heroku...${NC}"
echo -e "${YELLOW}Using git subtree to deploy the 'smb' subdirectory${NC}"

# Make sure we're in the root directory
cd "$(dirname "$0")"

# Deploy using git subtree
git subtree push --prefix smb heroku master

# Step 3: Check the logs
echo -e "\n${GREEN}Step 3: Checking application logs...${NC}"
echo -e "${YELLOW}Press Ctrl+C to exit log view when done${NC}"
heroku logs --tail -a smb-gestion

echo -e "\n${GREEN}Deployment complete!${NC}"
echo -e "Your application is now available at: ${YELLOW}https://smb-gestion-117c7c904c44.herokuapp.com/${NC}" 



#// heroku login
#// git subtree push --prefix smb heroku master
# heroku config:set NOMBRE_VARIABLE=valor
# git push heroku `git subtree split --prefix=smb master`:master --force