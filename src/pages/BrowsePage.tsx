import { useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import BookCard from '../components/BookCard';
import { MOCK_BOOKS } from '../data/mockBooks';

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // สร้าง Mock Books เพิ่มเติมให้หน้าดูเต็ม
  const displayBooks = [...MOCK_BOOKS, ...MOCK_BOOKS.map(b => ({...b, id: b.id + '_copy'}))];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-medium mb-4">ค้นหาหนังสือ</h1>
        <p className="text-text-main/70 text-lg">สำรวจหนังสือกว่า 12,000 เล่มที่พร้อมส่งต่อจากชั้นของเพื่อนนักอ่าน</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-28 flex flex-col gap-8">
            
            {/* Search */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="ค้นหาชื่อหนังสือ, ผู้แต่ง..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-bg-secondary border border-border-main rounded-md pl-10 pr-4 py-2.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
              />
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-text-main/50" />
            </div>

            <div className="flex items-center gap-2 font-heading text-lg font-medium border-b border-border-main pb-2">
              <SlidersHorizontal className="w-5 h-5" /> ตัวกรอง
            </div>

            {/* Filter Group: Categories */}
            <div className="flex flex-col gap-3">
              <h3 className="font-medium text-sm text-text-main/80 uppercase tracking-widest">หมวดหมู่</h3>
              <div className="flex flex-col gap-2.5">
                {['วรรณกรรมแปล', 'นิยายสืบสวน', 'จิตวิทยา/พัฒนาตนเอง', 'ประวัติศาสตร์', 'แฟนตาซี/ไซไฟ'].map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded-sm border-border-main text-accent focus:ring-accent accent-accent" />
                    <span className="text-sm text-text-main/80 group-hover:text-text-main transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Group: Condition */}
            <div className="flex flex-col gap-3">
              <h3 className="font-medium text-sm text-text-main/80 uppercase tracking-widest">สภาพหนังสือ</h3>
              <div className="flex flex-col gap-2.5">
                {['มือหนึ่ง/ใหม่', 'เหมือนใหม่', 'สภาพดี', 'พอใช้', 'เก่า/มีตำหนิ'].map(cond => (
                  <label key={cond} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded-sm border-border-main text-accent focus:ring-accent accent-accent" />
                    <span className="text-sm text-text-main/80 group-hover:text-text-main transition-colors">{cond}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Group: Status */}
            <div className="flex flex-col gap-3">
              <h3 className="font-medium text-sm text-text-main/80 uppercase tracking-widest">สถานะ</h3>
              <div className="flex flex-col gap-2.5">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded-sm border-border-main text-accent focus:ring-accent accent-accent" />
                  <span className="text-sm text-text-main/80 group-hover:text-text-main transition-colors">พร้อมแลก (Available)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded-sm border-border-main text-accent focus:ring-accent accent-accent" />
                  <span className="text-sm text-text-main/80 group-hover:text-text-main transition-colors">หายาก (Rare / Out of Print)</span>
                </label>
              </div>
            </div>

          </div>
        </aside>

        {/* Main Content: Books Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-text-main/60 text-sm">พบหนังสือ 124 เล่ม</p>
            <button className="flex items-center gap-2 text-sm border border-border-main px-3 py-1.5 rounded-md hover:bg-bg-secondary transition-colors">
              เรียงตาม: มาใหม่ล่าสุด <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {displayBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          {/* Pagination (Mock) */}
          <div className="mt-16 flex justify-center gap-2">
            {[1, 2, 3, 4, '...'].map((page, i) => (
              <button 
                key={i} 
                className={`w-10 h-10 flex items-center justify-center rounded-md border ${page === 1 ? 'border-accent bg-accent text-bg-main' : 'border-border-main hover:bg-bg-secondary text-text-main'} transition-colors`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
