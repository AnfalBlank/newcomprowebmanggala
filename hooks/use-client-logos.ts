"use client";

import { useEffect, useState } from "react";
import { DEFAULT_CLIENTS, type ClientLogo } from "@/lib/clients-default";

/**
 * Logo klien dari Admin > Klien. Mulai dengan daftar bawaan supaya tidak kosong saat memuat,
 * dan tetap pakai daftar bawaan kalau API gagal atau tabel belum dipasang.
 */
export function useClientLogos(): ClientLogo[] {
  const [logos, setLogos] = useState<ClientLogo[]>(DEFAULT_CLIENTS);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/clients")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data || !Array.isArray(data.clients)) return;
        setLogos(data.clients);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return logos;
}
