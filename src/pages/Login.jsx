import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BluePanel, Tabs } from './AuthShell.jsx'

export default function Login() {
  const [show, setShow] = useState(false)
  return (
    <main className="auth">
      <div className="auth-card">
        <BluePanel tag="REKAM MEDIS DIGITAL DESA" title="Akses Rekam Medis Keluarga Anda"
          text="Pantau grafik KMS balita, jadwal imunisasi dasar lengkap, serta catatan kehamilan ibu kapan saja dalam genggaman."
          photoCaption={['Buku KIA & KMS Elektronik', 'Bebas risiko buku hilang atau robek']}
          feats={[['Pengingat WhatsApp H-1 Otomatis', 'Kader mengirim jadwal penimbangan & vitamin langsung ke ponsel Anda.'], ['Privasi Data Medis Terenkripsi', 'Keamanan NIK dan histori kesehatan diproteksi sesuai UU PDP.']]} />
        <section className="form-side">
          <h1>Selamat Datang di E-Posyandu</h1>
          <p className="muted">Silakan masuk dengan akun terdaftar atau daftarkan anggota keluarga Anda.</p>
          <Tabs active="login" />
          <div className="otp"><span className="ficon green" /><div><b>Lupa Kata Sandi?</b><br /><small>Masuk instan dengan verifikasi WhatsApp</small></div><button type="button" className="otp-btn">Kirim Kode OTP</button></div>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>Nomor WhatsApp atau NIK Ibu / KK</label>
            <div className="input"><span>🪪</span><input placeholder="Masukkan NIK 16 digit atau No. WhatsApp" /></div>
            <div className="lbl-row"><label>Kata Sandi</label><a href="#">Lupa Sandi?</a></div>
            <div className="input"><span>🔒</span><input type={show ? 'text' : 'password'} placeholder="Minimal 6 karakter" /><button type="button" className="eye" onClick={() => setShow(!show)}>👁</button></div>
            <label className="check"><input type="checkbox" defaultChecked /> Ingat sesi saya di perangkat ini</label>
            <button className="submit">Masuk ke Portal E-Posyandu →</button>
          </form>
          <p className="foot">Belum pernah didata oleh Kader Posyandu? Hubungi <b>Bidan Desa Siaga</b> atau daftar mandiri lewat tab pendaftaran.</p>
        </section>
      </div>
    </main>
  )
}
