import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import heroIllus from '../assets/hero-illus.svg'
import artGizi from '../assets/art-gizi.svg'
import artHamil from '../assets/art-hamil.svg'
import artKms from '../assets/art-kms.svg'
import icHeart from '../assets/ic-heart.svg'

const nav = [['Jadwal', 'jadwal'], ['Kader', 'kader'], ['Alur Layanan', 'alur-layanan'], ['Edukasi', 'edukasi'], ['Statistik', 'statistik']]
const filters = ['Semua Jadwal', 'Balita', 'Ibu Hamil', 'Imunisasi & PMT']
const jadwal = [
  { d: '04', h: 'Jumat', tag: 'Balita', tc: 'green', t: 'Penimbangan & Pemantauan KMS Balita', p: 'Penimbangan berat badan, pengukuran tinggi/panjang badan balita, serta pencatatan grafik KMS di Buku KIA.', w: '08:00 – 11:00 WIB', note: 'Bawa Buku KIA', nc: 'amber', pj: 'Ibu Wahyu Ningsih' },
  { d: '10', h: 'Kamis', tag: 'Ibu Hamil', tc: 'blue', t: 'Pemeriksaan Ibu Hamil & Kelas Bumil', p: 'Pemeriksaan kehamilan (ANC), pengukuran LILA, tensi, edukasi tanda bahaya kehamilan, dan pembagian Tablet Tambah Darah.', w: '08:30 – 11:30 WIB', note: 'Bawa Buku KIA Pink', nc: 'amber', pj: 'Bidan Rina Marlina' },
  { d: '15', h: 'Selasa', tag: 'Imunisasi & PMT', tc: 'yellow', t: 'Imunisasi Dasar Balita & Pemberian PMT', p: 'Pelayanan imunisasi dasar sesuai jadwal usia anak, konseling MPASI protein hewani, serta penyaluran PMT bergizi.', w: '08:30 – 11:00 WIB', note: 'Gratis PMT', nc: 'green', pj: 'Ibu Siti Aminah' },
]
const stat = [['Ibu Hamil Aktif', 22, 'Bumil', 'Terpantau ANC & LILA'], ['Bayi (0–11 Bulan)', 34, 'Bayi', 'ASI Eksklusif & Imunisasi Dasar'], ['Balita (12–59 Bulan)', 86, 'Balita', 'Pemantauan KMS & Gizi Rutin']]
const meja = [
  ['Pendaftaran', '', 'blue', 'Pencatatan kehadiran ibu hamil & balita serta pemeriksaan kelengkapan Buku KIA.'],
  ['Penimbangan', 'green', 'green', 'Penimbangan berat badan balita, pengukuran tinggi badan, dan pengukuran LILA ibu hamil.'],
  ['Pencatatan KMS', '', 'blue', 'Pengisian grafik berat badan pada KMS di Buku KIA dan rekapitulasi pertumbuhan anak.'],
  ['Penyuluhan & PMT', 'green', 'green', 'Konseling gizi ibu hamil & MPASI balita, tindak lanjut hasil timbang, serta pembagian PMT.'],
  ['Pelayanan Bidan', 'dark', 'blue', 'Pemeriksaan kehamilan, imunisasi dasar balita, pemberian vitamin A, dan layanan medis bidan.'],
]
const kader = [
  ['SA', '', 'Koordinator', 'yellow', 'Ibu Hj. Siti Aminah', 'Ketua Kader Posyandu RW-08', 'Mengkoordinir pelayanan Meja 1 pendaftaran, verifikasi data sasaran, dan rekap bulanan KIA.', 'Pendaftaran & Koordinator Warga'],
  ['RM', 'green', 'Bidan KIA', 'blue', 'Bidan Rina Marlina, A.Md.Keb', 'Bidan Pendamping Posyandu', 'Menangani Meja 5: pemeriksaan kehamilan (ANC), imunisasi dasar balita, dan konsultasi risiko kehamilan.', 'Pelayanan Medis & Imunisasi'],
  ['WN', '', 'Kader KMS', 'green', 'Ibu Wahyu Ningsih', 'Kader Penimbangan & Pencatatan KMS', 'Bertugas di Meja 2 dan Meja 3 untuk penimbangan balita, ukur LILA bumil, dan pengisian grafik KMS.', 'Timbang Ukur & Grafik KMS'],
  ['NH', 'green', 'Kader Gizi', 'green', 'Ibu Nurul Hidayah', 'Kader Penyuluhan Gizi & PMT', 'Bertugas di Meja 4 untuk edukasi MPASI, kelas ibu hamil, serta distribusi PMT bagi bumil & balita.', 'Edukasi Gizi & Distribusi PMT'],
]
const artikel = [
  [artGizi, 'green', 'Gizi & MPASI', '22 Nov 2026 • 3 Menit Baca', 'Menu MPASI Kaya Protein Hewani untuk Balita RW-08', 'Kombinasi bahan pangan lokal seperti telur, ikan, dan kacang-kacangan dengan tekstur bertahap sesuai usia anak.', 'Materi Edukasi Gizi Balita'],
  [artHamil, 'amber', 'Kehamilan Sehat', '18 Nov 2026 • 4 Menit Baca', 'Tanda Bahaya Kehamilan & Rutinitas Tablet Tambah Darah', 'Kenali gejala yang perlu segera diperiksakan ke bidan serta manfaat minum Tablet Tambah Darah secara teratur.', 'Panduan Kesehatan Ibu Hamil'],
  [artKms, 'blue', 'Imunisasi & KMS', '12 Nov 2026 • 3 Menit Baca', 'Membaca Grafik KMS & Kelengkapan Imunisasi Dasar', 'Pahami arti kenaikan berat badan pada grafik KMS dan lengkapi imunisasi dasar bayi sesuai jadwal posyandu.', 'Literasi Buku KIA'],
]
const pintasan = [['Jadwal Kegiatan Posyandu', 'jadwal'], ['Statistik Ibu & Balita', 'statistik'], ['Alur Pelayanan Posyandu', 'alur-layanan'], ['Daftar Kader Posyandu Desa Sukamaju', 'kader'], ['Artikel & Edukasi KIA', 'edukasi']]

function SecHead({ title, desc }) {
  return <div className="sec-head"><h2>{title}</h2><p>{desc}</p></div>
}

export default function Landing() {
  const [filter, setFilter] = useState(filters[0])
  const shown = filter === filters[0] ? jadwal : jadwal.filter((j) => j.tag === filter)

  return (
    <div className="landing">
      <header className="site-header">
        <div className="container">
          <Link to="/" className="brand"><img src={logo} alt="" />E-Posyandu</Link>
          <div className="nav-group">
            <nav className="nav-links" aria-label="Navigasi bagian">
              {nav.map(([n, id]) => <a key={id} href={'#' + id}>{n}</a>)}
            </nav>
            <div className="nav-actions">
              <Link to="/login" className="pill outline">Masuk</Link>
              <Link to="/register" className="pill">Daftar Akun</Link>
            </div>
          </div>
        </div>
      </header>

      <section className="hero" id="beranda">
        <div className="container">
          <div className="hero-text">
            <h1>Layanan Kesehatan <span className="t-blue">Ibu Hamil</span><br />&amp; <span className="t-green">Balita</span> Desa Sukamaju</h1>
            <p>Informasi jadwal posyandu, pemantauan tumbuh kembang balita (usia 0–59 bulan), pemeriksaan kehamilan, serta edukasi gizi terpadu khusus warga di lingkungan Desa Sukamaju.</p>
            <a href="#jadwal" className="pill lg">Lihat Jadwal Posyandu</a>
          </div>
          <div className="hero-card">
            <div className="hero-svg"><img src={heroIllus} alt="Ilustrasi ibu dan balita di posyandu" /></div>
            <div className="nearest">
              <div className="nearest-top">
                <span className="badge green"><span className="badge-dot" />Jadwal Terdekat RW-08</span>
                <span className="badge amber">Bawa Buku KIA &amp; KMS</span>
              </div>
              <div className="nearest-body">
                <div className="date-mini"><small>DES</small><b>04</b></div>
                <div><p className="nearest-title">Penimbangan Balita &amp; Pemeriksaan Ibu Hamil</p><p className="meta-sm">Balai Warga RW-08 • Jumat, 08:00 – 11:00 WIB</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec alt" id="jadwal">
        <div className="container">
          <SecHead title="Jadwal Kegiatan Posyandu Desa Sukamaju" desc="Jadwal pelayanan khusus Ibu Hamil dan Balita (0–59 bulan) di wilayah Desa Sukamaju. Seluruh kegiatan dipusatkan di Balai Desa." />
          <div className="filter-bar">
            <div className="filters">
              {filters.map((f) => <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>)}
            </div>
            <span className="filter-note">Balai Desa Sukamaju</span>
          </div>
          <div className="grid3">
            {shown.map((j) => (
              <article className="card schedule" key={j.t}>
                <div className="card-top">
                  <div className="date-box"><small>DES</small><b>{j.d}</b><span>{j.h}</span></div>
                  <span className={'badge ' + j.tc}>{j.tag}</span>
                </div>
                <h3>{j.t}</h3>
                <p className="desc">{j.p}</p>
                <ul className="meta-list"><li><b>Waktu:</b> {j.w}</li><li><b>Tempat:</b> Balai Desa</li></ul>
                <div className="card-foot"><span className={'badge ' + j.nc}>{j.note}</span><span className="pj">PJ: {j.pj}</span></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="statistik">
        <div className="container">
          <SecHead title="Statistik Kesehatan Ibu & Balita RW-08" desc="Data sasaran aktif di lingkungan Desa Sukamaju untuk kelompok Ibu Hamil, Bayi (0–11 bulan), dan Balita (12–59 bulan)." />
          <div className="grid3 stats">
            {stat.map(([label, n, unit, sub], i) => (
              <div className={'card stat' + (i === 0 ? ' hl' : '')} key={label}>
                <div><p className="stat-label">{label}</p><div className="stat-value"><b>{n}</b><span>{unit}</span></div></div>
                <p className="stat-sub">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec alt" id="alur-layanan">
        <div className="container">
          <SecHead title="Alur Pelayanan 5 Meja Posyandu" desc="Langkah pelayanan berurutan dari Meja 1 hingga Meja 5 bagi Ibu Hamil dan Orang Tua Balita saat hadir di Posyandu Desa Sukamaju." />
          <div className="grid5">
            {meja.map(([t, numCls, badge, p], i) => (
              <div className="card meja" key={t}>
                <div className="card-top"><span className={'meja-num ' + numCls}>0{i + 1}</span><span className={'badge ' + badge}>Meja {i + 1}</span></div>
                <h3>{t}</h3>
                <p className="desc">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="kader">
        <div className="container">
          <SecHead title="Daftar Kader & Bidan Bertugas Desa Sukamaju" desc="Kader posyandu dan bidan pendamping yang bertugas melayani kesehatan ibu hamil serta balita di lingkungan Desa Sukamaju" />
          <div className="grid4">
            {kader.map(([ini, av, badge, bc, n, role, duty, tugas]) => (
              <div className="card kader" key={n}>
                <div className="card-top"><span className={'avatar ' + av}>{ini}</span><span className={'badge ' + bc}>{badge}</span></div>
                <h3>{n}</h3>
                <p className="kader-role">{role}</p>
                <p className="desc">{duty}</p>
                <p className="card-foot">Tugas: {tugas}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec alt" id="edukasi">
        <div className="container">
          <SecHead title="Artikel & Edukasi Kesehatan Ibu dan Anak" desc="Materi edukasi singkat untuk orang tua balita (0–59 bulan) dan ibu hamil di Desa Sukamaju seputar gizi, imunisasi, dan kehamilan sehat." />
          <div className="grid3">
            {artikel.map(([img, c, tag, meta, t, p, foot]) => (
              <article className="card art" key={t}>
                <div className={'art-thumb ' + c}><img src={img} alt="" /></div>
                <div className="art-body">
                  <span className={'badge ' + c}>{tag}</span>
                  <p className="art-meta">{meta}</p>
                  <h3>{t}</h3>
                  <p className="desc">{p}</p>
                </div>
                <p className="card-foot">{foot}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">
                <span className="brand-mark"><img src={icHeart} alt="" /></span>
                <div><b>Posyandu Melati RW-08</b><small>Ibu Hamil &amp; Balita (0–59 Bulan)</small></div>
              </div>
              <p className="footer-desc">Prototipe tampilan informasi Posyandu Melati RW-08 khusus pelayanan kesehatan ibu hamil dan balita di lingkungan RW-08.</p>
            </div>
            <div>
              <h3>Pintasan Bagian</h3>
              <ul>{pintasan.map(([t, id]) => <li key={id}><a href={'#' + id}>{t}</a></li>)}</ul>
            </div>
            <div>
              <h3>Sekretariat Desa Sukamaju</h3>
              <ul><li>Balai Desa Sukamaju</li><li>Kontak Kader: Ibu Hj. Siti Aminah (0812-8008-0808)</li><li>Sasaran: Ibu Hamil &amp; Balita (0–59 Bulan)</li></ul>
            </div>
          </div>
          <p className="footer-bottom">© 2026 Posyandu Desa Sukamaju.</p>
        </div>
      </footer>
    </div>
  )
}
