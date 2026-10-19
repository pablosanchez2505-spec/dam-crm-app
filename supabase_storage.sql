-- ============================================================
-- Storage: bucket de imágenes + políticas
-- Ejecutar en SQL Editor de Supabase
-- ============================================================

-- 1. Crear bucket público (las URLs públicas funcionan sin firmar)
INSERT INTO storage.buckets (id, name, public)
VALUES ('imagenes', 'imagenes', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Listar objetos: solo usuarios autenticados
--    (getPublicUrl no necesita política, pero .list() sí la necesita sobre storage.objects)
CREATE POLICY "Listar imagenes autenticados" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'imagenes');

-- 3. (Opcional) Subida solo para administradores
CREATE POLICY "Subir imagenes solo admins" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'imagenes'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- Usuario admin de prueba
-- 1) Crea el usuario en Authentication > Users (email + password)
-- 2) Inserta su perfil con rol admin (sustituye el UUID):
-- ============================================================
-- INSERT INTO public.profiles (id, role)
-- VALUES ('UUID-DEL-USUARIO', 'admin')
-- ON CONFLICT (id) DO UPDATE SET role = 'admin';
--
-- Para un usuario normal, inserta con role 'user'.
-- Sin fila en profiles, userRole queda null y la UI oculta el CRUD.
