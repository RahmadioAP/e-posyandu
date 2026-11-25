import { useNavigate } from 'react-router-dom'
import { BluePanel, Tabs, PasswordInput } from './AuthShell.jsx'
import icAlarm from '../assets/ic-alarm.svg'
import icShieldLock from '../assets/ic-shield-lock.svg'
import icChat from '../assets/ic-chat.svg'
import icIdcard from '../assets/ic-idcard.svg'
import icLock from '../assets/ic-lock.svg'
import icArrow from '../assets/ic-arrow-right.svg'

export default function Login() {
  const navigate = useNavigate()
  return (
    <main className="auth">
      <div className="auth-card">
        <BluePanel tag="Rekam Medis Digital Desa" title="Akses Rekam Medis Keluarga Anda"
          text="Pantau grafik KMS balita, jadwal imunisasi dasar lengkap, serta catatan kehamilan ibu kapan saja dalam genggaman."
          feats={[
            [icAlarm, 'green', 'Pengingat WhatsApp H-1 Otomatis', 'Kader mengirim jadwal penimbangan & vitamin langsung ke ponsel Anda.'],
            [icShieldLock, 'sky', 'Privasi Data Medis Terenkripsi', 'Keamanan NIK dan histori kesehatan diproteksi sesuai UU PDP.'],
          ]} />
        <section className="form-side">
          <h1>Selamat Datang di E-Posyandu</h1>
          <p className="lead">Silakan masuk dengan akun terdaftar atau daftarkan anggota keluarga Anda.</p>
          <Tabs active="login" />
          <div className="stack">
            <div className="otp">
              <div>
                <span className="otp-ico"><img src={icChat} alt="" /></span>
                <div><b>Lupa Kata Sandi?</b><small>Masuk instan dengan verifikasi WhatsApp</small></div>
              </div>
              <button type="button" className="otp-btn">Kirim Kode OTP</button>
            </div>
            {/* shortcut: belum ada autentikasi, submit langsung ke dashboard kader */}
            <form className="stack" onSubmit={(e) => { e.preventDefault(); navigate('/kader') }}>
              <div className="field">
                <label htmlFor="ident">Nomor WhatsApp atau NIK Ibu / KK</label>
                <div className="input"><img src={icIdcard} alt="" /><input id="ident" placeholder="Masukkan NIK 16 digit atau No. WhatsApp" autoComplete="username" /></div>
              </div>
              <div className="field">
                <div className="lbl-row"><label htmlFor="pw">Kata Sandi</label><a href="#">Lupa Sandi?</a></div>
                <PasswordInput id="pw" icon={icLock} placeholder="Minimal 6 karakter" autoComplete="current-password" />
              </div>
              <label className="check"><input type="checkbox" defaultChecked /> Ingat sesi saya di perangkat ini</label>
              <button className="submit">Masuk ke Portal E-Posyandu <img src={icArrow} alt="" /></button>
            </form>
          </div>
          <p className="foot">Belum pernah didata oleh Kader Posyandu? Hubungi <b>Bidan Desa Siaga</b> atau daftar mandiri lewat tab pendaftaran.</p>
        </section>
      </div>
    </main>
  )
}
