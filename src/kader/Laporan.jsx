import { useState } from 'react'
import { Btn, Badge, StatCard, Select } from './ui.jsx'
import { rekapBulanan } from './data.js'

const singkat = { 'Juni 2024': 'Jun', 'Juli 2024': 'Jul', 'Agustus 2024': 'Agu', 'September 2024': 'Sep', 'Oktober 2024': 'Okt', 'Mei 2024': 'Mei' }

export default function Laporan() {
  const [f, setF] = useState({ periode: 'Bulanan', bulan: 'Oktober', tahun: '2024', jenis: 'Semua peserta' })
  const set = (k) => (v) => setF({ ...f, [k]: v })
  return (
    <div className="kpage">
      <div className="pagehead">
        <div><h1>Laporan Posyandu <Badge tone="blue-wide">Data contoh</Badge></h1><p>Pantau layanan dan unduh rekap kegiatan Posyandu.</p></div>
        <div className="actions">
          <Btn kind="outline lg" icon="download-fill">Unduh Excel</Btn>
          <Btn kind="dark lg invert-ico" icon="download-fill">Unduh PDF</Btn>
        </div>
      </div>

      <form className="kcard kfilters lap" onSubmit={(e) => e.preventDefault()}>
        <div className="lap-field"><span>Periode</span><Select label="Periode" options={['Bulanan', 'Tahunan']} value={f.periode} onChange={set('periode')} /></div>
        <div className="lap-field"><span>Bulan</span><Select label="Bulan" options={['Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober']} value={f.bulan} onChange={set('bulan')} /></div>
        <div className="lap-field"><span>Tahun</span><Select label="Tahun" options={['2024']} value={f.tahun} onChange={set('tahun')} /></div>
        <div className="lap-field"><span>Jenis peserta</span><Select label="Jenis peserta" options={['Semua peserta', 'Balita', 'Ibu Hamil']} value={f.jenis} onChange={set('jenis')} /></div>
        <button type="reset" className="kbtn outline" onClick={() => setF({ periode: 'Bulanan', bulan: 'Oktober', tahun: '2024', jenis: 'Semua peserta' })}>Reset</button>
        <button type="submit" className="kbtn green">Tampilkan</button>
      </form>

      <div className="stat-grid">
        <StatCard label="Total Pemeriksaan" value="128" sub="kunjungan" icon="graph" tone="blue-num" />
        <StatCard label="Pemeriksaan Balita" value="86" sub="kunjungan" icon="people-fill" tone="green" />
        <StatCard label="Pemeriksaan Ibu Hamil" value="42" sub="kunjungan" icon="pregnant-fill" tone="blue-num" />
        <StatCard label="Perlu Tindak Lanjut" value="8" sub="peserta" icon="warning-fill" tone="orange" />
      </div>

      <div className="lap-grid">
        <section className="kcard chart-card">
          <div className="chart-head"><div><h2>Tren kunjungan</h2><p className="muted">6 bulan terakhir · Mei–Oktober 2024</p></div><div className="legend-row"><span><i className="sq blue" />Balita</span><span><i className="sq green" />Ibu hamil</span></div></div>
          <div className="gbar" role="img" aria-label="Grafik kunjungan balita dan ibu hamil Mei sampai Oktober 2024">
            <div className="vbar-y">{[100, 75, 50, 25, 0].map((v) => <span key={v} style={{ bottom: `${v}%` }}>{v}</span>)}</div>
            {rekapBulanan.map(([m, b, i]) => (
              <div key={m} className="gbar-col">
                <div className="gbar-pair"><i className="blue" style={{ height: `${b}%` }} /><i className="green" style={{ height: `${i}%` }} /></div>
                <span className={m.startsWith('Okt') ? 'on' : ''}>{singkat[m]}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="kcard tindak">
          <h2>Tindak lanjut peserta</h2>
          <p className="muted">Hasil pemeriksaan Oktober 2024</p>
          <p className="tindak-num"><b>8</b> peserta perlu perhatian</p>
          <p className="tindak-row orange"><span>Perlu pembinaan</span><span>5 peserta</span></p>
          <p className="tindak-row red"><span>Perlu pantauan</span><span>3 peserta</span></p>
          <p className="muted">Koordinasikan pemeriksaan lanjutan dengan bidan.</p>
        </section>
      </div>

      <section className="kcard rekap">
        <div className="riwayat-head"><div><h2>Rekap laporan bulanan</h2><p className="muted">Ringkasan layanan per bulan pada tahun 2024.</p></div><span className="chip">Mei–Oktober 2024</span></div>
        <table className="ktable zebra rekap-t">
          <thead><tr><th>Bulan</th><th>Balita</th><th>Ibu Hamil</th><th>Total Kunjungan</th><th>Tindak Lanjut</th><th>Aksi</th></tr></thead>
          <tbody>
            {rekapBulanan.map(([m, b, i, t]) => (
              <tr key={m} className={m.startsWith('Okt') ? 'hl' : ''}>
                <td>{m}</td><td>{b}</td><td>{i}</td><td className="tot">{b + i}</td><td className="tl">{t} peserta</td>
                <td><button type="button" className="mini-btn blue">Unduh</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="rekap-foot"><span>Menampilkan 6 bulan terakhir</span><span>Total kunjungan = pemeriksaan balita + ibu hamil</span></div>
      </section>
      <p className="foot-note">Data contoh untuk pratinjau laporan • Periode terpilih: 1–31 Oktober 2024</p>
    </div>
  )
}
