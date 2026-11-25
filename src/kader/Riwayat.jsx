import { useState } from 'react'
import { Img, Btn, Badge, StatCard, Select, SearchBox, Pagination, paginate } from './ui.jsx'
import { PemeriksaanModal, PemeriksaanDetail } from './forms.jsx'
import { pemeriksaan } from './data.js'

const statusTone = { Sehat: 'green-soft', 'Perlu Pantauan': 'red-wide', 'Perlu Pembinaan': 'orange-wide' }
const tabs = [['', 'Semua'], ['Balita', 'Balita'], ['Ibu Hamil', 'Ibu Hamil']]

export default function Riwayat() {
  const [q, setQ] = useState('')
  const [f, setF] = useState({ jenis: '', status: '' })
  const [applied, setApplied] = useState({ q: '', jenis: '', status: '' })
  const [tab, setTab] = useState('')
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState(null)

  const base = pemeriksaan.filter((r) =>
    (r.nama + r.nik).toLowerCase().includes(applied.q.toLowerCase()) &&
    (!applied.jenis || r.jenis === applied.jenis) && (!applied.status || r.status === applied.status))
  const count = (j) => base.filter((r) => !j || r.jenis === j).length
  const pg = paginate(base.filter((r) => !tab || r.jenis === tab), page)

  return (
    <div className="kpage">
      <div className="pagehead">
        <div><h1>Riwayat Pemeriksaan</h1><p>Kelola hasil pemeriksaan balita dan ibu hamil di Posyandu.</p></div>
        <div className="actions">
          <Btn kind="outline lg" icon="download">Unduh Rekap</Btn>
          <Btn kind="dark lg" icon="add" onClick={() => setModal({ type: 'tambah' })}>Tambah Pemeriksaan</Btn>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard label="Total Pemeriksaan" value="128" icon="record" tone="blue-num" />
        <StatCard label="Pemeriksaan Balita" value="86" icon="baby" tone="green" />
        <StatCard label="Pemeriksaan Ibu Hamil" value="42" icon="mother" tone="blue-num" />
        <StatCard label="Perlu Tindak Lanjut" value="8" icon="warning" tone="orange" />
      </div>

      <form className="kcard kfilters" onSubmit={(e) => { e.preventDefault(); setApplied({ q, ...f }); setPage(1) }}>
        <SearchBox placeholder="Cari nama peserta atau NIK..." value={q} onChange={setQ} />
        <div className="filter-row riwayat">
          <Select label="Jenis peserta: Semua" options={['Balita', 'Ibu Hamil']} value={f.jenis} onChange={(v) => setF({ ...f, jenis: v })} />
          <Select label="Status: Semua" options={['Sehat', 'Perlu Pantauan', 'Perlu Pembinaan']} value={f.status} onChange={(v) => setF({ ...f, status: v })} />
          <label className="kdate"><span className="sr-only">Semua tanggal</span><input type="date" /></label>
          <button type="reset" className="kbtn outline" onClick={() => { setQ(''); setF({ jenis: '', status: '' }); setApplied({ q: '', jenis: '', status: '' }) }}>Reset</button>
          <button type="submit" className="kbtn green"><Img name="filter" />Terapkan</button>
        </div>
      </form>

      <div className="kcard ktable-wrap pad">
        <div className="tabs-row">
          <div role="tablist" className="ktabs">
            {tabs.map(([v, l]) => <button key={l} type="button" role="tab" aria-selected={tab === v} onClick={() => { setTab(v); setPage(1) }}>{l} ({count(v)})</button>)}
          </div>
          <span className="muted">Semua periode</span>
        </div>
        <table className="ktable zebra">
          <thead><tr><th>Tgl. Pemeriksaan</th><th>Nama Peserta</th><th>Jenis Peserta</th><th>Hasil Pengukuran</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            {pg.rows.map((r) => (
              <tr key={r.id}>
                <td>{r.tgl}<small>Ibu Siti Rahmawati</small></td>
                <td><b className="nm">{r.nama}</b><small>NIK: {r.nik}</small></td>
                <td><Badge tone={r.jenis === 'Balita' ? 'green-soft' : 'blue-wide'}>{r.jenis}</Badge></td>
                <td><b className="res">{r.hasil}</b><small>{r.sub}</small></td>
                <td><Badge tone={statusTone[r.status]}>{r.status}</Badge></td>
                <td className="row-actions">
                  <button type="button" className="mini-btn blue" onClick={() => setModal({ type: 'detail', jenis: r.jenis })}>Detail</button>
                  <button type="button" className="mini-btn" onClick={() => setModal({ type: 'edit', jenis: r.jenis })}>Edit</button>
                </td>
              </tr>
            ))}
            {!pg.rows.length && <tr><td colSpan={6} className="empty">Tidak ada pemeriksaan yang cocok.</td></tr>}
          </tbody>
        </table>
        <Pagination {...pg} unit="pemeriksaan" onPage={setPage} />
      </div>

      {modal?.type === 'tambah' && <PemeriksaanModal onClose={() => setModal(null)} />}
      {modal?.type === 'edit' && <PemeriksaanModal edit jenis={modal.jenis} onClose={() => setModal(null)} />}
      {modal?.type === 'detail' && <PemeriksaanDetail jenis={modal.jenis} onClose={() => setModal(null)} onEdit={() => setModal({ type: 'edit', jenis: modal.jenis })} />}
    </div>
  )
}
