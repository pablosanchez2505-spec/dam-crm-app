# DAM CRM App (Ionic + Angular Standalone + Supabase)

CRUD de clientes con roles (admin / user), login obligatorio y galería de imágenes desde Supabase Storage.

## 1. Backend (Supabase)

1. Ejecuta el script SQL del laboratorio (tablas `profiles`, `clients` + RLS).
2. Ejecuta `supabase_storage.sql` (bucket `imagenes` + políticas).
3. En **Authentication > Users** crea un usuario (email + contraseña).
4. Inserta su rol en `profiles`:
   ```sql
   INSERT INTO public.profiles (id, role) VALUES ('UUID-DEL-USUARIO', 'admin');
   ```
5. Sube algunas imágenes al bucket `imagenes` desde **Storage**.

## 2. Configuración local

```bash
npm install
```

Edita `src/environments/environment.ts` y `environment.prod.ts` con tu `supabaseUrl` y `supabaseKey` (anon key).

```bash
ionic serve
```

## 3. Rutas

| Ruta       | Descripción                               | Protegida |
|------------|-------------------------------------------|-----------|
| `/login`   | Acceso con email y contraseña             | No        |
| `/home`    | Listado y CRUD de clientes (admin edita)  | Sí        |
| `/gallery` | Cards con las imágenes del bucket         | Sí        |

## 4. Subir a GitHub

```bash
git init
git add .
git commit -m "DAM CRM: login, CRUD con roles y galería"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/dam-crm-app.git
git push -u origin main
```

> La anon key de Supabase es pública por diseño; la seguridad la aporta RLS.
> No subas nunca la `service_role` key.

## 5. Desplegar en Vercel

1. Entra en https://vercel.com y pulsa **Add New > Project**, importa el repositorio.
2. Ajustes de build:
   - Framework: **Angular** (o Other)
   - Build command: `npm run build`
   - Output directory: `www`
3. `vercel.json` ya incluye el rewrite para que funcionen las rutas SPA.
4. Pulsa **Deploy** y copia la URL resultante.

## 6. Entrega (PDF)

- 2 páginas con capturas: login, listado con rol admin, galería de cards.
- Código relevante.
- Enlace a GitHub y enlace a Vercel.
