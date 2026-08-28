import { useState, useEffect, useMemo } from 'react';
import { Search, SlidersHorizontal, ChevronDown, Loader2 } from 'lucide-react';
import BookCard from '../components/BookCard';
import { apiGetBooks, type BookData } from '../services/api';

// Map condition EN -> TH for display
const CONDITION_MAP: Record<string, string> = {
  'New': 'มือหนึ่ง/ใหม่',
  'Like New': 'เหมือนใหม่',
  'Good': 'สภาพดี',
  'Fair': 'พอใช้',
  'Poor': 'เก่า/มีตำหนิ',
};

// Map category tags to Thai labels for the sidebar
const CATEGORY_TAG_MAP: Record<string, string[]> = {
  'นิยาย / วรรณกรรม': ['Fiction', 'Classic', 'Literary', 'Thai Novel', 'Thai Literature'],
  'จิตวิทยา / พัฒนาตนเอง': ['Self-Help', 'Psychology'],
  'ไซไฟ / แฟนตาซี': ['Sci-Fi', 'Fantasy', 'Dystopian'],
  'สารคดี / ความรู้': ['Non-Fiction', 'History', 'Science', 'Physics', 'Finance', 'Education', 'Strategy'],
  'ปรัชญา / จิตวิญญาณ': ['Philosophy', 'Spirituality'],
  'รักโรแมนซ์': ['Romance'],
};

const ITEMS_PER_PAGE = 12;

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [allBooks, setAllBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [showAvailable, setShowAvailable] = useState(false);
  const [showRare, setShowRare] = useState(false);

  // Fetch ALL books once
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await apiGetBooks({ page: 1, limit: 100 });
        if (res.success && res.data) {
          setAllBooks(res.data.books);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Toggle helpers
  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
    setPage(1);
  };

  const toggleCondition = (cond: string) => {
    setSelectedConditions(prev =>
      prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]
    );
    setPage(1);
  };

  // Client-side filtering
  const filteredBooks = useMemo(() => {
    let result = allBooks;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      const matchTags = selectedCategories.flatMap(cat => CATEGORY_TAG_MAP[cat] || []);
      result = result.filter(b =>
        b.tags.some(tag => matchTags.includes(tag))
      );
    }

    // Condition filter
    if (selectedConditions.length > 0) {
      result = result.filter(b => selectedConditions.includes(b.condition));
    }

    // Status filters
    if (showAvailable && !showRare) {
      result = result.filter(b => b.status === 'Available');
    } else if (showRare && !showAvailable) {
      result = result.filter(b => b.tags.includes('Out of Print'));
    } else if (showAvailable && showRare) {
      result = result.filter(b => b.status === 'Available' || b.tags.includes('Out of Print'));
    }

    return result;
  }, [allBooks, searchQuery, selectedCategories, selectedConditions, showAvailable, showRare]);

  // Pagination on filtered results
  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const paginatedBooks = filteredBooks.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Reset page when search changes
  useEffect(() => { setPage(1); }, [searchQuery]);

  const activeFilterCount = selectedCategories.length + selectedConditions.length + (showAvailable ? 1 : 0) + (showRare ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-medium mb-4">ค้นหาหนังสือ</h1>
        <p className="text-text-main/70 text-lg">สำรวจหนังสือที่พร้อมส่งต่อจากชั้นของเพื่อนนักอ่าน</p>
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

            <div className="flex items-center justify-between border-b border-border-main pb-2">
              <div className="flex items-center gap-2 font-heading text-lg font-medium">
                <SlidersHorizontal className="w-5 h-5" /> ตัวกรอง
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={() => { setSelectedCategories([]); setSelectedConditions([]); setShowAvailable(false); setShowRare(false); }}
                  className="text-xs text-accent hover:underline"
                >
                  ล้างทั้งหมด ({activeFilterCount})
                </button>
              )}
            </div>

            {/* Filter Group: Categories */}
            <div className="flex flex-col gap-3">
              <h3 className="font-medium text-sm text-text-main/80 uppercase tracking-widest">หมวดหมู่</h3>
              <div className="flex flex-col gap-2.5">
                {Object.keys(CATEGORY_TAG_MAP).map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="w-4 h-4 rounded-sm border-border-main text-accent focus:ring-accent accent-accent"
                    />
                    <span className="text-sm text-text-main/80 group-hover:text-text-main transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Group: Condition */}
            <div className="flex flex-col gap-3">
              <h3 className="font-medium text-sm text-text-main/80 uppercase tracking-widest">สภาพหนังสือ</h3>
              <div className="flex flex-col gap-2.5">
                {Object.entries(CONDITION_MAP).map(([eng, th]) => (
                  <label key={eng} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedConditions.includes(eng)}
                      onChange={() => toggleCondition(eng)}
                      className="w-4 h-4 rounded-sm border-border-main text-accent focus:ring-accent accent-accent"
                    />
                    <span className="text-sm text-text-main/80 group-hover:text-text-main transition-colors">{th}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Group: Status */}
            <div className="flex flex-col gap-3">
              <h3 className="font-medium text-sm text-text-main/80 uppercase tracking-widest">สถานะ</h3>
              <div className="flex flex-col gap-2.5">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={showAvailable}
                    onChange={() => { setShowAvailable(!showAvailable); setPage(1); }}
                    className="w-4 h-4 rounded-sm border-border-main text-accent focus:ring-accent accent-accent"
                  />
                  <span className="text-sm text-text-main/80 group-hover:text-text-main transition-colors">พร้อมแลก (Available)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={showRare}
                    onChange={() => { setShowRare(!showRare); setPage(1); }}
                    className="w-4 h-4 rounded-sm border-border-main text-accent focus:ring-accent accent-accent"
                  />
                  <span className="text-sm text-text-main/80 group-hover:text-text-main transition-colors">หายาก (Rare / Out of Print)</span>
                </label>
              </div>
            </div>

          </div>
        </aside>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-text-main/60 text-sm">พบหนังสือ {filteredBooks.length} เล่ม</p>
            <button className="flex items-center gap-2 text-sm border border-border-main px-3 py-1.5 rounded-md hover:bg-bg-secondary transition-colors">
              เรียงตาม: มาใหม่ล่าสุด <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : error ? (
            <div className="text-center text-warning py-10">{error}</div>
          ) : paginatedBooks.length === 0 ? (
            <div className="text-center text-text-main/60 py-20">ไม่พบหนังสือที่ตรงตามเงื่อนไข</div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {paginatedBooks.map((book) => (
                <BookCard key={book.id} book={book as any} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="mt-16 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button 
                  key={p} 
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 flex items-center justify-center rounded-md border ${p === page ? 'border-accent bg-accent text-bg-main' : 'border-border-main hover:bg-bg-secondary text-text-main'} transition-colors`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
