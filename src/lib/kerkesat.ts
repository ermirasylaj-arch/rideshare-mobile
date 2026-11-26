import "server-only";
import { getSql } from "./db";

export type KerkesaShoferit = {
  id: string;
  udhetimId: string;
  nisja: string;
  destinacioni: string;
  ora: string;
  udhetari: string;
  statusi: "ne pritje" | "pranuar";
  vende: number;
};

export type KerkesaIme = {
  id: string;
  udhetimId: string;
  statusi: "ne pritje" | "pranuar";
};

export async function krijoKerkesen(
  udhetimId: string,
  udhetarId: string,
): Promise<"ruajtur" | "pa_vende" | "ekziston" | "ndaluar"> {
  const sql = getSql();
  const rows = await sql`
    WITH udhetimi_i_kycur AS MATERIALIZED (
      SELECT id
      FROM udhetimet
      WHERE id = ${udhetimId} AND vende > 0
      FOR UPDATE
    ),
    kerkesa_e_re AS (
      INSERT INTO kerkesat (udhetim_id, udhetar_id)
      SELECT id, ${udhetarId}
      FROM udhetimi_i_kycur
      ON CONFLICT (udhetim_id, udhetar_id) DO NOTHING
      RETURNING id
    )
    SELECT
      CASE
        WHEN EXISTS (SELECT 1 FROM kerkesa_e_re) THEN 'ruajtur'
        WHEN EXISTS (SELECT 1 FROM udhetimi_i_kycur) THEN 'ekziston'
        ELSE 'pa_vende'
      END AS status
  `;

  return (rows[0]?.status as "ruajtur" | "pa_vende" | "ekziston") ?? "ndaluar";
}

export async function gjejKerkesenIme(
  kerkesaId: string,
  udhetimId: string,
  udhetarId: string,
): Promise<KerkesaIme | null> {
  const sql = getSql();
  const rows = await sql`
    SELECT k.id::text AS id, k.udhetim_id AS "udhetimId", k.statusi
    FROM kerkesat k
    WHERE k.id = ${kerkesaId}
      AND k.udhetim_id = ${udhetimId}
      AND k.udhetar_id = ${udhetarId}
  `;
  return (rows[0] as KerkesaIme | undefined) ?? null;
}

export async function lexoKerkesatPerShoferin(
  shoferId: string,
): Promise<KerkesaShoferit[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT
      k.id::text AS id,
      k.udhetim_id AS "udhetimId",
      u.nisja,
      u.destinacioni,
      u.ora,
      p.emri AS udhetari,
      k.statusi,
      u.vende
    FROM kerkesat k
    JOIN udhetimet u ON u.id = k.udhetim_id
    JOIN profilet p ON p.github_id = k.udhetar_id
    WHERE u.shofer_id = ${shoferId}
    ORDER BY k.krijuar_me, k.id
  `;

  return rows as KerkesaShoferit[];
}

export async function pranoKerkesen(
  kerkesaId: string,
  shoferId: string,
): Promise<boolean> {
  const sql = getSql();
  const rows = await sql`
    WITH kerkesa_dhe_udhetimi AS MATERIALIZED (
      SELECT k.id, k.udhetim_id, k.udhetar_id
      FROM kerkesat k
      JOIN udhetimet u ON u.id = k.udhetim_id
      WHERE k.id = ${kerkesaId}
        AND k.statusi = 'ne pritje'
        AND u.shofer_id = ${shoferId}
        AND u.vende > 0
      FOR UPDATE OF k, u
    ),
    vendi_i_zbritur AS (
      UPDATE udhetimet u
      SET vende = u.vende - 1
      FROM kerkesa_dhe_udhetimi ku
      WHERE u.id = ku.udhetim_id
        AND u.vende > 0
      RETURNING u.id
    ),
    kerkesa_e_pranuar AS (
      UPDATE kerkesat k
      SET statusi = 'pranuar'
      FROM kerkesa_dhe_udhetimi ku, vendi_i_zbritur vz
      WHERE k.id = ku.id
        AND k.statusi = 'ne pritje'
        AND vz.id = ku.udhetim_id
      RETURNING k.id, k.udhetar_id
    ),
    njoftimi_i_re AS (
      INSERT INTO njoftimet (kerkesa_id, marresi_id, lloji, mesazhi)
      SELECT
        kep.id,
        kep.udhetar_id,
        'u_pranuar',
        'Shoferi e pranoi kërkesën për udhëtimin.'
      FROM kerkesa_e_pranuar kep
      ON CONFLICT (kerkesa_id) DO NOTHING
      RETURNING id
    )
    SELECT id FROM kerkesa_e_pranuar
  `;

  return rows.length === 1;
}
