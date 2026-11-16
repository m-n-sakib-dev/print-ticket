import { Fragment } from 'react'
import { countermen } from './ticketConfig'
import { formatDate, formatMeridiem, formatTime, toBn } from './bn'

// bottomMargin (px): ticket-er (shadow shoho) niche extra faka. Print page-e boshe.
export default function Ticket({ form, bottomMargin = 0 }) {
  const when = new Date(form.dateTime)
  const valid = !Number.isNaN(when.getTime())
  const man = countermen[form.counterman] ?? countermen[0]

  return (
    <div
      className="ticket shrink-0 shadow print:shadow-none"
      style={{
        fontFamily: `"${form.font}", "Hind Siliguri", "Noto Sans Bengali", sans-serif`,
        paddingBottom: bottomMargin ? `calc(2mm + ${bottomMargin}px)` : undefined,
      }}
    >
      <div className="[zoom:0.9] ">
      <div className="origin-left [zoom:1.02] scale-x-[1.05] scale-y-[0.9] text-left text-[16px] font-medium leading-tight [word-spacing:4px]" style={{ WebkitTextStroke: '0.4px currentColor' }}>ইকবাল এন্টারপ্রাইজ (এসি বাস)</div>
      <div className="text-center [zoom:1.1] text-[14px] scale-x-[0.9] scale-y-[1.1] font-normal leading-none [word-spacing:4px]" style={{ fontFamily: '"SolaimanLipi"' }}>Powered by <span className="inline-block scale-x-[0.9]">C<span style={{ fontFamily: '"Noto Sans Bengali"' }}>I</span>C</span> <span style={{ fontFamily: '"Noto Sans Bengali"' }}>G</span>roup</div>
      <div className="text-center [zoom:0.95] text-[16px] scale-x-[1.15] scale-y-[1.1] font-normal ">{form.route}</div>
      <div className="my-0 text-center text-[22px] font-normal leading-none" style={{ WebkitTextStroke: '0.3px currentColor' }}>ভাড়াঃ <span className="inline-block origin-left ml-1 scale-y-[0.85]" style={{ fontFamily: '"Charukola Ultra Light"', WebkitTextStroke: '1.5px currentColor', letterSpacing: '0.13em' }}>{toBn(form.fare)}</span></div>
      <div className="text-center font-['Noto_Sans_Bengali'] text-[14px] font-medium leading-snug [zoom:0.9]">
        <span className="inline-block origin-left font-normal scale-x-[1.08]">
          (<span className="mx-[2px] [zoom:0.9]" style={{ fontFamily: '"Hind Siliguri"' }}>{toBn(form.stopNo)}</span>)
        </span>
        <span className="inline-block origin-left scale-x-[1.1] scale-y-[0.9] font-normal ml-1 mr-2" style={{ WebkitTextStroke: '0.4px currentColor' ,fontFamily: '"Siyam Rupali"'}}>{form.from}</span>
        <span className="font-normal">/</span>
        <span className="inline-block origin-bottom-left font-light scale-x-[0.6]">{form.letter}</span>
        <span className="inline-block origin-left -translate-x-[3px] scale-x-[1.1] scale-y-[0.9] font-font-normal" style={{ WebkitTextStroke: '0.4px currentColor' ,fontFamily: '"Siyam Rupali"'}}>-{form.to}</span>
      </div>
      <div className="text-center text-[16px] scale-x-[1.04] [zoom:0.8] scale-y-[0.95] font-medium translate-y-[2px] leading-none [word-spacing:4px]" style={{ WebkitTextStroke: '0.3px currentColor', fontFamily: '"Siyam Rupali"'}}>টিকেট নংঃ {toBn(form.ticketNo)}</div>
      <div className="text-center text-[14px] scale-x-[1.1]  font-medium leading-normal translate-y-[2px] [word-spacing:4px]" style={{ WebkitTextStroke: '0.3px currentColor' }}>তাংঃ {valid ? formatDate(when) : ''}</div>
      <div className="my-1 text-center text-[18px] scale-x-[1.04] scale-y-[1]  leading-none" style={{ WebkitTextStroke: '0.4px currentColor' }}>
        <span className='inline-block [zoom:1.05]'><span style={{ fontFamily: '"Noto Sans Bengali"' }}>স</span><span className="inline-block [zoom:1.05] translate-y-[0.5px]" style={{ fontFamily: '"Mina"' }}>ম</span><span style={{ fontFamily: '"Noto Sans Bengali"' }}>য়ঃ</span> </span>
        <span className="inline-block [zoom:1.03] origin-left text-[18px] scale-x-[1] scale-y-[] ml-2 " style={{ WebkitTextStroke: '0.3px currentColor' }}>{valid &&
            formatTime(when).map((part, i) => (
              <Fragment key={i}>
                {i > 0 && <span className="mx-[2px]">:</span>}
                {part}
              </Fragment>
            ))}</span>
        <span className="ml-2 [zoom:1.06] inline-block  scale-x-[0.8] scale-y-[1.3] text-[15px] font-medium">{valid ? formatMeridiem(when) : ''}</span>
      </div>
      <div className="text-center text-[14px] [zoom:1.1] scale-x-[1.05] scale-y-[0.92] font-['Noto_Sans_Bengali'] font-[250]  leading-tight [word-spacing:4px]">কাউন্টারম্যানঃ {man.name}</div>
      <div className="text-center text-[14px] scale-x-[1.06] scale-y-[0.94] font-['Noto_Sans_Bengali'] font-[250]  leading-tight">মোবাইলঃ <span className="inline-block scale-x-[0.9] scale-y-[1.1] text-[13px] -mx-1" style={{ fontFamily: '"Inter", Arial, sans-serif' }}>{man.mobile}</span></div>
      <div className="text-center text-[12px] [zoom:1.1] scale-x-[1.04] scale-y-[0.95] font-['Noto_Sans_Bengali'] font-[250] leading-snug text-black/80 [word-spacing:4px]">অভিযোগ নাম্বারঃ <span className="inline-block scale-x-[0.962] scale-y-[1.053]" style={{ fontFamily: '"Inter", Arial, sans-serif' }}>01617550101</span></div>
      <div className="text-center text-[12px] [zoom:1.1] font-['Noto_Sans_Bengali'] font-[250] leading-snug text-black/80" style={{ fontFamily: '"Inter", Arial, sans-serif' }}>01626077556</div>
      <div className="origin-left [zoom:1.05] text-left text-[12px] scale-x-[1] font-['Noto_Sans_Bengali'] font-[250] leading-snug [word-spacing:3px]" style={{ WebkitTextStroke: '0.01px currentColor' }}>
        <div>* টিকিটটি সংরক্ষনে রাখুন, চেক হবে।</div>
        <div>* টিকেটের অতিরিক্ত ভ্রমণে জরিমানা হবে।</div>
      </div>
      <div className="mt-1 text-center text-[13px] scale-y-[0.9] translate-y-[-4px]  leading-none [word-spacing:3px]" style={{ WebkitTextStroke: '0.4px currentColor' }}>সহযোগিতায় যাত্রী সার্ভিসেস লিঃ</div>
      </div>
    </div>
  )
}
