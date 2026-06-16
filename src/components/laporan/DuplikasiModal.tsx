'use client';

import { X, AlertTriangle, MapPin, Clock, ChevronRight } from 'lucide-react';

interface LaporanDuplikat {
  id: string;
  judul: string;
  status: string;
  alamat?: string;
  pelapor: string;
  tanggal: string;
}

interface DuplikasiModalProps {
  isOpen: boolean;
  laporan: LaporanDuplikat[];
  jumlah: number;
  onClose: () => void;
  onForceSend: () => void;
  loading?: boolean;
}

export default function DuplikasiModal({
  isOpen,
  laporan,
  jumlah,
  onClose,
  onForceSend,
  loading,
}: DuplikasiModalProps) {
  if (!isOpen) return null;

  const statusLabel = (s: string) => {
    if (s === 'MENUNGGU') return { text: 'Menunggu', cls: 'bg-amber-500/15 text-amber-600' };
    if (s === 'DIPROSES') return { text: 'Diproses', cls: 'bg-blue-500/15 text-blue-600' };
    return { text: s, cls: 'bg-surface-container-high text-on-surface' };
  };

  const formatTanggal = (t: string) => {
    return new Date(t).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in duration-200 overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-6 py-5 border-b border-outline-variant/15">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 text-on-surface/60 hover:text-on-surface transition-colors"
          >
            <X className="w-4 h-4" strokeWidth={2.5} />
          </button>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-lg font-display font-semibold text-on-surface">
                Laporan Serupa Terdeteksi
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Ditemukan <strong className="text-on-surface">{jumlah} laporan</strong> serupa di area yang sama
              </p>
            </div>
          </div>
        </div>

        {/* Body — daftar laporan duplikat */}
        <div className="px-6 py-4 max-h-[40vh] overflow-y-auto space-y-3">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">
            Laporan yang sudah ada
          </p>
          {laporan.map((l) => {
            const st = statusLabel(l.status);
            return (
              <a
                key={l.id}
                href={`/laporan/${l.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors border border-transparent hover:border-outline-variant/20"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
                    {l.judul}
                  </p>

                  {l.alamat && (
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 shrink-0" strokeWidth={2} />
                      {l.alamat}
                    </p>
                  )}

                  <div className="flex items-center gap-3 mt-2">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${st.cls}`}>
                      {st.text}
                    </span>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" strokeWidth={2} />
                      {formatTanggal(l.tanggal)}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      oleh {l.pelapor}
                    </span>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors mt-1 shrink-0" />
              </a>
            );
          })}
        </div>

        {/* Footer — actions */}
        <div className="px-6 py-4 border-t border-outline-variant/15 bg-surface-container-low/50 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <p className="text-xs text-muted-foreground flex-1 leading-relaxed">
            Anda bisa membatalkan atau tetap mengirim jika yakin ini bukan duplikat.
          </p>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-surface-container-high hover:bg-surface-container text-on-surface transition-colors"
            >
              Batalkan
            </button>
            <button
              onClick={onForceSend}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-amber-600 hover:bg-amber-700 text-white transition-colors disabled:opacity-60"
            >
              {loading ? 'Mengirim...' : 'Tetap Kirim'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
