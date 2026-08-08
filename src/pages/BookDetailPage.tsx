import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookMarked, MessageCircle, MapPin, Share2, AlertCircle } from 'lucide-react';
import { MOCK_BOOKS } from '../data/mockBooks';

export default function BookDetailPage() {
  const { id } = useParams();
  
  // ในที่นี้เราจะ mock การดึงข้อมูล โดยใช้หนังสือเล่มแรกเสมอถ้าหาไม่เจอ
  const book = MOCK_BOOKS.find(b => b.id === id?.replace('_copy', '')) || MOCK_BOOKS[0];

  const conditionTH = {
    'New': 'มือหนึ่ง/ใหม่',
    'Like New': 'เหมือนใหม่',
    'Good': 'สภาพดี',
    'Fair': 'พอใช้',
    'Poor': 'เก่า/มีตำหนิ'
  }[book.condition] || book.condition;

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
      
      {/* Back navigation */}
      <Link to="/browse" className="inline-flex items-center gap-2 text-text-main/60 hover:text-text-main transition-colors mb-8 font-medium">
        <ArrowLeft className="w-4 h-4" /> กลับไปหน้าค้นหา
      </Link>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        
        {/* Left: Image Gallery */}
        <div className="w-full md:w-5/12 lg:w-1/2 flex gap-4">
          {/* Vertical Thumbnails (Mock) */}
          <div className="hidden sm:flex flex-col gap-4 w-20">
            <div className="w-full aspect-[3/4] border-2 border-accent rounded-md overflow-hidden opacity-100 cursor-pointer">
              <img src={book.coverUrl} className="w-full h-full object-cover" alt="Thumbnail 1" />
            </div>
            <div className="w-full aspect-[3/4] border border-border-main rounded-md overflow-hidden opacity-60 hover:opacity-100 cursor-pointer transition-opacity">
              <img src={book.coverUrl} className="w-full h-full object-cover grayscale" alt="Thumbnail 2" />
            </div>
          </div>
          
          {/* Main Image */}
          <div className="flex-1 relative aspect-[3/4] border border-border-main rounded-md overflow-hidden bg-bg-secondary">
            <img src={book.coverUrl} className="w-full h-full object-cover" alt={book.title} />
            
            {/* Signature Condition Badge */}
            <div className="absolute top-6 right-6 bg-bg-main border border-border-main border-dashed px-4 py-2 flex flex-col items-center shadow-sm transform rotate-2">
              <span className="text-[10px] tracking-widest text-text-main/60 uppercase font-sans mb-1">สภาพประเมิน</span>
              <span className="font-heading text-lg font-medium text-text-main">{conditionTH}</span>
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col">
          
          <div className="flex flex-wrap gap-2 mb-4">
            {book.tags.map(tag => (
              <span key={tag} className={`text-xs px-2.5 py-1 rounded-sm font-medium ${tag === 'Out of Print' ? 'bg-warning text-bg-main' : 'bg-bg-secondary text-text-main border border-border-main'}`}>
                {tag === 'Out of Print' ? 'หายาก / เลิกพิมพ์' : tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl lg:text-5xl font-heading font-medium mb-2">{book.title}</h1>
          <p className="text-xl text-text-main/70 mb-8">โดย {book.author}</p>
          
          {/* Owner Profile (Embedded) */}
          <div className="flex items-center justify-between p-4 bg-bg-secondary border border-border-main rounded-md mb-8">
            <div className="flex items-center gap-4">
              <img src={book.owner.avatarUrl} alt={book.owner.name} className="w-12 h-12 rounded-full object-cover border border-border-main" />
              <div>
                <p className="font-medium text-text-main">เจ้าของ: {book.owner.name}</p>
                <div className="flex items-center gap-1 text-sm text-text-main/60 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" /> กรุงเทพมหานคร
                </div>
              </div>
            </div>
            <button className="p-2 text-text-main/60 hover:text-accent transition-colors" title="ส่งข้อความถามรายละเอียด">
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>

          <div className="prose prose-stone mb-10 text-text-main/80 leading-relaxed">
            <p>{book.description}</p>
            <p><strong>บันทึกจากเจ้าของ:</strong> "อ่านจบไปรอบเดียว เก็บรักษาอย่างดีในตู้กระจก ไม่มีรอยยับหรือรอยขีดเขียนใดๆ อยากส่งต่อให้คนที่ชอบแนวเดียวกันครับ"</p>
          </div>

          <div className="flex flex-col gap-4 mt-auto">
            {book.status === 'Available' ? (
              <button className="w-full bg-accent text-bg-main py-4 rounded-md font-medium text-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2">
                <BookMarked className="w-5 h-5" /> เสนอแลกเปลี่ยนหนังสือเล่มนี้
              </button>
            ) : (
              <button disabled className="w-full bg-warning/80 text-bg-main py-4 rounded-md font-medium text-lg cursor-not-allowed flex items-center justify-center gap-2">
                <AlertCircle className="w-5 h-5" /> มีผู้เสนอแลกเปลี่ยนแล้ว
              </button>
            )}
            
            <button className="w-full bg-transparent border border-border-main text-text-main py-4 rounded-md font-medium hover:bg-bg-secondary transition-colors flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5" /> แชร์หนังสือน่าสนใจ
            </button>
          </div>

        </div>
      </div>
      
      {/* Sticky Bottom CTA for Mobile */}
      {book.status === 'Available' && (
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-bg-main border-t border-border-main p-4 z-40 flex gap-4">
          <button className="flex-1 bg-accent text-bg-main py-3 rounded-md font-medium hover:bg-accent/90 transition-colors">
            เสนอแลกเปลี่ยน
          </button>
        </div>
      )}
    </div>
  );
}
