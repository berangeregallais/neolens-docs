---
slug: authentication
title: Authentication
description: 'Secure your Neolens API requests with API key authentication, role-based access control, and best practices for key management.'
---

All requests to the **Neolens API** require authentication via an API key. This ensures secure access and usage tracking of the service.

## 🔑 Obtaining an API Key

To authenticate, you must include your personal API key in the request header.
Your API key is available from your Neolens Developer Dashboard once your account is created and verified.

Example format of an API key:

``` nginx
neolens_live_abcd1234efgh5678ijkl9012
```

> ⚠️ Important: Keep your API key secret. Never expose it in public repositories, client-side code, or unsecured environments.

---

## 🔍 Header-Based Authentication

Include your API key in the `Authorization` header of every request using the Bearer token scheme:

```http
GET /v1/scan/results
Host: api.neolens.ai
Authorization: Bearer neolens_live_abcd1234efgh5678ijkl9012
```

---

## 🔁 Key Rotation

You can rotate your API keys at any time from the dashboard.
Old keys will remain valid for 24 hours after regeneration to allow a safe transition.

---

## 🚫 Handling Invalid or Missing Keys

If an API request is made without a valid key, the server will return a `401 Unauthorized` error:

```json
{
  "error": "Unauthorized",
  "message": "Missing or invalid API key."
}
```

Make sure to:

- Verify your key is active and correctly formatted.
- Confirm it is included in the `Authorization` header.
- Check that your user account is in good standing.

---

## 🔐 Role-Based Access & Scopes

The Neolens API supports **role-based access control (RBAC)** to ensure users and systems can only access data and functionality appropriate to their role.
Each API key is associated with a **role** and a set of **scopes** that define what endpoints can be accessed and what operations are allowed.

### 🔸 Available Roles & Scopes

| Role            | Description                                                                | Example Scopes                |
| --------------- | -------------------------------------------------------------------------- | ----------------------------- |
| `radiologist`   | Clinical user with access to patient scan analysis and diagnostic reports. | `read:scans`, `read:reports`  |
| `data_engineer` | User managing integrations and exports.                                    | `read:scans`, `write:exports` |
| `admin`         | Full access to API and user management.                                    | `*` (full access)             |

You can retrieve your scopes using the `/v1/auth/me` endpoint, which returns information about the authenticated user and their permissions.

```http
GET /v1/auth/me
Authorization: Bearer neolens_live_abcd1234efgh5678ijkl9012
```

Example response:

```json
{
  "user": {
    "id": "usr_001",
    "email": "radiologist@example.com",
    "role": "radiologist",
    "scopes": ["read:scans", "read:reports"]
  }
}
```

> Note: If you attempt to access an endpoint outside of your scope, the API will return a `403 Forbidden` response.

#### 🚫 Example: Access Denied for Insufficient Permissions

Suppose a user with the role `radiologist` (scopes: `read:scans`, `read:reports`) attempts to perform a write operation on scan data, which requires the `write:scans` scope.

**Request example (attempt to update scan data):**

```http
POST /v1/scans/12345
Authorization: Bearer neolens_live_abcd1234efgh5678ijkl9012
Content-Type: application/json

{
  "status": "reviewed"
}
```

**API response:**

```json
{
  "error": "Forbidden",
  "message": "You do not have permission to perform this action."
}
```

Status code: `403 Forbidden`
