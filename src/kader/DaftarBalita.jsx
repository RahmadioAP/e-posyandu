import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Img, Btn, Badge, StatCard, Select, SearchBox, Pagination, paginate } from './ui.jsx'
import { BalitaModal } from './forms.jsx'
import { balita } from './data.js'

const empty = { status: '', jk: '', gizi: '', stunting: '', bb: '' }

export default function DaftarBalita() {
  const [q, setQ] = useState('')
  const [f, setF] = useState(empty)
  const [applied, setApplied] = useState({ q: '', ...empty })
  const [page, setPage] = useState(1)
  const [tambah, setTambah] = useState(false)
  const set = (k) => (v) => setF({ ...f, [k]: v })

  const rows = balita.filter((r) =>
    r.nama.toLowerCase().includes(applied.q.toLowerCase()) &&
    (!applied.status || (applied.status === 'Aktif') === r.aktif) &&
    (!applied.jk || r.jk === applied.jk) &&
    (!applied.gizi || r.tags.some(([t]) => t === applied.gizi)) &&
    (!applied.stunting || r.tags.some(([t]) => t === applied.stunting)) &&
    (!applied.bb || r.tags.some(([t]) => t === applied.bb)))
  const pg = paginate(rows, page)

  return (
    <div className="kpage">
      <div className="kcard titlebar">
        <h1>Daftar Balita</h1>
        <div className="actions">
          <Btn kind="outline" icon="download">Unduh Rekap</Btn>
          <Btn icon="plus" onClick={() => setTambah(true)}>Tambah Balita</Btn>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard label="Total Terdaftar" value="142" icon="people" tone="dark" />
        <StatCard label="Total Balita Aktif" value="95" icon="baby-face-green" tone="green" />
        <StatCard label="Perlu Pembinaan" value="3" unit="Ibu" icon="warning-orange" tone="orange" />
        <StatCard label="Perlu Pantauan" value="3" unit="Ibu" icon="eye-red" tone="red" />
      </div>

      <form className="kcard kfilters" onSubmit={(e) => { e.preventDefault(); setApplied({ q, ...f }); setPage(1) }}>
        <SearchBox placeholder="Ketik Nama Balita atau Nama Ibu atau Ayah..." value={q} onChange={setQ} />
        <div className="filter-row balita-a">
          <Select label="Status" options={['Aktif', 'Tidak Aktif']} value={f.status} onChange={set('status')} />
          <Select label="Jenis Kelamin" options={['Laki-laki', 'Perempuan']} value={f.jk} onChange={set('jk')} />
          <label className="kdate"><span className="sr-only">Tgl Kunjungan</span><input type="date" /></label>
        </div>
        <div className="filter-row balita-b">
          <Select label="Status Gizi" options={['Gizi Baik', 'Gizi Kurang', 'Obesitas']} value={f.gizi} onChange={set('gizi')} />
          <Select label="Status Stunting" options={['Tinggi', 'TB Pendek']} value={f.stunting} onChange={set('stunting')} />
          <Select label="Status Berat Badan" options={['BB Normal', 'BB Lebih', 'BB Kurang']} value={f.bb} onChange={set('bb')} />
          <button type="reset" className="kbtn reset" onClick={() => { setQ(''); setF(empty); setApplied({ q: '', ...empty }) }}>Reset</button>
          <button type="submit" className="kbtn green"><Img name="filter" />Terapkan</button>
        </div>
      </form>

      <div className="kcard ktable-wrap">
        <table className="ktable balita">
          <thead><tr><th>Nama Peserta</th><th>NIK</th><th>Tempat,<br />Tanggal Lahir</th><th>Alamat &amp; RT/RW</th><th>Kunjungan<br />Terakhir</th><th>Kondisi</th></tr></thead>
          <tbody>
            {pg.rows.map((r) => (
              <tr key={r.id}>
                <td><Link to={r.id} className="person"><span className="kavatar"><Img name="avatar-balita" /></span><b className="big">{r.nama}</b></Link></td>
                <td className="mono">{r.nik}</td>
                <td>{r.lahir}</td>
                <td>{r.alamat}<small>{r.rt}</small></td>
                <td><span className="visit ok"><Img name="check-green" />{r.kunjungan}</span></td>
                <td><div className="tags">{r.tags.map(([t, c]) => <Badge key={t} tone={c}>{t}</Badge>)}</div></td>
              </tr>
            ))}
            {!pg.rows.length && <tr><td colSpan={6} className="empty">Tidak ada balita yang cocok dengan filter.</td></tr>}
          </tbody>
        </table>
        <Pagination {...pg} onPage={setPage} />
      </div>

      {tambah && <BalitaModal onClose={() => setTambah(false)} />}
    </div>
  )
}
