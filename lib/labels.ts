export const EVENT_LABELS: Record<string, string> = {
  page_view: "Visualização de página",
  project_view: "Visualização de projeto",
  service_view: "Clique em serviço",
  video_play: "Reprodução de vídeo",
  before_after_interaction: "Interação antes/depois",
  whatsapp_click: "Clique no WhatsApp",
  budget_click: "Solicitação de orçamento",
  contact_click: "Clique em contato",
};

export const DEVICE_LABELS: Record<string, string> = {
  mobile: "Celular",
  desktop: "Computador",
  tablet: "Tablet",
};

export function labelEvent(event: string): string {
  return EVENT_LABELS[event] || event;
}

export function labelDevice(device: string): string {
  return DEVICE_LABELS[device] || device;
}
