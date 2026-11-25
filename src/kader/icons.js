// Semua ikon diekspor dari Figma (halaman High Fi > Kader (Admin)).
const files = import.meta.glob('../assets/kader/*.{svg,png}', { eager: true, import: 'default' })
export const ic = Object.fromEntries(
  Object.entries(files).map(([p, url]) => [p.split('/').pop().replace(/\.(svg|png)$/, ''), url]),
)
