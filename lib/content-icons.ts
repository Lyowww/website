import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Bot,
  BrainCircuit,
  ChartNoAxesCombined,
  CircleDollarSign,
  Clock3,
  CloudCog,
  Code2,
  Gauge,
  Globe2,
  Layers3,
  LifeBuoy,
  Mail,
  Megaphone,
  MessageCircle,
  Milestone,
  MousePointer2,
  Network,
  Rocket,
  Search,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
  Zap
} from "lucide-react";

/** Allowed icon keys for JSON copy files — content writers pick from this list only for `icon` fields. */
export const ICON_KEYS = [
  "activity",
  "bot",
  "brainCircuit",
  "chartNoAxesCombined",
  "circleDollarSign",
  "clock3",
  "cloudCog",
  "code2",
  "gauge",
  "globe2",
  "layers3",
  "lifeBuoy",
  "mail",
  "megaphone",
  "messageCircle",
  "milestone",
  "mousePointer2",
  "network",
  "rocket",
  "search",
  "serverCog",
  "shieldCheck",
  "smartphone",
  "sparkles",
  "workflow",
  "zap"
] as const;

export type IconKey = (typeof ICON_KEYS)[number];

const icons = {
  activity: Activity,
  bot: Bot,
  brainCircuit: BrainCircuit,
  chartNoAxesCombined: ChartNoAxesCombined,
  circleDollarSign: CircleDollarSign,
  clock3: Clock3,
  cloudCog: CloudCog,
  code2: Code2,
  gauge: Gauge,
  globe2: Globe2,
  layers3: Layers3,
  lifeBuoy: LifeBuoy,
  mail: Mail,
  megaphone: Megaphone,
  messageCircle: MessageCircle,
  milestone: Milestone,
  mousePointer2: MousePointer2,
  network: Network,
  rocket: Rocket,
  search: Search,
  serverCog: ServerCog,
  shieldCheck: ShieldCheck,
  smartphone: Smartphone,
  sparkles: Sparkles,
  workflow: Workflow,
  zap: Zap
} satisfies Record<IconKey, LucideIcon>;

export function resolveIcon(key: string): LucideIcon {
  if (key in icons) {
    return icons[key as IconKey];
  }
  console.warn(`[site-content] Unknown icon key "${key}", using sparkles.`);
  return Sparkles;
}
