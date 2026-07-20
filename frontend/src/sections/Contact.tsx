import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import api from '../services/api';

interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const Contact: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormInput>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (data: ContactFormInput) => {
    try {
      setLoading(true);
      setErrorMsg(null);
      
      const response = await api.post('/contacts', data);
      
      if (response.data.success) {
        setSuccess(true);
        reset();
      } else {
        setErrorMsg(response.data.message || 'Something went wrong. Please try again.');
      }
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setErrorMsg(err.response?.data?.message || 'Server connection failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-white overflow-hidden border-t border-zinc-200">
      <div className="max-w-4xl mx-auto px-6 w-full relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-black text-[#FF7A30] mb-2 font-mono">Get In Touch</h2>
          <h1 className="text-3xl md:text-4xl font-black text-[#0B2545] tracking-tight leading-tight uppercase">
            Send Me A Message!
          </h1>
          <p className="text-xs sm:text-sm text-zinc-550 mt-3 font-semibold max-w-md mx-auto">
            Got a question or proposal, or just want to say hello? Go ahead.
          </p>
          <div className="h-[3px] w-12 bg-[#FF7A30] mx-auto mt-4 rounded-full" />
        </div>

        {/* Centered Contact Input Form */}
        <div className="max-w-2xl mx-auto relative">
          
          <AnimatePresence mode="wait">
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white rounded-3xl flex flex-col items-center justify-center p-6 text-center z-20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10 }}
                  className="p-4 bg-[#FF7A30]/10 border border-[#FF7A30]/30 text-[#FF7A30] rounded-full mb-4"
                >
                  <FiCheckCircle className="w-12 h-12" />
                </motion.div>
                <h3 className="text-xl font-black text-[#0B2545] mb-2">Message Dispatched!</h3>
                <p className="text-sm text-zinc-500 max-w-sm mb-6 leading-relaxed">
                  Thank you for reaching out. Christopher Felix will receive your message and respond shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2.5 rounded-full border border-zinc-200 text-xs font-bold text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-left relative z-10">
            {errorMsg && (
              <div className="flex items-center gap-2.5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-650 text-xs">
                <FiAlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Name field */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">Your Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  {...register('name', { required: 'Name is required' })}
                  className={`w-full bg-transparent border-b py-2 px-0 text-sm text-[#0B2545] placeholder-zinc-400 focus:outline-none focus:border-[#FF7A30] transition-colors rounded-none ${
                    errors.name ? 'border-red-450' : 'border-zinc-300'
                  }`}
                />
                {errors.name && <span className="text-[10px] text-red-500 font-semibold">{errors.name.message}</span>}
              </div>

              {/* Email field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                  })}
                  className={`w-full bg-transparent border-b py-2 px-0 text-sm text-[#0B2545] placeholder-zinc-400 focus:outline-none focus:border-[#FF7A30] transition-colors rounded-none ${
                    errors.email ? 'border-red-450' : 'border-zinc-300'
                  }`}
                />
                {errors.email && <span className="text-[10px] text-red-500 font-semibold">{errors.email.message}</span>}
              </div>
            </div>

            {/* Subject field */}
            <div className="space-y-2">
              <label htmlFor="subject" className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">Subject</label>
              <input
                id="subject"
                type="text"
                placeholder="Got a question or proposal?"
                {...register('subject', { required: 'Subject is required' })}
                className={`w-full bg-transparent border-b py-2 px-0 text-sm text-[#0B2545] placeholder-zinc-400 focus:outline-none focus:border-[#FF7A30] transition-colors rounded-none ${
                  errors.subject ? 'border-red-450' : 'border-zinc-300'
                }`}
              />
              {errors.subject && <span className="text-[10px] text-red-500 font-semibold">{errors.subject.message}</span>}
            </div>

            {/* Message field */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">Your Message</label>
              <textarea
                id="message"
                rows={4}
                placeholder="Write your message to me..."
                {...register('message', { required: 'Message content is required' })}
                className={`w-full bg-transparent border-b py-2 px-0 text-sm text-[#0B2545] placeholder-zinc-400 focus:outline-none focus:border-[#FF7A30] transition-colors resize-none rounded-none ${
                  errors.message ? 'border-red-450' : 'border-zinc-300'
                }`}
              />
              {errors.message && <span className="text-[10px] text-red-500 font-semibold">{errors.message.message}</span>}
            </div>

            {/* Submit button */}
            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-[#FF7A30] hover:bg-[#FF7A30]/90 disabled:opacity-50 text-white font-bold tracking-wider cursor-pointer shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 transition-all text-xs uppercase"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send Message</span>
                    <span className="text-sm font-bold">→</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};
