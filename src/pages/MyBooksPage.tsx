import { Link } from 'react-router-dom';
import { MOCK_BOOKS } from '../data/mockBooks';
import BookCard from '../components/BookCard';
import { BookPlus } from 'lucide-react';

export default function MyBooksPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-heading font-medium mb-3">หนังสือของฉัน</h1>
          <p className="text-text-main/70">หนังสือทั้งหมดที่คุณลงรายการไว้บนชั้น ReRead</p>
        </div>
        <Link to="/add-book"
          className="flex-shrink-0 flex items-center gap-2 bg-accent text-bg-main px-6 py-3 rounded-md font-medium hover:bg-accent/90 transition-colors">
          <BookPlus className="w-5 h-5" /> เพิ่มหนังสือ
        </Link>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-4 mb-12 p-6 bg-bg-secondary rounded-md border border-border-main">
        <div className="text-center">
          <p className="text-3xl font-heading font-medium">4</p>
          <p className="text-sm text-text-main/60 mt-1">หนังสือทั้งหมด</p>
        </div>
        <div className="text-center border-x border-border-main">
          <p className="text-3xl font-heading font-medium text-accent">3</p>
          <p className="text-sm text-text-main/60 mt-1">พร้อมแลก</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-heading font-medium text-warning">1</p>
          <p className="text-sm text-text-main/60 mt-1">รอแลกอยู่</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {MOCK_BOOKS.map(book => (
          <div key={book.id} className="flex flex-col gap-2">
            <BookCard book={book} />
            <div className="flex gap-2">
              <button className="flex-1 text-xs border border-border-main py-1.5 rounded hover:bg-bg-secondary transition-colors">แก้ไข</button>
              <button className="flex-1 text-xs border border-warning/40 text-warning py-1.5 rounded hover:bg-warning/5 transition-colors">ลบ</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
