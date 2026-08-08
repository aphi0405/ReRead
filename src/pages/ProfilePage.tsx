import { Link } from 'react-router-dom';
import { Settings, MapPin, Calendar, Star, BookMarked, RefreshCw, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const HISTORY = [
  { id: '1', date: '10 ก.ค. 2568', type: 'ส่งออก', book: 'Pride and Prejudice', partner: 'ชาญชัย ด.', status: 'สำเร็จ' },
  { id: '2', date: '05 ก.ค. 2568', type: 'ได้รับ', book: 'The Great Gatsby', partner: 'ชาญชัย ด.', status: 'สำเร็จ' },
  { id: '3', date: '20 มิ.ย. 2568', type: 'ส่งออก', book: 'To Kill a Mockingbird', partner: 'ดาว ร.', status: 'สำเร็จ' },
  { id: '4', date: '01 มิ.ย. 2568', type: 'ได้รับ', book: 'Sapiens', partner: 'ภูมิ ส.', status: 'สำเร็จ' },
];

export default function ProfilePage() {
  const { user } = useAuth();

  // Format join date from API
  const joinDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('th-TH', { year: 'numeric', month: 'long' })
    : 'ไม่ทราบ';

  const displayName = user?.display_name || 'ผู้ใช้';
  const avatarUrl = user?.avatar_url || null;
  const email = user?.email || '';

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-border-main">
        <div className="flex items-center gap-6">
          <div className="relative">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-24 h-24 rounded-md object-cover border border-border-main bg-bg-secondary"
              />
            ) : (
              <div className="w-24 h-24 rounded-md bg-accent/20 flex items-center justify-center text-accent font-bold text-3xl border border-border-main">
                {displayName.charAt(0)}
              </div>
            )}
            <span className="absolute -bottom-2 -right-2 bg-accent text-bg-main text-[10px] font-bold px-2 py-0.5 rounded-full">✦ 0 แต้ม</span>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-heading font-medium">{displayName}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-main/60">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> ยังไม่ได้ตั้งค่า</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> เข้าร่วม {joinDate}</span>
              <span className="flex items-center gap-1.5 text-warning font-medium">
                <Star className="w-4 h-4 fill-warning stroke-warning" /> -
                <span className="font-normal text-text-main/60">(ยังไม่มีรีวิว)</span>
              </span>
            </div>
            <p className="text-sm text-text-main/70 max-w-xs leading-relaxed">
              {email}
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 border border-border-main rounded-md text-sm font-medium hover:bg-bg-secondary transition-colors">
          <Settings className="w-4 h-4" /> ตั้งค่าบัญชี
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 border-b border-border-main">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-accent mb-1">
            <RefreshCw className="w-4 h-4" />
          </div>
          <span className="text-3xl font-heading font-medium">0</span>
          <span className="text-sm text-text-main/60">แลกสำเร็จแล้ว</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-warning mb-1">
            <Clock className="w-4 h-4" />
          </div>
          <span className="text-3xl font-heading font-medium">0</span>
          <span className="text-sm text-text-main/60">กำลังรอดำเนินการ</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-text-main/50 mb-1">
            <BookMarked className="w-4 h-4" />
          </div>
          <span className="text-3xl font-heading font-medium">0</span>
          <span className="text-sm text-text-main/60">หนังสือบนชั้น</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-text-main/50 mb-1">
            <Star className="w-4 h-4" />
          </div>
          <span className="text-3xl font-heading font-medium">0</span>
          <span className="text-sm text-text-main/60">แต้มสะสม ReRead</span>
        </div>
      </div>

      {/* Transaction History */}
      <div className="py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-medium">ประวัติการแลกเปลี่ยน</h2>
          <Link to="/dashboard" className="text-sm text-accent hover:underline underline-offset-4">
            ดูสถานะปัจจุบัน →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border-main text-text-main/60">
                <th className="pb-3 font-medium pr-6">วันที่</th>
                <th className="pb-3 font-medium pr-6">ประเภท</th>
                <th className="pb-3 font-medium pr-6">หนังสือ</th>
                <th className="pb-3 font-medium pr-6">กับผู้ใช้</th>
                <th className="pb-3 font-medium text-right">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-main">
              {HISTORY.map((tx) => (
                <tr key={tx.id} className="hover:bg-bg-secondary/30 transition-colors">
                  <td className="py-3.5 pr-6 whitespace-nowrap text-text-main/60">{tx.date}</td>
                  <td className="py-3.5 pr-6">
                    <span className={`px-2.5 py-1 rounded-sm text-xs font-medium ${
                      tx.type === 'ส่งออก'
                        ? 'bg-bg-secondary border border-border-main text-text-main'
                        : 'bg-accent/10 text-accent'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3.5 pr-6 font-medium">{tx.book}</td>
                  <td className="py-3.5 pr-6 text-text-main/70">{tx.partner}</td>
                  <td className="py-3.5 text-right">
                    <span className="flex items-center justify-end gap-1 text-accent">
                      <Star className="w-3 h-3 fill-accent stroke-accent" /> {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
