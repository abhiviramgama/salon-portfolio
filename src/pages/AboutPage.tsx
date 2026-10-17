import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Award, Users, Sparkles } from 'lucide-react';
import { useInView } from '../hooks/useInView';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const values = [
  { icon: Heart, title: 'Client-First', desc: 'Every decision we make begins and ends with the experience of the person in our chair.' },
  { icon: Award, title: 'Artistry', desc: 'We approach every service as an opportunity to create something truly exceptional.' },
  { icon: Users, title: 'Community', desc: "BestSalon is more than a salon — it's a place where people feel welcome, seen, and valued." },
  { icon: Sparkles, title: 'Excellence', desc: 'We pursue mastery in everything we do, from technical skill to the warmth of our welcome.' },
];

const teamMembers = [
  {
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    name: 'Isabella Monroe',
    role: 'Creative Director',
  },
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    name: 'Marcus Reid',
    role: 'Grooming Specialist',
  },
  {
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
    name: 'Sophia Laurent',
    role: 'Colour Specialist',
  },
];

export default function AboutPage() {
  return (
    <>
      <title>About Us — BestSalon | Our Story & Philosophy</title>

      {/* Header */}
      <div className="page-header">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1920&q=60"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[#1B1A18]/85" />
        </div>
        <div className="container-custom relative z-10">
          <FadeIn>
            <p className="section-label">Our Story</p>
            <h1 className="section-heading text-[#F5F0E8] mb-6 max-w-2xl">
              Where Personal Style Meets<br />Exceptional Care.
            </h1>
            <p className="font-sans text-[#AAA49A] max-w-xl leading-relaxed">
              BestSalon was born from a simple belief: that every person deserves to feel extraordinary every time they leave our chair.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Our Story */}
      <section className="section-padding bg-[#111110]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=500&q=80"
                    alt="Salon interior"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-[3/4] overflow-hidden mt-10">
                  <img
                    src="https://images.unsplash.com/photo-1522337360826-74a49a5c3380?auto=format&fit=crop&w=500&q=80"
                    alt="Stylist at work"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="section-label">Our Philosophy</p>
              <h2 className="section-heading text-[#F5F0E8] mb-6">
                More Than Beauty.<br />
                <em className="text-[#C6A66B] italic">A Way of Being.</em>
              </h2>
              <div className="space-y-4 text-[#AAA49A] font-sans text-sm leading-loose">
                <p>
                  BestSalon opened its doors with a clear vision: to create a sanctuary where exceptional craftsmanship and genuine human warmth could coexist. We wanted our clients to feel not just well-styled, but genuinely cared for.
                </p>
                <p>
                  Every stylist in our team was chosen not only for their technical excellence but for their ability to listen, to collaborate, and to create something that feels authentic to the person in front of them.
                </p>
                <p>
                  We believe that the best salon experience begins before scissors ever touch hair — with a conversation, a cup of something warm, and the sense that you've arrived somewhere that truly has your best interests at heart.
                </p>
              </div>
              <div className="mt-8">
                <Link to="/book" className="btn-gold">
                  Experience BestSalon <ArrowRight size={16} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[#1B1A18]">
        <div className="container-custom">
          <FadeIn className="text-center mb-16">
            <p className="section-label mx-auto justify-center">What We Stand For</p>
            <h2 className="section-heading text-[#F5F0E8]">Our Core Values</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.1}>
                <div className="flex gap-5">
                  <div className="w-12 h-12 border border-[#C6A66B]/30 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-[#C6A66B]" />
                  </div>
                  <div>
                    <h3 className="font-sans text-base font-bold text-[#F5F0E8] mb-2">{title}</h3>
                    <p className="font-sans text-sm text-[#AAA49A] leading-relaxed">{desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="section-padding bg-[#111110]">
        <div className="container-custom">
          <FadeIn className="text-center mb-12">
            <p className="section-label mx-auto justify-center">The People</p>
            <h2 className="section-heading text-[#F5F0E8] mb-4">Our Leadership Team</h2>
            <p className="font-sans text-[#AAA49A] max-w-md mx-auto">Sample team profiles — for illustrative purposes.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {teamMembers.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.1} className="text-center">
                <div className="aspect-square overflow-hidden mb-5 mx-auto max-w-[250px]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#F5F0E8] mb-1">{member.name}</h3>
                <p className="font-sans text-xs uppercase tracking-widest text-[#C6A66B] font-bold">{member.role}</p>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center">
            <Link to="/stylists" className="btn-outline-gold">
              Meet the Full Team <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Image Feature */}
      <section className="relative h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1920&q=80"
          alt="BestSalon atmosphere"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#111110]/70 flex items-center justify-center text-center">
          <FadeIn>
            <h2 className="section-heading text-[#F5F0E8] mb-6 max-w-2xl mx-auto px-4">
              "The best version of you starts here."
            </h2>
            <Link to="/book" className="btn-gold">
              Book Your Visit <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
