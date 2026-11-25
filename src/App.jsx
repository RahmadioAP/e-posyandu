import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import KaderLayout from './kader/KaderLayout.jsx'
import Beranda from './kader/Beranda.jsx'
import DaftarIbu from './kader/DaftarIbu.jsx'
import DetailIbu from './kader/DetailIbu.jsx'
import DaftarBalita from './kader/DaftarBalita.jsx'
import DetailBalita from './kader/DetailBalita.jsx'
import Riwayat from './kader/Riwayat.jsx'
import Laporan from './kader/Laporan.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/kader" element={<KaderLayout />}>
        <Route index element={<Beranda />} />
        <Route path="ibu-hamil" element={<DaftarIbu />} />
        <Route path="ibu-hamil/:id" element={<DetailIbu />} />
        <Route path="balita" element={<DaftarBalita />} />
        <Route path="balita/:id" element={<DetailBalita />} />
        <Route path="riwayat" element={<Riwayat />} />
        <Route path="laporan" element={<Laporan />} />
      </Route>
    </Routes>
  )
}
