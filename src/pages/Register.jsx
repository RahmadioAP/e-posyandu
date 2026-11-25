import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BluePanel, Tabs, PasswordInput } from './AuthShell.jsx'
import icAlarm from '../assets/ic-alarm.svg'
import icChart from '../assets/ic-chart.svg'
import icConsult from '../assets/ic-consult.svg'
import icShield from '../assets/ic-shield.svg'
import icUser from '../assets/ic-user.svg'
import icIdcard from '../assets/ic-idcard.svg'
import icLock from '../assets/ic-lock.svg'
import icLockReset from '../assets/ic-lock-reset.svg'
import icUserCheck from '../assets/ic-user-check.svg'

const peran = [['balita', 'Ibu Memiliki Balita (0-5 Thn)'], ['hamil', 'Ibu Hamil (ANC)'], ['both', 'Keduanya (Hamil & Balita)']]

export default function Register() {
  const [nik, setNik] = useState('')
  const [role, setRole] = useState('balita')
  return (
    <main className="auth">
      <div className="auth-card flip">
        <section className="form-side">
          <h1>Daftar Akun Keluarga E-Posyandu</h1>
          <p className="lead">Daftarkan NIK dan nomor WhatsApp Anda untuk memantau tumbuh kembang balita dan kesehatan kehamilan.</p>
          <Tabs active="register" />
          <form className="stack" onSubmit={(e) => e.preventDefault()}>
            <div className="info"><img src={icShield} alt="" />NIK terverifikasi otomatis dengan data Dukcapil/Desa untuk sinkronisasi Buku KIA dan jadwal imunisasi balita.</div>
            <div className="field">
              <label htmlFor="nama">Nama Lengkap Ibu / Kepala Keluarga *</label>
              <div className="input"><img src={icUser} alt="" /><input id="nama" placeholder="cth. Siti Rahmawati" autoComplete="name" /></div>
            </div>
            <div className="field">
              <div className="lbl-row"><label htmlFor="nik">Nomor Induk Kependudukan (NIK) *</label><small>{nik.length}/16</small></div>
              <div className="input"><img src={icIdcard} alt="" /><input id="nik" inputMode="numeric" value={nik} maxLength={16} onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))} placeholder="16 digit NIK sesuai KTP / KK" /></div>
              <small className="hint">NIK terverifikasi otomatis dengan data Dukcapil/Desa</small>
            </div>
            <div className="field">
              <div className="lbl-row"><label htmlFor="wa">Nomor WhatsApp Aktif *</label><small className="green-t">Notifikasi Posyandu</small></div>
              <div className="input phone"><span className="cc">+62</span><input id="wa" type="tel" placeholder="cth. 081234567890" autoComplete="tel-national" /></div>
              <small className="hint">Digunakan untuk pengingat jadwal posyandu H-1 dan verifikasi OTP</small>
            </div>
            <fieldset className="field">
              <legend className="lbl">Pilihan Peran Pendaftaran *</legend>
              <div className="radios">
                {peran.map(([v, t]) => (
                  <label key={v} className="radio"><input type="radio" name="peran" checked={role === v} onChange={() => setRole(v)} /> {t}</label>
                ))}
              </div>
            </fieldset>
            <div className="field">
              <label htmlFor="wilayah">Wilayah / RT RW Domisili *</label>
              <div className="input">
                <select id="wilayah" defaultValue=""><option value="" disabled>Pilih Dusun / RT RW Pos Layanan</option><option>Dusun Krajan</option><option>Dusun Wetan</option></select>
              </div>
            </div>
            <div className="two">
              <div className="field"><label htmlFor="pw1">Buat Kata Sandi Baru *</label><PasswordInput id="pw1" icon={icLock} placeholder="Minimal 6 karakter" /></div>
              <div className="field"><label htmlFor="pw2">Konfirmasi Kata Sandi *</label><PasswordInput id="pw2" icon={icLockReset} placeholder="Ulangi kata sandi" /></div>
            </div>
            <label className="check"><input type="checkbox" /> Saya menyetujui data kesehatan keluarga saya dicatat dan disinkronkan dengan Posyandu &amp; Bidan Desa secara aman.</label>
            <button className="submit">Daftar Akun E-Posyandu <img src={icUserCheck} alt="" /></button>
          </form>
          <p className="foot">Sudah punya akun E-Posyandu? <Link to="/login"><b>Masuk di sini</b></Link></p>
        </section>
        <BluePanel tag="Pendaftaran Warga Desa" title="Keuntungan Mendaftar Akun Keluarga"
          text="Dapatkan kemudahan akses rekam kesehatan digital, pantau grafik pertumbuhan balita, dan jangan lewatkan imunisasi rutin di posyandu desa."
          feats={[
            [icAlarm, 'green', 'Pengingat Posyandu & Imunisasi Otomatis', 'Pemberitahuan resmi H-1 via pesan WhatsApp langsung dari Kader Posyandu.'],
            [icChart, 'mint', 'Kurva KMS Digital & Berat Badan Real-Time', 'Pantau status gizi dan grafik timbangan balita tanpa cemas buku KIA fisik hilang.'],
            [icConsult, 'sky', 'Konsultasi Cepat Bidan & Kader Terdekat', 'Dukungan sigap untuk keluhan kehamilan, MP-ASI, dan rujukan Puskesmas.'],
          ]} />
      </div>
    </main>
  )
}
