import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Img, Btn, Badge } from './ui.jsx'
import { IbuModal, PemeriksaanModal, PemeriksaanDetail } from './forms.jsx'
import { ibuHamil, faktorIbu, riwayatIbu } from './data.js'

export function RiskBanner({ icon, judul, label, tone, items }) {
  return (
    <section className={'kcard risk ' + tone}>
      <h2><span className="risk-ico"><Img name={icon} /></span>{judul}<Badge tone={tone === 'orange' ? 'orange' : 'red'}>{label}</Badge></h2>
      <div className="risk-grid">
        {items.map(([v, tag, t, d, c]) => (
          <div key={t} className={'risk-item ' + (c || tone)}>
            <div className="risk-top"><b>{v}</b><span className="rpill">{tag}</span></div>
            <p className="risk-t">{t}</p>{d && <small>{d}</small>}
          </div>
        ))}
      </div>
    </section>
  )
}

export function Metric({ icon, label, value, unit, note, tag, tone = 'blue', alert }) {
  return (
    <div className={'kcard metric ' + tone + (alert ? ' alert' : '')}>
      <div className="metric-top">
        <span className="metric-ico"><Img name={icon} /></span>
        <p>{label}<br />TERAKHIR</p>
        {tag && <span className="metric-tag">{tag}</span>}
      </div>
      <p className="metric-val"><b>{value}</b> {unit}</p>
      <small>{note}</small>
    </div>
  )
}

export function RiwayatTable({ head, rows, total, onView }) {
  return (
    <section className="kcard riwayat-card">
      <div className="riwayat-head"><h2>Riwayat Kunjungan &amp; Pemeriksaan</h2><span className="chip">Total {total} Kunjungan Terdata</span></div>
      <div className="ktable-scroll">
        <table className="ktable plain">
          <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}<th>Aksi</th></tr></thead>
          <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}<td><button type="button" className="icon-btn" aria-label="Lihat detail pemeriksaan" onClick={onView}><Img name="eye" /></button></td></tr>)}</tbody>
        </table>
      </div>
    </section>
  )
}

export default function DetailIbu() {
  const { id } = useParams()
  const ibu = ibuHamil.find((r) => r.id === id) ?? ibuHamil[0]
  const [modal, setModal] = useState(null)
  const faktor = faktorIbu[ibu.kondisi]
  const pantau = ibu.kondisi === 'pantauan'
  const bina = ibu.kondisi === 'pembinaan'

  return (
    <div className="kpage">
      <Link to="/kader/ibu-hamil" className="back"><Img name="arrow-left" />Kembali ke Daftar Ibu Hamil</Link>

      {faktor && <RiskBanner icon={pantau ? 'warning' : 'bulb'} tone={pantau ? 'red' : 'orange'} {...faktor} />}

      <section className="kcard profile">
        <div className="profile-top">
          <span className="profile-ava"><Img name="avatar-ibu" /></span>
          <div>
            <h1>{ibu.nama.startsWith('Ibu') ? ibu.nama : `Ibu ${ibu.nama}`} <Badge tone="green-dot">Trimester {ibu.trimester ?? 1}</Badge></h1>
            <p className="nik"><b>NIK:</b> {ibu.nik}</p>
          </div>
          <div className="actions">
            <Btn kind="ghost" icon="edit" onClick={() => setModal('edit')}>Ubah Data</Btn>
            <Btn kind="dark" icon="plus" onClick={() => setModal('periksa')}>Catat Pemeriksaan baru</Btn>
          </div>
        </div>
        <div className="info-strips">
          <dl className="strip"><div><dt>Tanggal Lahir</dt><dd>12 April 1998</dd></div><div><dt>Riwayat Kehamilan</dt><dd>G1P0A0</dd></div></dl>
          <dl className="strip"><div><dt>HPHT (Haid Terakhir)</dt><dd>12 April 2024</dd><small>Siklus teratur 28 hari</small></div><div><dt>HPL (Taksiran Lahir)</dt><dd className="blue">19 Jan 2025</dd><small className="green">Tersisa 3 Bulan Lagi</small></div><div><dt>Usia Kehamilan</dt><dd>26 Minggu</dd><small>Masuk Bulan ke-6</small></div></dl>
        </div>
      </section>

      <div className="detail-grid">
        <section className="kcard family">
          <h2>Keluarga Siaga</h2>
          <div className="fam-box"><p className="eyebrow">Suami Siaga</p><p className="fam-name">{ibu.suami}</p><small>Pekerjaan: Wiraswasta Mebel Mandiri</small></div>
          <div className="fam-box row"><div><p className="eyebrow">Kontak Darurat Suami</p><p className="fam-name">081298765432</p></div><a className="kbtn green" href="https://wa.me/6281298765432" target="_blank" rel="noreferrer"><Img name="phone" />WhatsApp</a></div>
          <div className="fam-box"><p className="eyebrow">Alamat Rumah</p><p className="fam-addr">Jl. ABCD Gang 00 No. 01A -  RT 00 / RW 00</p></div>
        </section>
        <div className="metric-grid">
          <Metric icon="scale" label="BERAT BADAN" value="45.7" unit="kg" note="14 Oktober 2024 (Bulan ke-29)" tag={bina ? '+0.3 kg' : '+1.3 kg'} tone={bina ? 'orange' : 'blue'} alert={bina} />
          <Metric icon="tape" label="TINGGI BADAN" value="168.5" unit="cm" note="Pengukuran telentang mikrotoa" tag="+0.5 cm" tone="green" />
          {pantau
            ? <Metric icon="syringe" label="TEKANAN DARAH" value="145/95" unit="mmHg" note="Di atas batas 140/90" tag="Darah Tinggi" tone="red" alert />
            : <Metric icon="syringe" label="TEKANAN DARAH" value="115/75" unit="mmHg" note="Tidak ada gejala pusing atau bengkak" tag="Stabil" tone="green" />}
          {pantau
            ? <Metric icon="hand" label="LINGKAR LENGAN" value="21.5" unit="cm" note="Kurang dari 23.0 cm" tag="KEK" tone="red" alert />
            : <Metric icon="hand" label="LINGKAR LENGAN" value="25.0" unit="cm" note="Rentang lingkar normal seusia" tag={bina ? 'Risiko KEK' : 'Stabil'} tone={bina ? 'orange' : 'blue'} alert={bina} />}
        </div>
      </div>

      <RiwayatTable head={['Tanggal Kunjungan', 'Usia', 'Berat (BB)', 'Tinggi (TB)', 'LILA', 'Tekenan Darah', 'Kader']} rows={riwayatIbu} total={4} onView={() => setModal('lihat')} />

      {modal === 'edit' && <IbuModal data={ibu} onClose={() => setModal(null)} />}
      {modal === 'periksa' && <PemeriksaanModal jenis="Ibu Hamil" onClose={() => setModal(null)} />}
      {modal === 'lihat' && <PemeriksaanDetail jenis="Ibu Hamil" onClose={() => setModal(null)} />}
    </div>
  )
}
