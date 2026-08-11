"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { labelDevice, labelEvent } from "@/lib/labels";

type MetricsResponse = {
  summary: {
    visitors: number;
    pageViews: number;
    projectViews: number;
    videoPlays: number;
    beforeAfterInteractions: number;
    serviceClicks: number;
    whatsappClicks: number;
    budgetRequests: number;
    contactClicks: number;
    conversions: number;
    conversionRate: number;
  };
  origins: { name: string; count: number }[];
  campaigns: { name: string; count: number }[];
  recent: {
    id: string;
    event: string;
    page: string;
    projectId: string | null;
    serviceId: string | null;
    origin: string | null;
    campaign: string | null;
    device: string;
    timestamp: string;
  }[];
};

function MetricsDashboard() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [data, setData] = useState<MetricsResponse | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [loading, setLoading] = useState(Boolean(token));

  const missingTokenError = token
    ? null
    : "Informe o token na URL: /admin/metrics?token=...";

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    async function load() {
      setLoading(true);
      setFetchError(null);
      try {
        const res = await fetch(`/api/metrics?token=${encodeURIComponent(token)}`);
        if (cancelled) return;
        if (!res.ok) {
          setFetchError(res.status === 401 ? "Token inválido" : "Falha ao carregar métricas");
          setData(null);
          return;
        }
        const json = (await res.json()) as MetricsResponse;
        setData(json);
      } catch {
        if (!cancelled) setFetchError("Erro de rede ao carregar métricas");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const error = missingTokenError || fetchError;

  const cards = useMemo(() => {
    if (!data) return [];
    const s = data.summary;
    return [
      { label: "Visitantes", value: s.visitors },
      { label: "Visualizações de página", value: s.pageViews },
      { label: "Projetos visualizados", value: s.projectViews },
      { label: "Vídeos reproduzidos", value: s.videoPlays },
      { label: "Interações antes/depois", value: s.beforeAfterInteractions },
      { label: "Cliques em serviços", value: s.serviceClicks },
      { label: "Cliques no WhatsApp", value: s.whatsappClicks },
      { label: "Solicitações de orçamento", value: s.budgetRequests },
      { label: "Taxa de conversão", value: `${s.conversionRate}%` },
    ];
  }, [data]);

  if (missingTokenError) {
    return (
      <div className="mx-auto max-w-3xl p-8">
        <h1 className="font-display text-3xl">Métricas comerciais</h1>
        <p className="mt-4 text-sm text-red-700">{missingTokenError}</p>
      </div>
    );
  }

  if (loading) {
    return <p className="p-8 text-sm text-[var(--muted)]">Carregando métricas…</p>;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl p-8">
        <h1 className="font-display text-3xl">Métricas comerciais</h1>
        <p className="mt-4 text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-4xl text-[var(--ink)]">Métricas comerciais</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Funil de aquisição · conversões e origem das oportunidades
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="border border-[var(--ink)]/10 bg-[var(--surface)] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">{card.label}</p>
            <p className="mt-3 font-display text-3xl text-[var(--ink)]">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl">Origem dos contatos</h2>
          <ul className="mt-4 space-y-2">
            {data.origins.length === 0 ? (
              <li className="text-sm text-[var(--muted)]">Ainda sem conversões.</li>
            ) : (
              data.origins.map((o) => (
                <li
                  key={o.name}
                  className="flex justify-between border-b border-[var(--ink)]/10 py-2 text-sm"
                >
                  <span>{o.name}</span>
                  <span className="font-semibold">{o.count}</span>
                </li>
              ))
            )}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl">Campanhas</h2>
          <ul className="mt-4 space-y-2">
            {data.campaigns.length === 0 ? (
              <li className="text-sm text-[var(--muted)]">Nenhuma campanha atribuída.</li>
            ) : (
              data.campaigns.map((c) => (
                <li
                  key={c.name}
                  className="flex justify-between border-b border-[var(--ink)]/10 py-2 text-sm"
                >
                  <span>{c.name}</span>
                  <span className="font-semibold">{c.count}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-2xl">Eventos recentes</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-[var(--muted)]">
              <tr>
                <th className="py-2 pr-4">Evento</th>
                <th className="py-2 pr-4">Origem</th>
                <th className="py-2 pr-4">Campanha</th>
                <th className="py-2 pr-4">Dispositivo</th>
                <th className="py-2">Quando</th>
              </tr>
            </thead>
            <tbody>
              {data.recent.map((row) => (
                <tr key={row.id} className="border-t border-[var(--ink)]/10">
                  <td className="py-2 pr-4 font-medium">{labelEvent(row.event)}</td>
                  <td className="py-2 pr-4">{row.origin || "—"}</td>
                  <td className="py-2 pr-4">{row.campaign || "—"}</td>
                  <td className="py-2 pr-4">{labelDevice(row.device)}</td>
                  <td className="py-2">{new Date(row.timestamp).toLocaleString("pt-BR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function AdminMetricsPage() {
  return (
    <Suspense fallback={<p className="p-8 text-sm text-[var(--muted)]">Carregando…</p>}>
      <MetricsDashboard />
    </Suspense>
  );
}
