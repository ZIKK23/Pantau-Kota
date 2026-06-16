import { NextRequest, NextResponse } from "next/server";
import { getCurrentSession } from '@/lib/auth';
import { cekDuplikasiLaporan } from '@/lib/geo';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const session = await getCurrentSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { latitude, longitude, kategoriId } = body;

    if (!latitude || !longitude || !kategoriId) {
      return NextResponse.json(
        { error: "latitude, longitude, dan kategoriId wajib diisi" },
        { status: 400 }
      );
    }

    const hasil = await cekDuplikasiLaporan(latitude, longitude, kategoriId);
    return NextResponse.json(hasil);
  } catch (error) {
    console.error("[API /laporan/cek-duplikasi]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
