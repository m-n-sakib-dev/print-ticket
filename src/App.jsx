import { useState } from 'react'
import { countermen, fares, fonts, letters, routeLetters, routes, stopDefaults, stops } from './ticketConfig'
import { toInputValue } from './bn'
import { toParams } from './formParams'
import Ticket from './Ticket'

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

// "কোথা থেকে" stop-er default (stopDefaults) form-e boshai
const applyStop = (form, from) => {
  const { counterman, ...rest } = stopDefaults[from] ?? {}
  const index = countermen.findIndex((c) => c.name === counterman)
  const next = { ...form, from, ...rest, ...(index >= 0 && { counterman: index }) }
  return { ...next, letter: routeLetters[next.route] ?? next.letter }
}

// Last use kora time localStorage-e thake
const TIME_KEY = 'ticket:dateTime'
const loadTime = () => {
  try {
    return localStorage.getItem(TIME_KEY)
  } catch {
    return null
  }
}
// Second sob somoy 23 thake (mobile picker-e second set kora jay na)
const withSec = (value) => (value ? `${value.slice(0, 16)}:23` : value)
const saveTime = (value) => {
  try {
    localStorage.setItem(TIME_KEY, value)
  } catch {
    // localStorage nei, ignore
  }
}

export default function App() {
  const [form, setForm] = useState(() =>
    applyStop(
      {
        route: routes[0],
        fare: fares[0],
        stopNo: 1,
        letter: 'U',
        font: fonts[0],
        to: stops[1] ?? stops[0],
        ticketNo: 1,
        counterman: 0,
        dateTime: withSec(loadTime() || toInputValue(new Date())),
      },
      stops[0],
    ),
  )

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const setDateTime = (raw) => {
    const value = withSec(raw)
    saveTime(value)
    setForm({ ...form, dateTime: value })
  }

  const openPrintPage = () => window.open(`${location.pathname}?${toParams(form)}`, '_blank')

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
            <select
              className={inputClass}
              value={form.route}
              onChange={(e) =>
                setForm({ ...form, route: e.target.value, letter: routeLetters[e.target.value] ?? form.letter })
              }
            >
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
            <select
              className={inputClass}
              value={form.from}
              onChange={(e) => setForm(applyStop(form, e.target.value))}
            >
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
            <div className="flex gap-2">
              <input
                className={inputClass}
                type="datetime-local"
                step="1"
                value={form.dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setDateTime(toInputValue(new Date()))}
                className="shrink-0 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-medium hover:bg-neutral-100"
              >
                এখন
              </button>
            </div>
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
            onClick={openPrintPage}
            className="w-full rounded-md bg-neutral-900 px-4 py-2 font-medium text-white hover:bg-neutral-700"
          >
            Print
          </button>
        </form>

        <Ticket form={form} />
      </div>
    </main>
  )
}
