export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

export type TimelineEvent = {
  label: string;
  status: OrderStatus;
  at: string; // ISO
};

// Creates a realistic but deterministic timeline based on createdAt.
export function getOrderTimeline(createdAtIso: string, currentStatus: OrderStatus): TimelineEvent[] {
  const createdAt = new Date(createdAtIso);
  const t0 = createdAt.getTime();

  const receivedAt = new Date(t0 + 1 * 60 * 1000);
  const processingAt = new Date(t0 + 7 * 60 * 1000);
  const completedAt = new Date(t0 + 42 * 60 * 1000);

  const base: TimelineEvent[] = [
    { label: "Recibido", status: "pending", at: receivedAt.toISOString() },
    { label: "Procesando", status: "processing", at: processingAt.toISOString() },
    { label: "Completado", status: "completed", at: completedAt.toISOString() },
  ];

  if (currentStatus === "cancelled") {
    return [
      { label: "Recibido", status: "pending", at: receivedAt.toISOString() },
      { label: "Cancelado", status: "cancelled", at: new Date(t0 + 10 * 60 * 1000).toISOString() },
    ];
  }

  if (currentStatus === "pending") return base.slice(0, 1);
  if (currentStatus === "processing") return base.slice(0, 2);
  return base;
}
