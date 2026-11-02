import { Fragment, useState } from 'react'
import { countermen, fares, fonts, letters, routes, stops } from './ticketConfig'
import { formatDate, formatMeridiem, formatTime, toBn, toInputValue } from './bn'

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-neutral-700">{label}</span>
      {children}
    </label>
  )
}

const inputClass =
  'w-full rounded-md border border-neutral-300 bg-white px-1 py-2 text-base focus:border-neutral-900 focus:outline-none'

export default function App() {
  const [form, setForm] = useState(() => ({
    route: routes[0],
    fare: fares[0],
    stopNo: 1,
    from: stops[0],
    letter: 'U',
    font: fonts[0],
    to: stops[1] ?? stops[0],
    ticketNo: 1,
    counterman: 0,
    dateTime: toInputValue(new Date()),
  }))

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const when = new Date(form.dateTime)
  const valid = !Number.isNaN(when.getTime())
  const man = countermen[form.counterman]

  return (
    <main className="min-h-screen bg-neutral-200 p-4 print:min-h-0 print:bg-white print:p-0">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 md:flex-row">
        <form
          className="w-full space-y-4 rounded-lg bg-white p-4 shadow md:flex-1 print:hidden"
          onSubmit={(e) => e.preventDefault()}
        >
          <Field label="ফন্ট">
            <select className={inputClass} value={form.font} onChange={set('font')}>
              {fonts.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </Field>

          <Field label="রুট">
            <select className={inputClass} value={form.route} onChange={set('route')}>
              {routes.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </Field>

          <Field label="ভাড়া">
            <select className={inputClass} value={form.fare} onChange={set('fare')}>
              {fares.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </Field>

          <Field label="স্টপ নং">
            <input
              className={inputClass}
              type="number"
              min="1"
              value={form.stopNo}
              onChange={set('stopNo')}
            />
          </Field>

          <Field label="কোথা থেকে">
            <select className={inputClass} value={form.from} onChange={set('from')}>
              {stops.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>

          <Field label="কোথায়">
            <div className="flex gap-2">
              <select
                className={`${inputClass} !w-20 shrink-0`}
                value={form.letter}
                onChange={set('letter')}
              >
                {letters.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
              <select className={inputClass} value={form.to} onChange={set('to')}>
                {stops.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </Field>

          <Field label="টিকেট নং">
            <input
              className={inputClass}
              type="number"
              min="1"
              value={form.ticketNo}
              onChange={set('ticketNo')}
            />
          </Field>

          <Field label="তারিখ ও সময়">
            <input
              className={inputClass}
              type="datetime-local"
              step="1"
              value={form.dateTime}
              onChange={set('dateTime')}
            />
          </Field>

          <Field label="কাউন্টারম্যান">
            <select
              className={inputClass}
              value={form.counterman}
              onChange={(e) => setForm({ ...form, counterman: Number(e.target.value) })}
            >
              {countermen.map((c, i) => (
                <option key={i} value={i}>
                  {c.name} ({c.mobile})
                </option>
              ))}
            </select>
          </Field>

          <button
            type="button"
            onClick={() => window.print()}
            className="w-full rounded-md bg-neutral-900 px-4 py-2 font-medium text-white hover:bg-neutral-700"
          >
            Print
          </button>
        </form>

        <div
          className="ticket shrink-0 shadow print:shadow-none"
          style={{ fontFamily: `"${form.font}", "Hind Siliguri", "Noto Sans Bengali", sans-serif` }}
        >
          <div className="[zoom:0.83]">
          <div className="origin-center scale-x-[1.01] scale-y-[0.9] text-center text-[16px] font-normal leading-tight [word-spacing:4px]">ইকবাল এন্টারপ্রাইজ (এসি বাস)</div>
          <div className="text-center text-[14px] scale-x-[0.9] font-normal leading-none [word-spacing:4px]" style={{ fontFamily: '"SolaimanLipi"' }}>Powered by C<span style={{ fontFamily: '"Noto Sans Bengali"' }}>I</span>C <span style={{ fontFamily: '"Noto Sans Bengali"' }}>G</span>roup</div>
          <div className="text-center text-[16px] scale-x-[1.15] scale-y-[1.05] font-normal ">{form.route}</div>
          <div className="my-0 text-center text-[22px] font-normal leading-none">ভাড়াঃ <span className="ml-1" style={{ fontFamily: '"Charukola Ultra Light"', WebkitTextStroke: '1px currentColor', letterSpacing: '0.13em' }}>{toBn(form.fare)}</span></div>
          <div className="text-center text-[14px] font-medium leading-snug">
            <span className="inline-block origin-left font-normal scale-x-[1.08]">
              (<span className="mx-[2px]" style={{ fontFamily: '"Charu Chandan Hard Stroke"' }}>{toBn(form.stopNo)}</span>)
            </span>
            <span className="font-normal ml-1">{form.from}</span>
            <span className="font-normal">/</span>
            <span className="inline-block origin-bottom-left font-light scale-x-[0.8]">{form.letter}-</span>
            <span className="font-font-normal">{form.to}</span>
          </div>
          <div className="text-center text-[15px] scale-x-[1.04] scale-y-[0.95] font-medium leading-none">টিকেট নংঃ {toBn(form.ticketNo)}</div>
          <div className="text-center text-[14px] scale-x-[1.04]  font-medium leading-none">তাংঃ {valid ? formatDate(when) : ''}</div>
          <div className="my-1 text-center text-[18px] scale-x-[1.04] scale-y-[0.90] font-medium leading-none">
            <span style={{ fontFamily: '"Siyam Rupali"' }}>সময়ঃ</span> <span className="inline-block origin-left text-[17px] scale-x-[1.1] scale-y-[1.1] font-medium">{valid &&
                formatTime(when).map((part, i) => (
                  <Fragment key={i}>
                    {i > 0 && <span className="mx-[2px]">:</span>}
                    {part}
                  </Fragment>
                ))}</span>
            <span className="ml-3 inline-block  scale-x-90 scale-y-[1.3] text-[13px] font-medium">{valid ? formatMeridiem(when) : ''}</span>
          </div>
          <div className="text-center text-[14px] scale-x-[1.05] scale-y-[0.95] font-['Noto_Sans_Bengali'] font-extralight  leading-tight [word-spacing:4px]">কাউন্টারম্যানঃ {man.name}</div>
          <div className="text-center text-[14px] scale-x-[1.06] scale-y-[0.94] font-['Noto_Sans_Bengali'] font-extralight  leading-tight">মোবাইলঃ <span className="text-[13px]">{man.mobile}</span></div>
          <div className="text-center text-[12px] scale-x-[1.04] scale-y-[0.95] font-['Noto_Sans_Bengali'] font-extralight leading-snug text-black/80">অভিযোগ নাম্বারঃ 01617550101</div>
          <div className="text-center text-[12px] font-['Noto_Sans_Bengali'] font-extralight leading-snug text-black/80">01626077556</div>
          <div className="text-left text-[11px] scale-x-[1.04] scale-y-[0.95]  font-['Noto_Sans_Bengali'] font-extralight leading-snug ml-2 [word-spacing:4px]">* টিকিটটি সংরক্ষনে রাখুন, চেক হবে।</div>
          <div className="text-left text-[11px] scale-x-[1.04] scale-y-[0.95] font-['Noto_Sans_Bengali'] font-extralight leading-snug ml-2 [word-spacing:4px]">* টিকেটের অতিরিক্ত ভ্রমণে জরিমানা হবে।</div>
          <div className="mt-1 text-center text-[12px] font-medium leading-snug">সহযোগিতায় যাত্রী সার্ভিসেস লিঃ</div>
          </div>
        </div>
      </div>
    </main>
  )
}
