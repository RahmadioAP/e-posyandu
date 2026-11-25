import { useState } from 'react'
import { Img, Btn, Badge } from './ui.jsx'
import { PemeriksaanModal } from './forms.jsx'

const tren = [['Mei', 88], ['Juni', 90], ['Juli', 91], ['Agt', 95], ['Sep', 92], ['Okt', 94]]
const gizi = [['82', 'Sehat', 'green'], ['12', 'Perlu Pantau', 'orange'], ['04', 'Perlu Tindakan', 'red']]
const bb = [['Juli 2024', 78], ['Agustus 2024', 82], ['September 2024', 84], ['Oktober 2024', 86]]
const langkah = [
  ['Buka Data Peserta', 'Cari nama anak atau ibu Hamil berdasarkan NIK atau nama panggilan untuk verifikasi kehadiran.'],
  ['Klik Catat Pemeriksaan', 'Masukkan angka hasil timbangan (kg), panjang/tinggi (cm),dan data lainnya yang ada pada form'],
  ['Unduh & Simpan Laporan', 'Setelah jam buka selesai pukul 12:00, unduh ringkasan PDF untuk arsip RT dan laporan Puskesmas.'],
]

function Kehadiran({ judul, hadir, total, unit, icon, tone, note }) {
  return (
    <div className="kcard hadir">
      <div className="hadir-top">
        <div><p className="eyebrow">Pemeriksaan Bulan Oktober</p><h3>{judul}</h3></div>
        <span className={'stat-ico ' + tone}><Img name={icon} /></span>
      </div>
      <p className={'hadir-num ' + tone}><b>{hadir}</b> dari {total} {unit}</p>
      <div className="bar"><span className={tone} style={{ width: `${(hadir / total) * 100}%` }} /></div>
      <p className={'hadir-note ' + tone}><Img name={tone === 'green' ? 'check-green' : 'info'} />{note}</p>
    </div>
  )
}

export default function Beranda() {
  const [catat, setCatat] = useState(false)
  const pct = 83.7
  return (
    <div className="kpage">
      <div className="greet">
        <Badge tone="blue">KADER</Badge>
        <h1>Selamat Pagi, Ibu Siti Rahmawati</h1>
      </div>

      <section className="kcard banner">
        <span className="banner-ico"><Img name="megaphone" /></span>
        <div>
          <h2>Jadwal Pelayanan Posyandu Hari Ini</h2>
          <p>Pelayanan Posyandu Balita dimulai pukul <b>08:30 – 11.30 WIB</b>. Mohon pastikan alat timbang digital dan stadiometer telah dikalibrasi.</p>
        </div>
      </section>

      <section className="beranda-status">
        <div className="hadir-stack">
          <Kehadiran judul="Kehadiran Balita" hadir={28} total={35} unit="Anak" icon="baby-face" tone="blue" note={<><b>7 Balita</b> belum hadir dalam kegiatan</>} />
          <Kehadiran judul="Kehadiran Ibu Hamil" hadir={6} total={6} unit="Ibu hamil" icon="pregnant-green" tone="green" note={<>Semua ibu <b>hadir</b> dalam kegiatan</>} />
        </div>
        <div className="catat-card">
          <span className="catat-ico"><Img name="scale-white" /></span>
          <h2>CATAT TIMBANGAN BARU</h2>
          <p>Catat berat badan, tinggi badan, dan vitamin balita maupun ibu hamil secara cepat.</p>
          <Btn icon="plus" onClick={() => setCatat(true)}>Mulai Timbang</Btn>
        </div>
      </section>

      <section className="beranda-charts">
        <div className="kcard chart-card">
          <div className="chart-head">
            <h2>Tren Kehadiran &amp; Penimbangan Balita</h2>
            <div className="legend-box"><span><i className="sw blue" />Realisasi (Anak)</span><span><i className="sw dash" />Target (98)</span></div>
          </div>
          <div className="vbar" role="img" aria-label="Grafik batang kehadiran balita Mei sampai Oktober">
            <div className="vbar-y">{[100, 75, 50, 25].map((v) => <span key={v} style={{ bottom: `${v}%` }}>{v}</span>)}</div>
            <div className="vbar-target" style={{ bottom: '98%' }}><em>Sasaran: 98</em></div>
            {tren.map(([m, v]) => (
              <div key={m} className="vbar-col">
                <div className={'vbar-bar' + (v === 95 ? ' best' : '')} style={{ height: `${v}%` }}><b>{v}{v === 95 && ' ★'}</b></div>
                <span>{m}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-side">
          <div className="kcard chart-card">
            <h2>Status Gizi Ibu Hamil</h2>
            <div className="donut" style={{ '--p': pct }}><b>{pct}%</b></div>
            <div className="gizi-grid">{gizi.map(([n, l, t]) => <div key={l} className={'gizi ' + t}><b>{n}</b><span>{l}</span></div>)}</div>
          </div>
          <div className="kcard chart-card">
            <h2>Tren Berat Badan Balita</h2>
            <div className="legend-row"><span><i className="dot green" />Naik (N)</span><span><i className="dot orange" />Tetap/Turun (T)</span></div>
            {bb.map(([m, v]) => (
              <div key={m} className="hbar"><span>{m}</span><div><i style={{ width: `${v}%` }} /></div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="help-wrap">
        <div className="help-card">
          <h2><Img name="bulb" /> Petunjuk Cepat Kader</h2>
          <p>Panduan 3 langkah mudah untuk melayani warga di meja posyandu:</p>
          <ol className="steps">
            {langkah.map(([t, d], i) => <li key={t}><span>{i + 1}</span><div><b>{t}</b><small>{d}</small></div></li>)}
          </ol>
        </div>
        <div className="help-card ask">
          <span className="ask-ico"><Img name="smile" /></span>
          <div><p className="eyebrow">Bantuan Kader</p><h2>Ada Kendala Input atau Bingung Masalah KMS?</h2></div>
          <Btn kind="green" icon="phone">Tanya Bidan</Btn>
        </div>
      </section>

      {catat && <PemeriksaanModal onClose={() => setCatat(false)} />}
    </div>
  )
}
