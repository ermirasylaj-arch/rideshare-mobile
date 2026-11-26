import { profiliIm } from "@/lib/lejet";
import { krijoKerkesen } from "@/lib/kerkesat";

export const dynamic = "force-dynamic";
const paCache = { "Cache-Control": "no-store" };

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  if (!/^[1-9]\d*$/.test(id)) {
    return Response.json({ error: "ID e udhëtimit nuk është e vlefshme." }, { status: 400, headers: paCache });
  }

  try {
    const profile = await profiliIm();
    if (!profile) {
      return Response.json({ error: "Hyr në llogari për të kërkuar një vend." }, { status: 401, headers: paCache });
    }
    if (profile.roli !== "udhetar") {
      return Response.json({ error: "Vetëm udhëtari mund të krijojë kërkesë." }, { status: 403, headers: paCache });
    }

    const result = await krijoKerkesen(id, profile.id);
    if (result === "pa_vende") {
      return Response.json({ error: "Udhëtimi nuk ka vende të lira." }, { status: 409, headers: paCache });
    }
    if (result === "ndaluar") {
      return Response.json({ error: "Kërkesa nuk u krijua." }, { status: 403, headers: paCache });
    }

    return Response.json({ created: result === "ruajtur", existing: result === "ekziston" }, { headers: paCache });
  } catch (error) {
    console.error("Nuk u krijua kërkesa e udhëtimit.", error);
    return Response.json({ error: "Kërkesa nuk mund të ruhet tani." }, { status: 503, headers: paCache });
  }
}
