"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Notification = {
  id: string;
  kerkesaId: string;
  udhetimId: string;
  mesazhi: string;
  krijuarMe: string;
  lexuarMe: string | null;
};

export default function Njoftimet() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unread, setUnread] = useState(0);
  const [connection, setConnection] = useState(true);
  const knownIds = useRef(new Set<string>());
  const initialized = useRef(false);

  useEffect(() => {
    let stopped = false;
    let timer: ReturnType<typeof setTimeout>;

    async function poll() {
      if (!navigator.onLine) {
        setConnection(false);
        timer = setTimeout(() => void poll(), 5000);
        return;
      }
      try {
        const response = await fetch("/api/njoftime", { cache: "no-store" });
        const result = await response.json() as {
          notifications?: Notification[];
          unreadCount?: number;
          error?: string;
        };
        if (!response.ok || !Array.isArray(result.notifications)) {
          throw new Error(result.error);
        }

        if (initialized.current) {
          for (const notification of result.notifications) {
            if (!notification.lexuarMe && !knownIds.current.has(notification.id)) {
              knownIds.current.add(notification.id);
            }
          }
        } else {
          result.notifications.forEach((notification) => knownIds.current.add(notification.id));
          initialized.current = true;
        }
        setNotifications(result.notifications);
        setUnread(result.unreadCount ?? 0);
        setConnection(true);
      } catch {
        setConnection(false);
      }
      timer = setTimeout(() => void poll(), 5000);
    }

    void poll();
    return () => {
      stopped = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  async function openNotification(notification: Notification) {
    const response = await fetch(`/api/njoftime/${notification.id}/lexo`, {
      method: "POST",
      cache: "no-store",
    });
    if (!response.ok) return;
    const result = await response.json() as { udhetimId?: string; kerkesaId?: string };
    if (result.udhetimId && result.kerkesaId) {
      window.location.assign(`/udhetimi/${result.udhetimId}/kerkesa/${result.kerkesaId}`);
    }
  }

  return (
    <section className="notifications" aria-labelledby="notifications-title">
      <div className="notifications__heading">
        <h2 id="notifications-title">Njoftimet</h2>
        <span aria-label={`${unread} njoftime të palexuara`}>🔔 {unread}</span>
      </div>
      {!connection && <p role="status">Nuk ka lidhje. Njoftimet e fundit ruhen në ekran.</p>}
      {notifications.length === 0 ? (
        <p className="notifications__empty">Ende pa njoftime.</p>
      ) : (
        <ul className="notifications__list">
          {notifications.map((notification) => (
            <li className={notification.lexuarMe ? "" : "notifications__unread"} key={notification.id}>
              <strong>N-{notification.kerkesaId}</strong>
              <span>{notification.lexuarMe ? "I lexuar" : "I PALEXUAR"}</span>
              <p>{notification.mesazhi}</p>
              <button type="button" className="button button--small" onClick={() => void openNotification(notification)}>
                Hap kërkesën K-{notification.kerkesaId}
              </button>
            </li>
          ))}
        </ul>
      )}
      <Link href="/panel">Rifresko panelin</Link>
    </section>
  );
}
