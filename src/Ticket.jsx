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
      <div className="origin-left [zoom:1.02] scale-x-[1.01] scale-y-[0.9] text-left text-[16px] font-medium leading-tight [word-spacing:4px]" style={{ WebkitTextStroke: '0.4px currentColor' }}>ইকবাল এন্টারপ্রাইজ (এসি বাস)</div>
      <div className="text-center [zoom:1.1] text-[14px] scale-x-[0.9] font-normal leading-none [word-spacing:4px]" style={{ fontFamily: '"SolaimanLipi"' }}>Powered by C<span style={{ fontFamily: '"Noto Sans Bengali"' }}>I</span>C <span style={{ fontFamily: '"Noto Sans Bengali"' }}>G</span>roup</div>
      <div className="text-center [zoom:0.9] text-[16px] scale-x-[1.15] scale-y-[1.05] font-normal ">{form.route}</div>
      <div className="my-0 text-center text-[22px] font-normal leading-none" style={{ WebkitTextStroke: '0.4px currentColor' }}>ভাড়াঃ <span className="inline-block origin-left ml-1 scale-y-[0.85]" style={{ fontFamily: '"Charukola Ultra Light"', WebkitTextStroke: '2px currentColor', letterSpacing: '0.13em' }}>{toBn(form.fare)}</span></div>
      <div className="text-center text-[14px] font-medium leading-snug">
        <span className="inline-block origin-left font-normal scale-x-[1.08]">
          (<span className="mx-[2px] [zoom:0.9]" style={{ fontFamily: '"Charu Chandan Hard Stroke"' }}>{toBn(form.stopNo)}</span>)
        </span>
        <span className="inline-block origin-left scale-x-[1.1] scale-y-[0.9] font-normal ml-1 mr-2" style={{ WebkitTextStroke: '0.4px currentColor' }}>{form.from}</span>
        <span className="font-normal">/</span>
        <span className="inline-block origin-bottom-left font-light scale-x-[0.8]">{form.letter}-</span>
        <span className="inline-block origin-left scale-x-[1.1] scale-y-[0.9] font-font-normal" style={{ WebkitTextStroke: '0.4px currentColor' }}>{form.to}</span>
      </div>
      <div className="text-center text-[16px] scale-x-[1.04] scale-y-[0.95] font-medium leading-none [word-spacing:4px]">টিকেট নংঃ {toBn(form.ticketNo)}</div>
      <div className="text-center text-[14px] scale-x-[1.1]  font-medium leading-normal [word-spacing:4px]" style={{ WebkitTextStroke: '0.4px currentColor' }}>তাংঃ {valid ? formatDate(when) : ''}</div>
      <div className="my-1 text-center text-[18px] scale-x-[1.04] scale-y-[0.90]  leading-none" style={{ WebkitTextStroke: '0.4px currentColor' }}>
        <span style={{ fontFamily: '"Siyam Rupali"' }}>সময়ঃ</span> 
        <span className="inline-block origin-left text-[18px] scale-x-[1.1] scale-y-[1.1] ml-2 " style={{ WebkitTextStroke: '0.3px currentColor' }}>{valid &&
            formatTime(when).map((part, i) => (
              <Fragment key={i}>
                {i > 0 && <span className="mx-[2px]">:</span>}
                {part}
              </Fragment>
            ))}</span>
        <span className="ml-4 inline-block  scale-x-[0.8] scale-y-[1.3] text-[14px] font-medium">{valid ? formatMeridiem(when) : ''}</span>
      </div>
      <div className="text-center text-[14px] [zoom:1.1] scale-x-[1.05] scale-y-[0.95] font-['Noto_Sans_Bengali'] font-extralight  leading-tight [word-spacing:4px]">কাউন্টারম্যানঃ {man.name}</div>
      <div className="text-center text-[14px] scale-x-[1.06] scale-y-[0.94] font-['Noto_Sans_Bengali'] font-extralight  leading-tight">মোবাইলঃ <span className="inline-block scale-x-[0.9] scale-y-[1.1] text-[13px] -mx-1" style={{ fontFamily: '"Inter", Arial, sans-serif' }}>{man.mobile}</span></div>
      <div className="text-center text-[12px] [zoom:1.1] scale-x-[1.04] scale-y-[0.95] font-['Noto_Sans_Bengali'] font-extralight leading-snug text-black/80 [word-spacing:4px]">অভিযোগ নাম্বারঃ <span className="inline-block scale-x-[0.962] scale-y-[1.053]" style={{ fontFamily: '"Inter", Arial, sans-serif' }}>01617550101</span></div>
      <div className="text-center text-[12px] [zoom:1.1] font-['Noto_Sans_Bengali'] font-extralight leading-snug text-black/80" style={{ fontFamily: '"Inter", Arial, sans-serif' }}>01626077556</div>
      <div className="origin-left [zoom:1.05] text-left text-[12px] scale-x-[1.01] scale-y-[0.95] font-['Noto_Sans_Bengali'] font-extralight leading-snug [word-spacing:4px]">
        <div>* টিকিটটি সংরক্ষনে রাখুন, চেক হবে।</div>
        <div>* টিকেটের অতিরিক্ত ভ্রমণে জরিমানা হবে।</div>
      </div>
      <div className="mt-1 text-center text-[13px] scale-x-[1.1] scale-y-[0.9] translate-y-[-4px] font-medium leading-none">সহযোগিতায় যাত্রী সার্ভিসেস লিঃ</div>
      </div>
    </div>
  )
}
