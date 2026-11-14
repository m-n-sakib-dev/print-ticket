import { Fragment } from 'react'
import { countermen } from './ticketConfig'
import { formatDate, formatMeridiem, formatTime, toBn } from './bn'

export default function Ticket({ form }) {
  const when = new Date(form.dateTime)
  const valid = !Number.isNaN(when.getTime())
  const man = countermen[form.counterman] ?? countermen[0]

  return (
    <div
      className="ticket shrink-0 shadow print:shadow-none"
      style={{ fontFamily: `"${form.font}", "Hind Siliguri", "Noto Sans Bengali", sans-serif` }}
    >
      <div className="[zoom:0.9] ">
      <div className="origin-center scale-x-[1.01] scale-y-[0.9] text-left text-[16px] ml-1 font-normal leading-tight [word-spacing:4px]">ইকবাল এন্টারপ্রাইজ (এসি বাস)</div>
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
      <div className="text-center text-[14px] scale-x-[1.04]  font-medium leading-normal">তাংঃ {valid ? formatDate(when) : ''}</div>
      <div className="my-1 text-center text-[18px] scale-x-[1.04] scale-y-[0.90] font-medium leading-none -mt-1">
        <span style={{ fontFamily: '"Siyam Rupali"' }}>সময়ঃ</span> 
        <span className="inline-block origin-left text-[18px] scale-x-[1.1] ml-1 font-medium">{valid &&
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
      <div className="text-left text-[12px] scale-x-[1.04] scale-y-[0.95] font-['Noto_Sans_Bengali'] font-extralight leading-snug ml-2 [word-spacing:4px]">
        <div>* টিকিটটি সংরক্ষনে রাখুন, চেক হবে।</div>
        <div>* টিকেটের অতিরিক্ত ভ্রমণে জরিমানা হবে।</div>
      </div>
      <div className="mt-1 text-center text-[12px] font-medium leading-snug">সহযোগিতায় যাত্রী সার্ভিসেস লিঃ</div>
      </div>
    </div>
  )
}
