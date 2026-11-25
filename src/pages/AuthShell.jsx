import { useState } from 'react'
import { Link } from 'react-router-dom'
import logoWhite from '../assets/logo-white.svg'
import photo from '../assets/photo-kia.jpg'
import icBook from '../assets/ic-book.svg'
import icEye from '../assets/ic-eye.svg'
import tabLoginOn from '../assets/ic-tab-login-on.svg'
import tabLoginOff from '../assets/ic-tab-login-off.svg'
import tabRegOn from '../assets/ic-tab-reg-on.svg'
import tabRegOff from '../assets/ic-tab-reg-off.svg'

export function BluePanel({ tag, title, text, feats }) {
  return (
    <aside className="blue-panel">
      <div className="blue-logo"><img src={logoWhite} alt="" />E-Posyandu</div>
      <div className="blue-body">
        <div>
          <p className="tagline">{tag}</p>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="photo">
          <img src={photo} alt="Ibu bermain bersama anak-anaknya" />
          <div className="photo-cap">
            <span className="ico mint ico-32"><img src={icBook} alt="" /></span>
            <div><b>Buku KIA &amp; KMS Elektronik</b><small>Bebas risiko buku hilang atau robek</small></div>
          </div>
        </div>
        <div className="feats">
          {feats.map(([icon, bg, t, d]) => (
            <div className="feat" key={t}>
              <span className={'ico ico-28 ' + bg}><img src={icon} alt="" /></span>
              <div><b>{t}</b><small>{d}</small></div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

export function Tabs({ active }) {
  const login = active === 'login'
  return (
    <nav className="auth-tabs">
      <Link to="/login" className={login ? 'on' : ''}><img src={login ? tabLoginOn : tabLoginOff} alt="" />Masuk ke Akun</Link>
      <Link to="/register" className={login ? '' : 'on'}><img src={login ? tabRegOff : tabRegOn} alt="" />Daftar Akun Baru</Link>
    </nav>
  )
}

export function PasswordInput({ id, icon, placeholder, autoComplete = 'new-password' }) {
  const [show, setShow] = useState(false)
  return (
    <div className="input pw">
      <img src={icon} alt="" />
      <input id={id} type={show ? 'text' : 'password'} placeholder={placeholder} minLength={6} autoComplete={autoComplete} />
      <button type="button" className="eye" onClick={() => setShow(!show)} aria-label={show ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}>
        <img src={icEye} alt="" />
      </button>
    </div>
  )
}
