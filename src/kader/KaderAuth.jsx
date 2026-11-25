import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { Img } from './ui.jsx'
import './kader.css'

const langkah = [
  ['Kelola data peserta', 'Data balita dan ibu hamil tertata rapi.'],
  ['Catat hasil pemeriksaan', 'Pantau pertumbuhan dan kesehatan warga.'],
  ['Siapkan laporan', 'Rekap pelayanan untuk tindak lanjut.'],
]

function Shell({ children }) {
  return (
    <div className="ka">
      <aside className="ka-side">
        <div className="ka-brand">
          <img src={logo} alt="" /><span>E-Posyandu</span>
          <span className="ka-expand" aria-hidden="true"><Img name="chevron-left" /></span>
        </div>
        <div className="ka-intro">
          <span className="ka-label">LAYANAN KESEHATAN DESA</span>
          <h2>Bersama menjaga<br />ibu dan buah hati.</h2>
          <p>Pencatatan lebih mudah, pelayanan lebih terarah. Dampingi tumbuh kembang balita dan kesehatan ibu hamil dalam satu tempat.</p>
          <div className="ka-steps">
            <h3>Lebih mudah melayani warga</h3>
            {langkah.map(([t, d], i) => (
              <div key={t} className="ka-step"><span>0{i + 1}</span><div><b>{t}</b><small>{d}</small></div></div>
            ))}
          </div>
        </div>
        <div className="ka-privacy"><b>Untuk kader dan petugas Posyandu</b><span>Jaga kerahasiaan akun dan data kesehatan warga.</span></div>
      </aside>
      <main className="ka-form">
        <p className="ka-help">Butuh bantuan? <a href="mailto:">Hubungi admin</a></p>
        {children}
        <p className="ka-foot">E-Posyandu · Pelayanan dekat, keluarga sehat.</p>
      </main>
    </div>
  )
}

function Pw({ id, placeholder, minLength, autoComplete, onChange }) {
  const [show, setShow] = useState(false)
  return (
    <span className="ka-input">
      <input id={id} type={show ? 'text' : 'password'} placeholder={placeholder} required minLength={minLength} autoComplete={autoComplete} onChange={onChange} />
      <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}>{show ? 'Tutup' : 'Lihat'}</button>
    </span>
  )
}

export function KaderLogin() {
  const navigate = useNavigate()
  return (
    <Shell>
      {/* shortcut: belum ada autentikasi, submit langsung ke dashboard kader */}
      <form className="ka-card" onSubmit={(e) => { e.preventDefault(); navigate('/kader') }}>
        <header className="ka-head">
          <p className="ka-eyebrow">AKSES KADER POSYANDU</p>
          <h1>Selamat datang kembali</h1>
          <p>Masuk untuk melanjutkan pelayanan dan<br />pencatatan kesehatan warga.</p>
        </header>
        <div className="ka-fields">
          <label className="ka-field" htmlFor="ka-email">Email<span className="ka-input"><input id="ka-email" type="email" required placeholder="nama@email.com" autoComplete="email" /></span></label>
          <div className="ka-field"><label htmlFor="ka-pw">Kata sandi</label><Pw id="ka-pw" placeholder="Masukkan kata sandi" autoComplete="current-password" /></div>
        </div>
        <div className="ka-opts">
          <label className="ka-check"><input type="checkbox" />Ingat saya</label>
          <a href="mailto:">Lupa kata sandi?</a>
        </div>
        <div className="ka-actions">
          <button type="submit" className="ka-submit">Masuk</button>
          <p className="ka-switch">Belum punya akun? <Link to="/kader/daftar">Daftar sekarang</Link></p>
        </div>
      </form>
    </Shell>
  )
}

export function KaderDaftar() {
  const navigate = useNavigate()
  const [pw, setPw] = useState('')
  return (
    <Shell>
      {/* shortcut: belum ada backend, akun tidak tersimpan; diarahkan ke halaman masuk */}
      <form className="ka-card sm" onSubmit={(e) => {
        e.preventDefault()
        const c = e.currentTarget.elements['kd-pw2']
        if (c.value !== pw) { c.setCustomValidity('Kata sandi tidak sama'); c.reportValidity(); return }
        navigate('/kader/login')
      }}>
        <header className="ka-head">
          <p className="ka-eyebrow">AKSES KADER POSYANDU</p>
          <h1>Buat akun kader</h1>
          <p>Daftarkan diri untuk mulai mengelola pelayanan<br />Posyandu di wilayah Anda.</p>
        </header>
        <div className="ka-fields">
          <label className="ka-field" htmlFor="kd-nama">Nama lengkap<span className="ka-input"><input id="kd-nama" required placeholder="Masukkan nama lengkap" autoComplete="name" /></span></label>
          <label className="ka-field" htmlFor="kd-email">Email<span className="ka-input"><input id="kd-email" type="email" required placeholder="nama@email.com" autoComplete="email" /></span></label>
          <label className="ka-field" htmlFor="kd-kode">Kode Posyandu<span className="ka-input"><input id="kd-kode" required placeholder="Masukkan kode dari admin" /></span></label>
          <div className="ka-field"><label htmlFor="kd-pw">Kata sandi</label><Pw id="kd-pw" placeholder="Minimal 8 karakter" minLength={8} autoComplete="new-password" onChange={(e) => setPw(e.target.value)} /></div>
          <div className="ka-field"><label htmlFor="kd-pw2">Konfirmasi kata sandi</label>
            <Pw id="kd-pw2" placeholder="Ulangi kata sandi" minLength={8} autoComplete="new-password" onChange={(e) => e.target.setCustomValidity('')} />
          </div>
        </div>
        <label className="ka-check top"><input type="checkbox" required />Saya menyetujui Syarat &amp; Ketentuan serta<br />Kebijakan Privasi E-Posyandu.</label>
        <div className="ka-actions">
          <button type="submit" className="ka-submit">Buat akun</button>
          <p className="ka-switch">Sudah punya akun? <Link to="/kader/login">Masuk di sini</Link></p>
        </div>
        <p className="ka-note">Akun kader diverifikasi oleh admin Posyandu<br />sebelum dapat digunakan.</p>
      </form>
    </Shell>
  )
}
