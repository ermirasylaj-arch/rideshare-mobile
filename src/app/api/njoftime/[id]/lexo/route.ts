import { profiliIm } from "@/lib/lejet";
import { shenoNjoftiminSiTeLexuar } from "@/lib/njoftime";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  if (!/^[1-9]\d*$/.test(id)) {
    return Response.json({ error: "ID e njoftimit nuk është e vlefshme." }, { status: 400 });
  }

  try {
    const profile = await profiliIm();
    if (!profile) {
      return Response.json({ error: "Hyr në llogari për të lexuar njoftimin." }, { status: 401 });
    }

    const result = await shenoNjoftiminSiTeLexuar(id, profile.id);
    if (!result) {
      return Response.json({ error: "Njoftimi nuk i përket këtij përdoruesi." }, { status: 403 });
    }

    return Response.json({ read: true, ...result });
  } catch (error) {
    console.error("Nuk u shënua njoftimi si i lexuar.", error);
    return Response.json({ error: "Leximi nuk mund të ruhet tani." }, { status: 503 });
  }
}
