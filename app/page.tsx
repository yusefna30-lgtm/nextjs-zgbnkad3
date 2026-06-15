'use client';
import React, { useState } from 'react';

export default function TheGate() {
  const [accessCode, setAccessCode] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const WHATSAPP_NUMBER = '966502777884';

  const products = [
    { id: 1, name: 'تيشرت بوكس سادة', price: 35, moq: 5 },
    { id: 2, name: 'تيشرت اوفر سايز فاخر', price: 45, moq: 5 },
    { id: 3, name: 'تيشرت بولو كلاسيك', price: 55, moq: 5 },
  ];

  const addToCart = (id: number, moq: number) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + moq }));
  };

  const totalPrice = Object.keys(cart).reduce((sum, id) => {
    const p = products.find((prod) => prod.id === Number(id));
    return sum + (p ? p.price * cart[Number(id)] : 0);
  }, 0);

  const sendOrder = () => {
    let msg = "طلب جديد من بوابة Studio Exclusive:%0A";
    Object.keys(cart).forEach((id) => {
      const p = products.find((prod) => prod.id === Number(id));
      if (p) msg += `- ${p.name}: ${cart[Number(id)]} قطعة%0A`;
    });
    msg += `%0Aالإجمالي: ${totalPrice} ر.س`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#050505] text-white p-8" dir="rtl">
        <h1 className="text-3xl font-bold text-[#c5a880] mb-8">Studio Exclusive | بوابة النخبة</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-[#0a0a0a] border border-[#161616] p-6">
              <h3 className="text-xl font-bold">{p.name}</h3>
              <p className="text-[#c5a880] my-2">{p.price} ر.س</p>
              <button onClick={() => addToCart(p.id, p.moq)} className="bg-[#111111] border border-[#c5a880] px-4 py-2 hover:bg-[#c5a880] hover:text-black">
                إضافة {p.moq} قطع
              </button>
            </div>
          ))}
        </div>
        {totalPrice > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-[#111111] p-6 border-t border-[#c5a880] text-center">
            <p className="text-xl mb-4">الإجمالي: {totalPrice} ر.س</p>
            <button onClick={sendOrder} className="bg-[#c5a880] text-black font-bold px-10 py-3">إتمام الطلب عبر الواتساب</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col justify-center items-center p-8 text-white">
      <h1 className="text-4xl text-[#c5a880] mb-8">بوابة النخبة</h1>
      <input type="text" onChange={(e) => setAccessCode(e.target.value)} className="bg-[#111111] border p-4 mb-4 text-center" placeholder="أدخل كود الدخول" />
      <button onClick={() => setIsLoggedIn(true)} className="bg-[#c5a880] text-black px-8 py-3 font-bold">دخول</button>
    </div>
  );
}
