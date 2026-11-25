import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Img, Btn, Badge } from './ui.jsx'
import { BalitaModal, PemeriksaanModal, PemeriksaanDetail } from './forms.jsx'
import { RiskBanner, Metric, RiwayatTable } from './DetailIbu.jsx'
import { balita, riwayatBalita } from './data.js'

// Grafik KMS BB/U: zona standar dari Figma, plot berat 10–15 bulan.
const X = (m) => 80 + (m - 10) * 80
const Y = (kg) => 196 - (kg - 8) * 40
const plot = [[10, 7.6], [11, 8.1], [12, 8.4], [13, 8.4], [14, 8.4], [14.6, 8.35]]
export function Kms() {
  return (
    <svg viewBox="0 0 520 248" className="kms" role="img" aria-label="Grafik KMS berat badan menurut usia, 10 sampai 15 bulan">
      <path d={`M40 ${Y(10.3)} L520 ${Y(12.2)} L520 ${Y(9.6)} L40 ${Y(8.7)}Z`} fill="#cfe7da" />
      <path d={`M40 ${Y(8.7)} L520 ${Y(9.6)} L520 ${Y(8.8)} L40 ${Y(8.2)}Z`} fill="#fbe7c3" />
      <path d={`M40 ${Y(8.2)} L520 ${Y(8.8)} L520 230 L40 230Z`} fill="#f7d9dc" />
      <path d={`M40 ${Y(10.3)} L520 ${Y(12.2)}`} stroke="#15803d" strokeWidth="1.5" fill="none" />
      <path d={`M40 ${Y(8.7)} L520 ${Y(9.6)}`} stroke="#d97706" strokeWidth="1.5" fill="none" />
      <path d={`M40 ${Y(8.2)} L520 ${Y(8.8)}`} stroke="#ba1a1a" strokeWidth="1.5" fill="none" />
      {[12, 11, 10, 9, 8].map((k) => <text key={k} x="6" y={Y(k) + 4} className="kms-y">{k} kg</text>)}
      {[10, 11, 12, 13, 14].map((m) => <text key={m} x={X(m) - 14} y="242" className="kms-x">{m} Bln</text>)}
      <text x={X(15) - 40} y="242" className="kms-x now">15 Bln (Kini)</text>
      <line x1={X(14)} y1="10" x2={X(14)} y2="222" stroke="#ba1a1a" strokeDasharray="4 3" />
      <polyline points={plot.map(([m, k]) => `${X(m)},${Y(k)}`).join(' ')} fill="none" stroke="#ba1a1a" strokeWidth="2.5" />
      <polyline points={`${X(14)},${Y(8.4)} ${X(15)},${Y(8.85)}`} fill="none" stroke="#15803d" strokeWidth="1.5" strokeDasharray="3 3" />
      {plot.slice(0, 5).map(([m, k], i) => <circle key={m} cx={X(m)} cy={Y(k)} r={i === 4 ? 6 : 4} fill={i === 4 ? '#ba1a1a' : i > 1 ? '#fde68a' : '#fff'} stroke={i > 1 && i < 4 ? '#d97706' : i === 4 ? '#f7c3c8' : '#15803d'} strokeWidth="2" />)}
      <text x={X(14) - 50} y={Y(8.4) - 8} className="kms-note orange">8.5 kg (T1)</text>
      <text x={X(14) + 10} y={Y(9) - 4} className="kms-note red">8.4 kg (2T)</text>
    </svg>
  )
}

const nilai = {
  sehat: [['gizi', 'Status Gizi', '-2.2 SD', 'Normal', 'green'], ['ruler', 'Status Stunting', '2.7 SD', 'Normal', 'green'], ['balance', 'Status Berat Badan', '-2.5 SD', 'Normal', 'green']],
  risiko: [['gizi', 'Status Gizi', '- 3.5 SD', 'Gizi Kurang', 'red'], ['ruler', 'Status Stunting', '- 2.3 SD', 'Pendek', 'orange'], ['balance', 'Status Berat Badan', '- 1.3 SD', 'Normal', 'green']],
}

export default function DetailBalita() {
  const { id } = useParams()
  const b = balita.find((r) => r.id === id) ?? balita[1]
  const [modal, setModal] = useState(null)
  const risiko = b.kondisi === 'risiko'

  return (
    <div className="kpage">
      <Link to="/kader/balita" className="back"><Img name="arrow-left" />Kembali ke Daftar Balita</Link>

      {risiko && <RiskBanner icon="warning" tone="orange-red" judul="Kondisi Risiko yang Ditemukan" label="2 Kondisi" items={[
        ['- 3.5 SD', 'Gizi Kurang', 'BB/TB atau BB/PB', '', 'red'],
        ['- 2.3 SD', 'Pendek', 'TB/U atau PB/U', '', 'orange'],
        ['- 1.3 SD', 'Normal', 'BB/U', '', 'green'],
      ]} />}

      <section className="kcard profile">
        <div className="profile-top">
          <span className="profile-ava green"><Img name="avatar-balita" /></span>
          <div>
            <h1>Muhammad Al-Fatih</h1>
            <p className="tags"><Badge tone="blue">Laki - Laki</Badge><Badge tone="green-dot">Aktif</Badge></p>
          </div>
          <div className="actions">
            <Btn kind="ghost" icon="edit" onClick={() => setModal('edit')}>Ubah Data</Btn>
            <Btn kind="dark" icon="plus" onClick={() => setModal('periksa')}>Catat Pemeriksaan baru</Btn>
          </div>
        </div>
        <div className="info-strips balita">
          <dl className="strip sm"><div><dt>Nomor Induk Kependudukan</dt><dd>3201142510230004</dd></div><div><dt>Tanggal &amp; Tempat Lahir</dt><dd>15 Mei 2022 (Bogor)</dd></div></dl>
          <dl className="strip sm"><div><dt>BB Saat Lahir</dt><dd>3.2 kg</dd></div><div><dt>TB Saat Lahir</dt><dd>49.5 cm</dd></div><div><dt>Lingkar Kepala</dt><dd>34 cm</dd></div></dl>
        </div>
      </section>

      <div className="detail-grid">
        <div className="col">
          <section className="kcard family">
            <h2>Biodata Orang Tua</h2>
            <div className="fam-box row tight"><div><p className="fam-name sm">Ibu Rahmawati</p><small>Ibu Rumah Tangga</small></div><a className="kbtn green" href="https://wa.me/" target="_blank" rel="noreferrer"><Img name="phone" />WhatsApp</a></div>
            <div className="fam-box tight"><p className="fam-name sm">Bpk. Hendra Saputra</p><small>Petani / Wiraswasta</small></div>
            <div className="fam-box tight"><p className="pin"><Img name="pin" />Alamat Tinggal</p><p className="fam-addr">RT 02 / RW 04, Dusun Sukamaju, Desa Sukamaju</p></div>
          </section>
          <section className="kcard kms-card">
            <h2>Grafik Pertumbuhan KMS Digital (Berat Badan menurut Usia - BB/U Laki-Laki)</h2>
            <p className="muted">Memperlihatkan tren lintasan pertumbuhan 6 bulan terakhir: Perhatikan garis melandai mendatar lalu menukik turun (Status 2T).</p>
            <ul className="kms-legend"><li><i className="green" />Standar Normal (+2 s/d -2 SD)</li><li><i className="yellow" />Garis Kuning (-2 s/d -3 SD)</li><li><i className="red" />BGM (&lt; -3 SD)</li><li><i className="dot" />Plot Kenzo</li></ul>
            <div className="kms-box"><Kms /></div>
          </section>
        </div>
        <div className="col">
          <div className="metric-grid">
            <Metric icon="scale" label="BERAT BADAN" value="45.7" unit="kg" note="14 Oktober 2024 (Bulan ke-29)" tag="+0.3 kg" tone="blue" />
            <Metric icon="tape" label="TINGGI BADAN" value="168.5" unit="cm" note="Pengukuran telentang mikrotoa" tag="+0.5 cm" tone="green" />
            <Metric icon="head" label="LINGKAR KEPALA" value="18.7" unit="CM" note="Rentang lingkar normal seusia" tag="Stabil" tone="green" />
            <Metric icon="hand" label="LINGKAR LENGAN" value="25.0" unit="cm" note="Rentang lingkar normal seusia" tag="Stabil" tone="blue" />
          </div>
          <section className="kcard assess">
            <div className="riwayat-head"><h2>Hasil Penilaian Pertumbuhan Balita</h2><span className="chip sm">Kunjungan Terakhir</span></div>
            {nilai[risiko ? 'risiko' : 'sehat'].map(([icon, t, v, s, tone]) => (
              <div key={t} className={'assess-row ' + tone}>
                <span className="assess-ico"><Img name={icon} /></span>
                <div><p>{t}</p><b>{v}</b></div>
                <span className="assess-pill">{s}</span>
              </div>
            ))}
          </section>
        </div>
      </div>

      <RiwayatTable head={['Tanggal Kunjungan', 'Usia', 'Berat (BB)', 'Tinggi (TB)', 'Lingkar Kepala', 'LILA', 'Kader']} rows={riwayatBalita} total={4} onView={() => setModal('lihat')} />

      {modal === 'edit' && <BalitaModal data={b} onClose={() => setModal(null)} />}
      {modal === 'periksa' && <PemeriksaanModal jenis="Balita" onClose={() => setModal(null)} />}
      {modal === 'lihat' && <PemeriksaanDetail jenis="Balita" onClose={() => setModal(null)} />}
    </div>
  )
}
