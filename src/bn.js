const digits = '০১২৩৪৫৬৭৮৯'
const months = ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রি', 'মে', 'জুন', 'জুলা', 'আগ', 'সেপ্টে', 'অক্টো', 'নভে', 'ডিসে']

export const toBn = (value) => String(value).replace(/\d/g, (d) => digits[d])

const pad = (n) => String(n).padStart(2, '0')

// date: "তাংঃ ০১ নভে ২০২৬"
export const formatDate = (d) => `${toBn(pad(d.getDate()))} ${months[d.getMonth()]} ${toBn(d.getFullYear())}`

// time parts: ["০৯", "৪১", "১৭"] (":" App-e alada span e boshe, jate gap deya jay)
export const formatTime = (d) => {
  const h12 = d.getHours() % 12 || 12
  return [h12, d.getMinutes(), d.getSeconds()].map((n) => toBn(pad(n)))
}

export const formatMeridiem = (d) => (d.getHours() < 12 ? 'AM' : 'PM')

// datetime-local input value, e.g. "2026-11-01T09:41:17"
export const toInputValue = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
