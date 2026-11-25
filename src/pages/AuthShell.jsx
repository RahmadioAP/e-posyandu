import { Link } from 'react-router-dom'

export function Logo() {
  return <div className="logo"><span className="logo-mark">✚</span>E-Posyandu</div>
}

export function BluePanel({ tag, title, text, feats, photoCaption }) {
  return (
    <aside className="blue-panel">
      <Logo /><hr className="rule" />
      <small className="tagline">{tag}</small>
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="photo">{photoCaption && <div className="photo-cap"><span className="dot" /><div><b>{photoCaption[0]}</b><br />{photoCaption[1]}</div></div>}</div>
      {feats.map(([t, d]) => <div className="feat" key={t}><span className="ficon" /><div><b>{t}</b><br />{d}</div></div>)}
    </aside>
  )
}

export function Tabs({ active }) {
  return (
    <div className="auth-tabs">
      <Link to="/login" className={active === 'login' ? 'on' : ''}>Masuk ke Akun</Link>
      <Link to="/register" className={active === 'register' ? 'on' : ''}>Daftar Akun Baru</Link>
    </div>
  )
}
