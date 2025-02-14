# Authentication Toolkit (Next.js + Auth.js)

The Integrated Authentication System is designed to mimic in-house authentication mechanisms, providing comprehensive support for credentials authentication, OAuth authentication, email verification, password reset magic links, and two-factor authentication (2FA). This project offers a step-by-step guide on creating and deploying a fully functional authentication system for any application without relying on external providers.

## Acknowledgements

[Code With Antonio](https://www.codewithantonio.com/projects/auth-masterclass)

## Tech Stack

**Client:** NextJs | TypeScript | TailwindCss | ShadCn UI Component

**Server:** NextJs (Server Actions) | Built-in API Structure | Prism (ORM)

## Auth.js

![Logo](https://repository-images.githubusercontent.com/119162419/3e7988a9-4746-4688-a380-738608be0530)

Auth.js is a runtime agnostic library based on standard Web APIs that integrates deeply with multiple modern JavaScript frameworks to provide an authentication experience that’s simple to get started with, easy to extend, and always private and secure!

**Version Used (in this project)** : [next-auth@5.0.0-beta](https://authjs.dev/getting-started/migrating-to-v5)

## Resend

![Logo](https://miro.medium.com/v2/resize:fit:1400/1*naoBQnoo5FhIoA68lUrKBg.jpeg)

The best way to reach humans instead of spam folders. Deliver transactional and marketing emails at scale.

[Resend-Docs](https://resend.com/docs/introduction)

## Lessons Learned

What did you learn while building this project? What challenges did you face and how did you overcome them?

**Edge Function**

Typical Edge Function Definition :
**Edge functions** typically don't use the standard Node.js runtime. For example, Vercel Edge Functions and Cloudflare Workers are running code in V8 isolates. Deno Deploy is using the Deno JavaScript runtime. As a consequence, these edge functions only have access to a small subset of the standard Node.js APIs and also have constrained computing resources (CPU and memory).

In particular, the constraint of not being able to freely open TCP connections makes it difficult to talk to a traditional database from an edge function. While Cloudflare has introduced a connect() API that enables limited TCP connections, this still only enables database access using specific database drivers that are compatible with that API.

_In this phase, I encountered my initial challenge: improper integration of the Edge function, resulting in significant issues with the OAuth Authentication feature. However, the credentials provider remains fully functional. Resolving this issue is a priority_

**Made changes in @/lib/db.ts file**

```typescript
import { PrismaClient } from "@prisma/client";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";

const prismaClientSingleton = () => {
  const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL });
  const adapter = new PrismaNeon(neon);
  return new PrismaClient({ adapter });
};

declare global {
  var prisma: ReturnType<typeof prismaClientSingleton> | undefined;
}

export const db = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
```

**Magic of Middleware**

_middleware.ts_ file is in root folder of the project. This file is responsible for separating protected route from publicly accessible route and also define behavior of routing on the basis of authentication and sessions. _routes.ts_ file in root folder also specifies the different routes present in the project.

```typescript
/middleware.ts

import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isAuthenticated) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isAuthenticated && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

## If you want to run project locally

Clone the project

```bash
  git clone https://github.com/Divyajyoti1820/authentication-toolkit.git
```

Go to the project directory

```bash
  cd authentication-toolkit
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Auth.js Secret Key:

`AUTH_SECRET`

Database Secret Key (According to Database Provider):

`POSTGRES_URL`
`POSTGRES_PRISMA_URL`
`POSTGRES_URL_NO_SSL`
`POSTGRES_URL_NON_POOLING`
`POSTGRES_USER`
`POSTGRES_HOST`
`POSTGRES_PASSWORD`
`POSTGRES_DATABASE`

OAuth Key (According to OAuth Provider):

`AUTH_GITHUB_ID`
`AUTH_GITHUB_SECRET`
`AUTH_GOOGLE_ID`
`AUTH_GOOGLE_SECRET`

Resend API Key (Mail Service Provider):

`RESEND_API_KEY`

Public App URL (Changes in Production & Development Phase):

`NEXT_PUBLIC_APP_URL`

## Glimpse of Project

![HomePage](/public/screenshots/screenshot_1.PNG)

![Registration](/public/screenshots/screenshot_2.PNG)

![Login](/public/screenshots/screenshot_3.PNG)

![Settings Page](/public/screenshots/screenshot_4.PNG)

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Author

[@Divyajyoti](https://github.com/Divyajyoti1820)
