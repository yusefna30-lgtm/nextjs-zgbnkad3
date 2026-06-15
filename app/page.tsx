if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12" dir="rtl">
        <header className="mb-12 border-b border-[#161616] pb-6">
          <h1 className="text-3xl font-bold text-[#c5a880]">Studio Exclusive</h1>
          <p className="text-gray-400 mt-2">بوابة النخبة للمتاجر المسجلة</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-[#0a0a0a] border border-[#161616] p-6 hover:border-[#c5a880] transition-all">
              <div className="h-40 bg-[#111111] mb-4 flex items-center justify-center text-4xl">👕</div>
              <h3 className="text-xl font-bold">{p.name}</h3>
              <p className="text-[#c5a880] text-lg font-bold my-3">{p.price} ر.س</p>
              <button onClick={() => addToCart(p.id, p.moq)} className="w-full bg-[#111111] border border-[#1e1e1e] py-3 hover:bg-[#c5a880] hover:text-black transition-colors">
                إضافة {p.moq} قطع
              </button>
            </div>
          ))}
        </div>
        {/* ... باقي كود السلة */}
      </div>
    );
  }
