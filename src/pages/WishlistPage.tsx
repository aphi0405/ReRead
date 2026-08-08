import { Link } from 'react-router-dom';
import { BookMarked, Trash2 } from 'lucide-react';

const SAVED_BOOKS = [
  { id: '1', title: 'Norwegian Wood', author: 'Haruki Murakami', coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300&auto=format&fit=crop', owner: 'Bob M.' },
  { id: '4', title: 'Pride and Prejudice', author: 'Jane Austen', coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=300&auto=format&fit=crop', owner: 'Diana R.' },
];

export default function WishlistPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-heading font-medium mb-3">รายการที่บันทึกไว้</h1>
        <p className="text-text-main/70">หนังสือที่คุณกดใจไว้ เพื่อติดตามหรือส่งคำขอแลกเปลี่ยนทีหลัง</p>
      </div>

      {SAVED_BOOKS.length === 0 ? (
        <div className="text-center py-24 text-text-main/50">
          <BookMarked className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>ยังไม่มีหนังสือที่บันทึกไว้</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {SAVED_BOOKS.map(book => (
            <div key={book.id} className="flex items-center gap-6 p-4 border border-border-main rounded-md hover:bg-bg-secondary/50 transition-colors">
              <img src={book.coverUrl} alt={book.title} className="w-16 h-20 object-cover rounded border border-border-main flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-lg font-medium">{book.title}</h3>
                <p className="text-sm text-text-main/70">{book.author}</p>
                <p className="text-xs text-text-main/50 mt-1">เจ้าของ: {book.owner}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Link to={`/book/${book.id}`}
                  className="bg-accent text-bg-main px-4 py-2 rounded-md text-sm font-medium hover:bg-accent/90 transition-colors">
                  ดูรายละเอียด
                </Link>
                <button className="p-2 text-text-main/40 hover:text-warning transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
