# NestJS + Google OAuth2

Backend de registro y login con Google OAuth2, que genera un JWT propio.
Stack: NestJS, Passport, Prisma 6 y MySQL.

## Requisitos
- Node.js v18 o superior
- MySQL en ejecución
- Credenciales de Google (Client ID y Client Secret) con la redirect URL
  `http://localhost:3000/auth/google/redirect`

## Instalación
```bash
git clone <URL_DEL_REPOSITORIO>
cd nestjs-google-oauth
npm install
```

## Configuración
1. Crear una base de datos en MySQL: `CREATE DATABASE nestjs_google_oauth;`
2. Copiar `.env.example` a `.env` y completar los valores.
3. Crear las tablas:
```bash
npx prisma migrate dev
```

## Ejecución
```bash
npm run start:dev
```
Abrir `http://localhost:3000/auth/google` en el navegador. Después del login
con Google, la respuesta es un JSON con el token JWT.

## Endpoints
- `GET /auth/google`: redirige al login de Google.
- `GET /auth/google/redirect`: callback de Google; devuelve `{ "token": "..." }`.
