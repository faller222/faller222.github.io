# Deployment Guide for SMB Gestion

This document provides instructions on how to deploy the SMB Gestion application to Heroku.

## Prerequisites

- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed
- Git installed
- Node.js and npm installed

## Deployment Steps

### 1. Using the Deployment Script

The easiest way to deploy is to use the provided deployment script:

```bash
# From the root directory of the repository
./deploy.sh
```

This script will:
1. Check for uncommitted changes and allow you to commit them
2. Deploy the application to Heroku using git subtree
3. Show you the application logs

### 2. Manual Deployment

If you prefer to deploy manually, follow these steps:

#### 2.1. Commit your changes

```bash
git add .
git commit -m "Your commit message"
```

#### 2.2. Deploy to Heroku

Since the Node.js application is in the `smb` subdirectory, you need to use git subtree:

```bash
git subtree push --prefix smb heroku master
```

#### 2.3. Check the logs

```bash
heroku logs --tail -a smb-gestion
```

## Environment Variables

The application uses the following environment variables:

- `PORT`: Automatically set by Heroku
- `DATABASE_URL`: Automatically set by Heroku PostgreSQL addon
- `JWT_SECRET`: For JWT token generation and verification

## Database Initialization

To initialize the database on Heroku:

```bash
heroku run node scripts/init-db.js -a smb-gestion
```

## Troubleshooting

### Database Connection Issues

If you encounter database connection issues, check:

1. The SSL configuration in `config/database.js`
2. The database credentials in Heroku config vars

```bash
heroku config -a smb-gestion
```

### Application Crashes

Check the logs for error messages:

```bash
heroku logs -a smb-gestion
```

## Useful Heroku Commands

- View application logs: `heroku logs --tail -a smb-gestion`
- Open the application: `heroku open -a smb-gestion`
- Run a command on Heroku: `heroku run <command> -a smb-gestion`
- View environment variables: `heroku config -a smb-gestion`
- Set an environment variable: `heroku config:set KEY=VALUE -a smb-gestion` 