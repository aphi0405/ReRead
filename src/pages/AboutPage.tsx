import { Link } from 'react-router-dom';
import { Heart, BookOpen, Users, Leaf, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-main pb-24">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/19100919/pexels-photo-19100919.jpeg"
            alt="ร้านหนังสือ"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-main/50 via-bg-main/80 to-bg-main" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto mt-12">
          <div className="flex justify-center mb-6">
            <img src="/ReRead_icon.png" alt="ReRead Logo" className="w-20 h-20 object-contain drop-shadow-md" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-medium mb-6 text-text-main">
            เกี่ยวกับ <span className="text-accent italic">ReRead</span>
          </h1>
          <p className="text-lg md:text-xl text-text-main/80 leading-relaxed">
            เพราะเราเชื่อว่าหนังสือทุกเล่มมีชีวิต และเรื่องราวที่ดีไม่ควรหยุดอยู่แค่บนชั้นหนังสือ
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 -mt-10 relative z-20">
        <div className="bg-bg-secondary p-8 md:p-12 rounded-lg border border-border-main shadow-sm">
          <h2 className="text-2xl font-heading font-medium mb-6 text-accent">จุดเริ่มต้นของเรา</h2>
          <p className="text-text-main/80 leading-relaxed mb-6">
            ReRead เกิดขึ้นจากความตั้งใจเล็กๆ ของกลุ่มคนรักการอ่าน ที่มองเห็นว่ามีหนังสือจำนวนมากถูกวางทิ้งไว้บนชั้นหนังสือฝุ่นเขรอะ หลังจากถูกอ่านจบไปเพียงครั้งเดียว ในขณะเดียวกัน ก็มีนักอ่านอีกมากมายที่กำลังตามหาหนังสือเหล่านั้นอยู่
          </p>
          <p className="text-text-main/80 leading-relaxed mb-12">
            เราจึงสร้างพื้นที่นี้ขึ้นมาเพื่อเป็น "ร้านหนังสืออิสระยุคใหม่" ที่ทุกคนสามารถนำหนังสือเล่มโปรดมาส่งต่อ แลกเปลี่ยนเรื่องราว และค้นพบหนังสือเล่มใหม่ที่จะเปลี่ยนชีวิตคุณ โดยไม่ต้องเสียเงินซื้อใหม่เสมอไป
          </p>

          <h2 className="text-2xl font-heading font-medium mb-8 text-center">คุณค่าที่เรายึดถือ (Our Core Values)</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Value 1 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 flex-shrink-0 bg-bg-main border border-border-main rounded-full flex items-center justify-center text-accent">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-medium text-lg mb-2">ส่งต่อความรู้และจินตนาการ</h3>
                <p className="text-sm text-text-main/70 leading-relaxed">
                  เราเชื่อว่าหนังสือมีไว้เพื่อส่งต่อ ไม่ใช่ครอบครอง การหมุนเวียนหนังสือคือการกระจายความรู้และแรงบันดาลใจไม่รู้จบ
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 flex-shrink-0 bg-bg-main border border-border-main rounded-full flex items-center justify-center text-warning">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-medium text-lg mb-2">สร้างชุมชนนักอ่านที่อบอุ่น</h3>
                <p className="text-sm text-text-main/70 leading-relaxed">
                  ReRead ไม่ใช่แค่แพลตฟอร์มแลกของ แต่เป็นพื้นที่พบปะ พูดคุย และเชื่อมโยงผู้คนที่รักในสิ่งเดียวกันเข้าด้วยกัน
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 flex-shrink-0 bg-bg-main border border-border-main rounded-full flex items-center justify-center text-green-600">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-medium text-lg mb-2">รักษ์โลกอย่างยั่งยืน</h3>
                <p className="text-sm text-text-main/70 leading-relaxed">
                  การแลกเปลี่ยนหนังสือช่วยลดการใช้ทรัพยากรในการพิมพ์ใหม่ ทุกการแลกเปลี่ยนคือการช่วยรักษาต้นไม้บนโลกใบนี้
                </p>
              </div>
            </div>

            {/* Value 4 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 flex-shrink-0 bg-bg-main border border-border-main rounded-full flex items-center justify-center text-pink-500">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-medium text-lg mb-2">สร้างคุณค่าทางใจ</h3>
                <p className="text-sm text-text-main/70 leading-relaxed">
                  หนังสือที่ไปถึงมือคนที่กำลังตามหา จะมีคุณค่าทางใจมากกว่าการตั้งทิ้งไว้บนชั้น เรายินดีที่ได้เป็นสะพานเชื่อมสิ่งนี้
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 mt-20 text-center">
        <h2 className="text-3xl font-heading font-medium mb-6">พร้อมที่จะเริ่มส่งต่อเรื่องราวแล้วหรือยัง?</h2>
        <p className="text-text-main/70 mb-10 max-w-2xl mx-auto">
          นำหนังสือเล่มที่คุณอ่านจบแล้ว มาหาเพื่อนใหม่ที่พร้อมจะดูแลต่อ และค้นหาหนังสือเล่มถัดไปที่คุณอยากอ่านจากสมาชิกท่านอื่น
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/signup" className="w-full sm:w-auto px-8 py-3 bg-accent text-bg-main rounded-md font-medium hover:bg-accent/90 transition-colors flex items-center justify-center gap-2">
            เข้าร่วมเป็นสมาชิก <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/browse" className="w-full sm:w-auto px-8 py-3 bg-bg-secondary border border-border-main text-text-main rounded-md font-medium hover:bg-border-main/50 transition-colors">
            ดูหนังสือที่มีในระบบ
          </Link>
        </div>
      </section>
    </div>
  );
}
