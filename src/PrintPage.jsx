import { fromParams } from './formParams'
import Ticket from './Ticket'

// /?print=1&... : shudhu ticket, ei page-i print korlei ticket print hoy
export default function PrintPage() {
  const form = fromParams(new URLSearchParams(location.search))

  return (
    <main className="min-h-screen bg-neutral-200 p-4 print:min-h-0 print:bg-white print:p-0">
      <Ticket form={form} />
    </main>
  )
}
