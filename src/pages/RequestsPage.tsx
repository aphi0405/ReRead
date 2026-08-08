import { PlusCircle, Search } from 'lucide-react';

export default function RequestsPage() {
  const requests = [
    { id: '1', book: 'The Catcher in the Rye', author: 'J.D. Salinger', user: 'Alice W.', date: 'วันนี้', offers: 2 },
    { id: '2', book: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', user: 'Bob M.', date: 'เมื่อวาน', offers: 0 },
    { id: '3', book: 'Atomic Habits', author: 'James Clear', user: 'Charlie D.', date: '15 ก.ค. 2026', offers: 5 },
    { id: '4', book: 'Kafka on the Shore', author: 'Haruki Murakami', user: 'Diana R.', date: '14 ก.ค. 2026', offers: 1 },
    { id: '5', book: 'The Midnight Library', author: 'Matt Haig', user: 'Eve S.', date: '12 ก.ค. 2026', offers: 0 },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
      
      {/* Header with prominent CTA */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-heading font-medium mb-4">บอร์ดตามหาหนังสือ</h1>
          <p className="text-text-main/70 text-lg">ประกาศตามหาหนังสือที่อยากอ่าน หรือเสนอหนังสือที่คุณมีให้กับคนที่กำลังตามหา</p>
        </div>
        
        <button className="flex-shrink-0 bg-accent text-bg-main px-6 py-4 rounded-md font-medium text-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 shadow-sm">
          <PlusCircle className="w-5 h-5" /> ตั้งกระทู้ตามหาหนังสือ
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Simple Sidebar/Search */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="relative mb-6">
            <input 
              type="text" 
              placeholder="ค้นหาชื่อหนังสือ..." 
              className="w-full bg-bg-secondary border border-border-main rounded-md pl-10 pr-4 py-2.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
            />
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-text-main/50" />
          </div>
          
          <div className="flex flex-col gap-2">
            <button className="text-left text-sm font-medium text-accent bg-accent/10 px-4 py-2 rounded-md">ล่าสุด</button>
            <button className="text-left text-sm font-medium text-text-main/70 hover:bg-bg-secondary px-4 py-2 rounded-md transition-colors">ยังไม่มีคนเสนอ</button>
            <button className="text-left text-sm font-medium text-text-main/70 hover:bg-bg-secondary px-4 py-2 rounded-md transition-colors">กระทู้ของฉัน</button>
          </div>
        </div>

        {/* Requests List */}
        <div className="flex-1 flex flex-col gap-4">
          {requests.map(req => (
            <div key={req.id} className="bg-bg-main border border-border-main rounded-md p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-accent/50 transition-colors cursor-pointer group">
              
              <div className="flex flex-col gap-1">
                <h3 className="font-heading text-lg font-medium group-hover:text-accent transition-colors">{req.book}</h3>
                <p className="text-sm text-text-main/70">ผู้แต่ง: {req.author}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-text-main/50">
                  <span className="font-medium text-text-main/70">{req.user}</span>
                  <span>•</span>
                  <span>{req.date}</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 border-t border-border-main sm:border-t-0 pt-3 sm:pt-0">
                <span className={`text-xs px-2.5 py-1 rounded-sm font-medium ${
                  req.offers > 0 ? 'bg-bg-secondary text-text-main' : 'bg-warning/10 text-warning'
                }`}>
                  {req.offers > 0 ? `มีผู้เสนอแล้ว ${req.offers} เล่ม` : 'ยังไม่มีผู้เสนอ'}
                </span>
                
                <span className="text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  ดูรายละเอียด &rarr;
                </span>
              </div>

            </div>
          ))}

          <div className="mt-8 flex justify-center">
            <button className="text-sm font-medium text-text-main/60 hover:text-text-main border border-border-main px-4 py-2 rounded-md">
              โหลดเพิ่มเติม
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
