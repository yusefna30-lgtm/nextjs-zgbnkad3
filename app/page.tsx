'use client';
import React, { useState } from 'react';

export default function TheGate() {
  const [accessCode, setAccessCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const WHATSAPP_NUMBER = '966502777884';

  const ArabicText = {
    gateTitle: 'Studio Exclusive |  بوابة النخبة',
    gateDesc: 'منصة مخصصة حصرياً لأصحاب المتاجر المسجلة.',
    label: 'رقم السجل التجاري أو كود الدعوة',
    placeholder: 'أدخل الرمز هنا...',
    btnNormal: 'دخول المنصة',
    btnLoading: 'جاري التحقق...',
    errorMsg: 'رمز الدخول غير صحيح.',
    btnLogout: 'تسجيل الخروج',
    currency: 'ر.س',
    addToCart: 'إضافة للطلب',
  };

  // هنا توجد الأصناف (المنتجات)
  const products = [
    { id: 1, name: 'تيشرت بوكس سادة', price: 35, moq: 5, img: '👕' },
    { id: 2, name: 'تيشرت اوفر سايز فاخر', price: 45, moq: 5, img: '👕' }
    { id: 3, name: 'اسم المنتج الجديد', price: 50, moq: 5, img: '👕' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        setIsLoggedIn(true);
        setIsLoading(false);
    }, 1000);
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#050505] text-white p-8" dir="rtl">
        <h1 className="text-3xl font-bold text-[#c5a880] mb-10">{ArabicText.gateTitle}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product) => (
            <div key={product.id} className="bg-[#0a0a0a] border border-[#161616] p-8">
              <h3 className="text-xl font-bold mb-4">{product.name}</h3>
              <p className="text-2xl text-[#c5a880] mb-6">{product.price} {ArabicText.currency}</p>
              <button className="w-full bg-[#111111] border border-[#c5a880] py-4 hover:bg-[#c5a880] hover:text-black">
                {ArabicText.addToCart}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col justify-center p-8 text-white" dir="rtl">
      <h1 className="text-4xl text-center text-[#c5a880] mb-10">{ArabicText.gateTitle}</h1>
      <div className="max-w-md mx-auto w-full">
        <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" onChange={(e) => setAccessCode(e.target.value)} className="w-full bg-[#111111] border p-4 text-center" placeholder={ArabicText.placeholder} />
            <button type="submit" className="w-full bg-[#c5a880] text-black py-4 font-bold">{isLoading ? ArabicText.btnLoading : ArabicText.btnNormal}</button>
        </form>
      </div>
    </div>
  );
}
