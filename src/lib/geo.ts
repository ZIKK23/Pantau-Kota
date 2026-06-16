import { DUPLICATE_RADIUS_METERS, DUPLICATE_DAYS_THRESHOLD } from '@/lib/constants';
import { prisma } from '@/lib/prisma';

/**
 * Hitung jarak antara 2 titik koordinat menggunakan Haversine formula.
 * @returns Jarak dalam kilometer
 */
export function hitungJarakKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius bumi dalam km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Cek apakah ada laporan duplikat di sekitar koordinat tertentu.
 * Menggunakan radius dan threshold waktu dari constants.
 */
export async function cekDuplikasiLaporan(
  latitude: number,
  longitude: number,
  kategoriId: string
) {
  const RADIUS_KM = DUPLICATE_RADIUS_METERS / 1000;

  const batasWaktu = new Date();
  batasWaktu.setDate(batasWaktu.getDate() - DUPLICATE_DAYS_THRESHOLD);

  const laporanExisting = await prisma.laporan.findMany({
    where: {
      kategoriId,
      status: { in: ['MENUNGGU', 'DIPROSES'] },
      createdAt: { gte: batasWaktu },
    },
    select: {
      id: true,
      judul: true,
      status: true,
      latitude: true,
      longitude: true,
      alamat: true,
      createdAt: true,
      user: { select: { name: true } },
    },
  });

  const duplikat = laporanExisting.filter((laporan) => {
    const jarak = hitungJarakKm(latitude, longitude, laporan.latitude, laporan.longitude);
    return jarak <= RADIUS_KM;
  });

  return {
    duplikat: duplikat.length > 0,
    jumlah: duplikat.length,
    laporan: duplikat.map((l) => ({
      id: l.id,
      judul: l.judul,
      status: l.status,
      alamat: l.alamat,
      pelapor: l.user.name,
      tanggal: l.createdAt,
    })),
  };
}
