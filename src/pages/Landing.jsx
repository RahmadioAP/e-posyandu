import { Link } from 'react-router-dom'

const jadwal = [
  { d: '04', m: 'Des', tag: 'Balita', t: 'Penimbangan & Pemeriksaan KMS Balita', p: 'Penimbangan rutin, tinggi badan, dan pencatatan grafik KMS di Pos 01.', w: '08.00 – 11.00 WIB', l: 'Pos 01 Dusun Krajan', s: 'Terbuka' },
  { d: '10', m: 'Des', tag: 'Ibu Hamil', t: 'Pemeriksaan Ibu Hamil & Kelas Ibu', p: 'Pemeriksaan tekanan darah, ANC, tablet tambah darah, dan konseling gizi.', w: '08.00 – 11.00 WIB', l: 'Balai Desa', s: 'Segera Penuh' },
  { d: '15', m: 'Des', tag: 'Imunisasi', t: 'Imunisasi Dasar Balita & Pemberian PMT', p: 'Imunisasi dasar lengkap, serta pemberian makanan tambahan balita.', w: '09.00 – 12.00 WIB', l: 'Pos 02 Dusun Wetan', s: 'Terbuka' },
]
const stat = [['Ibu Hamil Aktif', 22, 'Terpantau ANC & K4'], ['Balita Terdaftar', 34, 'Rutin ditimbang tiap bulan'], ['Balita Tertimbang', 86, 'Persentase partisipasi bulan ini']]
const alur = [['Pendaftaran', 'Meja 1', 'Registrasi warga & cek buku KIA di meja pendaftaran.'], ['Penimbangan', 'Meja 2', 'Timbang berat badan dan ukur tinggi badan anak.'], ['Pencatatan KMS', 'Meja 3', 'Hasil ditulis pada buku KIA dan grafik KMS.'], ['Penyuluhan & PMT', 'Meja 4', 'Konseling gizi dan pemberian makanan tambahan.'], ['Pelayanan Bidan', 'Meja 5', 'Imunisasi, vitamin A, dan pemeriksaan ibu hamil.']]
const kader = [['SA', 'Ibu Hj. Siti Aminah', 'Ketua Kader Posyandu', 'Koordinasi seluruh kegiatan posyandu dan pelaporan.'], ['DM', 'Bidan Dewi Marlina', 'Bidan Desa', 'Pemeriksaan ibu hamil, imunisasi, dan konseling gizi.'], ['WH', 'Ibu Wahyu Hidayati', 'Kader Penimbangan', 'Penimbangan balita dan pencatatan grafik KMS.'], ['NH', 'Ibu Nur Hidayah', 'Kader Gizi', 'Penyuluhan gizi dan pemberian makanan tambahan.']]
const artikel = [['Resep MPASI', 'Menu MPASI Kaya Protein Hewani untuk Balita', '#e3f3ea'], ['Ibu Hamil', 'Tanda Bahaya Kehamilan & Rutinitas Tablet Tambah Darah', '#fdf0dc'], ['Pertumbuhan', 'Membaca Grafik KMS & Kelengkapan Imunisasi Dasar', '#e4ecfb']]

export default function Landing() {
  return (
    <div className="landing">
      <header className="nav">
        <nav>
          {['Jadwal', 'Kader', 'Alur Layanan', 'Edukasi', 'Statistik'].map((n) => <a key={n} href={'#' + n.toLowerCase().replace(' ', '-')}>{n}</a>)}
          <Link to="/login" className="nav-link-strong">Masuk</Link>
          <Link to="/register" className="btn btn-sm">Daftar Akun Baru</Link>
        </nav>
      </header>

      <section className="hero">
        <div>
          <h1>Layanan Kesehatan <span className="blue">Ibu Hamil</span> & Balita Desa Sukamaju</h1>
          <p>Informasi jadwal posyandu, pemantauan tumbuh kembang balita usia 0–59 bulan, pemeriksaan kehamilan, serta edukasi gizi keluarga di Desa Sukamaju.</p>
          <a href="#jadwal" className="btn">Lihat Jadwal Posyandu</a>
        </div>
        <div className="hero-card">
          <div className="illus"><span className="p1" /><span className="p2" /><span className="p3" /></div>
          <div className="next"><b>Jadwal Terdekat</b><span className="chip amber">Sisa Kuota 4/30</span>
            <div className="next-row"><div className="date"><small>DES</small>04</div><div><b>Penimbangan Balita & Pemeriksaan Ibu Hamil</b><small>Pos 01 Dusun Krajan • Jumat 08.00 – 11.00 WIB</small></div></div>
          </div>
        </div>
      </section>

      <section className="sec alt" id="jadwal">
        <h2>Jadwal Kegiatan Posyandu Desa Sukamaju</h2>
        <p className="sub">Jadwal pelayanan rutin posyandu bulan ini. Daftar lebih awal untuk menjamin kuota.</p>
        <div className="tabs"><span className="tab on">Semua Jadwal</span><span className="tab">Balita</span><span className="tab">Ibu Hamil</span><span className="tab">Imunisasi/PMT</span></div>
        <div className="grid3">
          {jadwal.map((j) => (
            <article className="card" key={j.t}>
              <div className="card-top"><div className="date"><small>{j.m}</small>{j.d}</div><span className="chip green">{j.tag}</span></div>
              <h3>{j.t}</h3><p>{j.p}</p>
              <p className="meta"><b>Waktu:</b> {j.w}<br /><b>Tempat:</b> {j.l}</p>
              <div className="card-foot"><span className={'chip ' + (j.s === 'Terbuka' ? 'green' : 'amber')}>{j.s}</span><a href="#jadwal">Detail Kegiatan</a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="sec" id="statistik">
        <h2>Statistik Kesehatan Ibu & Balita Desa Sukamaju</h2>
        <p className="sub">Data ringkas hasil pencatatan posyandu bulan ini.</p>
        <div className="grid3">
          {stat.map(([a, n, c]) => (
            <div className="card stat" key={a}><small>{a.toUpperCase()}</small><div className="num">{n}<span>{n === 86 ? '%' : n === 22 ? ' Ibu' : ' Anak'}</span></div><hr /><small>{c}</small></div>
          ))}
        </div>
      </section>

      <section className="sec alt" id="alur-layanan">
        <h2>Alur Pelayanan 5 Meja Posyandu</h2>
        <p className="sub">Langkah pelayanan menyerupai alur di posyandu desa agar warga tidak bingung.</p>
        <div className="grid5">
          {alur.map(([t, m, p], i) => (
            <div className="card step" key={t}><div className="stepno"><span className="num-badge">0{i + 1}</span><span className="chip blue">{m}</span></div><h3>{t}</h3><p>{p}</p></div>
          ))}
        </div>
      </section>

      <section className="sec" id="kader">
        <h2>Daftar Kader & Bidan Bertugas Desa Sukamaju</h2>
        <p className="sub">Kader dan bidan siap mendampingi ibu hamil serta balita di Desa Sukamaju.</p>
        <div className="grid4">
          {kader.map(([i, n, r, p]) => (
            <div className="card" key={n}><div className="card-top"><span className="avatar">{i}</span><span className="chip green">Aktif</span></div><h3>{n}</h3><b className="role">{r}</b><p>{p}</p></div>
          ))}
        </div>
      </section>

      <section className="sec alt" id="edukasi">
        <h2>Artikel & Edukasi Kesehatan Ibu dan Anak</h2>
        <p className="sub">Bacaan singkat untuk ibu hamil dan balita di Desa Sukamaju.</p>
        <div className="grid3">
          {artikel.map(([tag, t, bg]) => (
            <article className="card art" key={t}><div className="art-img" style={{ background: bg }} /><div className="art-body"><span className="chip green">{tag}</span><h3>{t}</h3><p>Pelajari panduan singkat dari bidan dan kader desa.</p><a href="#edukasi">Baca Artikel</a></div></article>
          ))}
        </div>
      </section>

      <footer className="footer">© 2026 E-Posyandu Desa Sukamaju</footer>
    </div>
  )
}
