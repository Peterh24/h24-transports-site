import { OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { PARTNER_OG_ALT, renderPartnerOg } from "./og-card";

export const alt = PARTNER_OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function TwitterImage() {
  return renderPartnerOg();
}
