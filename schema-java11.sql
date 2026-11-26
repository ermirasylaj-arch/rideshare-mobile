-- Run after schema-java10.sql in the intended test database.
-- Persists one personal notification for each accepted ride request.
CREATE TABLE IF NOT EXISTS njoftimet (
  id BIGSERIAL PRIMARY KEY,
  kerkesa_id BIGINT NOT NULL UNIQUE
    REFERENCES kerkesat(id) ON DELETE CASCADE,
  marresi_id TEXT NOT NULL
    REFERENCES profilet(github_id) ON DELETE CASCADE,
  lloji TEXT NOT NULL
    CHECK (lloji IN ('u_pranuar')),
  mesazhi TEXT NOT NULL,
  krijuar_me TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  lexuar_me TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS njoftimet_marresi_lexuar_idx
  ON njoftimet (marresi_id, lexuar_me, krijuar_me);
