"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

// Pre-generated particle positions for performance (no state updates)
const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left: `${(i * 1.7) % 100}%`,
  delay: `${(i * 0.35) % 12}s`,
  size: `${1 + (i % 3)}px`,
}));

const SPARKLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${(i * 5.3) % 100}%`,
  top: `${(i * 9.7) % 100}%`,
  delay: `${(i * 0.25) % 2}s`,
}));

// Floating particles - pure CSS animation, no re-renders
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
      {SPARKLES.map((sparkle) => (
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
      {/* Soft floating light orbs */}
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
        <div
          className="floating-light w-[350px] h-[350px] bg-[#E8D5B5]/12"
          style={{ top: "30%", left: "50%", animation: "auroraWave1 50s ease-in-out infinite reverse" }}
        />
      </div>
    </>
  );
}

// Testimonials data
const testimonials = [
  {
    quote: "Today's training was amazing!! Thank you @Elfina Luk!!!!! I haven't recorded a video in I can't remember when! Not only did I record 5 videos but I tapped back into WHY I want to record videos!!",
    name: "A.N.",
    title: "Designer"
  },
  {
    quote: "I've had the pleasure of working with Elfina over the past few months and have made unexpected, meaningful progress. She creates a safe space where I can share at my own pace, offering invaluable insights into the barriers in my life that have held me back from reaching my full potential.",
    name: "Claudia Chen",
    title: "Designer"
  },
  {
    quote: "Thank you Elfina for the work done during our sessions! You really know how to actively listen to people, and are able to instill a confidence mood right from the start. It's really useful to reframe things and start dealing with our limiting beliefs.",
    name: "Sylvain Z.",
    title: "Designer"
  },
  {
    quote: "Elfina's gentle and powerful ability to help me uncover and address the root causes of my struggles was a truly healing experience making it possible for me to release long-held emotional barriers. The session left me feeling lighter and more aligned with myself.",
    name: "Ben B.",
    title: "Designer"
  },
  {
    quote: "I came to her because I want to create content, but noticed something blocking me from being authentic in front of the camera. In only the first session, she helped me uncover so much. Guiding me through my thoughts, the source of the trigger.... It was super valuable.",
    name: "Mira N.",
    title: "Designer"
  },
  {
    quote: "Elfina has such a gift for helping people feel at ease both in front of and behind the camera. She creates a safe, encouraging space where learning feels natural and even joyful. Being part of her community has not only improved my comfort on camera, it's helped me express myself more freely.",
    name: "Tina S.",
    title: "Designer"
  },
];

// Offers data
const offers = [
  {
    title: "Free Resources",
    description: "Join now for free resources, tools, mindset shifts for confidence + flow.",
    icon: "✨"
  },
  {
    title: "Behind the Scenes",
    description: "Follow my journey with unfiltered video updates as I build this community alongside a film career.",
    icon: "🎬"
  },
  {
    title: "Backstage Pass",
    description: "This is your access to 1:1 mentorship + advanced resources to accelerate the growth of your audience and business.",
    icon: "🎟️"
  },
  {
    title: "Win Your Money Back",
    description: "Join our Challenge to Create 5 videos in 5 days: repeat for consistency + momentum. Win your money back for showing up!",
    icon: "🏆"
  },
  {
    title: "Step into the Green Room",
    description: "For live coaching, feedback + business support to streamline your workflow and maximize your efforts towards your confidence journey.",
    icon: "🎤"
  },
  {
    title: "Insider's Studio",
    description: "Go In the Studio with Elfina for private, high-level collaboration by invite or application only. Only for those ready for top level of commitment.",
    icon: "🌟"
  },
];

// Community features
const communityFeatures = [
  "5 Videos in 5 Days Challenge",
  "Behind the Scenes Access",
  "Community Connection",
  "On Camera Weekly Q&A Replays",
  "Confidence + Mindset Tools",
  "1:1 Mentorship",
  "Live \"Action\" Coaching Calls",
  "Creator Spotlights + Features",
  "Insiders Studio Access",
  "Resource Library + Templates",
];

export default function Home() {
  return (
    <div className="calm-gradient-radial min-h-screen text-[#3D3D3D] relative">
      {/* Aurora Background & Floating Elements */}
      <AuroraBackground />
      <FloatingParticles />

      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center pt-20">
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <p className="font-sans text-sm tracking-[0.3em] uppercase text-[#C9A86C] mb-4">
              be seen. be heard. be you.
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 text-[#3D3D3D]">
              GROW your <span className="text-[#C9A86C]">AUDIENCE</span>.
            </h1>
            <p className="font-serif text-2xl md:text-3xl text-[#3D3D3D] mb-6 leading-relaxed">
              LEARN to LOVE being on CAMERA while doing it.
            </p>
            <p className="font-sans text-lg text-[#6B6B6B] mb-8 leading-relaxed max-w-xl">
              Join our mission to help 1 million people do the same.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="https://www.skool.com/authenticallyou/about"
                className="inline-block font-sans font-semibold bg-[#C9A86C] text-white px-10 py-4 rounded-full hover:bg-[#b8975b] transition-all soft-glow text-center"
              >
                Join Now
              </a>
              <a
                href="#about"
                className="inline-block font-sans font-semibold border-2 border-[#C9A86C] text-[#C9A86C] px-10 py-4 rounded-full hover:bg-[#C9A86C]/10 transition-all text-center"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-[300px] md:w-[400px] aspect-[3/4] rounded-3xl overflow-hidden soft-glow">
              <Image
                src="/elfina-hero.png"
                alt="Elfina Luk"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-sans text-lg md:text-xl text-[#6B6B6B] leading-relaxed mb-8">
            We help creators, coaches, and professionals show up confidently on camera so you can share your message clearly, grow your audience, and stay rooted in what makes you authentically you.
          </p>
          <p className="font-script text-3xl md:text-4xl text-[#C9A86C]">
            Be seen. Be heard. Be authentically you.
          </p>
          <p className="font-serif text-xl text-[#3D3D3D] mt-2 italic">
            On camera and in life.
          </p>
        </div>
      </section>

      {/* Where It All Happens */}
      <section id="community" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-sans text-sm tracking-[0.3em] uppercase text-[#C9A86C] block mb-4">Where it all happens</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-[#3D3D3D] mb-6">together</h2>
            <p className="font-sans text-lg text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed">
              Inside y/our community is where this journey begins...a space to pause, breathe and remember that confidence grows with connection.
            </p>
            <p className="font-sans text-lg text-[#6B6B6B] max-w-2xl mx-auto mt-4 leading-relaxed">
              Whether you&apos;re just finding your voice or ready to share it with the world, there&apos;s a place for you here.
            </p>
            <p className="font-sans text-[#C9A86C] mt-6">
              ✨ Explore our free resources, group programs, and deeper collaborations — all rooted in authenticity and creative freedom.
            </p>
          </div>

          {/* Community Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {communityFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-4 bg-white/50 backdrop-blur-sm rounded-2xl text-center soft-glow hover:bg-white/70 transition-all"
              >
                <p className="font-sans text-sm text-[#3D3D3D]">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section id="offers" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-sans text-sm tracking-[0.3em] uppercase text-[#C9A86C] block mb-4">Offers</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-[#3D3D3D] mb-4">How we can help</h2>
            <p className="font-sans text-lg text-[#6B6B6B]">
              From free tools to deep collaboration ~ we&apos;ve got something for every level of support.
            </p>
            <p className="font-serif text-xl text-[#C9A86C] mt-2 italic">
              Where are you in your journey right now?
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer, index) => (
              <div
                key={index}
                className="p-8 bg-white/50 backdrop-blur-sm rounded-2xl soft-glow hover:bg-white/70 transition-all group"
              >
                <span className="text-4xl mb-4 block">{offer.icon}</span>
                <h3 className="font-serif text-xl mb-3 text-[#3D3D3D] group-hover:text-[#C9A86C] transition-colors">
                  {offer.title}
                </h3>
                <p className="font-sans text-[#6B6B6B] leading-relaxed">
                  {offer.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Elfina Section */}
      <section id="about" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto aspect-[4/5] rounded-3xl overflow-hidden soft-glow">
                <Image
                  src="/elfina-profile.jpg"
                  alt="Elfina Luk"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-6 flex justify-center">
                <Image
                  src="/accreditations.png"
                  alt="Accreditations"
                  width={300}
                  height={60}
                  className="opacity-80"
                />
              </div>
            </div>
            <div>
              <span className="font-sans text-sm tracking-[0.3em] uppercase text-[#C9A86C] block mb-4">About Elfina</span>
              <h2 className="font-serif text-3xl lg:text-4xl text-[#3D3D3D] mb-6">
                from self doubt to confident
              </h2>
              <div className="space-y-4 font-sans text-[#6B6B6B] leading-relaxed">
                <p>
                  Hi 👋 I&apos;m Elfina Luk, a professional actor and producer with over 20 years of experience in the entertainment industry. You might recognize me from &quot;The Good Doctor&quot; with Freddie Highmore or the Hollywood Blockbuster &quot;Skyscraper&quot; with Dwayne &quot;The Rock&quot; Johnson.
                </p>
                <p>
                  I am also a mentor → helping artists, creators, coaches, and professionals show up with confidence and clarity, on camera and in life.
                </p>
                <p>
                  I know what it&apos;s like to feel blocked by perfectionism, self-doubt, or fear of being seen. That used to be me, until I learned how to stop performing and start connecting. I realigned with my message, let go of overthinking, and finally showed up as myself.
                </p>
                <p className="font-serif text-lg text-[#C9A86C] italic">
                  Now I help others do the same.
                </p>
                <p>
                  With a background in both professional performance and subconscious healing, I offer a unique blend of mindset, voice, presence, and practical tools to support your entire journey — from message clarity, scripting &amp; delivery, to filming, lighting, editing and publishing with a strong automated backend system to support it.
                </p>
              </div>

              <div className="mt-8 p-6 bg-[#C9A86C]/10 rounded-2xl">
                <p className="font-sans text-[#3D3D3D] mb-4">If you&apos;re ready to:</p>
                <ul className="space-y-2 font-sans text-[#6B6B6B]">
                  <li>✔️ Overcome visibility blocks</li>
                  <li>✔️ Deliver your message with effortless confidence</li>
                  <li>✔️ Create content with ease and authenticity</li>
                </ul>
                <p className="font-serif text-lg text-[#C9A86C] mt-6 italic">
                  Let&apos;s uncover the version of you that&apos;s already ready and give your message the voice and presence it deserves.
                </p>
                <p className="font-sans text-[#6B6B6B] mt-4">
                  With love &amp; intention,<br />
                  <span className="font-script text-2xl text-[#C9A86C]">~ Elfina</span> 💖
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-sans text-sm tracking-[0.3em] uppercase text-[#C9A86C] block mb-4">real voices. real transformations.</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-[#3D3D3D]">from our members &amp; clients</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-white/50 backdrop-blur-sm rounded-2xl soft-glow"
              >
                <p className="font-sans text-[#6B6B6B] leading-relaxed mb-6 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A86C]/50 to-[#C5B4E3]/50 flex items-center justify-center">
                    <span className="font-serif text-sm text-white font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-[#3D3D3D]">{testimonial.name}</p>
                    <p className="font-sans text-xs text-[#6B6B6B]">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Podcast Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 soft-glow">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-square max-w-[300px] mx-auto rounded-2xl overflow-hidden">
                <Image
                  src="/podcast-cover.png"
                  alt="Authentically You Podcast"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-sans text-sm tracking-[0.3em] uppercase text-[#C9A86C] block mb-4">Podcast</span>
                <h2 className="font-serif text-3xl text-[#3D3D3D] mb-4">for those ready to go deeper</h2>
                <p className="font-sans text-[#6B6B6B] leading-relaxed mb-4">
                  These conversations go beneath the surface of what we explore in our calls, into the real, inner work behind camera confidence, creative flow, and self-trust.
                </p>
                <p className="font-sans text-[#6B6B6B] leading-relaxed mb-6">
                  Each episode is an invitation to slow down, reflect, and reconnect with the part of you that wants to be seen — not for performance, but for presence.
                </p>
                <a
                  href="https://www.youtube.com/@authentically_you"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-sans font-semibold bg-[#C9A86C] text-white px-8 py-3 rounded-full hover:bg-[#b8975b] transition-all"
                >
                  Listen on YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#C9A86C]/20 to-[#C5B4E3]/20 backdrop-blur-sm rounded-3xl p-12 md:p-16 soft-glow">
            <p className="font-sans text-sm tracking-[0.3em] uppercase text-[#C9A86C] mb-2">Join</p>
            <p className="font-serif text-5xl md:text-6xl text-[#C9A86C] mb-4">100+</p>
            <p className="font-serif text-2xl text-[#3D3D3D] mb-6">Creators</p>
            <p className="font-sans text-lg text-[#6B6B6B] mb-8 max-w-xl mx-auto">
              Stay up to date on everything happening inside Authentically You. Join the community ~ it&apos;s where all the new resources, updates, and confidence tools are shared first.
            </p>
            <a
              href="https://www.skool.com/authenticallyou/about"
              className="inline-block font-sans font-semibold bg-[#C9A86C] text-white px-12 py-4 rounded-full hover:bg-[#b8975b] transition-all text-lg soft-glow"
            >
              Join Now
            </a>
          </div>
        </div>
      </section>

      {/* Take the Quiz CTA */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-sans text-[#6B6B6B] mb-4">Not sure where to start?</p>
          <Link
            href="/quiz"
            className="inline-block font-sans font-semibold border-2 border-[#C9A86C] text-[#C9A86C] px-10 py-4 rounded-full hover:bg-[#C9A86C]/10 transition-all"
          >
            Take the Camera Confidence Quiz
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-[#3D3D3D]/10 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <Image
                src="/ay-logo.png"
                alt="Authentically You"
                width={40}
                height={40}
              />
              <span className="font-script text-2xl text-[#3D3D3D]">Authentically You</span>
            </div>
            <div className="flex gap-6 font-sans text-sm text-[#6B6B6B]">
              <a href="https://www.instagram.com/authentically__you__" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A86C] transition-colors">Instagram</a>
              <a href="https://www.youtube.com/@authentically_you" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A86C] transition-colors">YouTube</a>
              <a href="https://www.skool.com/authenticallyou/about" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A86C] transition-colors">Community</a>
              <Link href="/quiz" className="hover:text-[#C9A86C] transition-colors">Quiz</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#3D3D3D]/10 text-center">
            <p className="font-sans text-xs text-[#6B6B6B]/50">
              &copy; 2025 Authentically You fka Healing the Artist Within ~ a subsidiary of Moment to Moment Pictures Inc.
            </p>
            <p className="font-sans text-xs text-[#6B6B6B]/50 mt-1">
              All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
