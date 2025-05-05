
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, Linkedin, MessageSquare, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    }, 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      } 
    }
  };

  const socialIconVariants = {
    hover: { 
      scale: 1.15,
      rotate: [0, -10, 10, -5, 5, 0],
      transition: { duration: 0.5 }
    }
  };

  const inputVariants = {
    focused: {
      boxShadow: "0 0 0 2px rgba(155, 135, 245, 0.5)",
      borderColor: "#9b87f5",
      scale: 1.01,
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.08)" },
    tap: { scale: 0.95 },
    loading: { 
      opacity: [0.5, 1, 0.5],
      transition: { 
        repeat: Infinity,
        duration: 1.5,
      }
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-purple-light/5 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <motion.div 
          className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-neon-blue/5 blur-3xl"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
          }}
        />
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-24 h-24 rounded-full bg-purple/10"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        <motion.div 
          className="absolute bottom-1/3 left-1/5 w-16 h-16 rounded-full border border-neon-blue/30"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="flex flex-col md:flex-row gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={itemVariants}
            className="md:w-1/2"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Get In Touch</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-purple-light to-neon-blue mb-6" />
            
            <p className="text-foreground/80 mb-8">
              Have a question or want to work together? Fill out the form, and I'll get back to you as soon as possible.
            </p>
            
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                variants={itemVariants} 
                className="flex items-start"
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  className="flex-shrink-0 w-10 h-10 glass-card flex items-center justify-center mr-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <Mail className="w-5 h-5 text-purple-light" />
                </motion.div>
                <div>
                  <h4 className="text-sm font-semibold">Email</h4>
                  <a href="mailto:anubhavsanjay01@gmail.com" className="text-sm text-foreground/70 hover:text-purple-light transition-colors">
                    anubhavsanjay01@gmail.com
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants} 
                className="flex items-start"
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  className="flex-shrink-0 w-10 h-10 glass-card flex items-center justify-center mr-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <Phone className="w-5 h-5 text-purple-light" />
                </motion.div>
                <div>
                  <h4 className="text-sm font-semibold">Phone</h4>
                  <a href="tel:+1234567890" className="text-sm text-foreground/70 hover:text-purple-light transition-colors">
                    +91 9880502538
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants} 
                className="flex items-start"
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  className="flex-shrink-0 w-10 h-10 glass-card flex items-center justify-center mr-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg className="w-5 h-5 text-purple-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </motion.div>
                <div>
                  <h4 className="text-sm font-semibold">Location</h4>
                  <p className="text-sm text-foreground/70">India, Karntaka</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex items-start"
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  className="flex-shrink-0 w-10 h-10 glass-card flex items-center justify-center mr-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg className="w-5 h-5 text-purple-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
                <div>
                  <h4 className="text-sm font-semibold">Working Hours</h4>
                  <p className="text-sm text-foreground/70">Mon - Sat: 9:00 - 17:00</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="mt-10"
            >
              <h4 className="text-sm font-semibold mb-4">Connect With Me</h4>
              <div className="flex space-x-4">
                <motion.a 
                  href="github.com/Anubhavvish23" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass-card flex items-center justify-center text-foreground/70 hover:text-purple-light transition-colors"
                  aria-label="GitHub"
                  variants={socialIconVariants}
                  whileHover="hover"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </motion.a>
               
               
                <motion.a 
                  href="http://www.linkedin.com/in/anubhav-s-14a380229" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass-card flex items-center justify-center text-foreground/70 hover:text-purple-light transition-colors"
                  aria-label="LinkedIn"
                  variants={socialIconVariants}
                  whileHover="hover"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="md:w-1/2"
          >
            <motion.form 
              onSubmit={handleSubmit} 
              className="glass-card p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Decorative shapes */}
              <motion.div 
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-purple-light/5 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1,
                }}
              />
              
              <motion.div 
                className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-neon-blue/5 blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              <div className="mb-6">
                <motion.div 
                  className="flex items-center mb-2"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <MessageSquare className="w-4 h-4 mr-2 text-purple-light" />
                  <label htmlFor="name" className="block text-sm font-medium">
                    Your Name
                  </label>
                </motion.div>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  required
                  className="w-full glass bg-transparent border-0 border-b border-foreground/10 px-4 py-2 focus:outline-none focus:ring-0 focus:border-purple-light transition-all"
                  placeholder="John Doe"
                  variants={inputVariants}
                  animate={focusedField === 'name' ? 'focused' : {}}
                />
              </div>
              
              <div className="mb-6">
                <motion.div 
                  className="flex items-center mb-2"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Mail className="w-4 h-4 mr-2 text-purple-light" />
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email Address
                  </label>
                </motion.div>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  required
                  className="w-full glass bg-transparent border-0 border-b border-foreground/10 px-4 py-2 focus:outline-none focus:ring-0 focus:border-purple-light transition-all"
                  placeholder="john@example.com"
                  variants={inputVariants}
                  animate={focusedField === 'email' ? 'focused' : {}}
                />
              </div>
              
              <div className="mb-6">
                <motion.div 
                  className="flex items-center mb-2"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <MessageSquare className="w-4 h-4 mr-2 text-purple-light" />
                  <label htmlFor="message" className="block text-sm font-medium">
                    Your Message
                  </label>
                </motion.div>
                <motion.textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  required
                  className="w-full glass bg-transparent border-0 border-b border-foreground/10 px-4 py-2 focus:outline-none focus:ring-0 focus:border-purple-light transition-all"
                  placeholder="How can I help you?"
                  variants={inputVariants}
                  animate={focusedField === 'message' ? 'focused' : {}}
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full glass-card py-3 flex justify-center items-center hover:bg-purple-dark/20 transition-colors mt-8 group"
                whileHover="hover"
                whileTap="tap"
                animate={isSubmitting ? "loading" : {}}
                variants={buttonVariants}
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <div className="flex items-center">
                    <span>Send Message</span>
                    <motion.span
                      className="ml-2"
                      initial={{ x: 0 }}
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 1.5,
                        repeatDelay: 2,
                      }}
                    >
                      <Send className="h-4 w-4" />
                    </motion.span>
                  </div>
                )}
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
