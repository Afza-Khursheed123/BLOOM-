import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('care');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* 7.1 Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#3A7D6A]">
          A Question is a Good Beginning
        </p>
        <h1 className="font-serif italic text-4xl sm:text-5xl text-[#1E3A2F]">
          Let's grow a conversation.
        </h1>
        <p className="text-sm text-gray-600">
          Plant questions, batch enquiries, or just a little hello — our Portland nursery team is here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
        {/* Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-gray-200/80 shadow-xs">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif italic text-2xl text-[#1E3A2F]">
                Thank you for reaching out!
              </h3>
              <p className="text-xs text-gray-600 max-w-sm mx-auto">
                A member of our nursery care staff will review your inquiry and respond within 24 hours.
              </p>
              <Button variant="outline" size="sm" onClick={() => setIsSubmitted(false)}>
                Send Another Note
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-serif font-bold text-xl text-[#1E3A2F] mb-4">
                Send us a note
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Clara Montgomery"
                />
                <Input
                  label="Email Address"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="clara@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2C3E35] mb-1.5">
                  Inquiry Topic
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'care', label: 'Plant Doctor' },
                    { id: 'order', label: 'Order Support' },
                    { id: 'wholesale', label: 'Wholesale' },
                    { id: 'general', label: 'General' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`p-2.5 rounded-md border text-center transition-all ${
                        category === cat.id
                          ? 'border-[#1E3A2F] bg-[#1E3A2F] text-white font-semibold'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2C3E35] mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your space, lighting conditions, or question..."
                  className="w-full rounded-md border border-gray-200 p-3 text-xs text-[#2C3E35] focus:outline-none focus:ring-2 focus:ring-[#3A7D6A]/30 focus:border-[#3A7D6A]"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full justify-center"
                icon={<Send className="w-4 h-4" />}
              >
                Send Message
              </Button>
            </form>
          )}
        </div>

        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#E8EDEA]/60 p-6 rounded-xl border border-gray-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-[#1E3A2F] font-semibold text-sm">
              <MapPin className="w-4 h-4 text-[#3A7D6A]" />
              <span>Nursery Headquarters</span>
            </div>
            <p className="text-xs text-gray-600 pl-6">
              128 Fern Lane, Greenhouse Bay 4<br />
              Portland, OR 97201
            </p>
          </div>

          <div className="bg-[#E8EDEA]/60 p-6 rounded-xl border border-gray-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-[#1E3A2F] font-semibold text-sm">
              <Mail className="w-4 h-4 text-[#3A7D6A]" />
              <span>Direct Inquiries</span>
            </div>
            <p className="text-xs text-gray-600 pl-6">
              care@bloomnursery.com<br />
              orders@bloomnursery.com
            </p>
          </div>

          <div className="bg-[#E8EDEA]/60 p-6 rounded-xl border border-gray-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-[#1E3A2F] font-semibold text-sm">
              <Phone className="w-4 h-4 text-[#3A7D6A]" />
              <span>Telephone Hotline</span>
            </div>
            <p className="text-xs text-gray-600 pl-6">
              +1 (503) 555-0148<br />
              Mon–Fri 8:00 AM – 5:00 PM PST
            </p>
          </div>

          <div className="bg-[#E8EDEA]/60 p-6 rounded-xl border border-gray-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-[#1E3A2F] font-semibold text-sm">
              <Clock className="w-4 h-4 text-[#3A7D6A]" />
              <span>Greenhouse Visiting Hours</span>
            </div>
            <p className="text-xs text-gray-600 pl-6">
              Saturday &amp; Sunday: 10:00 AM – 4:00 PM<br />
              Walk-in botanical tours by appointment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
