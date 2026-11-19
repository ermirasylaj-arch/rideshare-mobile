import { profiliIm } from "@/lib/lejet";
import { lexoKerkesatPerShoferin, pranoKerkesen } from "@/lib/kerkesat";

export const dynamic = "force-dynamic";

const paCache = { "Cache-Control": "no-store" };

function kaOrigjineTeNjejte(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;

  try {
    return new URL(origin).host.toLowerCase() === host.split(",")[0].trim().toLowerCase();
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    const profile = await profiliIm();
    if (!profile) {
      return Response.json({ error: "Hyr në llogari për të parë kërkesat." }, {
        status: 401,
        headers: paCache,
      });
    }
    if (profile.roli !== "shofer") {
      return Response.json({ error: "Vetëm shoferi mund t’i shohë këto kërkesa." }, {
        status: 403,
        headers: paCache,
      });
    }

    const requests = await lexoKerkesatPerShoferin(profile.id);
    return Response.json({ requests }, { headers: paCache });
  } catch (error) {
    console.error("Nuk u lexuan kërkesat e shoferit.", error);
    return Response.json({ error: "Kërkesat nuk mund të lexohen tani." }, {
      status: 503,
      headers: paCache,
    });
  }
}

export async function POST(request: Request) {
  if (!kaOrigjineTeNjejte(request)) {
    return Response.json({ error: "Kërkesa u refuzua." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Dërgo një ID të vlefshme kërkese." }, { status: 400 });
  }

  if (
    typeof body !== "object"
    || body === null
    || !("requestId" in body)
    || typeof body.requestId !== "string"
    || !/^[1-9]\d*$/.test(body.requestId)
    || body.requestId.length > 19
    || (body.requestId.length === 19 && body.requestId > "9223372036854775807")
  ) {
    return Response.json({ error: "Dërgo një ID të vlefshme kërkese." }, { status: 400 });
  }

  try {
    const profile = await profiliIm();
    if (!profile) {
      return Response.json({ error: "Hyr në llogari për të pranuar kërkesa." }, { status: 401 });
    }
    if (profile.roli !== "shofer") {
      return Response.json({ error: "Vetëm shoferi mund ta pranojë kërkesën." }, { status: 403 });
    }

    const accepted = await pranoKerkesen(body.requestId, profile.id);
    if (!accepted) {
      return Response.json(
        { error: "Kërkesa nuk është më në pritje ose udhëtimi nuk ka vende." },
        { status: 409 },
      );
    }

    return Response.json({ accepted: true });
  } catch (error) {
    console.error("Nuk u pranua kërkesa e udhëtimit.", error);
    return Response.json({ error: "Kërkesa nuk mund të pranohet tani." }, { status: 503 });
  }
}
