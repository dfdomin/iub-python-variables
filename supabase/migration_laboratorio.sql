-- Crear tabla para registros del laboratorio
CREATE TABLE IF NOT EXISTS laboratorio_registros (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  documento_identidad TEXT UNIQUE NOT NULL,
  nombre_completo TEXT NOT NULL,
  nota INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Permitir inserción anónima (estudiantes no necesitan login)
ALTER TABLE laboratorio_registros ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir insert/update anónimo" ON laboratorio_registros
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);
