import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Img, Btn, Badge, StatCard, Select, SearchBox, Pagination, paginate } from './ui.jsx'
import { IbuModal } from './forms.jsx'
import { ibuHamil } from './data.js'

export const kondisiIbu = { pantauan: ['Perlu Pantauan', 'red'], pembinaan: ['Perlu Pembinaan', 'orange'], 'tidak-aktif': ['Tidak Aktif', 'gray'] }

export function RowMenu({ onDetail, onEdit }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rowmenu">
      <button type="button" className="kebab" aria-label="Aksi" aria-expanded={open} onClick={() => setOpen(!open)}><Img name="more" /></button>
      {open && (
        <div className="rowmenu-list" role="menu" onMouseLeave={() => setOpen(false)}>
          <button type="button" role="menuitem" onClick={onDetail}>Lihat Detail</button>
          <button type="button" role="menuitem" onClick={onEdit}>Ubah Data</button>
        </div>
      )}
    </div>
  )
}

export default function DaftarIbu() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [f, setF] = useState({ status: '', kondisi: '', trimester: '' })
  const [applied, setApplied] = useState({ q: '', ...f })
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState(null)

  const rows = ibuHamil.filter((r) =>
    (r.nama + r.suami).toLowerCase().includes(applied.q.toLowerCase()) &&
    (!applied.status || (applied.status === 'Aktif') === r.aktif) &&
    (!applied.kondisi || (kondisiIbu[r.kondisi]?.[0] ?? 'Sehat') === applied.kondisi) &&
    (!applied.trimester || `Trimester ${r.trimester}` === applied.trimester))
  const pg = paginate(rows, page)

  return (
    <div className="kpage">
      <div className="kcard titlebar">
        <h1>Daftar Ibu Hamil</h1>
        <div className="actions">
          <Btn kind="outline" icon="download">Unduh Rekap</Btn>
          <Btn icon="plus" onClick={() => setModal({})}>Tambah Ibu Hamil</Btn>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard label="Total Terdaftar" value="142" icon="people" tone="dark" />
        <StatCard label="Total Ibu Hamil Aktif" value="95" icon="pregnant-green" tone="green" />
        <StatCard label="Perlu Pembinaan" value="3" unit="Ibu" icon="warning-orange" tone="orange" />
        <StatCard label="Perlu Pantauan" value="3" unit="Ibu" icon="eye-red" tone="red" />
      </div>

      <form className="kcard kfilters" onSubmit={(e) => { e.preventDefault(); setApplied({ q, ...f }); setPage(1) }}>
        <SearchBox placeholder="Ketik Nama Ibu Hamil atau Nama Suami...." value={q} onChange={setQ} />
        <div className="filter-row ibu">
          <Select label="Status" options={['Aktif', 'Tidak Aktif']} value={f.status} onChange={(v) => setF({ ...f, status: v })} />
          <Select label="Kondisi" options={['Sehat', 'Perlu Pantauan', 'Perlu Pembinaan']} value={f.kondisi} onChange={(v) => setF({ ...f, kondisi: v })} />
          <Select label="Trimester" options={['Trimester 1', 'Trimester 2', 'Trimester 3']} value={f.trimester} onChange={(v) => setF({ ...f, trimester: v })} />
          <label className="kdate"><span className="sr-only">Tgl Kunjungan</span><input type="date" /></label>
          <button type="reset" className="kbtn reset" onClick={() => { setQ(''); setF({ status: '', kondisi: '', trimester: '' }); setApplied({ q: '', status: '', kondisi: '', trimester: '' }) }}>Reset</button>
          <button type="submit" className="kbtn green"><Img name="filter" />Terapkan</button>
        </div>
      </form>

      <div className="kcard ktable-wrap">
        <table className="ktable">
          <thead><tr><th>Nama Peserta</th><th>Kondisi</th><th>NIK</th><th>Tempat,<br />Tanggal Lahir</th><th>Alamat &amp; RT/RW</th><th>Kunjungan<br />Terakhir</th><th>Aksi</th></tr></thead>
          <tbody>
            {pg.rows.map((r) => (
              <tr key={r.id}>
                <td><Link to={r.id} className="person"><span className="kavatar"><Img name="avatar-ibu" /></span><span><b>{r.nama}</b><small>Suami: {r.suami}</small></span></Link></td>
                <td className="kond">
                  <b>{r.aktif ? `Trimester ${r.trimester}` : 'Sudah Melahirkan'}</b>
                  {kondisiIbu[r.kondisi] ? <Badge tone={kondisiIbu[r.kondisi][1]}>{kondisiIbu[r.kondisi][0]}</Badge> : <small>HPL: {r.hpl}</small>}
                </td>
                <td className="mono">{r.nik}</td>
                <td>{r.lahir}</td>
                <td>{r.alamat}<small>{r.rt}</small></td>
                <td><span className={'visit' + (r.aktif ? ' ok' : '')}><Img name={r.aktif ? 'check-green' : 'check-circle'} />{r.kunjungan}</span></td>
                <td><RowMenu onDetail={() => navigate(r.id)} onEdit={() => setModal(r)} /></td>
              </tr>
            ))}
            {!pg.rows.length && <tr><td colSpan={7} className="empty">Tidak ada peserta yang cocok dengan filter.</td></tr>}
          </tbody>
        </table>
        <Pagination {...pg} onPage={setPage} />
      </div>

      {modal && <IbuModal data={modal.id ? modal : null} onClose={() => setModal(null)} />}
    </div>
  )
}
