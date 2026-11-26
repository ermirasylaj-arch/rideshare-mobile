import "server-only";
import { getSql } from "./db";

export type Njoftimi = {
  id: string;
  kerkesaId: string;
  udhetimId: string;
  lloji: "u_pranuar";
  mesazhi: string;
  krijuarMe: string;
  lexuarMe: string | null;
};

export async function lexoNjoftimetPerPërdoruesin(
  perdoruesId: string,
): Promise<{ notifications: Njoftimi[]; unreadCount: number }> {
  const sql = getSql();
  const rows = await sql`
    SELECT
      n.id::text AS id,
      n.kerkesa_id::text AS "kerkesaId",
      k.udhetim_id AS "udhetimId",
      n.lloji,
      n.mesazhi,
      n.krijuar_me AS "krijuarMe",
      n.lexuar_me AS "lexuarMe"
    FROM njoftimet n
    JOIN kerkesat k ON k.id = n.kerkesa_id
    WHERE n.marresi_id = ${perdoruesId}
    ORDER BY n.krijuar_me DESC, n.id DESC
  `;

  const notifications = rows as Njoftimi[];
  return {
    notifications,
    unreadCount: notifications.filter((notification) => !notification.lexuarMe).length,
  };
}

export async function shenoNjoftiminSiTeLexuar(
  notificationId: string,
  perdoruesId: string,
): Promise<{ kerkesaId: string; udhetimId: string } | null> {
  const sql = getSql();
  const rows = await sql`
    UPDATE njoftimet n
    SET lexuar_me = COALESCE(n.lexuar_me, NOW())
    FROM kerkesat k
    WHERE n.id = ${notificationId}::bigint
      AND n.marresi_id = ${perdoruesId}
      AND k.id = n.kerkesa_id
    RETURNING n.kerkesa_id::text AS "kerkesaId", k.udhetim_id AS "udhetimId"
  `;

  return (rows[0] as { kerkesaId: string; udhetimId: string } | undefined) ?? null;
}
