import { profiliIm } from "@/lib/lejet";
import { lexoNjoftimetPerPërdoruesin } from "@/lib/njoftime";

export const dynamic = "force-dynamic";
const paCache = { "Cache-Control": "no-store" };

export async function GET() {
  try {
    const profile = await profiliIm();
    if (!profile) {
      return Response.json({ error: "Hyr në llogari për të lexuar njoftimet." }, { status: 401, headers: paCache });
    }

    const result = await lexoNjoftimetPerPërdoruesin(profile.id);
    return Response.json(result, { headers: paCache });
  } catch (error) {
    console.error("Nuk u lexuan njoftimet.", error);
    return Response.json({ error: "Njoftimet nuk mund të lexohen tani." }, { status: 503, headers: paCache });
  }
}
