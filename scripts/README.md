# Admin User Creation

To create an admin user for the Land Next project, you can use the provided script.

## Prerequisites

1.  **IP Whitelist**: Ensure your current IP address is whitelisted in your MongoDB Atlas cluster.
    *   Go to MongoDB Atlas -> Network Access -> Add IP Address -> Add Current IP Address.

2.  **Node.js**: Ensure Node.js is installed.

## Usage

Run the following command from the `land-next` directory:

```bash
node scripts/create-admin-direct.js
```

This script will:
*   Connect to your MongoDB database.
*   Check if an admin user with username `admin` exists.
*   If not, create one with username `admin` and password `admin123`.

## Verify

After running the script, you can log in at `/admin/login`.
