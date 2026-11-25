// shortcut: data contoh statis sesuai isi Figma, ganti dengan API saat backend siap.
export const KADER = { nama: 'Ibu Siti Rahmawati', peran: 'Kader Posyandu Utama' }
export const TANGGAL = 'Senin, 14 Oktober 2026 10:45 WIB'

export const ibuHamil = [
  { id: 'rosi', nama: 'Rosi Nanda Amalia', suami: 'Bpk. Muhammad Pratama', nik: '3201126804950001', lahir: '05-05-1995', alamat: 'Jl. Melati Raya No. 4', rt: 'RT 01 / RW 04', kunjungan: '14 Okt 2024', aktif: true, trimester: 1, hpl: '05 Feb 2025', kondisi: 'sehat' },
  { id: 'siti-khadijah', nama: 'Siti Khadijah', suami: 'Bpk. Ahmad Fauzi', nik: '3201126804950001', lahir: '02-04-2000', alamat: 'Jl. Melati Raya No. 4', rt: 'RT 01 / RW 04', kunjungan: '14 Okt 2024', aktif: true, trimester: 1, hpl: '05 Feb 2025', kondisi: 'sehat' },
  { id: 'nurul-1', nama: 'Nurul Aisyah', suami: 'Bpk. Rizky Ananda', nik: '3201125206980004', lahir: '09-11-1997', alamat: 'Jl. Anggrek No. 17', rt: 'RT 05 / RW 04', kunjungan: '14 Okt 2024', aktif: true, trimester: 1, hpl: '05 Feb 2025', kondisi: 'sehat' },
  { id: 'nurul-2', nama: 'Nurul Aisyah', suami: 'Bpk. Rizky Ananda', nik: '3201125206980004', lahir: '09-11-1997', alamat: 'Jl. Anggrek No. 17', rt: 'RT 05 / RW 04', kunjungan: '14 Okt 2024', aktif: true, trimester: 3, kondisi: 'pantauan' },
  { id: 'nurul-3', nama: 'Nurul Aisyah', suami: 'Bpk. Rizky Ananda', nik: '3201125206980004', lahir: '09-11-1997', alamat: 'Jl. Anggrek No. 17', rt: 'RT 05 / RW 04', kunjungan: '14 Okt 2024', aktif: true, trimester: 3, kondisi: 'pembinaan' },
  { id: 'nurul-4', nama: 'Nurul Aisyah', suami: 'Bpk. Rizky Ananda', nik: '3201125206980004', lahir: '09-11-1997', alamat: 'Jl. Anggrek No. 17', rt: 'RT 05 / RW 04', kunjungan: '30 Sept 2024', aktif: false, kondisi: 'tidak-aktif' },
]

export const balita = [
  { id: 'randika-1', jk: 'Laki-laki', aktif: true, nama: 'Muhammad Randika Al-Fatih', nik: '3201126804950001', lahir: '05-05-1995', alamat: 'Jl. Melati Raya No. 4', rt: 'RT 01 / RW 04', kunjungan: '14 Okt 2024', kondisi: 'risiko', tags: [['Obesitas', 'red'], ['TB Pendek', 'orange'], ['BB Lebih', 'red']] },
  { id: 'randika-2', jk: 'Laki-laki', aktif: true, nama: 'Muhammad Randika Al-Fatih', nik: '3201126804950001', lahir: '05-05-1995', alamat: 'Jl. Melati Raya No. 4', rt: 'RT 01 / RW 04', kunjungan: '14 Okt 2024', kondisi: 'sehat', tags: [['Gizi Baik', 'green'], ['Tinggi', 'green'], ['BB Normal', 'green']] },
  { id: 'randika-3', jk: 'Laki-laki', aktif: true, nama: 'Muhammad Randika Al-Fatih', nik: '3201126804950001', lahir: '05-05-1995', alamat: 'Jl. Melati Raya No. 4', rt: 'RT 01 / RW 04', kunjungan: '14 Okt 2024', kondisi: 'sehat', tags: [['Gizi Baik', 'green'], ['Tinggi', 'green'], ['BB Normal', 'green']] },
  { id: 'randika-4', jk: 'Laki-laki', aktif: true, nama: 'Muhammad Randika Al-Fatih', nik: '3201126804950001', lahir: '05-05-1995', alamat: 'Jl. Melati Raya No. 4', rt: 'RT 01 / RW 04', kunjungan: '14 Okt 2024', kondisi: 'sehat', tags: [['Gizi Baik', 'green'], ['Tinggi', 'green'], ['BB Normal', 'green']] },
]

// Faktor risiko per kondisi, sesuai frame "Detail Ibu Perlu Pantauan/Pembinaan" & "Detail Balita Punya Kondisi".
export const faktorIbu = {
  pantauan: { judul: 'Faktor yang Perlu Dipantau', label: 'Perlu Pantauan', items: [
    ['21.5 cm', 'Gizi Kurang', 'Lengan Kecil (LILA)', 'Kurang dari acuan (Ibu kurus, perlu diberi PMT)'],
    ['145 / 95', 'Tekanan Darah', 'Darah Tinggi (Tensi)', 'Tensi di atas batas acuan (Perlu segera diperiksa)'],
    ['2 Bulan Absen', 'Kehadiran', 'Kegiatan Posyandu', 'Tidak hadir lebih dari 1 kali'],
  ] },
  pembinaan: { judul: 'Faktor yang Perlu Dibina', label: 'Perlu Pembinaan', items: [
    ['23.2 cm', 'Gizi Kurang', 'Lengan Kecil (LILA)', 'Mendekati batas acuan'],
    ['+ 0.5 kg', 'Berat Badan', 'Kenaikan Berat Badan', 'Kenaikan belum sesuai target acuan (1–3 kg)'],
    ['1 Bulan Absen', 'Kehadiran', 'Kegiatan Posyandu', 'Tidak hadir 1 kali'],
  ] },
}

export const riwayatIbu = [
  ['12 Agustus 2024', '29 bln', '12.1 kg', '87.5 cm', '14.8', '135/75', 'Ibu Siti Rahmawati'],
  ['12 September 2024', '28 bln', '12.1 kg', '87.5 cm', '14.8', '135/75', 'Ibu Siti Rahmawati'],
  ['12 Oktober 2024', '27 bln', '11.8 kg', '86.8 cm', '14.6', '135/75', 'Ibu Nurhasanah'],
]
export const riwayatBalita = [
  ['12 Agustus 2024', '29 bln', '12.1 kg', '87.5 cm', '47.8 cm', '14.0 cm', 'Ibu Siti Rahmawati'],
  ['12 Agustus 2024', '28 bln', '12.1 kg', '87.5 cm', '47.8 cm', '14.0 cm', 'Ibu Siti Rahmawati'],
  ['12 Agustus 2024', '27 bln', '12.1 kg', '87.5 cm', '47.8 cm', '14.0 cm', 'Ibu Siti Rahmawati'],
]

export const pemeriksaan = [
  { id: 1, tgl: '14 Okt 2024', nama: 'Siti Aminah', nik: '3201145209980002', jenis: 'Ibu Hamil', hasil: '45,7 kg • 115/75 mmHg', sub: 'LILA 25,0 cm • 26 minggu', status: 'Sehat' },
  { id: 2, tgl: '12 Okt 2024', nama: 'Muhammad Al-Fatih', nik: '3201142510230004', jenis: 'Balita', hasil: '12,1 kg • 87,5 cm', sub: 'LK 47,0 cm • 29 bulan', status: 'Sehat' },
  { id: 3, tgl: '12 Okt 2024', nama: 'Nurul Aisyah', nik: '3201125206980004', jenis: 'Ibu Hamil', hasil: '54,2 kg • 145/95 mmHg', sub: 'LILA 23,0 cm • 30 minggu', status: 'Perlu Pantauan' },
  { id: 4, tgl: '12 Okt 2024', nama: 'Aisyah Putri', nik: '3201146306230005', jenis: 'Balita', hasil: '8,4 kg • 75,0 cm', sub: 'LK 44,0 cm • 15 bulan', status: 'Perlu Pembinaan' },
  { id: 5, tgl: '12 Sep 2024', nama: 'Muhammad Al-Fatih', nik: '3201142510230004', jenis: 'Balita', hasil: '12,1 kg • 87,5 cm', sub: 'LK 47,0 cm • 28 bulan', status: 'Sehat' },
  { id: 6, tgl: '12 Agu 2024', nama: 'Muhammad Al-Fatih', nik: '3201142510230004', jenis: 'Balita', hasil: '11,8 kg • 86,8 cm', sub: 'LK 46,8 cm • 27 bulan', status: 'Sehat' },
]

export const rekapBulanan = [
  ['Mei 2024', 62, 28, 4], ['Juni 2024', 67, 30, 5], ['Juli 2024', 70, 32, 5],
  ['Agustus 2024', 75, 34, 6], ['September 2024', 80, 38, 7], ['Oktober 2024', 86, 42, 8],
]
