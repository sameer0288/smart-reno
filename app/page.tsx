"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ShieldCheck, Clock, Zap, ArrowRight, UploadCloud, MapPin, Briefcase, Star, Users } from 'lucide-react';

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    zip: '',
    type: 'Kitchen Remodel',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate real delay for "Impressive" loading state
    await new Promise(r => setTimeout(r, 2000));
    try {
      const res = await fetch('/api/intake?provider=buildertrend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          homeowner: { name: formData.name, email: formData.email, phone: formData.phone },
          project: { type: formData.type, description: formData.description, address: formData.address, zip: formData.zip }
        })
      });
      const data = await res.json();
      if (data.success) {
        setLeadId(data.leadId);
        setStep(4);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Decor */}
      <div className="bg-glow" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32">
        {/* Dynamic Hero Section */}
        <section className="text-center mb-24 max-w-4xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-10"
          >
            <Zap className="w-4 h-4" /> Next-Gen Intake Engine
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="font-outfit text-6xl md:text-8xl font-black mb-10 tracking-tight leading-[0.85]"
          >
            Design. <span className="text-gradient">Build.</span> <br /> 
            Connect.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-fg-muted text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed opacity-80"
          >
            SmartReno is the operating layer for precision construction. Connect with vetted estimators in under 4 hours.
          </motion.p>

          {/* Stat Badges for Trust */}
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="flex flex-wrap justify-center gap-12 mt-16 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
          >
             <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-outfit font-black uppercase text-sm tracking-widest">4.9/5 Average</span>
             </div>
             <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="font-outfit font-black uppercase text-sm tracking-widest">2.5k+ Vetted Pros</span>
             </div>
             <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <span className="font-outfit font-black uppercase text-sm tracking-widest">PCI Secure</span>
             </div>
          </motion.div>
        </section>

        {/* Step-by-Step Form Content */}
        <section className="max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-blue-600/5 blur-[100px] rounded-[60px] pointer-events-none" />
          
          <div className="glass overflow-hidden relative group">
            <div className="h-2 bg-white/[0.03] w-full">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ type: 'spring', stiffness: 50 }}
              />
            </div>
            
            <div className="p-8 md:p-20">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div>
                      <h2 className="text-4xl font-black font-outfit mb-3">Homeowner Information</h2>
                      <p className="text-fg-muted font-medium mb-12">How should we reach you with your estimator matches?</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-xs font-black uppercase tracking-widest text-fg-muted">Full Name</label>
                          <input name="name" value={formData.name} onChange={handleChange} className="input-field" placeholder="Johnathan Doe" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-black uppercase tracking-widest text-fg-muted">Email Identity</label>
                          <input name="email" value={formData.email} onChange={handleChange} type="email" className="input-field" placeholder="john@domain.com" />
                        </div>
                        <div className="md:col-span-2 space-y-3">
                          <label className="text-xs font-black uppercase tracking-widest text-fg-muted">Secure Mobile Contact</label>
                          <input name="phone" value={formData.phone} onChange={handleChange} className="input-field h-16 text-lg" placeholder="+1 (555) 000-0000" />
                        </div>
                      </div>

                      <button onClick={handleNext} className="btn-primary w-full h-16 mt-12 flex items-center justify-center gap-3 text-lg group">
                        Proceed to Location <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-400"><MapPin className="w-8 h-8" /></div>
                      <h2 className="text-4xl font-black font-outfit">Project Location</h2>
                    </div>
                    
                    <div className="space-y-10">
                       <div className="space-y-3">
                          <label className="text-xs font-black uppercase tracking-widest text-fg-muted">Legal Service Address</label>
                          <input name="address" value={formData.address} onChange={handleChange} className="input-field h-16 text-lg" placeholder="123 Alpha Base, Market District" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-black uppercase tracking-widest text-fg-muted">ZIP Architecture Code</label>
                          <input name="zip" value={formData.zip} onChange={handleChange} className="input-field h-16 w-full md:w-1/2 text-lg" placeholder="10001" />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 pt-8">
                       <button onClick={handleBack} className="btn-secondary h-16 flex-1">Go Back</button>
                       <button onClick={handleNext} className="btn-primary h-16 flex-[2] flex items-center justify-center gap-3 text-lg group">
                          Define Scope <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                       </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20 text-purple-400"><Briefcase className="w-8 h-8" /></div>
                      <h2 className="text-4xl font-black font-outfit">Project Scope</h2>
                    </div>

                    <div className="space-y-10">
                       <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
                          {['Kitchen Remodel', 'Full Renovation', 'External Addition', 'HVAC & Systems'].map(type => (
                             <button 
                                key={type} 
                                onClick={() => setFormData({...formData, type})}
                                className={`p-6 rounded-2xl border-2 transition-all font-black uppercase text-[10px] tracking-widest text-center ${formData.type === type ? 'border-blue-500 bg-blue-500/10 text-white shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'border-white/5 text-fg-muted hover:border-white/20'}`}
                             >
                                {type}
                             </button>
                          ))}
                       </div>
                       <div className="space-y-3">
                          <label className="text-xs font-black uppercase tracking-widest text-fg-muted">Visual description & details</label>
                          <textarea name="description" value={formData.description} onChange={handleChange} rows={5} className="input-field !rounded-3xl p-6" placeholder="Help us understand your vision..." />
                       </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 pt-8">
                       <button onClick={handleBack} className="btn-secondary h-16 flex-1">Go Back</button>
                       <button onClick={handleSubmit} disabled={loading} className="btn-primary h-16 flex-[2] flex items-center justify-center gap-3 text-lg group">
                          {loading ? (
                             <RefreshCw className="w-6 h-6 animate-spin" />
                          ) : (
                             <>Transmit to Network <Zap className="w-5 h-5 fill-current" /></>
                          )}
                       </button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div 
                    key="step4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-32 h-32 bg-green-500/10 rounded-full border border-green-500/20 flex items-center justify-center mx-auto mb-10 text-green-400">
                       <CheckCircle className="w-16 h-16" />
                    </div>
                    <h2 className="text-5xl font-black font-outfit mb-4">Transmission Success</h2>
                    <p className="text-fg-muted text-xl max-w-md mx-auto leading-relaxed mb-12">Your project <span className="text-white font-bold">#{leadId}</span> is now broadcast to the Procore & Buildertrend network nodes.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                       {[
                         { icon: ShieldCheck, t: 'Verified', d: 'Bank-level security' },
                         { icon: Clock, t: '4hr SLAs', d: 'Guaranteed contact' },
                         { icon: UploadCloud, t: 'Cloud-Sync', d: 'Platforms updated' }
                       ].map((f, i) => (
                          <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                             <f.icon className="w-6 h-6 text-blue-500 mx-auto mb-3" />
                             <h4 className="text-xs font-black uppercase tracking-widest mb-1">{f.t}</h4>
                             <p className="text-[10px] text-fg-muted uppercase font-bold">{f.d}</p>
                          </div>
                       ))}
                    </div>

                    <button 
                      onClick={() => window.location.href = '/dashboard'}
                      className="btn-primary w-full h-16 flex items-center justify-center gap-3"
                    >
                       Launch Management Dashboard <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Trust Badge */}
      <div className="fixed bottom-10 right-10 hidden md:flex items-center gap-4 glass px-6 py-4 rounded-full border-blue-500/20 shadow-2xl">
         <div className="flex -space-x-3">
            {[1,2,3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold">U{i}</div>
            ))}
         </div>
         <div className="text-[10px] font-black uppercase tracking-widest leading-none">
            Join 2k homeowners<br /><span className="text-green-400">Online Now</span>
         </div>
      </div>
    </div>
  );
}

function RefreshCw(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}
