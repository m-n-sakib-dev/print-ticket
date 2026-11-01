const lines = [
  'এখানে বাংলা লেখা থাকবে।',
  'English text will go here.',
  'আরও কিছু লাইন এখানে যোগ করা যাবে।',
]

export default function App() {
  return (
    <main className="page">
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </main>
  )
}
