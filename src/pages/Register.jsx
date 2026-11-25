import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BluePanel, Tabs } from './AuthShell.jsx'

export default function Register() {
  const [nik, setNik] = useState('')
  const [role, setRole] = useState('balita')
  return (
    <main className="auth">
      <div className="auth-card flip">
        <section className="form-side">
          <h1>Daftar Akun Keluarga E-Posyandu</h1>
          <p className="muted">Daftarkan NIK dan nomor WhatsApp Anda untuk memantau tumbuh kembang balita dan kesehatan kehamilan.</p>
          <Tabs active="register" />
          <div className="info">NIK terverifikasi otomatis dengan data Dukcapil/Desa untuk sinkronisasi Buku KIA dan jadwal imunisasi balita.</div>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>Nama Lengkap Ibu / Kepala Keluarga *</label>
            <div className="input"><span>👤</span><input placeholder="cth. Siti Rahmawati" /></div>
            <div className="lbl-row"><label>Nomor Induk Kependudukan (NIK) *</label><small>{nik.length}/16</small></div>
            <div className="input"><span>🪪</span><input value={nik} maxLength={16} onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))} placeholder="16 digit NIK sesuai KTP / KK" /></div>
            <small className="hint">NIK terverifikasi otomatis dengan data Dukcapil/Desa</small>
            <div className="lbl-row"><label>Nomor WhatsApp Aktif *</label><small className="green-t">Notifikasi Posyandu</small></div>
            <div className="input"><span className="cc">+62</span><input placeholder="cth. 081234567890" /></div>
            <small className="hint">Digunakan untuk pengingat jadwal posyandu H-1 dan verifikasi OTP</small>
            <label>Pilihan Peran Pendaftaran *</label>
            <div className="radios">
              {[['balita', 'Ibu Memiliki Balita (0–5 Thn)'], ['hamil', 'Ibu Hamil (ANC)'], ['both', 'Keduanya (Hamil & Balita)']].map(([v, t]) => (
                <label key={v} className="radio"><input type="radio" name="peran" checked={role === v} onChange={() => setRole(v)} /> {t}</label>
              ))}
            </div>
            <label>Wilayah / RT RW Domisili *</label>
            <select className="input select"><option>Pilih Dusun / RT RW Pos Layanan</option><option>Dusun Krajan</option><option>Dusun Wetan</option></select>
            <div className="two">
              <div><label>Buat Kata Sandi Baru *</label><div className="input"><span>🔒</span><input type="password" placeholder="Minimal 6 karakter" /><span>👁</span></div></div>
              <div><label>Konfirmasi Kata Sandi *</label><div className="input"><span>🔒</span><input type="password" placeholder="Ulangi kata sandi" /><span>👁</span></div></div>
            </div>
            <label className="check"><input type="checkbox" /> Saya menyetujui data kesehatan keluarga saya dicatat dan disinkronkan dengan Posyandu & Bidan Desa secara aman.</label>
            <button className="submit">Daftar Akun E-Posyandu</button>
          </form>
          <p className="foot">Sudah punya akun E-Posyandu? <Link to="/login"><b>Masuk di sini</b></Link></p>
        </section>
        <BluePanel tag="PENDAFTARAN WARGA DESA" title="Keuntungan Mendaftar Akun Keluarga"
          text="Dapatkan kemudahan akses rekam kesehatan digital, pantau grafik pertumbuhan balita, dan jangan lewatkan imunisasi rutin di posyandu desa."
          photoCaption={['Buku KIA & KMS Elektronik', 'Bebas risiko buku hilang atau robek']}
          feats={[['Pengingat Posyandu & Imunisasi Otomatis', 'Pemberitahuan resmi H-1 via pesan WhatsApp dari Kader Posyandu.'], ['Kurva KMS Digital & Berat Badan Real-Time', 'Pantau status gizi dan grafik timbangan balita tanpa buku KIA fisik hilang.'], ['Konsultasi Cepat Bidan & Kader Terdekat', 'Dukungan siap untuk keluhan kehamilan, MP-ASI, dan rujukan Puskesmas.']]} />
      </div>
    </main>
  )
}
