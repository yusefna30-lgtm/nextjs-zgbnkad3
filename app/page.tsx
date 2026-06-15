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
    gateTitle: 'بوابة التوزيع المغلقة',
    gateDesc: 'منصة مخصصة حصرياً لأصحاب البوتيكات والمتاجر المسجلة. الأسعار والكتالوجات تظهر فقط للأعضاء المعتمدين.',
    label: 'رقم السجل التجاري أو كود الدعوة',
    placeholder: 'أدخل الرمز هنا (B2B2026)...',
    btnNormal: 'طلب دخول المنصة',
    btnLoading: 'جاري التحقق من الصلاحية...',
    errorMsg: 'رمز الدخول غير صحيح أو السجل غير مسجل لدينا.',
    privacy: 'سياسة الخصوصية',
    support: 'الدعم التجاري',
    dashTitle: 'لوحة مبيعات الجملة الحصرية',
    dashWelcome: 'أهلاً بك شريكنا المعتمد. أسعار الحصص والطلبات المباشرة متاحة الآن لجرد صيف 2026.',
    btnLogout: 'تسجيل الخروج',
    currency: 'ر.س',
    moq: 'أقل كمية:',
    pieces: 'قطع',
    inStock: 'متوفر بالمخزن',
    outStock: 'نفدت الكمية',
    addToCart: 'إضافة للطلب',
    inCart: 'مضاف بالسلة',
    cartTitle: 'حقيبة الطلب الحالية',
    total: 'الإجمالي المبدئي:',
    sendWhatsapp: 'تأكيد وإرسال الطلب عبر الواتساب',
  };

  const products = [
    { id: 1, name: 'تيشرت اوفر سايز - خامات قطنية ناعمة فاخرة', price: 35, moq: 5, stock: true, img: '👕' },
    { id: 2, name: 'تيشرت بوكس - موديل (01)', price: 35, moq: 5, stock: true, img: '👕' },
    { id: 3, name: 'تيشرت بوكس - موديل (02)', price: 35, moq: 5, stock: true, img: '👕' },
    { id: 4, name: 'تيشرت بوكس - موديل (03)', price: 35, moq: 5, stock: true, img: '👕' },
    { id: 5, name: 'تيشرت بوكس - موديل (04)', price: 35, moq: 5, stock: true, img: '👕' },
    { id: 6, name: 'تيشرت بوكس - موديل (05)', price: 35, moq: 5, stock: true, img: '👕' },
    { id: 7, name: 'تيشرت بوكس - موديل (06)', price: 35, moq: 5, stock: true, img: '👕' },
    { id: 8, name: 'تيشرت بوكس سادة - ألوان أساسية (01)', price: 30, moq: 5, stock: true, img: '👕' },
    { id: 9, name: 'تيشرت بوكس سادة - ألوان أساسية (02)', price: 30, moq: 5, stock: true, img: '👕' },
    { id: 10, name: 'تيشرت بوكس سادة - ألوان أساسية (03)', price: 30, moq: 5, stock: true, img: '👕' },
    { id: 11, name: 'تيشرت بوكس سادة - ألوان أساسية (04)', price: 30, moq: 5, stock: true, img: '👕' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      if (accessCode === 'B2B2026' || accessCode.length > 7) {
        setIsLoggedIn(true);
      } else {
        setErrorMessage(ArabicText.errorMsg);
      }
      setIsLoading(false);
    }, 1200);
  };

  const addToCart = (id: number, moq: number) => {
    setCart((prev) => ({ ...prev, [id]: prev[id] ? prev[id] + 1 : moq }));
  };

  const updateQuantity = (id: number, delta: number, moq: number) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next < moq && delta < 0) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: next };
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.keys(cart).reduce((sum, id) => {
    const prod = products.find((p) => p.id === Number(id));
    return sum + (prod ? prod.price * cart[Number(id)] : 0);
  }, 0);

  const sendOrderToWhatsapp = () => {
    let message = `*طلب جملة جديد - من منصة STUDIO EXCLUSIVE*\n`;
    message += `-----------------------------------------\n`;
    Object.keys(cart).forEach((id) => {
      const prod = products.find((p) => p.id === Number(id));
      if (prod) {
        message += `• *${prod.name}*\n  الكمية: ${cart[Number(id)]} قطعة | السعر: ${prod.price * cart[Number(id)]} ر.س\n`;
      }
    });
    message += `-----------------------------------------\n*إجمالي القطع:* ${totalItems} قطعة\n*الإجمالي المبدئي:* ${totalPrice} ر.س\n\nيرجى تأكيد توفر الحصص.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#050505] text-white p-6 sm:p-12 text-right pb-40" dir="rtl">
        <header className="w-full flex flex-col sm:flex-row justify-between border-b border-[#161616] pb-6 mb-10">
          <div>
            <h1 className="text-lg font-bold text-[#c5a880] tracking-wide">{ArabicText.dashTitle}</h1>
            <p className="text-xs text-gray-400 mt-1">{ArabicText.dashWelcome}</p>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="text-xs border border-[#1e1e1e] px-4 py-2 hover:bg-white hover:text-black mt-4 sm:mt-0">
            {ArabicText.btnLogout}
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => {
            const isInCart = !!cart[product.id];
            return (
              <div key={product.id} className="bg-[#0a0a0a] border border-[#161616] p-6 flex flex-col justify-between space-y-4 hover:border-[#c5a880] transition-colors">
                <div className="flex justify-between items-start">
                  <span className="text-4xl bg-[#111111] p-2">{product.img}</span>
                  <span className={`text-[10px] px-2 py-1 ${product.stock ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {product.stock ? ArabicText.inStock : ArabicText.outStock}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-100 leading-relaxed">{product.name}</h3>
                <div className="text-lg font-bold text-[#c5a880]">{product.price} {ArabicText.currency}</div>
                
                <div className="pt-4 border-t border-[#121212] space-y-3">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{ArabicText.moq} <strong>{product.moq} {ArabicText.pieces}</strong></span>
                    {isInCart && (
                      <div className="flex items-center gap-3 bg-[#111111] px-2">
                        <button onClick={() => updateQuantity(product.id, -1, product.moq)}>-</button>
                        <span className="text-[#c5a880]">{cart[product.id]}</span>
                        <button onClick={() => updateQuantity(product.id, 1, product.moq)}>+</button>
                      </div>
                    )}
                  </div>
                  {!isInCart ? (
                    <button onClick={() => addToCart(product.id, product.moq)} className="w-full bg-[#111111] border border-[#1e1e1e] py-3 text-xs hover:bg-[#c5a880] hover:text-black">
                      {ArabicText.addToCart}
                    </button>
                  ) : (
                    <div className="w-full bg-[#c5a880]/10 text-[#c5a880] text-xs py-3 text-center border border-[#c5a880]/30">{ArabicText.inCart}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {totalItems > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/90 border-t border-[#c5a880]/40 p-6 z-50 backdrop-blur-md">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <div className="text-sm">
                <span className="text-gray-400">{totalItems} قطعة | </span>
                <span className="text-lg font-bold text-[#c5a880]">{totalPrice} {ArabicText.currency}</span>
              </div>
              <button onClick={sendOrderToWhatsapp} className="bg-[#c5a880] text-black text-sm px-6 py-3 hover:bg-white transition-colors">
                {ArabicText.sendWhatsapp}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col justify-center p-8 text-white" dir="rtl">
      <main className="max-w-md w-full mx-auto space-y-8">
        <h1 className="text-xl text-center tracking-[0.2em] text-[#c5a880]">{ArabicText.gateTitle}</h1>
        <div className="bg-[#0a0a0a] border border-[#161616] p-8 space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" required value={accessCode} onChange={(e) => setAccessCode(e.target.value)} placeholder={ArabicText.placeholder} className="w-full bg-[#111111] border border-[#1e1e1e] p-4 text-sm text-center" />
            <button type="submit" className="w-full bg-[#c5a880] text-black text-sm py-4 hover:bg-white">{isLoading ? ArabicText.btnLoading : ArabicText.btnNormal}</button>
          </form>
        </div>
      </main>
    </div>
  );
}
