import { countermen, fares, fonts, letters, routes, stops } from './ticketConfig'
import { toInputValue } from './bn'

// Print page-e form-er value gulo URL query hoye jay (?print=1&route=...)
export const toParams = (form) => new URLSearchParams({ print: '1', ...form, counterman: String(form.counterman) })

const pick = (value, list) => (list.includes(value) ? value : list[0])

export const fromParams = (params) => ({
  route: pick(params.get('route'), routes),
  fare: pick(params.get('fare'), fares),
  stopNo: params.get('stopNo') || 1,
  from: pick(params.get('from'), stops),
  letter: pick(params.get('letter'), letters),
  font: pick(params.get('font'), fonts),
  to: pick(params.get('to'), stops),
  ticketNo: params.get('ticketNo') || 1,
  counterman: Math.min(Math.max(Number(params.get('counterman')) || 0, 0), countermen.length - 1),
  bottomMargin: Math.max(Number(params.get('bottomMargin') ?? 16) || 0, 0),
  dateTime: params.get('dateTime') || toInputValue(new Date()),
})
