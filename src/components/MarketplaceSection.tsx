import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MARKETPLACE_ITEMS, MarketplaceItem } from '../data/marketplace';
import { 
  ShoppingBag, 
  ArrowUpRight, 
  Check, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  Sparkles, 
  ShieldCheck, 
  CreditCard,
  MessageSquare,
  Copy,
  Layers,
  FileCheck2,
  ExternalLink
} from 'lucide-react';

interface CartItemEntry {
  item: MarketplaceItem;
  quantity: number;
}

interface MarketplaceSectionProps {
  onDirectConsultation?: (title: string) => void;
}

export const MarketplaceSection: React.FC<MarketplaceSectionProps> = ({ onDirectConsultation }) => {
  const { lang, t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'all' | 'product' | 'service' | 'ai' | 'design'>('all');
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceItem | null>(null);
  const [cart, setCart] = useState<CartItemEntry[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [checkoutCompleteOrder, setCheckoutCompleteOrder] = useState<{
    orderId: string;
    items: CartItemEntry[];
    total: number;
  } | null>(null);

  const whatsappCommunityUrl = 'https://chat.whatsapp.com/JmB6Uk37w7CHiHFtJWOico';

  // Filter items
  const filteredItems = MARKETPLACE_ITEMS.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'product' || activeTab === 'service') return item.type === activeTab;
    return item.category === activeTab;
  });

  const addToCart = (item: MarketplaceItem) => {
    setCart((prev) => {
      const existing = prev.find((e) => e.item.id === item.id);
      if (existing) {
        return prev.map((e) => e.item.id === item.id ? { ...e, quantity: e.quantity + 1 } : e);
      }
      return [...prev, { item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev.map((e) => {
        if (e.item.id === itemId) {
          const newQty = e.quantity + delta;
          return newQty > 0 ? { ...e, quantity: newQty } : null;
        }
        return e;
      }).filter(Boolean) as CartItemEntry[];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((e) => e.item.id !== itemId));
  };

  const totalItemCount = cart.reduce((sum, e) => sum + e.quantity, 0);

  const subtotal = cart.reduce((sum, e) => sum + e.item.price * e.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'DIEWA10') {
      setDiscountPercent(10);
      setCouponMessage(t('تم تطبيق خصم 10% بنجاح!', '10% discount applied successfully!'));
    } else if (couponCode.trim().toUpperCase() === 'AI2026') {
      setDiscountPercent(15);
      setCouponMessage(t('تم تطبيق كود مجتمع الذكاء الاصطناعي (15% خصم)!', 'AI Community 15% discount applied!'));
    } else {
      setDiscountPercent(0);
      setCouponMessage(t('كود الخصم غير صالح أو منتهي الصلاحية', 'Invalid coupon code'));
    }
  };

  const handleCompleteCheckout = () => {
    if (cart.length === 0) return;
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setCheckoutCompleteOrder({
      orderId,
      items: [...cart],
      total: finalTotal,
    });
    setCart([]);
  };

  const getWhatsAppOrderText = () => {
    if (!checkoutCompleteOrder && cart.length === 0) return '';
    const items = checkoutCompleteOrder ? checkoutCompleteOrder.items : cart;
    const itemsList = items
      .map(
        (e) => `• ${lang === 'ar' ? e.item.title.ar : e.item.title.en} (x${e.quantity}) - $${e.item.price * e.quantity}`
      )
      .join('\n');
    const orderNum = checkoutCompleteOrder ? checkoutCompleteOrder.orderId : 'DIRECT-INQUIRY';
    const total = checkoutCompleteOrder ? checkoutCompleteOrder.total : finalTotal;

    const message = `طلب جديد من منصة DIEWA الرقمية\nرقم الطلب: ${orderNum}\n\nالمنتجات والخدمات المطلوبة:\n${itemsList}\n\nالإجمالي: $${total}\n\nأرجو تزويدي بروابط التحميل أو ترتيب انطلاق باقة الخدمة.`;
    return encodeURIComponent(message);
  };

  return (
    <section id="marketplace" className="py-24 bg-[#090D15] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header with Cart Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-3 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t('متجر DIEWA الرقمي وباقات الخدمات', 'DIGITAL MARKETPLACE & ENGINEERING SUITE')}</span>
            </div>
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight"
              style={{ textWrap: 'balance' }}
            >
              {t(
                'منتجات برمجية جاهزة وباقات هندسية متميزة لتسريع أعمالك',
                'Production-grade boilerplates, design systems, and dedicated engineering services'
              )}
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              {t(
                'كود مصدري كامل غير محتكر، أنظمة تصميم متطورة، وباقات تدقيق واستشارات هندسية قابلة للشراء الفوري.',
                'Full unencumbered source code repos, Figma systems, and sprint packages ready for deployment.'
              )}
            </p>
          </div>

          {/* Cart Trigger Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-amber-400/30 hover:border-amber-400 text-xs font-semibold text-white transition-all shadow-lg shadow-black/40"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>{t('سلة المشتريات', 'Cart')}</span>
              {totalItemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-bold text-[11px] flex items-center justify-center font-mono-numbers">
                  {totalItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/60 border border-white/10 rounded-xl mb-10 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'all' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t('جميع المنتجات والخدمات', 'All Catalog')}
          </button>
          <button
            onClick={() => setActiveTab('product')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'product' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t('منتجات برمجية وقوالب', 'Digital Products & Kits')}
          </button>
          <button
            onClick={() => setActiveTab('service')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'service' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t('باقات وخدمات هندسية', 'Packaged Services & Sprints')}
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'ai' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t('ذكاء اصطناعي وأتمتة', 'AI & Automation')}
          </button>
          <button
            onClick={() => setActiveTab('design')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'design' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t('أنظمة التصميم وFigma', 'UI & Design Systems')}
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-slate-900/40 border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-lg shadow-black/40"
            >
              <div>
                {/* Visual Asset Container */}
                <div className="aspect-[4/3] w-full overflow-hidden relative bg-slate-950">
                  <img
                    src={item.image}
                    alt={lang === 'ar' ? item.title.ar : item.title.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D15] via-transparent to-transparent opacity-60" />

                  {/* Kicker badge */}
                  {item.badge && (
                    <div className="absolute top-3 end-3 px-2.5 py-1 rounded bg-amber-400 text-slate-950 font-bold text-[10px] tracking-wider uppercase">
                      {lang === 'ar' ? item.badge.ar : item.badge.en}
                    </div>
                  )}
                </div>

                {/* Content Box */}
                <div className="p-6">
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2.5">
                    <span className="font-semibold text-amber-400">
                      {lang === 'ar' ? item.categoryLabel.ar : item.categoryLabel.en}
                    </span>
                    <span>·</span>
                    <span>{item.type === 'product' ? t('تحميل رقمي فوري', 'Instant Digital Repo') : t('خدمة هندسية مباشرة', 'Direct Engineering Pod')}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                    {lang === 'ar' ? item.title.ar : item.title.en}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    {lang === 'ar' ? item.subtitle.ar : item.subtitle.en}
                  </p>

                  {/* Price Row */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-black text-white font-mono-numbers">
                      ${item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-slate-500 line-through font-mono-numbers">
                        ${item.originalPrice}
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400">
                      {t('شامل التحديثات والتراخيص', 'Inclusive of updates & IP license')}
                    </span>
                  </div>

                  {/* Deliverables Preview */}
                  <div className="space-y-1.5 pt-3 border-t border-white/5 mb-4">
                    {(lang === 'ar' ? item.deliverables.ar : item.deliverables.en).slice(0, 2).map((d, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="truncate">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedProduct(item)}
                  className="px-3.5 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                >
                  {t('التفاصيل الكاملة', 'Full Specs')}
                </button>

                <button
                  onClick={() => addToCart(item)}
                  className="flex-1 py-2 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{t('أضف إلى السلة', 'Add to Cart')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="w-full max-w-2xl bg-[#0F1420] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 end-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-6 bg-slate-950">
              <img
                src={selectedProduct.image}
                alt={lang === 'ar' ? selectedProduct.title.ar : selectedProduct.title.en}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-amber-400 mb-2 font-semibold">
              <span>{lang === 'ar' ? selectedProduct.categoryLabel.ar : selectedProduct.categoryLabel.en}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300">{lang === 'ar' ? selectedProduct.license.ar : selectedProduct.license.en}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {lang === 'ar' ? selectedProduct.title.ar : selectedProduct.title.en}
            </h3>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-black text-amber-400 font-mono-numbers">
                ${selectedProduct.price}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-sm text-slate-500 line-through font-mono-numbers">
                  ${selectedProduct.originalPrice}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {lang === 'ar' ? selectedProduct.description.ar : selectedProduct.description.en}
            </p>

            {/* Deliverables Checklist */}
            <div className="mb-6 p-4 rounded-xl bg-slate-950/70 border border-white/5">
              <div className="text-xs font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('المحتويات والمخرجات المتضمنة في الحزمة', 'Included Deliverables & Source Files')}</span>
              </div>
              <div className="space-y-2">
                {(lang === 'ar' ? selectedProduct.deliverables.ar : selectedProduct.deliverables.en).map((deliv, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-6 flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-400 me-2">{t('التقنيات:', 'Tech Stack:')}</span>
              {selectedProduct.techStack.map((tech, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-white/10 text-xs text-slate-300">
                  {tech}
                </span>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-white"
              >
                {t('إغلاق', 'Dismiss')}
              </button>

              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t('إضافة إلى السلة والمتابعة', 'Add to Cart & Checkout')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsCartOpen(false)}
        >
          <div 
            className="w-full max-w-md bg-[#0C111C] border-s border-white/15 h-full p-6 flex flex-col justify-between shadow-2xl relative overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">
                    {t('سلة المشتريات والخدمات', 'Your Digital Cart')}
                  </h3>
                  <span className="text-xs font-mono text-slate-400">({totalItemCount})</span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              {cart.length === 0 ? (
                <div className="text-center py-16 text-slate-500 text-xs">
                  <ShoppingBag className="w-10 h-10 mx-auto text-slate-600 mb-3" />
                  <p>{t('سلتك فارغة حالياً. تصفح المنتجات والباقات لإضافتها.', 'Your cart is empty. Explore our kits and services.')}</p>
                </div>
              ) : (
                <div className="space-y-4 mb-6">
                  {cart.map((entry) => (
                    <div 
                      key={entry.item.id}
                      className="p-3.5 rounded-xl bg-slate-900/70 border border-white/10 flex items-center justify-between gap-3"
                    >
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-950 shrink-0">
                        <img 
                          src={entry.item.image} 
                          alt="" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">
                          {lang === 'ar' ? entry.item.title.ar : entry.item.title.en}
                        </h4>
                        <div className="text-xs font-mono font-bold text-amber-400 mt-1">
                          ${entry.item.price * entry.quantity}
                        </div>
                      </div>

                      {/* Quantity buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center border border-white/10 rounded-lg bg-slate-950">
                          <button
                            onClick={() => updateQuantity(entry.item.id, -1)}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono text-white">
                            {entry.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(entry.item.id, 1)}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(entry.item.id)}
                          className="p-1.5 text-slate-500 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Summary & Checkout */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-4">
                
                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder={t('كود خصم (جرب: DIEWA10)', 'Coupon Code (e.g. DIEWA10)')}
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white transition-colors"
                  >
                    {t('تطبيق', 'Apply')}
                  </button>
                </form>

                {couponMessage && (
                  <p className={`text-[11px] ${discountPercent > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {couponMessage}
                  </p>
                )}

                {/* Subtotal & Total */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>{t('المجموع الفرعي:', 'Subtotal:')}</span>
                    <span className="font-mono text-white">${subtotal}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>{t('الخصم:', 'Discount:')} (-{discountPercent}%)</span>
                      <span className="font-mono">-${discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                    <span>{t('الإجمالي النهائي:', 'Total:')}</span>
                    <span className="font-mono text-amber-400 text-lg">${finalTotal}</span>
                  </div>
                </div>

                {/* Checkout Buttons */}
                <div className="space-y-2">
                  {/* Option 1: Instant Checkout Confirmation */}
                  <button
                    onClick={handleCompleteCheckout}
                    className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 active:scale-[0.98]"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>{t('إتمام الطلب وتأكيد الاستلام الرقمي', 'Complete Order & Generate Access')}</span>
                  </button>

                  {/* Option 2: WhatsApp Direct Order Link */}
                  <a
                    href={`https://wa.me/?text=${getWhatsAppOrderText()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t('إرسال الطلب مباشرة عبر واتساب', 'Order Directly via WhatsApp')}</span>
                  </a>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>{t('دفع آمن، رخصة تجارية، وتوثيق فوري مع DIEWA', 'Secure Checkout with Verified DIEWA License')}</span>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

      {/* Order Complete Modal */}
      {checkoutCompleteOrder && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setCheckoutCompleteOrder(null)}
        >
          <div 
            className="w-full max-w-xl bg-[#0F1420] border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {t('تم تسجيل طلبك الرقمي بنجاح!', 'Your Digital Order is Confirmed!')}
                </h3>
                <div className="text-xs text-slate-400">
                  {t('رقم الفاتورة والطلب:', 'Order Reference:')}{' '}
                  <span className="font-mono font-bold text-amber-400">{checkoutCompleteOrder.orderId}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              {t(
                'شكراً لتعاملك مع وكالة DIEWA. تم تجهيز أذونات الوصول البرمجية وتوجيه تفاصيل باقاتك إلى الفريق الهندسي للتنفيذ الفوري.',
                'Thank you for your business. Your software access tokens have been registered and dispatched for engineering fulfillment.'
              )}
            </p>

            {/* Purchased Items List */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5 space-y-2 mb-6 text-xs">
              <div className="font-bold text-slate-300 mb-1">
                {t('المنتجات والخدمات المعتمدة:', 'Approved Order Manifest:')}
              </div>
              {checkoutCompleteOrder.items.map((entry, idx) => (
                <div key={idx} className="flex justify-between items-center text-slate-300">
                  <span className="truncate max-w-[280px]">
                    {lang === 'ar' ? entry.item.title.ar : entry.item.title.en} (x{entry.quantity})
                  </span>
                  <span className="font-mono text-amber-300 font-bold">
                    ${entry.item.price * entry.quantity}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-sm text-white">
                <span>{t('المبلغ المدفوع:', 'Total Paid:')}</span>
                <span className="font-mono text-amber-400">${checkoutCompleteOrder.total}</span>
              </div>
            </div>

            {/* Direct WhatsApp Confirmation Button */}
            <div className="space-y-2.5">
              <a
                href={`https://wa.me/?text=${getWhatsAppOrderText()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t('تأكيد الاستلام والتواصل المباشر عبر واتساب', 'Confirm & Chat with Engineer on WhatsApp')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setCheckoutCompleteOrder(null)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                {t('إغلاق والعودة للمتجر', 'Close & Return to Store')}
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
