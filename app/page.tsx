'use client';
import React, { useState } from 'react';

export default function TheGate() {
  const [accessCode, setAccessCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // نظام السلة الذكي (يخزن معرف المنتج والكمية المطلوبة)
  const [cart, setCart] = useState<{ [key: number]: number }>({});

  // تم تفعيل رقم واتسابك الحقيقي هنا بنجاح ✅
  const WHATSAPP_NUMBER = '966502777884';

  const ArabicText = {
    gateTitle: 'بوابة التوزيع المغلقة',
    gateDesc:
      'منصة مخصصة حصرياً لأصحاب البوتيكات والمتاجر المسجلة. الأسعار والكتالوجات تظهر فقط للأعضاء المعتمدين.',
    label: 'رقم السجل التجاري أو كود الدعوة',
    placeholder: 'أدخل الرمز هنا (B2B2026)...',
    btnNormal: 'طلب دخول المنصة',
    btnLoading: 'جاري التحقق من الصلاحية...',
    errorMsg: 'رمز الدخول غير صحيح أو السجل غير مسجل لدينا.',
    privacy: 'سياسة الخصوصية',
    support: 'الدعم التجاري',

    dashTitle: 'لوحة مبيعات الجملة الحصرية',
    dashWelcome:
      'أهلاً بك شريكنا المعتمد. أسعار الحصص والطلبات المباشرة متاحة الآن لجرد صيف 2026.',
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
    {
      id: 1,
      name: 'تيشرت اوفر سايز - خامات قطنية ناعمة فاخرة',
      price: 35,
      moq: 5,
      stock: true,
      img: '👕',
    },
    {
      id: 2,
      name: 'تيشرت بوكس - موديل (01)',
      price: 35,
      moq: 5,
      stock: true,
      img: '👕',
    },
    {
      id: 3,
      name: 'تيشرت بوكس - موديل (02)',
      price: 35,
      moq: 5,
      stock: true,
      img: '👕',
    },
    {
      id: 4,
      name: 'تيشرت بوكس - موديل (03)',
      price: 35,
      moq: 5,
      stock: true,
      img: '👕',
    },
    {
      id: 5,
      name: 'تيشرت بوكس - موديل (04)',
      price: 35,
      moq: 5,
      stock: true,
      img: '👕',
    },
    {
      id: 6,
      name: 'تيشرت بوكس - موديل (05)',
      price: 35,
      moq: 5,
      stock: true,
      img: '👕',
    },
    {
      id: 7,
      name: 'تيشرت بوكس - موديل (06)',
      price: 35,
      moq: 5,
      stock: true,
      img: '👕',
    },
    {
      id: 8,
      name: 'تيشرت بوكس سادة - ألوان أساسية (01)',
      price: 30,
      moq: 5,
      stock: true,
      img: '👕',
    },
    {
      id: 9,
      name: 'تيشرت بوكس سادة - ألوان أساسية (02)',
      price: 30,
      moq: 5,
      stock: true,
      img: '👕',
    },
    {
      id: 10,
      name: 'تيشرت بوكس سادة - ألوان أساسية (03)',
      price: 30,
      moq: 5,
      stock: true,
      img: '👕',
    },
    {
      id: 11,
      name: 'تيشرت بوكس سادة - ألوان أساسية (04)',
      price: 30,
      moq: 5,
      stock: true,
      img: '👕',
    },
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
        message += `• *${prod.name}*\n`;
        message += `  الكمية: ${cart[Number(id)]} قطعة | السعر: ${
          prod.price * cart[Number(id)]
        } ر.س\n`;
      }
    });

    message += `-----------------------------------------\n`;
    message += `*إجمالي القطع:* ${totalItems} قطعة\n`;
    message += `*الإجمالي المبدئي الخاضع للمراجعة:* ${totalPrice} ر.س\n\n`;
    message += `يرجى تأكيد توفر الحصص وتزويدنا بالفاتورة الرسمية وتفاصيل الشحن.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
      '_blank'
    );
  };

  if (isLoggedIn) {
    return (
      <div
        className="min-h-screen bg-[#050505] text-white p-4 sm:p-12 text-right overflow-y-auto pb-40"
        dir="rtl"
      >
        <header className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#161616] pb-6 mb-10 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-base font-medium text-[#c5a880] tracking-wide">
              {ArabicText.dashTitle}
            </h1>
            <p className="text-[11px] text-gray-500 mt-1">
              {ArabicText.dashWelcome}
            </p>
          </div>
          <button
            onClick={() => {
              setIsLoggedIn(false);
              setAccessCode('');
              setCart({});
            }}
            className="text-[10px] border border-[#1e1e1e] px-4 py-2 hover:bg-white hover:text-black transition-colors duration-300 rounded-none"
          >
            {ArabicText.btnLogout}
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.map((product) => {
            const isInCart = !!cart[product.id];
            return (
              <div
                key={product.id}
                className="bg-[#0a0a0a] border border-[#161616] p-6 flex flex-col justify-between space-y-6 hover:border-[#c5a880] transition-colors duration-500"
              >
                <div className="flex justify-between items-start">
                  <span className="text-3xl bg-[#111111] p-3 border border-[#1a1a1a] select-none">
                    {product.img}
                  </span>
                  <span
                    className={`text-[9px] px-2 py-1 tracking-wider ${
                      product.stock
                        ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900'
                        : 'bg-rose-950/50 text-rose-400 border border-rose-900'
                    }`}
                  >
                    {product.stock ? ArabicText.inStock : ArabicText.outStock}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-normal text-gray-200 leading-relaxed">
                    {product.name}
                  </h3>
                  <div className="text-sm font-mono text-[#c5a880] pt-1">
                    {product.price} {ArabicText.currency}{' '}
                    <span className="text-[9px] text-gray-500 font-sans tracking-normal">
                      (للشريحة)
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#121212] flex flex-col space-y-3 text-[11px]">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">
                      {ArabicText.moq}{' '}
                      <strong className="text-gray-300 font-mono">
                        {product.moq} {ArabicText.pieces}
                      </strong>
                    </span>
                    {isInCart && (
                      <div className="flex items-center space-x-2 space-x-reverse bg-[#111111] border border-[#1e1e1e] font-mono px-1">
                        <button
                          onClick={() =>
                            updateQuantity(product.id, -1, product.moq)
                          }
                          className="px-2 py-1 text-gray-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="text-xs px-2 text-[#c5a880]">
                          {cart[product.id]}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(product.id, 1, product.moq)
                          }
                          className="px-2 py-1 text-gray-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>

                  {!isInCart ? (
                    <button
                      disabled={!product.stock}
                      onClick={() => addToCart(product.id, product.moq)}
                      className="w-full bg-[#111111] border border-[#1e1e1e] py-2 text-[10px] text-gray-300 hover:bg-[#c5a880] hover:text-black hover:border-[#c5a880] transition-all duration-300"
                    >
                      {ArabicText.addToCart}
                    </button>
                  ) : (
                    <div className="w-full bg-[#c5a880]/10 border border-[#c5a880]/30 text-[#c5a880] text-[10px] py-2 text-center">
                      {ArabicText.inCart}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {totalItems > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-[#c5a880]/40 p-4 shadow-2xl z-50 backdrop-blur-md">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-right">
                <span className="text-[10px] text-gray-500 block uppercase tracking-wider">
                  {ArabicText.cartTitle}
                </span>
                <span className="text-xs text-gray-300">
                  {totalItems} قطعة مضافة{' '}
                </span>
                <span className="mx-2 text-gray-700">|</span>
                <span className="text-sm font-mono text-[#c5a880] font-bold">
                  {totalPrice} {ArabicText.currency}
                </span>
              </div>
              <button
                onClick={sendOrderToWhatsapp}
                className="w-full sm:w-auto bg-[#c5a880] hover:bg-white text-black font-medium text-xs px-8 py-3.5 transition-colors duration-500 rounded-none shadow-lg shadow-[#c5a880]/10"
              >
                {ArabicText.sendWhatsapp}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#050505] flex flex-col justify-between p-8 text-white text-right"
      dir="rtl"
    >
      <header
        className="w-full flex justify-between items-center border-b border-[#121212] pb-6"
        dir="ltr"
      >
        <span className="text-xs tracking-[0.3em] uppercase font-light text-gray-400">
          Studio <span className="text-[#c5a880] font-normal">Exclusive</span>
        </span>
        <span className="text-[10px] tracking-widest text-gray-600 uppercase">
          B2B Portal v1.0
        </span>
      </header>

      <main className="max-w-md w-full mx-auto my-auto space-y-8">
        <div className="space-y-3 text-center">
          <h1 className="text-lg tracking-[0.2em] uppercase font-light text-[#c5a880]">
            {ArabicText.gateTitle}
          </h1>
          <p className="text-[11px] tracking-wide text-gray-500 max-w-xs mx-auto leading-relaxed">
            {ArabicText.gateDesc}
          </p>
        </div>

        <div className="bg-[#0a0a0a] border border-[#161616] p-8 space-y-6 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] tracking-[0.1em] uppercase text-gray-400 block text-right">
                {ArabicText.label}
              </label>
              <input
                type="text"
                required
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder={ArabicText.placeholder}
                className="w-full bg-[#111111] border border-[#1e1e1e] px-4 py-3 text-xs text-white placeholder-gray-700 focus:outline-none focus:border-[#c5a880] transition-colors duration-300 text-center font-mono"
              />
            </div>

            {errorMessage && (
              <p className="text-[10px] text-red-500 tracking-wide font-light text-center">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#c5a880] text-black text-[11px] tracking-[0.1em] py-3.5 hover:bg-white transition-colors duration-500 font-medium disabled:opacity-50"
            >
              {isLoading ? ArabicText.btnLoading : ArabicText.btnNormal}
            </button>
          </form>
        </div>
      </main>

      <footer
        className="w-full flex flex-col sm:flex-row justify-between items-center border-t border-[#121212] pt-6 text-[10px] text-gray-600 tracking-wider space-y-2 sm:space-y-0"
        dir="ltr"
      >
        <div>&copy; 2026 STUDIO DISTRIBUTION. ALL RIGHTS RESERVED.</div>
        <div className="flex space-x-6 space-x-reverse">
          <a href="#" className="hover:text-white transition-colors">
            {ArabicText.privacy}
          </a>
          <a href="#" className="hover:text-white transition-colors">
            {ArabicText.support}
          </a>
        </div>
      </footer>
    </div>
  );
}
