'use client';
import React, { useState } from 'react';

export default function TheGate() {
  const [accessCode, setAccessCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const WHATSAPP_NUMBER = '966502777884';

  // ... (نفس إعدادات النصوص والمنتجات السابقة)
  const ArabicText = {
    gateTitle: 'بوابة التوزيع المغلقة',
    gateDesc: 'منصة مخصصة حصرياً لأصحاب البوتيكات والمتاجر المسجلة.',
    label: 'رقم السجل التجاري أو كود الدعوة',
    placeholder: 'أدخل الرمز هنا...',
    btnNormal: 'طلب دخول المنصة',
    btnLoading: 'جاري التحقق...',
    errorMsg: 'رمز الدخول غير صحيح.',
    btnLogout: 'تسجيل الخروج',
    currency: 'ر.س',
    moq: 'أقل كمية:',
    pieces: 'قطع',
    inStock: 'متوفر',
    outStock: 'نفدت الكمية',
    addToCart: 'إضافة للطلب',
    inCart: 'مضاف بالسلة',
    cartTitle: 'حقيبة الطلب',
    sendWhatsapp: 'تأكيد الطلب عبر الواتساب',
  };

  const products = [
    { id: 1, name: 'تيشرت اوفر سايز - خامات قطنية فاخرة', price: 35, moq: 5, stock: true, img: '👕' },
    // ... أضف باقي المنتجات بنفس التنسيق
  ];

  // ... (باقي الدوال البرمجية تبقى كما هي)

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#050505] text-white p-8 sm:p-16 text-right" dir="rtl">
        <header className="border-b border-[#161616] pb-10 mb-12">
          <h1 className="text-3xl font-bold text-[#c5a880]">{ArabicText.dashTitle}</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {products.map((product) => (
            <div key={product.id} className="bg-[#0a0a0a] border border-[#161616] p-10 space-y-6">
              <h3 className="text-xl font-bold text-gray-100">{product.name}</h3>
              <div className="text-2xl font-bold text-[#c5a880]">{product.price} {ArabicText.currency}</div>
              <button onClick={() => addToCart(product.id, product.moq)} className="w-full bg-[#111111] border border-[#1e1e1e] py-6 text-lg hover:bg-[#c5a880] hover:text-black">
                {ArabicText.addToCart}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col justify-center p-12 text-white" dir="rtl">
      <h1 className="text-4xl text-center text-[#c5a880] mb-12">{ArabicText.gateTitle}</h1>
      <div className="bg-[#0a0a0a] border border-[#161616] p-12 max-w-lg mx-auto w-full">
        <form onSubmit={handleLogin} className="space-y-8">
          <input type="text" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} className="w-full bg-[#111111] border border-[#1e1e1e] p-6 text-xl text-center" placeholder={ArabicText.placeholder} />
          <button type="submit" className="w-full bg-[#c5a880] text-black text-xl py-6">{ArabicText.btnNormal}</button>
        </form>
      </div>
    </div>
  );
}
