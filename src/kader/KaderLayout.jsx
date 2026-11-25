import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { Img, MaskIcon } from './ui.jsx'
import { KADER, TANGGAL } from './data.js'
import './kader.css'

const master = [['ibu-hamil', 'nav-ibu', 'Data Ibu Hamil'], ['balita', 'nav-balita', 'Data Balita'], ['riwayat', 'nav-riwayat', 'Riwayat Pemeriksaan']]

function Item({ to, icon, label, end }) {
  return <NavLink to={to} end={end} className="knav" title={label}><MaskIcon name={icon} /><span className="knav-txt">{label}</span></NavLink>
}

export default function KaderLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isDetail = pathname.split('/').length > 3
  const [mini, setMini] = useState(isDetail)
  const [menu, setMenu] = useState(false)
  useEffect(() => setMini(isDetail), [isDetail])

  return (
    <div className={'kdash' + (mini ? ' mini' : '')}>
      <aside className="kside">
        <div className="kside-head">
          <img src={logo} alt="" /><span>E-Posyandu</span>
          <button type="button" className="kside-toggle" onClick={() => setMini(!mini)} aria-label={mini ? 'Lebarkan menu' : 'Ciutkan menu'}><Img name="chevron-left" /></button>
        </div>
        <nav aria-label="Menu kader">
          <p className="kside-lbl">Menu Utama</p>
          <Item to="/kader" end icon="nav-beranda" label="Beranda" />
          <p className="kside-lbl">Master Data</p>
          {master.map(([to, icon, label]) => <Item key={to} to={'/kader/' + to} icon={icon} label={label} />)}
          <hr />
          <Item to="/kader/laporan" icon="nav-laporan" label="Laporan" />
        </nav>
      </aside>
      <div className="kmain">
        <header className="khead">
          <p>{TANGGAL}</p>
          <div className="kuser">
            <button type="button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-haspopup="menu">
              <span className="kavatar"><Img name="avatar-kader" /></span>
              <span><b>{KADER.nama}</b><small>{KADER.peran}</small></span>
              <Img name="caret" />
            </button>
            {menu && <div className="kuser-menu" role="menu"><button type="button" role="menuitem" onClick={() => navigate('/login')}>Keluar</button></div>}
          </div>
        </header>
        <main className="kcontent"><Outlet /></main>
      </div>
    </div>
  )
}
