import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight, Loader2, Check, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ApiError, apiCheckUsername } from '../services/api';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const { register } = useAuth();
  const navigate = useNavigate();

  // Check username availability with debounce
  const handleUsernameChange = async (value: string) => {
    setUsername(value);
    if (value.length < 3) {
      setUsernameStatus('idle');
      return;
    }
    setUsernameStatus('checking');
    try {
      const res = await apiCheckUsername(value);
      setUsernameStatus(res.data?.available ? 'available' : 'taken');
    } catch {
      setUsernameStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !displayName || !email || !password) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง');
      return;
    }
    if (usernameStatus === 'taken') {
      setError('Username นี้ถูกใช้แล้ว กรุณาเลือกชื่ออื่น');
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      await register({
        username,
        email,
        password,
        display_name: displayName,
      });
      navigate('/');
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-bg-main font-sans">
      
      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 order-2 lg:order-1">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-12">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-accent" />
              <span className="font-heading font-semibold text-2xl tracking-wide">ReRead</span>
            </Link>
          </div>

          <h1 className="font-heading text-3xl font-medium mb-2">สมัครสมาชิก</h1>
          <p className="text-text-main/70 mb-8">
            มีบัญชีผู้ใช้แล้วใช่ไหม?{' '}
            <Link to="/login" className="text-accent hover:underline underline-offset-4 font-medium">
              เข้าสู่ระบบที่นี่
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Username</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  className="w-full bg-bg-main border border-border-main rounded-md px-4 py-3 pr-10 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  placeholder="ตัวอักษร ตัวเลข และ _ (3-50 ตัว)"
                  disabled={isSubmitting}
                />
                {usernameStatus === 'available' && (
                  <Check className="w-5 h-5 text-accent absolute right-3 top-1/2 -translate-y-1/2" />
                )}
                {usernameStatus === 'taken' && (
                  <X className="w-5 h-5 text-warning absolute right-3 top-1/2 -translate-y-1/2" />
                )}
              </div>
              {usernameStatus === 'taken' && (
                <p className="text-warning text-xs">Username นี้ถูกใช้แล้ว</p>
              )}
              {usernameStatus === 'available' && (
                <p className="text-accent text-xs">Username นี้ใช้ได้!</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">ชื่อ-นามสกุล / นามปากกา</label>
              <input 
                type="text" 
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-bg-main border border-border-main rounded-md px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                placeholder="ชื่อที่ใช้ในคอมมูนิตี้"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">อีเมล</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg-main border border-border-main rounded-md px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                placeholder="hello@example.com"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">รหัสผ่าน</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg-main border border-border-main rounded-md px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                placeholder="อย่างน้อย 8 ตัว มีตัวพิมพ์ใหญ่ ตัวเลข และอักขระพิเศษ"
                disabled={isSubmitting}
              />
              <p className="text-xs text-text-main/50">ต้องมีตัวพิมพ์ใหญ่ ตัวเลข และอักขระพิเศษอย่างน้อยอย่างละ 1 ตัว</p>
            </div>

            {error && (
              <p className="text-warning text-sm font-medium bg-warning/10 px-3 py-2 rounded-md border border-warning/20">
                {error}
              </p>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-accent text-bg-main py-3 rounded-md font-medium text-lg hover:bg-accent/90 transition-colors mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  กำลังสร้างบัญชี...
                </>
              ) : (
                'สร้างบัญชีใหม่'
              )}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-border-main"></div>
            <span className="text-xs text-text-main/50 uppercase tracking-widest font-medium">หรือสมัครด้วย</span>
            <div className="flex-1 h-px bg-border-main"></div>
          </div>

          <div className="flex flex-col gap-3">
            <button className="w-full flex items-center justify-center gap-3 bg-transparent border border-border-main text-text-main py-3 rounded-md font-medium hover:bg-bg-secondary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
          </div>

          <Link to="/" className="flex items-center justify-center gap-2 mt-8 text-sm text-text-main/60 hover:text-text-main transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" /> กลับสู่หน้าแรก
          </Link>
        </div>
      </div>

      {/* Image Side (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-bg-secondary p-12 flex-col justify-between order-1 lg:order-2">
        <div className="flex justify-end w-full">
          <Link to="/" className="flex items-center gap-2 relative z-10 w-fit">
            <BookOpen className="w-6 h-6 text-accent" />
            <span className="font-heading font-semibold text-2xl tracking-wide">ReRead</span>
          </Link>
        </div>
        
        <div className="relative z-10 max-w-md mt-auto ml-auto text-right">
          <h2 className="font-heading text-4xl leading-tight mb-4 text-text-main font-medium">
            เริ่มต้นแชร์หนังสือ<br/>เล่มโปรดกับเรา
          </h2>
          <p className="text-text-main/70 text-lg leading-relaxed">
            มาร่วมสร้างพื้นที่เล็กๆ ให้หนังสือเดินทางไปสู่มือนักอ่านคนต่อไป
          </p>
        </div>

        {/* Cover Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop" 
            alt="ชั้นหนังสือ" 
            className="w-full h-full object-cover opacity-60 mix-blend-multiply"
          />
        </div>
      </div>

    </div>
  );
}
