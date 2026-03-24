"use client";

import { useState } from 'react';
import { CheckCircle, ShieldCheck, Clock, Zap } from 'lucide-react';

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
    try {
      // Simulate API call to /api/intake
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
    <div className="max-w-4xl mx-auto px-6 py-20 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="font-outfit text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Start Your <span className="text-gradient">Dream Project</span> in Minutes
        </h1>
        <p className="text-fg-muted text-lg max-w-2xl mx-auto italic">
          Describe your vision, and we’ll match you with the perfect estimator and contractor instantly.
        </p>
      </div>

      {/* Form Container */}
      <div className="glass p-8 md:p-12 relative overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-1 bg-gradient-main transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }}></div>

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-outfit">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-fg-muted mb-2">Full Name</label>
                <input name="name" value={formData.name} onChange={handleChange} className="input-field" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm text-fg-muted mb-2">Email Address</label>
                <input name="email" value={formData.email} onChange={handleChange} type="email" className="input-field" placeholder="john@example.com" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-fg-muted mb-2">Phone Number</label>
                <input name="phone" value={formData.phone} onChange={handleChange} className="input-field" placeholder="+1 (555) 000-0000" />
              </div>
            </div>
            <button onClick={handleNext} className="btn-primary w-full mt-4">Next: Project Location</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-outfit">Project Location</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-fg-muted mb-2">Service Address</label>
                <input name="address" value={formData.address} onChange={handleChange} className="input-field" placeholder="123 Maple St, Anytown" />
              </div>
              <div>
                <label className="block text-sm text-fg-muted mb-2">ZIP Code</label>
                <input name="zip" value={formData.zip} onChange={handleChange} className="input-field" placeholder="12345" />
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <button onClick={handleBack} className="btn-secondary flex-1 border border-glass rounded-xl py-3 font-semibold">Back</button>
              <button onClick={handleNext} className="btn-primary flex-[2]">Next: Project Scope</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-outfit">Project Scope</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-fg-muted mb-2">Project Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className="input-field bg-black">
                  <option>Kitchen Remodel</option>
                  <option>Bathroom Renovation</option>
                  <option>Deck Construction</option>
                  <option>Basement Finishing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-fg-muted mb-2">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="input-field" placeholder="Describe your project goals..." />
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <button onClick={handleBack} className="btn-secondary flex-1 border border-glass rounded-xl py-3 font-semibold">Back</button>
              <button onClick={handleSubmit} disabled={loading} className="btn-primary flex-[2] flex items-center justify-center gap-2">
                {loading ? 'Submitting...' : 'Submit Request'}
                {!loading && <Zap className="w-5 h-5 fill-current" />}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-10 space-y-6 animate-fade-in">
            <div className="flex justify-center">
              <CheckCircle className="w-20 h-20 text-accent-electric" />
            </div>
            <h2 className="text-3xl font-bold font-outfit">Request Received!</h2>
            <p className="text-fg-muted max-w-md mx-auto italic">
              Your project <span className="text-white font-medium">#{leadId}</span> has been created. An estimator will be assigned and a visit scheduled shortly.
            </p>
            <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-white/5 border border-glass text-left">
                <ShieldCheck className="w-6 h-6 text-accent-blue mb-2" />
                <h4 className="text-sm font-bold">Secure Data</h4>
                <p className="text-xs text-fg-muted">Your info is synced with vetted partners.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-glass text-left">
                <Clock className="w-6 h-6 text-accent-blue mb-2" />
                <h4 className="text-sm font-bold">Fast Callback</h4>
                <p className="text-xs text-fg-muted">Usually within 4 business hours.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-glass text-left">
                <Zap className="w-6 h-6 text-accent-blue mb-2" />
                <h4 className="text-sm font-bold">Auto-Sync</h4>
                <p className="text-xs text-fg-muted">Synced with Buildertrend/Procore.</p>
              </div>
            </div>
            <button onClick={() => window.location.href = '/dashboard'} className="btn-primary px-8 py-3 mt-8">Go to Dashboard</button>
          </div>
        )}
      </div>
    </div>
  );
}
