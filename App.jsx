
import { useState, useMemo } from 'react';

const mkIcon = (d, dc) => ({ className = dc }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);
const IconCheck = mkIcon("M5 13l4 4L19 7", "w-4 h-4");
const IconX = mkIcon("M6 18L18 6M6 6l12 12", "w-4 h-4");
const IconBox = mkIcon("M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", "w-5 h-5");
const IconZap = mkIcon("M13 10V3L4 14h7v7l9-11h-7z", "w-4 h-4");
const IconShield = mkIcon("M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", "w-4 h-4");
const IconDatabase = mkIcon("M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4", "w-4 h-4");
const IconUsers = mkIcon("M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", "w-4 h-4");
const IconCalculator = mkIcon("M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z", "w-5 h-5");
const IconLock = mkIcon("M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", "w-4 h-4");
const IconChevronRight = mkIcon("M9 5l7 7-7 7", "w-4 h-4");
const IconHelp = mkIcon("M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", "w-4 h-4");
const IconFileText = mkIcon("M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", "w-4 h-4");
const IconAlertCircle = mkIcon("M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", "w-4 h-4");

const ENQUIRY_API_URL = "/api/enquiry";

const PLANS_DATA = [
  { id: 'starter', name: 'Starter', tagline: 'Target customer: Small cloth boutiques & rental shops starting online.', priceMonthly: 999, priceAnnual: 899, isCustom: false, badge: null,
    limits: { products: '500 active products', storage: '2 GB included storage', api: 'No external API', staff: '2 staff accounts', warehouse: 'Single warehouse' },
    highlights: ['Apparel storefront & custom domain','SSL, hosting & mobile-friendly catalog','Shopping cart & rental date selector','Order status (Pending, Confirmed, Dispatched, Returned)','Manual stock updates & size/color tracking','Standard Payment Gateway (Customer PG account)','Basic dashboard & email support'] },
  { id: 'growth', name: 'Growth', tagline: 'Target customer: Growing clothing lines needing ERP sync & automation.', priceMonthly: 2499, priceAnnual: 2249, isCustom: false, badge: 'Most Popular',
    limits: { products: '2,000 active products', storage: '5 GB included storage', api: '100,000 requests/month', staff: '5 staff accounts', warehouse: 'Single warehouse' },
    highlights: ['Includes everything in Starter, plus:','100,000 external API requests/month','Full REST API access (HTTPS, JSON, OpenAPI)','Automated ERP inventory & order synchronization','Tenant-specific authentication & rate limiting','Webhook support & automated notifications','Advanced apparel calendar, search & filters','Customer, sales, booking & API usage reports'] },
  { id: 'business', name: 'Business', tagline: 'Target customer: Established apparel brands managing multi-location inventory.', priceMonthly: 4999, priceAnnual: 4499, isCustom: false, badge: 'Best Value',
    limits: { products: '10,000 active products', storage: '10 GB included storage', api: '300,000 requests/month', staff: '15 staff accounts', warehouse: 'Multi-warehouse management' },
    highlights: ['Includes everything in Growth, plus:','Multi-warehouse & retail store management','Inter-warehouse garment transfers & tracking','Location-wise stock availability & returns','Advanced apparel pricing rules & durations','Staff roles, permissions & location reports','Priority customer support with faster response'] },
  { id: 'premium', name: 'Premium Business', tagline: 'Target customer: Large garment enterprises with custom requirements.', priceMonthly: 'Custom', priceAnnual: 'Custom', isCustom: true, badge: 'Enterprise',
    limits: { products: 'Custom product limits', storage: 'Custom storage allocation', api: 'Custom API request quota', staff: 'Custom staff accounts', warehouse: 'Multi-location unlimited' },
    highlights: ['Custom product, storage & API quotas','Dedicated ERP development & custom workflows','Dedicated support manager & custom SLA','Custom deployment options where required','Tailored business intelligence reports','Individual contract & quotation billing'] }
];

const QUICK_COMPARISON = [
  { feature: 'Monthly Price', starter: '₹999', growth: '₹2,499', business: '₹4,999', premium: 'Custom' },
  { feature: 'Active Products', starter: '500', growth: '2,000', business: '10,000', premium: 'Custom' },
  { feature: 'Included Storage', starter: '2 GB', growth: '5 GB', business: '10 GB', premium: 'Custom' },
  { feature: 'API Requests / Month', starter: '—', growth: '100,000', business: '300,000', premium: 'Custom' },
  { feature: 'Staff Accounts', starter: '2', growth: '5', business: '15', premium: 'Custom' },
  { feature: 'Cloth Storefront & Domain', starter: '✓', growth: '✓', business: '✓', premium: '✓' },
  { feature: 'Size & Color Matrix', starter: '✓', growth: '✓', business: '✓', premium: '✓' },
  { feature: 'Inventory Management', starter: 'Basic', growth: 'Advanced', business: 'Advanced', premium: 'Custom' },
  { feature: 'Payment Gateway', starter: '✓', growth: '✓', business: '✓', premium: '✓' },
  { feature: 'ERP API Integration', starter: '—', growth: '✓', business: '✓', premium: 'Custom' },
  { feature: 'Webhooks', starter: '—', growth: '✓', business: '✓', premium: '✓' },
  { feature: 'Multi-warehouse', starter: '—', growth: '—', business: '✓', premium: '✓' },
  { feature: 'Advanced Reports', starter: '—', growth: 'Standard', business: '✓', premium: '✓' },
  { feature: 'Priority Support', starter: '—', growth: '—', business: '✓', premium: '✓' },
  { feature: 'Custom Integrations', starter: '—', growth: 'Quoted', business: 'Quoted', premium: 'Available' },
];

const INTEGRATIONS_LIST = [
  { name: 'Razorpay & PGs', category: 'Payment Gateways', text: 'Connect your own payment gateway account with 0% platform commission. Direct bank settlements.' },
  { name: 'Shiprocket', category: 'Shipping & Logistics', text: 'Automate garment dispatches, order tracking, and customer return logistics.' },
  { name: 'WhatsApp Business', category: 'Customer Engagement', text: 'Send automated booking alerts, payment links, and return reminders.' },
  { name: 'Zoho Books', category: 'ERP & Accounting', text: 'Synchronize apparel invoices, payments, and financial ledgers automatically.' },
  { name: 'Custom ERP Connectors', category: 'Enterprise REST API', text: 'Bi-directional sync for SAP, Oracle, Tally, or proprietary apparel stock backends.' }
];

const FAQS_LIST = [
  { q: "Is source code included in any plan?", a: "No. The Nirmayana cloth commerce platform, source code, and underlying intellectual property remain the platform provider's property. Customers receive subscription-based access to the software, not ownership or a source-code licence under any plan, including Premium Business." },
  { q: "Do you charge any commission on bookings?", a: "No. There is 0% default transaction commission. You connect your own payment gateway account (Razorpay, PhonePe, etc.) and customer settlements go directly into your bank account." },
  { q: "How does API overage pricing work?", a: "API overage is available for Growth and Business customers at ₹299 per additional 100,000 requests. Internal backend calls and webhook delivery retries do not consume your external API quotas." },
  { q: "How are storage and API usage thresholds monitored?", a: "Automated warning alerts are sent via email/dashboard at 80% and 100% of your included plan storage allowance and API quotas to prevent unexpected service interruptions." },
  { q: "What is required for multi-warehouse management?", a: "Multi-warehouse management (location-specific stock availability, inter-warehouse garment transfers, and location-wise reporting) is included in the Business (₹4,999/mo) and Premium Business plans." }
];

const Cell = ({ v, tone }) => v === '✓' ? <IconCheck className="w-4 h-4 text-emerald-400 mx-auto" /> : v === '—' ? <IconX className="w-4 h-4 text-slate-600 mx-auto" /> : <span className={`font-semibold ${tone}`}>{v}</span>;

export default function App() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlanModal, setSelectedPlanModal] = useState(null);
  const [showEnterpriseModal, setShowEnterpriseModal] = useState(false);
  const [showPoliciesModal, setShowPoliciesModal] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [calcPlan, setCalcPlan] = useState('growth');
  const [calcExtraApiBlocks, setCalcExtraApiBlocks] = useState(1);

  const basePrice = useMemo(() => {
    const plan = PLANS_DATA.find(p => p.id === calcPlan);
    if (!plan || plan.isCustom) return 0;
    return billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
  }, [calcPlan, billingCycle]);

  const extraApiCost = calcPlan === 'starter' ? 0 : calcExtraApiBlocks * 299;
  const estimatedTotal = basePrice + extraApiCost;
  const inputCls = "w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <IconBox className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white">Nirm<span className="text-cyan-400">ayana</span></span>
              <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-widest -mt-1">Cloth Commerce Platform</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-xs font-semibold text-slate-300">
            <a href="#plans" className="hover:text-indigo-400 transition-colors">Subscription Plans</a>
            <a href="#matrix" className="hover:text-indigo-400 transition-colors">Feature Matrix</a>
            <a href="#calculator" className="hover:text-indigo-400 transition-colors">Cost Estimator</a>
            <a href="#integrations" className="hover:text-indigo-400 transition-colors">Integrations</a>
            <a href="#policies" className="hover:text-indigo-400 transition-colors">Commercial Policies</a>
            <a href="#faqs" className="hover:text-indigo-400 transition-colors">FAQs</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowPoliciesModal(true)} className="text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white transition-all flex items-center gap-1.5">
              <IconFileText className="w-3.5 h-3.5 text-indigo-400" /> Terms & IP
            </button>
            <button onClick={() => setShowEnterpriseModal(true)} className="text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-600/30 transition-all">
              Contact Sales
            </button>
          </div>
        </div>
      </nav>

      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-slate-900 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-6">
            <IconZap className="w-4 h-4 text-cyan-400" /> Nirmayana • Apparel & Cloth Commerce Platform
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Scale Your Boutique & Apparel Business With <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-purple-400">Nirmayana Cloth Commerce</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            A complete garment catalog, size/color variant matrix, rental date calendar, payment gateway connectivity, and multi-warehouse control engineered for modern clothing brands.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-300">
            {['0% Transaction Commission','Own Your Payment Gateway','Direct Bank Settlements','Full REST API on Growth+'].map(t => (
              <span key={t} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                <IconCheck className="w-4 h-4 text-emerald-400" /> {t}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#plans" className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2">
              Explore Subscription Plans <IconChevronRight className="w-4 h-4" />
            </a>
            <button onClick={() => setShowPoliciesModal(true)} className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold text-xs transition-all flex items-center justify-center gap-2">
              View Commercial Policies & IP Terms
            </button>
          </div>
        </div>
      </section>

      <section id="plans" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Cloth Commerce Pricing & Feature Plans</h2>
          <p className="text-slate-400 text-sm mt-3">Transparent monthly pricing. Standard plans remain below ₹5,000/mo. All prices exclude GST.</p>
          <div className="mt-8 inline-flex items-center bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            <button onClick={() => setBillingCycle('monthly')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${billingCycle === 'monthly' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>
              Monthly Billing
            </button>
            <button onClick={() => setBillingCycle('annual')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${billingCycle === 'annual' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>
              Annual Billing <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase">Save 10%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS_DATA.map((plan) => {
            const isPopular = plan.badge === 'Most Popular';
            const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
            return (
              <div key={plan.id} className={`relative rounded-3xl flex flex-col justify-between p-6 transition-all duration-300 ${isPopular ? 'bg-slate-900/90 border-2 border-indigo-500 shadow-2xl shadow-indigo-500/10 lg:-translate-y-2' : 'bg-slate-900/50 border border-slate-800/80 hover:border-slate-700'}`}>
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-black uppercase tracking-widest shadow-md whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-white mt-1">{plan.name}</h3>
                  <p className="text-[11px] text-slate-400 mt-2 min-h-[34px] leading-relaxed">{plan.tagline}</p>
                  <div className="my-6 border-y border-slate-800/80 py-4">
                    <div className="flex items-baseline gap-1">
                      {typeof price === 'number' ? (
                        <>
                          <span className="text-3xl sm:text-4xl font-black text-white">₹{price.toLocaleString('en-IN')}</span>
                          <span className="text-slate-400 text-xs font-semibold">/ month</span>
                        </>
                      ) : (
                        <span className="text-3xl font-black text-white">Custom</span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-1 font-medium">Billed {billingCycle} • Excl. GST</span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-300 mb-6 bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                    {[[IconBox, plan.limits.products],[IconDatabase, plan.limits.storage],[IconZap, plan.limits.api],[IconUsers, plan.limits.staff]].map(([Ic, t], i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Ic className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                    {plan.highlights.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <IconCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className={idx === 0 && plan.id !== 'starter' ? 'font-bold text-white' : ''}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-slate-800">
                  <button onClick={() => { plan.isCustom ? setShowEnterpriseModal(true) : setSelectedPlanModal(plan); }}
                    className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${isPopular ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}>
                    {plan.isCustom ? 'Request Quote' : `Select ${plan.name}`}
                    <IconChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="matrix" className="py-16 bg-slate-900/40 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Side-by-Side Feature Comparison Matrix</h2>
            <p className="text-slate-400 text-sm mt-2">Compare limits and apparel operational features side-by-side</p>
          </div>
          <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80">
                  <th className="p-4 text-xs font-bold text-slate-300 uppercase tracking-wider w-1/3">Features</th>
                  <th className="p-4 text-center text-xs font-bold text-white">Starter<br/><span className="text-[10px] text-slate-400 font-normal">₹999/mo</span></th>
                  <th className="p-4 text-center text-xs font-bold text-indigo-400">Growth<br/><span className="text-[10px] text-slate-400 font-normal">₹2,499/mo</span></th>
                  <th className="p-4 text-center text-xs font-bold text-white">Business<br/><span className="text-[10px] text-slate-400 font-normal">₹4,999/mo</span></th>
                  <th className="p-4 text-center text-xs font-bold text-purple-400">Premium Business<br/><span className="text-[10px] text-slate-400 font-normal">Custom</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {QUICK_COMPARISON.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-3.5 px-4 font-semibold text-slate-200">{row.feature}</td>
                    <td className="p-3.5 text-center text-slate-300"><Cell v={row.starter} tone="text-white" /></td>
                    <td className="p-3.5 text-center text-slate-300 bg-indigo-950/10"><Cell v={row.growth} tone="text-indigo-300" /></td>
                    <td className="p-3.5 text-center text-slate-300"><Cell v={row.business} tone="text-white" /></td>
                    <td className="p-3.5 text-center text-slate-300"><Cell v={row.premium} tone="text-purple-300" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="calculator" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-600/20 rounded-2xl text-indigo-400"><IconCalculator className="w-6 h-6" /></div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Live API Overage & Cost Calculator</h2>
              <p className="text-xs sm:text-sm text-slate-400">Calculate total estimated monthly expenditure including API overage blocks (₹299 / 100k requests).</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">1. Choose Base Subscription Tier</label>
                <div className="grid grid-cols-3 gap-2">
                  {[{ id: 'starter', label: 'Starter (₹999)' },{ id: 'growth', label: 'Growth (₹2,499)' },{ id: 'business', label: 'Business (₹4,999)' }].map((p) => (
                    <button key={p.id} onClick={() => { setCalcPlan(p.id); if (p.id === 'starter') setCalcExtraApiBlocks(0); }}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all text-center ${calcPlan === p.id ? 'border-indigo-500 bg-indigo-600/20 text-white' : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'}`}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
              {calcPlan !== 'starter' ? (
                <div>
                  <div className="flex justify-between items-center mb-2 gap-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">2. Additional API Request Blocks (+100k requests / block)</label>
                    <span className="text-xs font-extrabold text-indigo-400 whitespace-nowrap">+{calcExtraApiBlocks * 100}k calls (₹{calcExtraApiBlocks * 299})</span>
                  </div>
                  <input type="range" min="0" max="10" value={calcExtraApiBlocks} onChange={(e) => setCalcExtraApiBlocks(parseInt(e.target.value))} className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-medium">
                    <span>0 Blocks</span><span>500k Extra</span><span>1,000,000 Extra</span>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-300 text-xs flex items-start gap-2.5">
                  <IconAlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>The Starter plan does not include external API access. Select Growth or Business to add API request top-ups.</span>
                </div>
              )}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-[11px] text-slate-400">
                <p>• <strong>API Overage Pricing:</strong> ₹299 per additional 100,000 external API requests.</p>
                <p>• <strong>Fair-Use Exclusions:</strong> Internal backend system requests and webhook delivery retries do NOT consume API quota.</p>
              </div>
            </div>
            <div className="lg:col-span-5 bg-slate-950 rounded-2xl p-6 border border-indigo-500/40 flex flex-col justify-between h-full">
              <div>
                <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest block">Estimated Monthly Outlay</span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">₹{estimatedTotal.toLocaleString('en-IN')}</span>
                  <span className="text-slate-400 text-xs">/ mo + GST</span>
                </div>
                <div className="mt-6 space-y-3 text-xs border-t border-slate-800 pt-4">
                  <div className="flex justify-between text-slate-400">
                    <span>Base Subscription Plan ({calcPlan.toUpperCase()})</span>
                    <span className="font-bold text-white">₹{basePrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Included Base API Quota</span>
                    <span className="font-bold text-emerald-400">{calcPlan === 'starter' ? '0' : calcPlan === 'growth' ? '100,000' : '300,000'}</span>
                  </div>
                  {calcPlan !== 'starter' && (
                    <div className="flex justify-between text-slate-400">
                      <span>API Top-Up ({calcExtraApiBlocks * 100}k requests)</span>
                      <span className="font-bold text-white">₹{extraApiCost.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-slate-800/80 font-bold text-slate-200">
                    <span>Total API Quota Available</span>
                    <span className="text-indigo-400">{calcPlan === 'starter' ? '0' : ((calcPlan === 'growth' ? 100000 : 300000) + calcExtraApiBlocks * 100000).toLocaleString('en-IN')} requests</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedPlanModal(PLANS_DATA.find(p => p.id === calcPlan))} className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2">
                Configure {calcPlan.toUpperCase()} Plan <IconChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="integrations" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Ecosystem & Integrations</h2>
          <p className="text-slate-400 text-sm mt-2">Connect your apparel storefront directly with your existing technology stack</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {INTEGRATIONS_LIST.map((item, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-1.5">{item.category}</span>
              <h3 className="text-base font-bold text-white mb-2">{item.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="policies" className="py-16 bg-slate-900/30 border-y border-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Nirmayana Commercial Policies & IP Terms</h2>
            <p className="text-slate-400 text-sm mt-2">Clear business terms, commission-free structure, and platform ownership rules</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm"><IconShield className="w-5 h-5" /><span>Payment & Commission Policies</span></div>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <li>• <strong>0% Default Commission:</strong> Nirmayana charges no transaction commission or revenue share fees.</li>
                <li>• <strong>Gateway Ownership:</strong> Customers connect their own payment gateway accounts (Razorpay, PhonePe, etc.).</li>
                <li>• <strong>Direct Bank Settlements:</strong> All payments settle directly into the merchant's bank account.</li>
                <li>• <strong>Third-Party Charges:</strong> Gateway fees and third-party API tools are paid directly by the customer.</li>
              </ul>
            </div>
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm"><IconLock className="w-5 h-5" /><span>Proprietary Software Ownership</span></div>
              <div className="text-xs text-slate-300 leading-relaxed p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800">
                <p className="font-semibold text-white mb-1">Source Code Not Included:</p>
                <p>The Nirmayana cloth commerce platform, source code, and underlying intellectual property remain the platform provider’s exclusive property. Customers receive subscription-based access to the software, not ownership or a source-code licence under any plan, including Premium Business.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faqs" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm mt-2">Everything you need to know about limits, API quotas, and subscriptions.</p>
        </div>
        <div className="space-y-4">
          {FAQS_LIST.map((faq, idx) => (
            <div key={idx} className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2"><IconHelp className="w-4 h-4 text-indigo-400 shrink-0" />{faq.q}</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-2.5 pl-6 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-900 bg-slate-950 py-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2"><IconBox className="w-5 h-5 text-cyan-400" /><span className="font-bold text-white text-base">Nirmayana Cloth Commerce Platform</span></div>
            <p className="mt-1">A complete apparel commerce platform without building technology from scratch.</p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-slate-400">
            <button onClick={() => setShowPoliciesModal(true)} className="hover:text-white transition-colors">Commercial Policies</button>
            <button onClick={() => setShowPoliciesModal(true)} className="hover:text-white transition-colors">IP Disclaimer</button>
            <button onClick={() => setShowEnterpriseModal(true)} className="hover:text-white transition-colors">Enterprise SLA</button>
          </div>
          <div>© {new Date().getFullYear()} Nirmayana. All rights reserved. All prices exclude GST.</div>
        </div>
      </footer>

      {showPoliciesModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button onClick={() => setShowPoliciesModal(false)} className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"><IconX className="w-5 h-5" /></button>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-600/20 rounded-2xl text-indigo-400"><IconShield className="w-6 h-6" /></div>
              <div>
                <h3 className="text-xl font-bold text-white">Commercial Policies & IP Disclaimer</h3>
                <p className="text-xs text-slate-400">Standard operating terms and subscription guidelines.</p>
              </div>
            </div>
            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <h4 className="font-bold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 text-[11px]"><IconLock className="w-3.5 h-3.5" /> Proprietary Software Ownership</h4>
                <p>The Nirmayana cloth commerce platform, source code, and underlying intellectual property remain the platform provider’s property. Customers receive subscription-based access to the software, not ownership or a source-code licence under any plan, including Premium Business.</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-xs">Capacity & Threshold Alerting</h4>
                <p>• <strong>Storage Alerts:</strong> System alerts are dispatched via email/dashboard at 80% and 100% of included storage allowance.</p>
                <p>• <strong>API Quota Alerts:</strong> Notifications trigger at 80% and 100% of monthly external API quota limit.</p>
                <p>• <strong>Overage Billing:</strong> Additional API request blocks (+100k requests) cost ₹299 for Growth & Business plans.</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button onClick={() => setShowPoliciesModal(false)} className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all">Close Terms</button>
            </div>
          </div>
        </div>
      )}

      {selectedPlanModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <button onClick={() => setSelectedPlanModal(null)} className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"><IconX className="w-5 h-5" /></button>
            <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest block">Selected Subscription</span>
            <h3 className="text-2xl font-black text-white mt-1">{selectedPlanModal.name} Plan</h3>
            <div className="mt-2 text-3xl font-extrabold text-white">
              ₹{(billingCycle === 'annual' ? selectedPlanModal.priceAnnual : selectedPlanModal.priceMonthly).toLocaleString('en-IN')}
              <span className="text-xs font-normal text-slate-400"> / mo + GST</span>
            </div>
            <div className="my-6 space-y-2.5 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300">
              {[['Active Products','products'],['Storage Included','storage'],['API Limit','api'],['Staff Accounts','staff']].map(([l,k]) => (
                <div key={k} className="flex justify-between gap-3"><span>{l}</span><span className="font-bold text-white text-right">{selectedPlanModal.limits[k]}</span></div>
              ))}
            </div>
            <button onClick={() => { setSubmissionFeedback(true); setTimeout(() => { setSubmissionFeedback(false); setSelectedPlanModal(null); }, 2000); }}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2">
              {submissionFeedback ? "Setup Initiated..." : "Proceed to Account Setup"}
              {!submissionFeedback && <IconChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      {showEnterpriseModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end">
          <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Enterprise Quote Request</h3>
                <button onClick={() => setShowEnterpriseModal(false)} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"><IconX className="w-5 h-5" /></button>
              </div>
              <p className="text-xs text-slate-400 mb-6">Custom limits, dedicated ERP developers, custom SLAs, and multi-location apparel store setup.</p>
              <form onSubmit={async (e) => { e.preventDefault(); const d = Object.fromEntries(new FormData(e.currentTarget)); setSubmitError(false); setSubmissionFeedback(true); try { const r = await fetch(ENQUIRY_API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ company: d.company, email: d.email, requirements: d.requirements }) }); const j = await r.json(); if (!r.ok || !j.ok) throw new Error("failed"); setTimeout(() => { setSubmissionFeedback(false); setShowEnterpriseModal(false); }, 1500); } catch (err) { setSubmissionFeedback(false); setSubmitError(true); } }} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Company / Brand Name</label>
                  <input type="text" name="company" required placeholder="e.g. Aura Fashion Boutique" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Work Email</label>
                  <input type="email" name="email" required placeholder="name@company.com" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Custom Operational Requirements</label>
                  <textarea rows={3} name="requirements" placeholder="Describe required ERP system sync, size/color variant catalog size, or warehouse count..." className={inputCls} />
                </div>
                <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-600/30 mt-4">
                  {submissionFeedback ? "Submitting Request..." : submitError ? "Couldn't send, tap to retry" : "Submit Enterprise Consultation Request"}
                </button>
              </form>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] text-slate-500 text-center">Source code is not provided under any plan, including Premium Business.</div>
          </div>
        </div>
      )}
    </div>
  );
}
