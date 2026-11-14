import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { fromParams } from './formParams'
import Ticket from './Ticket'

// Print paper-er chaura. Uchchota content onujayi auto (Chrome-e @page-e "auto" height nei)
const PRINT_WIDTH_MM = 50
const PX_PER_MM = 96 / 25.4
// Ticket-er niche extra faka jayga
const BOTTOM_MARGIN_PX = 16

// /?print=1&... : shudhu ticket. Screen-e zoom hoye bam theke daan porjonto bhore, print-e 1 page.
export default function PrintPage() {
  const form = fromParams(new URLSearchParams(location.search))
  const box = useRef(null)
  const probe = useRef(null)
  const [zoom, setZoom] = useState(1)
  const [pageHeight, setPageHeight] = useState(null)

  // Screen: viewport-er pura chaura bhore zoom
  useLayoutEffect(() => {
    // prothom render zoom 1-e, tai ei maap ticket-er asol (CSS-er) width
    const ticketWidth = box.current.firstElementChild.getBoundingClientRect().width
    const fit = () => setZoom(document.documentElement.clientWidth / ticketWidth)
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  // Print: PRINT_WIDTH_MM chaurai ticket-er uchchota mepe page-er height banai
  useEffect(() => {
    let cancelled = false
    document.fonts.ready.then(() => {
      if (cancelled) return
      const mm = (probe.current.getBoundingClientRect().height + BOTTOM_MARGIN_PX) / PX_PER_MM
      setPageHeight(Math.ceil(mm * 10) / 10 + 0.5)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className="bg-white">
      {pageHeight && <style>{`@page { size: ${PRINT_WIDTH_MM}mm ${pageHeight}mm; margin: 0 }`}</style>}

      <div ref={box} className="pb-[4px] [zoom:var(--zoom)] print:[zoom:1]" style={{ '--zoom': zoom }}>
        <Ticket form={form} />
      </div>

      {/* Print-er maap nene lukano copy */}
      <div
        ref={probe}
        aria-hidden
        className="invisible absolute top-0 left-0 -z-10 print:hidden [&_.ticket]:w-full"
        style={{ width: `${PRINT_WIDTH_MM}mm` }}
      >
        <Ticket form={form} />
      </div>
    </main>
  )
}
