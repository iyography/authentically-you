"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Sparkles } from "lucide-react";

// Pre-generated particle positions for performance
const PARTICLES = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  left: `${(i * 2.1) % 100}%`,
  delay: `${(i * 0.4) % 12}s`,
  size: `${1 + (i % 3)}px`,
}));

const SPARKLES_DATA = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: `${(i * 7.3) % 100}%`,
  top: `${(i * 11.7) % 100}%`,
  delay: `${(i * 0.3) % 2}s`,
}));

// Floating particles - pure CSS animation
function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {PARTICLES.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.left,
            bottom: "-10px",
            animationDelay: particle.delay,
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}
      {SPARKLES_DATA.map((sparkle) => (
        <div
          key={`sparkle-${sparkle.id}`}
          className="sparkle"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            animationDelay: sparkle.delay,
          }}
        />
      ))}
    </div>
  );
}

// Aurora background with flowing lights
function AuroraBackground() {
  return (
    <>
      <div className="aurora-bg" />
      <div className="aurora-layer fixed inset-0 z-0" />
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="floating-light w-[500px] h-[500px] bg-[#C5B4E3]/15"
          style={{ top: "5%", left: "-5%", animation: "auroraWave1 40s ease-in-out infinite" }}
        />
        <div
          className="floating-light w-[400px] h-[400px] bg-[#B4D4E3]/12"
          style={{ top: "50%", right: "-10%", animation: "auroraWave2 35s ease-in-out infinite" }}
        />
        <div
          className="floating-light w-[450px] h-[450px] bg-[#E3B4D4]/10"
          style={{ bottom: "10%", left: "20%", animation: "auroraWave3 45s ease-in-out infinite" }}
        />
      </div>
    </>
  );
}

interface FamilyMember {
  name: string;
  superpower: string;
  needsHelp?: string;
  image?: string;
}

const familyMembers: FamilyMember[] = [
  { name: "Bill Widmer", superpower: "Believing in people so fiercely they believe in themselves, marketing (community, SEO/GEO), copywriting, connecting people", needsHelp: "Building systems that free up time, personalized outreach at scale", image: "/profiles/billhaze.jpg" },
  { name: "Melissa Boster", superpower: "Helping women in perimenopause and menopause find relief and prevent long term health problems", needsHelp: "Traffic and helping new members find the community", image: "/profiles/melissa.jpg" },
  { name: "Tim Adam", superpower: "Everything Pinterest, running a Ninja Warrior Gym, Skool Group engagement, organic Skool group growth", needsHelp: "Converting more members to paid tiers", image: "/profiles/timadam.jpg" },
  { name: "Julianne Anderson", superpower: "Storytelling, connecting with people, making people laugh", image: "/profiles/julianneanderson.jpg" },
  { name: "Matthew Burns", superpower: "Finding parked cars and building customer journeys (monday.com consulting), AI discoverability workshops", needsHelp: "Finding more community builders to collaborate with", image: "/profiles/mattburns.jpeg" },
  { name: "Desmond Spann", superpower: "The art of fulfillment, inner work, emotional wellbeing, poetry, freestyling, growth rap", needsHelp: "Upgrades to paid memberships", image: "/profiles/desmond.jpg" },
  { name: "Dr. Melissa Partaka", superpower: "Helping others discover their passions and put them into action to create a life around them", needsHelp: "Automation, particularly a chat buddy for responses", image: "/profiles/drmelissa.jpg" },
  { name: "Nick Nebelsky", superpower: "Using humor and sincerity to build relationships, being direct, witty, and observant, creating AI films", needsHelp: "Structure for ideas, sales strategy", image: "/profiles/nickneb.jpg" },
  { name: "Tony Sibbald", superpower: "Helping people calm their mind and body, let go of anxiety and exhaustion, feel happier and more alive", needsHelp: "Believing in doing the same online as in-person", image: "/profiles/tonysibb.jpg" },
  { name: "Theresa Elliott", superpower: "Idea generation, seeing real potential and opportunities where others see obstacles, creating routines and strategies", needsHelp: "Basic back-end web development skills", image: "/profiles/theresa.jpg" },
  { name: "Elfina Luk", superpower: "Seeing the deeper truth to a person's being, helping them show up as their true selves with deep self love", needsHelp: "Marketing and promotion", image: "/profiles/elfina.jpeg" },
  { name: "Rodney Thompson", superpower: "Turning messy ideas into simple, repeatable systems around planning, decision-making, and staying steady", needsHelp: "Communicating systems clearly", image: "/profiles/rodney.jpg" },
  { name: "Jeniece Drake", superpower: "Helping people take their ideas and build out a workable roadmap to make it a reality", image: "/profiles/JenieceDrake.jpg" },
  { name: "Elmo Anticamara", superpower: "General Virtual Assistant turning daily tasks into organized, stress-free operations", needsHelp: "Scaling systems and workflows for multiple clients", image: "/profiles/elmo.jpg" },
  { name: "Khent Lj", superpower: "Making strengths visible and turning knowledge into actionable help", image: "/profiles/khent.jpg" },
  { name: "Ma. Socorro Castro", superpower: "Helping clients get results with services provided", needsHelp: "Streamlining content creation and marketing", image: "/profiles/socorro.jpeg" },
  { name: "Suzanne Bell", superpower: "Mole whacker - taking care of whatever comes up while doing other things, quick task-switching", image: "/profiles/suzannebell.jpg" },
  { name: "Vinayak Ramesh", superpower: "Amazon KDP publishing (non-fiction), faceless YT automation channels, copywriting/email marketing", needsHelp: "Ways to monetize newsletter", image: "/profiles/vinayak.jpeg" },
  { name: "Iris Ocariza", superpower: "Being patient", needsHelp: "Learning n8n and vibe coding", image: "/profiles/irisoca.jpg" },
  { name: "Tim Norris", superpower: "Creativity in passion", needsHelp: "Packaging value simply so people see it", image: "/profiles/timnorris.jpeg" },
  { name: "Sybil Hall", superpower: "Empathy and listening", needsHelp: "Getting more premium and VIP members", image: "/profiles/sybil.jpg" },
  { name: "Adam Formanek", superpower: "Turning ideas for games into real, repeatable experiences - engineering rules, props, scoring, pacing", needsHelp: "Starting a Skool community", image: "/profiles/adamfor.jpg" },
  { name: "Kerry Souter", superpower: "Writing comedy and storytelling", needsHelp: "Being more present as opposed to performative", image: "/profiles/kerrysouter.jpg" },
  { name: "Dr. Peninah Wood Ph.D", superpower: "Intelligence and a quick sense of humor", needsHelp: "Getting members", image: "/profiles/drpeninah.jpg" },
  { name: "Elizabeth Jaworski", superpower: "Self-awareness and growth mindset", needsHelp: "Working on inner critic", image: "/profiles/elizabethjaw.jpg" },
  { name: "Liisa Reimann", superpower: "The Funnel Fixer - asking clarifying questions about marketing ecosystems, connecting the dots, steering dragon boats", needsHelp: "Business back-end strategy, financial forecasting", image: "/profiles/liisa.jpeg" },
  { name: "Nathaniel Parant", superpower: "Articulate expression & imagination - a synthesis of Heartist, Cosmedian, and Mystic", needsHelp: "System design that organizes a team", image: "/profiles/nathaniel.jpg" },
  { name: "Lisa Drennon", superpower: "Wealth Activator - turning money chaos into calm, strategic cash flow without restrictive budgets or shame", needsHelp: "Expanding visibility and collaborations", image: "/profiles/lisadrennon.jpg" },
  { name: "Eric Bryan Gonzales", superpower: "Seeing beyond the obvious - the potential and opportunity in people and business along with the path to get there", needsHelp: "Starting networking and live calls", image: "/profiles/ericbryan.jpg" },
  { name: "London Patton", superpower: "Building systems with ChatGPT", image: "/profiles/londonpatton.jpg" },
  { name: "MarKesha Smith", superpower: "Human-in-the-loop reply flows that keep voice intact while speeding things up", image: "/profiles/markesha.jpeg" },
  { name: "Jesse Niall", superpower: "Incredibly hyperfocused on AI, amazing group facilitator and counselor, public speaking, getting people into their heart to heal from trauma", needsHelp: "A roadmap to stick to, shiny object syndrome and FOMO, sticking to systems with ADHD", image: "/profiles/jessenail.jpg" },
  { name: "Marisa Nunziato", superpower: "Helping women see the bigger picture of their health - how hormones, the endocrine system, and perimenopause/menopause are all interconnected with the body as a whole", image: "/profiles/marisa.jpg" },
  { name: "Kim Job", superpower: "Seeing subconscious stories and patterns in minutes, helping business owners shift from the inside out", needsHelp: "Adding Skool to high ticket offers that are already working (tired of launching)", image: "/profiles/kimjob.jpeg" },
  { name: "Riikka V", superpower: "Helping others realise their potential, feel safe and confident enough to express themselves, communicating in several languages simultaneously", needsHelp: "Finding her voice, structuring and scheduling content to be engaging", image: "/profiles/riikka.jpg" },
  { name: "Hil Kane", superpower: "All things visual - video ideas, editing, CapCut, YouTube, TikTok, creating AI avatar videos, artistic balance, flow, and design", image: "/profiles/hilkane.jpg" },
  { name: "Mary Nunaley", superpower: "Staying calm in a crisis and knowing the next step, making complex ideas simple (usually relating them to food), bringing fun into stressful times", needsHelp: "Understanding the structure behind AI Studio to effectively build apps", image: "/profiles/marynun.jpg" },
];

export default function Family() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = familyMembers.filter((member) => {
    const query = searchQuery.toLowerCase();
    return (
      member.name.toLowerCase().includes(query) ||
      member.superpower.toLowerCase().includes(query) ||
      (member.needsHelp && member.needsHelp.toLowerCase().includes(query))
    );
  });

  // Count total superpowers (some members have multiple, comma-separated)
  const totalSuperpowers = familyMembers.reduce((acc, member) => {
    // Remove content inside parentheses to avoid counting commas within them
    const withoutParens = member.superpower.replace(/\([^)]*\)/g, '');
    // Count commas and add 1 for total items
    const count = (withoutParens.match(/,/g) || []).length + 1;
    return acc + count;
  }, 0);

  return (
    <div className="min-h-screen calm-gradient-radial text-[#3D3D3D] relative">
      {/* Aurora Background & Floating Elements */}
      <AuroraBackground />
      <FloatingParticles />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#3D3D3D]/10 bg-[#FFF8F0]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-script text-3xl text-[#3D3D3D]">
            Authentically You
          </Link>
          <a
            href="https://www.skool.com/authenticallyou/about"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C9A86C] text-white px-6 py-2 rounded-full font-sans font-semibold hover:bg-[#b8975b] transition-colors"
          >
            Join Free
          </a>
        </div>
      </header>

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <span className="font-sans text-sm tracking-[0.3em] uppercase text-[#C9A86C] block mb-4">Meet The Community</span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 text-[#3D3D3D]">
              The Family
            </h1>
            <p className="font-sans text-xl text-[#6B6B6B] max-w-2xl mx-auto mb-10">
              Every member brings a unique superpower. Here&apos;s who makes Authentically You special.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B6B]/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or superpower..."
                className="w-full pl-12 pr-4 py-4 rounded-full bg-white/60 border border-[#3D3D3D]/10 text-[#3D3D3D] placeholder-[#6B6B6B]/50 focus:outline-none focus:border-[#C9A86C] font-sans"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <p className="font-serif text-4xl text-[#C9A86C]">{familyMembers.length}</p>
              <p className="font-sans text-sm text-[#6B6B6B]">Members</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-4xl text-[#C9A86C]">{totalSuperpowers}</p>
              <p className="font-sans text-sm text-[#6B6B6B]">Superpowers</p>
            </div>
          </div>

          {/* Power Map Link */}
          <div className="text-center mb-16">
            <Link
              href="/power-map"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5B4E3]/20 border border-[#C5B4E3]/40 rounded-full text-[#6B6B6B] hover:bg-[#C5B4E3]/30 hover:border-[#C5B4E3]/60 transition-all font-sans text-sm font-medium"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
              View the Power Map
            </Link>
          </div>

          {/* Members Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member, index) => (
              <div
                key={index}
                className="p-6 bg-white/60 backdrop-blur-sm border border-[#3D3D3D]/10 rounded-2xl hover:border-[#C9A86C]/50 hover:bg-white/80 transition-all group soft-glow"
              >
                {/* Avatar with image or initials */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A86C]/50 to-[#C5B4E3]/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {member.image ? (
                      <Image src={member.image} alt={member.name} width={48} height={48} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-serif text-lg text-[#3D3D3D] font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#3D3D3D] group-hover:text-[#C9A86C] transition-colors">
                      {member.name}
                    </h3>
                  </div>
                </div>

                {/* Superpower */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-[#C9A86C]" />
                    <span className="font-sans text-xs tracking-wider uppercase text-[#C9A86C] font-semibold">Superpower</span>
                  </div>
                  <p className="font-sans text-sm text-[#3D3D3D]/90 leading-relaxed font-medium">
                    {member.superpower}
                  </p>
                </div>

                {/* Needs help with */}
                {member.needsHelp && (
                  <div className="pt-4 border-t border-[#3D3D3D]/10">
                    <span className="font-sans text-xs text-[#6B6B6B] font-medium">Needs help with:</span>
                    <p className="font-sans text-sm text-[#6B6B6B] mt-1">
                      {member.needsHelp}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-16">
              <p className="font-sans text-[#6B6B6B]">No members match your search.</p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-20 text-center">
            <div className="max-w-xl mx-auto p-10 bg-gradient-to-br from-[#C9A86C]/10 to-[#C5B4E3]/10 rounded-2xl border border-[#C9A86C]/20">
              <h2 className="font-serif text-3xl mb-4 text-[#3D3D3D]">Want to join the family?</h2>
              <p className="font-sans text-[#6B6B6B] mb-8">
                Bring your superpower. We&apos;ll help you grow it.
              </p>
              <a
                href="https://www.skool.com/authenticallyou/about"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#C9A86C] text-white px-8 py-4 rounded-full font-sans font-semibold hover:bg-[#b8975b] transition-colors"
              >
                Join Authentically You
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-8 border-t border-[#3D3D3D]/10 bg-[#FFF8F0]/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <Link href="/" className="font-script text-3xl text-[#3D3D3D]">
            Authentically You
          </Link>
          <div className="flex gap-8 font-sans text-sm text-[#6B6B6B]">
            <Link href="/" className="hover:text-[#3D3D3D] transition-colors">Home</Link>
            <Link href="/power-map" className="hover:text-[#3D3D3D] transition-colors">Power Map</Link>
            <Link href="/quiz" className="hover:text-[#3D3D3D] transition-colors">Quiz</Link>
            <a href="https://www.skool.com/authenticallyou/about" target="_blank" rel="noopener noreferrer" className="hover:text-[#3D3D3D] transition-colors">Community</a>
          </div>
          <span className="font-sans text-xs text-[#6B6B6B]/50">&copy; 2026 Authentically You. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
