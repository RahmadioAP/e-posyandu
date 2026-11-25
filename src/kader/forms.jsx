import { useState } from 'react'
import { Img, Modal, Field, Input } from './ui.jsx'

// shortcut: simpan hanya menutup modal (belum ada backend); sambungkan ke API saat tersedia.
function FormModal({ icon, title, sub, onClose, submitLabel = 'Simpan Data', note = 'Wajib diisi kader', dark, children }) {
  return (
    <Modal icon={icon} title={title} sub={sub} onClose={onClose} footer={
      <>
        <span className="req-note"><b>*</b> {note}</span>
        <button type="button" className="kbtn ghost" onClick={onClose}>Batal</button>
        <button type="submit" form="kform" className={'kbtn ' + (dark ? 'dark' : 'primary')}><Img name="save" />{submitLabel}</button>
      </>
    }>
      <form id="kform" className="kform" onSubmit={(e) => { e.preventDefault(); onClose() }}>{children}</form>
    </Modal>
  )
}

const nikProps = { inputMode: 'numeric', pattern: '\\d{16}', maxLength: 16, title: 'NIK harus 16 digit angka', required: true }

export function IbuModal({ data, onClose }) {
  const edit = !!data
  const [nik, setNik] = useState(edit ? '3567890012998765' : '')
  return (
    <FormModal icon="mother-24" onClose={onClose}
      title={edit ? 'Ubah Data Ibu Hamil' : 'Tambah Data Ibu Hamil Baru'}
      sub={edit ? 'Ubah data ibu hamil hingga sesuai dengan kondisi yang ada' : 'Daftarkan ibu hamil baru ke register pemantauan KIA Posyandu'}>
      <Field label="Nomor Induk Kependudukan (NIK) Ibu Hamil" req wide>
        <Input icon="idcard" iconEnd={nik.length === 16 ? 'check-circle' : undefined} {...nikProps} placeholder="0000000000000000" value={nik} onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))} />
      </Field>
      <Field label="Nama Ibu Hamil" req><Input icon="woman" required placeholder="Nama Lengkap Sesuai KTP" defaultValue={edit ? data.nama : ''} /></Field>
      <Field label="Nama Suami" req><Input icon="man" required placeholder="Nama lengkap sesuai KTP" defaultValue={edit ? data.suami.replace('Bpk. ', '') : ''} /></Field>
      <Field label="Tanggal Lahir Ibu" req><Input type="date" required defaultValue={edit ? '1997-11-01' : ''} /></Field>
      <Field label="Gravida / Paritas (Kehamilan Ke-" req><Input icon="pregnant-gray" required placeholder="G1P0A0" defaultValue={edit ? 'G2P1A0' : ''} /></Field>
      <Field label="Hari Pertama Haid Terakhir (HPHT)" req wide>
        <Input type="date" required defaultValue={edit ? '2024-04-12' : ''} />
        <span className="hpl"><em className="g">Perkiraan Lahir (HPL): {edit ? '19 Januari 2025' : '17 Oktober 2024'}</em><em className="b">Usia Gestasi: {edit ? '26 Minggu 3 Hari' : '14 Minggu 3 Hari'} (Trimester 2)</em></span>
      </Field>
      <div className="three wide">
        <Field label="BB Pra- Hamil (KG)" req><Input icon="scale-gray" type="number" step="0.1" required placeholder="00.0" defaultValue={edit ? '45.7' : ''} /></Field>
        <Field label="Tinggi Badan (cm)" req><Input icon="tape-gray" type="number" step="0.1" required placeholder="000" defaultValue={edit ? '168.5' : ''} /></Field>
        <Field label="LILA (cm)" req><Input icon="hand-gray" type="number" step="0.1" required placeholder="00.0" defaultValue={edit ? '25.0' : ''} /></Field>
      </div>
    </FormModal>
  )
}

export function BalitaModal({ data, onClose }) {
  const edit = !!data
  const [nik, setNik] = useState(edit ? '3201142510230004' : '')
  return (
    <FormModal icon="mother-24" onClose={onClose}
      title={edit ? 'Ubah Data Balita' : 'Tambah Data Balita Baru'}
      sub={edit ? 'Ubah data balita hingga sesuai dengan kondisi yang ada' : 'Daftarkan Balita  baru ke register pemantauan KIA Posyandu'}>
      <Field label="Nomor Induk Kependudukan (NIK) Balita" req wide>
        <Input icon="idcard" iconEnd={nik.length === 16 ? 'check-circle' : undefined} {...nikProps} placeholder="0000000000000000" value={nik} onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))} />
      </Field>
      <Field label="Nama Balita" req wide><Input icon="head" required placeholder="Nama Lengkap Sesuai Akta Kelahiran" defaultValue={edit ? 'Muhammad Al-Fatih' : ''} /></Field>
      <Field label="Tanggal Lahir Balita" req><Input type="date" required defaultValue={edit ? '2022-05-15' : ''} /></Field>
      <fieldset className="kfield">
        <legend className="kfield-lbl">Jenis Kelamin<b> *</b></legend>
        <div className="radio2">
          <label><input type="radio" name="jk" required defaultChecked={false} />Perempuan</label>
          <label><input type="radio" name="jk" defaultChecked={edit} />Laki - Laki</label>
        </div>
      </fieldset>
      <Field label="Berat Badan Lahir (BBL)" req><Input icon="scale-gray" type="number" step="0.1" required placeholder="00.0" defaultValue={edit ? '3.2' : ''} /></Field>
      <Field label="Panjang Badan Lahir (PBL)" req><Input icon="tape-gray" type="number" step="0.1" required placeholder="000" defaultValue={edit ? '49.5' : ''} /></Field>
      <Field label="Nama Ibu" req><Input icon="woman" required placeholder="Nama Lengkap Sesuai KTP" defaultValue={edit ? 'Rahmawati' : ''} /></Field>
      <Field label="Nama Ayah" opt><Input icon="man" placeholder="Nama lengkap sesuai KTP" defaultValue={edit ? 'Hendra Saputra' : ''} /></Field>
    </FormModal>
  )
}

function Sel({ options, defaultValue, required }) {
  return <span className="kinput sel"><select required={required} defaultValue={defaultValue ?? ''}>{!defaultValue && <option value="" disabled>Pilih status</option>}{options.map((o) => <option key={o}>{o}</option>)}</select><Img name="chevron-down" /></span>
}

export function PemeriksaanModal({ jenis, edit, onClose }) {
  const [tab, setTab] = useState(jenis || 'Balita')
  const balita = tab === 'Balita'
  const v = (x) => (edit ? x : undefined)
  return (
    <FormModal icon={balita ? 'baby-24' : 'mother-24'} onClose={onClose} dark note="Wajib diisi kader"
      title={edit ? 'Edit Data Pemeriksaan' : 'Tambah Data Pemeriksaan'}
      sub={edit ? 'Perbarui hasil pemeriksaan pada kunjungan ini.' : 'Catat hasil kunjungan peserta Posyandu.'}
      submitLabel={edit ? 'Simpan Perubahan' : 'Simpan Pemeriksaan'}>
      {!edit && (
        <div className="seg wide" role="tablist">
          {['Balita', 'Ibu Hamil'].map((t) => <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)}>{t}</button>)}
        </div>
      )}
      <Field label={balita ? 'Peserta balita' : 'Peserta ibu hamil'} req wide>
        <Sel required options={balita ? ['Muhammad Al-Fatih', 'Aisyah Putri'] : ['Siti Aminah', 'Nurul Aisyah']} defaultValue={balita ? 'Muhammad Al-Fatih' : 'Siti Aminah'} />
        <span className="pinfo">
          <b>NIK: {balita ? '3201142510230004' : '3201145209980002'}</b>
          <small>{balita ? 'Laki-laki • 15 Mei 2022 • Usia saat periksa: 29 bulan' : 'Usia kehamilan: 26 minggu • Trimester 2 • G1P0A0'}</small>
        </span>
      </Field>
      <Field label="Tanggal pemeriksaan" req><Input type="date" required defaultValue={balita ? '2024-10-12' : '2024-10-14'} /></Field>
      <Field label="Kader pemeriksa" req><Sel required options={['Ibu Siti Rahmawati', 'Ibu Nurhasanah']} defaultValue="Ibu Siti Rahmawati" /></Field>
      <div className="sub-head wide"><h3>{balita ? 'Hasil pengukuran & layanan' : 'Hasil pengukuran ibu hamil'}</h3><span>Isi sesuai hasil pemeriksaan peserta.</span></div>
      <div className="three wide">
        <Field label="Berat badan" req><Input type="number" step="0.1" required placeholder="0,0" suffix="kg" defaultValue={v(balita ? '12.1' : '45.7')} /></Field>
        <Field label={balita ? 'Tinggi / panjang badan' : 'Tinggi badan'} req><Input type="number" step="0.1" required placeholder="0,0" suffix="cm" defaultValue={v(balita ? '87.5' : '168.5')} /></Field>
        <Field label={balita ? 'Lingkar kepala' : 'Lingkar lengan (LILA)'} req><Input type="number" step="0.1" required placeholder="0,0" suffix="cm" defaultValue={v(balita ? '47.0' : '25.0')} /></Field>
        {balita ? (
          <>
            <Field label="Lingkar lengan (LILA)" req><Input type="number" step="0.1" required placeholder="0,0" suffix="cm" defaultValue={v('14.8')} /></Field>
            <Field label="Vitamin A"><Sel options={['Sudah diberikan', 'Belum diberikan']} defaultValue={v('Sudah diberikan')} /></Field>
            <Field label="Imunisasi"><Sel options={['Sesuai usia', 'Belum lengkap']} defaultValue={v('Sesuai usia')} /></Field>
          </>
        ) : (
          <>
            <Field label="Tekanan darah sistolik" req><Input type="number" required placeholder="000" suffix="mmHg" defaultValue={v('115')} /></Field>
            <Field label="Tekanan darah diastolik" req><Input type="number" required placeholder="00" suffix="mmHg" defaultValue={v('75')} /></Field>
            <Field label="Hemoglobin (Hb)"><Input type="number" step="0.1" placeholder="0,0" suffix="g/dL" defaultValue={v('11.8')} /></Field>
          </>
        )}
      </div>
      <Field label="Catatan & tindak lanjut" wide>
        <Input placeholder="Tambahkan keluhan, layanan, atau tindak lanjut pemeriksaan..." defaultValue={v(balita ? 'Pertumbuhan baik. Lanjutkan pemantauan rutin setiap bulan.' : 'Tidak ada keluhan pusing atau bengkak. Lanjutkan kunjungan rutin.')} />
        <small className="khint">{balita ? 'Data ini dicatat sebagai satu kunjungan pemeriksaan balita.' : 'Usia kehamilan mengikuti tanggal pemeriksaan yang dipilih.'}</small>
      </Field>
    </FormModal>
  )
}

export function PemeriksaanDetail({ jenis = 'Balita', onClose, onEdit }) {
  const [editing, setEditing] = useState(false)
  if (editing) return <PemeriksaanModal edit jenis={jenis} onClose={onClose} />
  const balita = jenis === 'Balita'
  const m = balita
    ? [['Berat badan', '12,1', 'kg'], ['Tinggi / panjang badan', '87,5', 'cm'], ['Lingkar kepala', '47,0', 'cm'], ['Lingkar lengan (LILA)', '14,8', 'cm'], ['Vitamin A', 'Sudah diberikan'], ['Imunisasi', 'Sesuai usia']]
    : [['Berat badan', '45,7', 'kg'], ['Tinggi badan', '168,5', 'cm'], ['Lingkar lengan (LILA)', '25,0', 'cm'], ['Tekanan darah', '115/75', 'mmHg'], ['Hemoglobin (Hb)', '11,8', 'g/dL'], ['Usia kehamilan', '26', 'minggu']]
  return (
    <Modal icon={balita ? 'baby-24' : 'mother-24'} title={`Detail Pemeriksaan ${jenis}`} sub="Hasil pemeriksaan pada satu kunjungan peserta." onClose={onClose} footer={
      <>
        <span className="req-note">Data kunjungan tersimpan</span>
        <button type="button" className="kbtn ghost" onClick={onClose}>Tutup</button>
        <button type="button" className="kbtn dark" onClick={() => (onEdit ? onEdit() : setEditing(true))}>Edit Pemeriksaan</button>
      </>
    }>
      <div className="det">
        <div className="det-who">
          <div><h3>{balita ? 'Muhammad Al-Fatih' : 'Siti Aminah'}</h3><p>NIK: {balita ? '3201142510230004' : '3201145209980002'}</p><b>{balita ? 'Laki-laki • 29 bulan • Ibu: Rahmawati' : 'Usia kehamilan 26 minggu • Trimester 2 • G1P0A0'}</b></div>
          <span>{jenis}</span>
        </div>
        <dl className="det-meta"><div><dt>Tanggal Pemeriksaan</dt><dd>{balita ? '12 Oktober 2024' : '14 Oktober 2024'}</dd></div><div><dt>Kader Pemeriksa</dt><dd>Ibu Siti Rahmawati</dd></div></dl>
        <h3 className="det-h">Hasil pengukuran &amp; layanan</h3>
        <div className="det-grid">{m.map(([l, val, u]) => <div key={l}><p>{l}</p><b className={u ? '' : 'txt'}>{val}{u && <sup>{u}</sup>}</b></div>)}</div>
        <p className="det-status"><Img name="check-circle" /><b>Status pemeriksaan: Sehat</b><span>Tercatat</span></p>
        <h3 className="det-h">Catatan &amp; tindak lanjut</h3>
        <p className="det-note">{balita ? 'Pertumbuhan baik. Lanjutkan pemantauan rutin setiap bulan.' : 'Tidak ada keluhan pusing atau bengkak. Lanjutkan kunjungan rutin.'}</p>
        <small className="det-id">{balita ? 'ID: PEM-BLT-20241012-001 • Dicatat 12 Oktober 2024, 09:30 WIB' : 'ID: PEM-IH-20241014-001 • Dicatat 14 Oktober 2024, 09:15 WIB'}</small>
      </div>
    </Modal>
  )
}
