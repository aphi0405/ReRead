import { useState } from 'react';
import { Check, Clock, Package, CheckCircle2, ExternalLink, Camera, ChevronDown } from 'lucide-react';

const COURIERS = [
  { id: 'flash', name: 'Flash Express', logo: '⚡', trackUrl: 'https://flashexpress.co.th/' },
  { id: 'kerry', name: 'Kerry Express', logo: '🔴', trackUrl: 'https://th.kerryexpress.com/' },
  { id: 'jandt', name: 'J&T Express', logo: '🟠', trackUrl: 'https://www.jtexpress.co.th/' },
  { id: 'thaipost', name: 'ไปรษณีย์ไทย', logo: '📮', trackUrl: 'https://track.thailandpost.co.th/' },
];

const MOCK_SWAPS = [
  {
    id: 'SW-1042',
    date: '18 ก.ค. 2568',
    myBook: { title: 'The Secret History', author: 'Donna Tartt' },
    theirBook: { title: 'Norwegian Wood', author: 'Haruki Murakami', owner: 'วรรณา ก.' },
    status: 2,
    courier: COURIERS[0],
    trackingNo: 'TH12345678',
    shippingPhoto: 'https://media.istockphoto.com/id/182721293/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AB%E0%B9%88%E0%B8%AD%E0%B8%9E%E0%B8%B1%E0%B8%AA%E0%B8%94%E0%B8%B8%E0%B8%AA%E0%B8%B5%E0%B8%99%E0%B9%89%E0%B9%8D%E0%B8%B2%E0%B8%95%E0%B8%B2%E0%B8%A5.jpg?s=612x612&w=0&k=20&c=SixlmlAudR_UvULVEaRNkPFxNF6NMLWDotzFXL87bgM=',
    shippingNote: 'จัดส่งแล้วนะคะ ถ้าคุณมินต์ได้รับหนังสือแล้ว ช่วยแจ้งให้พี่ทราบด้วยนะคะ',
    shippedAt: '18 ก.ค. 2568 เวลา 10:30 น.',
  },
  {
    id: 'SW-1043',
    date: '15 ก.ค. 2568',
    myBook: { title: 'Dune', author: 'Frank Herbert' },
    theirBook: { title: '1984', author: 'George Orwell', owner: 'ภูมิ ส.' },
    status: 0,
    courier: null,
    trackingNo: null,
    shippingPhoto: null,
    shippingNote: null,
    shippedAt: null,
  },
  {
    id: 'SW-1041',
    date: '10 ก.ค. 2568',
    myBook: { title: 'Pride and Prejudice', author: 'Jane Austen' },
    theirBook: { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', owner: 'ชาญชัย ด.' },
    status: 3,
    courier: COURIERS[3],
    trackingNo: 'EJ123456789TH',
    shippingPhoto: 'https://f.ptcdn.info/021/051/000/opmm5b76xi35D5sNoEv-o.png',
    shippingNote: 'ส่งไปรษณีย์แล้วครับ ถ้าได้รับของแล้ว รบกวนช่วยรีวิวให้ด้วยนะครับ',
    shippedAt: '10 ก.ค. 2568 เวลา 14:20 น.',
  },
];

const steps = [
  { label: 'ส่งคำขอแล้ว', icon: Clock },
  { label: 'ตอบรับแล้ว', icon: Check },
  { label: 'กำลังจัดส่ง', icon: Package },
  { label: 'ได้รับหนังสือ', icon: CheckCircle2 },
];

export default function DashboardPage() {
  const [expandedId, setExpandedId] = useState<string | null>('SW-1042');

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-heading font-medium mb-4">แผงควบคุมการแลกเปลี่ยน</h1>
        <p className="text-text-main/70 text-lg">ติดตามสถานะพัสดุและการแลกเปลี่ยนหนังสือของคุณ</p>
      </div>

      <div className="flex flex-col gap-5">
        {MOCK_SWAPS.map((swap) => (
          <div key={swap.id} className="bg-bg-main border border-border-main rounded-md overflow-hidden">

            {/* Swap Header Row */}
            <button
              className="w-full flex items-center justify-between px-6 py-5 hover:bg-bg-secondary/40 transition-colors text-left"
              onClick={() => setExpandedId(expandedId === swap.id ? null : swap.id)}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
                <div>
                  <span className="text-xs text-text-main/50 tracking-widest uppercase block">รหัส {swap.id}</span>
                  <span className="text-xs text-text-main/60">{swap.date}</span>
                </div>
                <div>
                  <span className="text-sm font-heading font-medium">{swap.myBook.title}</span>
                  <span className="text-sm text-text-main/50 mx-2">⇌</span>
                  <span className="text-sm font-heading font-medium">{swap.theirBook.title}</span>
                  <span className="text-xs text-text-main/50 ml-2">(จาก {swap.theirBook.owner})</span>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`text-xs px-2.5 py-1 rounded-sm font-medium ${swap.status === 3 ? 'bg-accent/10 text-accent' :
                  swap.status === 2 ? 'bg-warning/10 text-warning' :
                    'bg-bg-secondary text-text-main/60'
                  }`}>
                  {steps[swap.status]?.label}
                </span>
                <ChevronDown className={`w-4 h-4 text-text-main/40 transition-transform ${expandedId === swap.id ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Expanded Content */}
            {expandedId === swap.id && (
              <div className="border-t border-border-main px-6 pb-6">

                {/* Stepper */}
                <div className="relative pt-8 pb-6">
                  <div className="absolute top-[44px] left-0 w-full h-[1px] bg-border-main" />
                  <div
                    className="absolute top-[44px] left-0 h-[1px] bg-accent transition-all duration-500"
                    style={{ width: `${(swap.status / (steps.length - 1)) * 100}%` }}
                  />
                  <div className="relative flex justify-between w-full">
                    {steps.map((step, index) => {
                      const isActive = index <= swap.status;
                      const isCurrent = index === swap.status;
                      const StepIcon = step.icon;
                      return (
                        <div key={index} className="flex flex-col items-center gap-3 z-10 w-28">
                          <div className={`w-7 h-7 rounded-full border bg-bg-main flex items-center justify-center transition-colors ${isActive ? 'border-accent text-accent' : 'border-border-main text-text-main/30'} ${isCurrent ? 'ring-4 ring-accent/15' : ''}`}>
                            <StepIcon className="w-3.5 h-3.5" />
                          </div>
                          <span className={`text-xs text-center font-medium ${isActive ? 'text-text-main' : 'text-text-main/40'}`}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Shipping Info (shown when status >= 2) */}
                {swap.status >= 2 && swap.courier && (
                  <div className="mt-2 flex flex-col md:flex-row gap-6 p-5 bg-bg-secondary rounded-md border border-border-main">

                    {/* Left: Courier + Tracking */}
                    <div className="flex-1 flex flex-col gap-4">
                      <div>
                        <p className="text-xs text-text-main/50 uppercase tracking-widest mb-2">บริษัทขนส่ง</p>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{swap.courier.logo}</span>
                          <div>
                            <p className="font-medium">{swap.courier.name}</p>
                            <p className="text-xs text-text-main/60 font-mono mt-0.5">{swap.trackingNo}</p>
                          </div>
                        </div>
                      </div>
                      <a
                        href={swap.courier.trackUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-accent border border-accent/30 px-4 py-2 rounded-md hover:bg-accent/5 transition-colors w-fit"
                      >
                        <ExternalLink className="w-4 h-4" /> ติดตามพัสดุบนเว็บ {swap.courier.name}
                      </a>
                      {swap.shippedAt && (
                        <p className="text-xs text-text-main/50">จัดส่งเมื่อ {swap.shippedAt}</p>
                      )}
                    </div>

                    {/* Right: Proof Photo */}
                    {swap.shippingPhoto && (
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Camera className="w-4 h-4 text-text-main/50" />
                          <p className="text-xs text-text-main/50 uppercase tracking-widest">หลักฐานการจัดส่ง</p>
                        </div>
                        <div className="relative rounded-md overflow-hidden border border-border-main aspect-video bg-bg-main">
                          <img src={swap.shippingPhoto} alt="proof" className="w-full h-full object-cover" />
                        </div>
                        {swap.shippingNote && (
                          <p className="text-sm text-text-main/70 mt-2 italic">"{swap.shippingNote}"</p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-5 border-t border-border-main pt-4">
                  {swap.status === 2 && (
                    <button className="bg-accent text-bg-main px-6 py-2 rounded-md text-sm font-medium hover:bg-accent/90 transition-colors">
                      ยืนยันว่าได้รับหนังสือแล้ว
                    </button>
                  )}
                  {swap.status === 1 && (
                    <button className="bg-warning text-bg-main px-6 py-2 rounded-md text-sm font-medium hover:bg-warning/90 transition-colors flex items-center gap-2">
                      <Camera className="w-4 h-4" /> อัปโหลดรูปหลักฐานการส่ง
                    </button>
                  )}
                  {swap.status === 3 && (
                    <button className="border border-accent text-accent px-6 py-2 rounded-md text-sm font-medium hover:bg-accent/5 transition-colors">
                      เขียนรีวิว
                    </button>
                  )}
                </div>

              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
