import { useEffect, useRef } from 'react'
import { ic } from './icons.js'

export function Img({ name, size, alt = '' }) {
  return <img src={ic[name]} alt={alt} style={size ? { width: size, height: size } : undefined} />
}

// Ikon monokrom yang warnanya ikut `color` (dipakai di sidebar untuk status aktif).
export function MaskIcon({ name, size = 18 }) {
  return <span className="mask-ico" style={{ width: size, height: size, WebkitMaskImage: `url(${ic[name]})`, maskImage: `url(${ic[name]})` }} />
}

export function Btn({ kind = 'primary', icon, children, ...p }) {
  return <button type="button" className={'kbtn ' + kind} {...p}>{icon && <Img name={icon} />}{children}</button>
}

export function Badge({ tone = 'blue', children }) {
  return <span className={'kbadge ' + tone}>{children}</span>
}

export function StatCard({ label, value, unit, icon, tone = 'blue', sub }) {
  return (
    <div className="kcard stat-card">
      <div>
        <p className="stat-lbl">{label}</p>
        <p className={'stat-val ' + tone}>{value}{unit && <small>{unit}</small>}</p>
        {sub && <p className="stat-sub2">{sub}</p>}
      </div>
      <span className={'stat-ico ' + tone}><Img name={icon} /></span>
    </div>
  )
}

export function Select({ label, options, value, onChange }) {
  return (
    <label className="kselect">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange?.(e.target.value)}>
        <option value="">{label}</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <Img name="chevron-down" />
    </label>
  )
}

export function SearchBox({ placeholder, value, onChange }) {
  return (
    <label className="ksearch">
      <Img name="search" />
      <input type="search" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  )
}

export function Pagination({ page, pages, total, from, to, unit = 'peserta', onPage }) {
  return (
    <div className="kpager">
      <span>Menampilkan <b>{total ? from : 0} – {to}</b> dari <b>{total}</b> {unit}</span>
      <div>
        <button type="button" disabled={page === 1} onClick={() => onPage(page - 1)}>‹ Sebelumnya</button>
        {Array.from({ length: pages }, (_, i) => (
          <button type="button" key={i} className={page === i + 1 ? 'on' : ''} onClick={() => onPage(i + 1)}>{i + 1}</button>
        ))}
        <button type="button" disabled={page === pages} onClick={() => onPage(page + 1)}>Selanjutnya ›</button>
      </div>
    </div>
  )
}

export function paginate(rows, page, size = 6) {
  const pages = Math.max(1, Math.ceil(rows.length / size))
  const p = Math.min(page, pages)
  return { rows: rows.slice((p - 1) * size, p * size), page: p, pages, total: rows.length, from: (p - 1) * size + 1, to: Math.min(p * size, rows.length) }
}

export function Modal({ icon, title, sub, onClose, footer, children }) {
  const ref = useRef(null)
  useEffect(() => {
    const d = ref.current
    d.showModal()
    return () => d.close()
  }, [])
  return (
    <dialog ref={ref} className="kmodal" onCancel={(e) => { e.preventDefault(); onClose() }} aria-labelledby="kmodal-title">
      <header>
        <span className="kmodal-ico"><Img name={icon} /></span>
        <div><h2 id="kmodal-title">{title}</h2><p>{sub}</p></div>
        <button type="button" className="kmodal-x" onClick={onClose} aria-label="Tutup"><Img name="close" /></button>
      </header>
      <div className="kmodal-body">{children}</div>
      <footer>{footer}</footer>
    </dialog>
  )
}

export function Field({ label, req, opt, children, wide }) {
  return (
    <label className={'kfield' + (wide ? ' wide' : '')}>
      <span className="kfield-lbl">{label}{req && <b> *</b>}{opt && <i> (Opsional)</i>}</span>
      {children}
    </label>
  )
}

export function Input({ icon, iconEnd, suffix, ...p }) {
  return (
    <span className="kinput">
      {icon && <Img name={icon} />}
      <input {...p} />
      {suffix && <em>{suffix}</em>}
      {iconEnd && <Img name={iconEnd} />}
    </span>
  )
}
