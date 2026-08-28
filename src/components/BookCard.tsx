import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface BookOwner {
  name?: string;
  avatarUrl?: string;
  display_name?: string;
  avatar_url?: string | null;
}

interface BookCardData {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  cover_url?: string | null;
  condition: string;
  tags: string[];
  status: string;
  owner: BookOwner;
}

interface BookCardProps {
  book: BookCardData;
}

export default function BookCard({ book }: BookCardProps) {
  const isRare = book.tags.includes('Out of Print');
  const coverImage = book.coverUrl || book.cover_url || '';
  const ownerName = book.owner?.name || book.owner?.display_name || 'ไม่ทราบ';
  const ownerAvatar = book.owner?.avatarUrl || book.owner?.avatar_url || '';

  // แปลงสภาพหนังสือเป็นภาษาไทยสำหรับแสดงผล
  const conditionTH = {
    'New': 'มือหนึ่ง/ใหม่',
    'Like New': 'เหมือนใหม่',
    'Good': 'สภาพดี',
    'Fair': 'พอใช้',
    'Poor': 'เก่า/มีตำหนิ'
  }[book.condition] || book.condition;

  return (
    <Link to={`/book/${book.id}`} className="group flex flex-col gap-4">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border border-border-main bg-bg-secondary">
        <img 
          src={coverImage} 
          alt={book.title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600'; }}
        />
        
        {/* Signature Element: Library/Price Tag style condition badge */}
        <div className="absolute top-4 right-4 bg-bg-main border border-border-main border-dashed px-3 py-1.5 flex flex-col items-center shadow-sm">
          <span className="text-[10px] tracking-widest text-text-main/60 uppercase font-sans mb-0.5">สภาพ</span>
          <span className="font-heading text-sm font-medium text-text-main">{conditionTH}</span>
        </div>

        {/* Status/Rare Badge */}
        {isRare && (
          <div className="absolute bottom-4 left-4 bg-warning text-bg-main text-xs px-2 py-1 font-medium rounded-sm">
            หายาก / เลิกพิมพ์
          </div>
        )}
        {book.status === 'Pending' && !isRare && (
          <div className="absolute bottom-4 left-4 bg-warning/90 text-bg-main text-xs px-2 py-1 font-medium rounded-sm">
            รอแลกเปลี่ยน
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-heading text-lg font-medium leading-snug group-hover:text-accent transition-colors">
          {book.title}
        </h3>
        <p className="text-text-main/70 text-sm">{book.author}</p>
        
        <div className="mt-2 flex items-center justify-between text-xs text-text-main/60">
          <div className="flex items-center gap-2">
            {ownerAvatar && (
              <img src={ownerAvatar} alt={ownerName} className="w-5 h-5 rounded-full object-cover" />
            )}
            <span>{ownerName}</span>
          </div>
          <span className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 flex items-center gap-1 text-accent font-medium">
            ดูรายละเอียด <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
