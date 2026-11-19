-- Run after schema-java05.sql in the intended test database.
-- Adds persisted ride requests for the Java 10 driver workflow.
CREATE TABLE IF NOT EXISTS kerkesat (
  id BIGSERIAL PRIMARY KEY,
  udhetim_id TEXT NOT NULL
    REFERENCES udhetimet(id) ON DELETE CASCADE,
  udhetar_id TEXT NOT NULL
    REFERENCES profilet(github_id) ON DELETE CASCADE,
  statusi TEXT NOT NULL DEFAULT 'ne pritje'
    CHECK (statusi IN ('ne pritje', 'pranuar')),
  krijuar_me TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT kerkesat_udhetari_udhetimi_unike
    UNIQUE (udhetim_id, udhetar_id)
);

CREATE INDEX IF NOT EXISTS kerkesat_udhetim_status_krijuar_idx
  ON kerkesat (udhetim_id, statusi, krijuar_me);
