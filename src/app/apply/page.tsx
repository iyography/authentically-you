"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  ChevronDown,
  Video,
  Mic,
  Palette,
  MessageSquare,
  Clock,
  Calendar,
  Heart,
  Star,
  X as XIcon,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────

type Step =
  | "qualifying"
  | "experience"
  | "challenge"
  | "goals"
  | "investment"
  | "commitment"
  | "contact"
  | "calendar"
  | "submitted"
  | "disqualified";

interface Answers {
  qualifying: string;
  experience: string;
  challenge: string[];
  goals: string;
  investment: string;
  commitment: string;
  name: string;
  email: string;
  phone: string;
}

const stepOrder: Step[] = [
  "qualifying",
  "experience",
  "challenge",
  "goals",
  "investment",
  "commitment",
  "contact",
  "calendar",
];

// ─── Main Component ──────────────────────────────────────────────────

export default function ApplyPage() {
  const [showLanding, setShowLanding] = useState(true);
  const [currentStep, setCurrentStep] = useState<Step>("qualifying");
  const [answers, setAnswers] = useState<Answers>({
    qualifying: "",
    experience: "",
    challenge: [],
    goals: "",
    investment: "",
    commitment: "",
    name: "",
    email: "",
    phone: "",
  });
  const [disqualifyReason, setDisqualifyReason] = useState("");
  const [lastStepBeforeDisqualify, setLastStepBeforeDisqualify] =
    useState<Step>("qualifying");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [calendlyLoading, setCalendlyLoading] = useState(true);
  const whatYouGetRef = useRef<HTMLDivElement>(null);

  const currentStepIndex = stepOrder.indexOf(currentStep);
  const totalSteps = stepOrder.length;
  const progress =
    currentStep === "disqualified" || currentStep === "submitted"
      ? 100
      : ((currentStepIndex + 1) / totalSteps) * 100;

  // Listen for Calendly booking events
  useEffect(() => {
    if (currentStep === "calendar") {
      setCalendlyLoading(true);
      const handleCalendlyEvent = (e: MessageEvent) => {
        if (e.data.event && e.data.event === "calendly.event_scheduled") {
          setCurrentStep("submitted");
        }
      };
      window.addEventListener("message", handleCalendlyEvent);
      return () => window.removeEventListener("message", handleCalendlyEvent);
    }
  }, [currentStep]);

  const handleSelect = (field: keyof Answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field: "challenge", value: string) => {
    setAnswers((prev) => {
      const current = prev[field] as string[];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter((v) => v !== value) };
      }
      return { ...prev, [field]: [...current, value] };
    });
  };

  const checkDisqualification = (
    step: Step,
    value: string
  ): string | null => {
    if (step === "qualifying" && value === "Just curious, not ready yet") {
      return "In the Studio is for creators who are ready to commit. We recommend starting with our free community or Premium tier ($28/month) to build your foundation first.";
    }
    if (step === "experience" && value === "I haven't started yet") {
      return "In the Studio works best for creators who have some experience. We recommend joining our Premium ($28/month) or VIP ($98/month) tier first to build your confidence foundation.";
    }
    if (step === "investment" && value === "Under $200/month") {
      return "In the Studio is $898/month. We recommend our VIP tier ($98/month) which offers amazing value for building your confidence and presence.";
    }
    return null;
  };

  const handleNext = async () => {
    if (currentStep === "contact") {
      if (!answers.name || !answers.email) return;
      setIsSubmitting(true);
      try {
        await fetch("/api/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(answers),
        });
        setApplicationSubmitted(true);
      } catch {
        // Still proceed even if API fails
      }
      setIsSubmitting(false);
      setCurrentStep("calendar");
      return;
    }

    const currentField = currentStep as keyof Answers;
    const currentValue = answers[currentField];
    if (
      !currentValue ||
      (Array.isArray(currentValue) && currentValue.length === 0)
    )
      return;

    const disqualifyMessage = checkDisqualification(
      currentStep,
      typeof currentValue === "string" ? currentValue : ""
    );
    if (disqualifyMessage) {
      setLastStepBeforeDisqualify(currentStep);
      setDisqualifyReason(disqualifyMessage);
      setCurrentStep("disqualified");
      return;
    }

    const nextIndex = currentStepIndex + 1;
    if (nextIndex < stepOrder.length) {
      setCurrentStep(stepOrder[nextIndex]);
    }
  };

  const handlePrev = () => {
    if (currentStep === "disqualified") {
      setCurrentStep(lastStepBeforeDisqualify);
      return;
    }
    if (currentStepIndex === 0) {
      setShowLanding(true);
      return;
    }
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(stepOrder[prevIndex]);
    }
  };

  const canProceed = () => {
    if (currentStep === "contact") {
      return answers.name.trim() !== "" && answers.email.trim() !== "";
    }
    if (currentStep === "challenge") {
      return answers.challenge.length > 0;
    }
    const field = currentStep as keyof Answers;
    const value = answers[field];
    return typeof value === "string" ? value.trim() !== "" : false;
  };

  // ─── Landing Page ────────────────────────────────────────────────

  if (showLanding) {
    return (
      <div className="calm-gradient-radial min-h-screen text-[#3D3D3D]">
        {/* Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 bg-[#FFF8F0]/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <a
              href="/"
              className="font-script text-2xl md:text-3xl text-[#3D3D3D]"
            >
              Authentically You
            </a>
            <nav className="flex items-center gap-3 md:gap-5">
              <a
                href="https://www.skool.com/authenticallyou/about"
                className="hidden md:inline font-sans text-xs md:text-sm text-[#6B6B6B] hover:text-[#C9A86C] transition-colors"
              >
                Join the Community
              </a>
              <button
                onClick={() => {
                  setShowLanding(false);
                  window.scrollTo(0, 0);
                }}
                className="font-sans text-xs md:text-sm font-semibold bg-[#C9A86C] text-white px-5 py-2.5 rounded-full hover:bg-[#b8975b] transition-all"
              >
                Apply Now
              </button>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A86C]/10 border border-[#C9A86C]/20 mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4 text-[#C9A86C]" />
                <span className="text-[#C9A86C] text-sm font-sans font-medium">
                  Limited Spots Available
                </span>
              </motion.div>

              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6 text-[#3D3D3D] leading-tight">
                Transform Your{" "}
                <span className="text-[#C9A86C]">Camera Presence</span>
              </h1>

              <p className="font-sans text-lg md:text-xl text-[#6B6B6B] max-w-2xl mx-auto mb-4 leading-relaxed">
                1-on-1 coaching with Elfina for creators ready to show up
                authentically, build their brand, and grow their business
                through video.
              </p>

              <p className="font-serif text-xl md:text-2xl text-[#3D3D3D] font-medium mb-10">
                This isn&apos;t a course. This is a transformation.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <motion.button
                  onClick={() => {
                    setShowLanding(false);
                    window.scrollTo(0, 0);
                  }}
                  className="flex items-center gap-3 font-sans font-semibold text-lg px-10 py-5 bg-[#C9A86C] text-white rounded-full hover:bg-[#b8975b] transition-all soft-glow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Sparkles className="w-5 h-5" />
                  Apply to Work with Me
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <motion.button
                  onClick={() =>
                    whatYouGetRef.current?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="flex items-center gap-2 font-sans text-lg text-[#6B6B6B] px-8 py-4 border border-[#3D3D3D]/15 rounded-full hover:bg-white/50 transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  See What&apos;s Included
                  <ChevronDown className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-[#3D3D3D]/20 rounded-full flex justify-center">
              <motion.div
                className="w-1.5 h-3 bg-[#C9A86C] rounded-full mt-2"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </section>

        {/* The Reality Section */}
        <section className="py-24 px-6 bg-white/30">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-5xl text-[#3D3D3D] mb-4">
                Here&apos;s What&apos;s Holding You Back
              </h2>
              <p className="font-sans text-lg text-[#6B6B6B] max-w-2xl mx-auto">
                Most creators struggle because they&apos;re missing one of three
                things:
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: Video,
                  title: "Camera Fear",
                  description:
                    "You know you need to show up on video, but anxiety stops you every time you hit record",
                  color: "#E8B4B8",
                },
                {
                  icon: Clock,
                  title: "Inconsistency",
                  description:
                    "You post when inspiration hits, but can't maintain the consistency needed to build a brand",
                  color: "#C5B4E3",
                },
                {
                  icon: Palette,
                  title: "No Direction",
                  description:
                    "You don't know what to create, how to present yourself, or how to stand out authentically",
                  color: "#C9A86C",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#3D3D3D]/5 hover:border-[#C9A86C]/30 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <item.icon
                    className="w-10 h-10 mb-4"
                    style={{ color: item.color }}
                  />
                  <h3 className="font-serif text-xl text-[#3D3D3D] mb-3">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[#6B6B6B]">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.p
              className="text-center font-serif text-2xl text-[#C9A86C]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              In the Studio, we transform all three.
            </motion.p>
          </div>
        </section>

        {/* What You Get Section */}
        <section ref={whatYouGetRef} className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-5xl text-[#3D3D3D] mb-4">
                What&apos;s Included
              </h2>
              <p className="font-sans text-lg text-[#6B6B6B]">
                Everything you need to become the creator you&apos;re meant to
                be.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  icon: Video,
                  title: "Weekly 1-on-1 Sessions with Elfina",
                  description:
                    "Personalized coaching calls tailored to your goals, challenges, and growth pace",
                },
                {
                  icon: Palette,
                  title: "Custom Content Strategy",
                  description:
                    "A content roadmap built specifically for your brand, audience, and style",
                },
                {
                  icon: Star,
                  title: "Brand & Presence Development",
                  description:
                    "Discover your authentic voice, refine your visual identity, and own your presence",
                },
                {
                  icon: MessageSquare,
                  title: "Direct Access via DM",
                  description:
                    "Get real-time feedback, quick answers, and support between sessions",
                },
                {
                  icon: Mic,
                  title: "Done-With-You Video Coaching",
                  description:
                    "Live practice sessions where we record, review, and refine together",
                },
                {
                  icon: Heart,
                  title: "Business Growth Integration",
                  description:
                    "Connect your confidence to real results — clients, audience, and revenue",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-[#3D3D3D]/5"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#C9A86C]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-[#C9A86C]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#3D3D3D] mb-1">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm text-[#6B6B6B]">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bonuses */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: MessageSquare,
                  title: "Direct DM Access",
                  description:
                    "Personal access for questions, feedback, and quick wins between sessions",
                  color: "#C9A86C",
                },
                {
                  icon: Clock,
                  title: "Limited Spots",
                  description:
                    "Elfina takes limited 1-on-1 clients to ensure deep, quality coaching",
                  color: "#E8B4B8",
                },
                {
                  icon: Sparkles,
                  title: "Community Access",
                  description:
                    "Full VIP access to the Authentically You community included",
                  color: "#C5B4E3",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="p-6 rounded-xl bg-white/40 border border-[#3D3D3D]/5 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <item.icon
                    className="w-8 h-8 mx-auto mb-3"
                    style={{ color: item.color }}
                  />
                  <h4 className="font-serif text-base text-[#3D3D3D] mb-2">
                    {item.title}
                  </h4>
                  <p className="font-sans text-sm text-[#6B6B6B]">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Growth Timeline */}
        <section className="py-24 px-6 bg-white/30">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              className="font-serif text-3xl md:text-4xl text-[#3D3D3D] text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Your Transformation Timeline
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  month: "Month 1-2",
                  title: "Foundation",
                  items: [
                    "Deep-dive assessment of your strengths",
                    "Overcome camera anxiety triggers",
                    "Develop your authentic on-camera style",
                    "Create your first confident content",
                  ],
                },
                {
                  month: "Month 3-4",
                  title: "Building",
                  items: [
                    "Consistent weekly video creation",
                    "Refine your personal brand voice",
                    "Build a content system that works",
                    "Start attracting your ideal audience",
                  ],
                },
                {
                  month: "Month 5-6",
                  title: "Mastery",
                  items: [
                    "Confidently show up on camera every day",
                    "Lead with authenticity and authority",
                    "Grow your business through video",
                    "Become the creator you envisioned",
                  ],
                },
              ].map((phase, i) => (
                <motion.div
                  key={i}
                  className="p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-[#C9A86C]/10"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#C9A86C]/10 text-[#C9A86C] text-sm font-sans font-semibold">
                      {phase.month}
                    </span>
                    <h4 className="font-serif text-xl text-[#3D3D3D]">
                      {phase.title}
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {phase.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 font-sans text-sm text-[#6B6B6B]"
                      >
                        <Check className="w-4 h-4 text-[#C9A86C] flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="p-4 rounded-xl bg-[#C9A86C]/10 border border-[#C9A86C]/20 text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-serif text-lg text-[#C9A86C]">
                Goal: Show up with full confidence in 6 months
              </p>
            </motion.div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              className="font-serif text-3xl md:text-5xl text-[#3D3D3D] text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Is This For You?
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* For You */}
              <motion.div
                className="p-8 rounded-2xl bg-[#C9A86C]/5 border border-[#C9A86C]/20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="font-serif text-xl text-[#C9A86C] mb-6">
                  This Is For You If:
                </h3>
                <div className="space-y-4">
                  {[
                    "You're already creating (or want to start seriously)",
                    "You're ready to invest in your transformation",
                    "You value authenticity over perfection",
                    "You want personalized guidance, not generic advice",
                    "You're willing to do the work between sessions",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#C9A86C] flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-[#3D3D3D]">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Not For You */}
              <motion.div
                className="p-8 rounded-2xl bg-[#E8B4B8]/5 border border-[#E8B4B8]/20"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="font-serif text-xl text-[#E8B4B8] mb-6">
                  This Is NOT For You If:
                </h3>
                <div className="space-y-4">
                  {[
                    "You're looking for a quick fix or overnight results",
                    "You're not willing to show up on camera at all",
                    "You want someone to do everything for you",
                    "You're just browsing without intent to commit",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <XIcon className="w-5 h-5 text-[#E8B4B8] flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-[#3D3D3D]">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* The Process */}
        <section className="py-24 px-6 bg-white/30">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              className="font-serif text-3xl md:text-5xl text-[#3D3D3D] text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              The Process
            </motion.h2>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: 1,
                  title: "Apply",
                  description:
                    "Fill out a short application so Elfina can understand your goals",
                },
                {
                  step: 2,
                  title: "Book a Call",
                  description:
                    "Schedule a complimentary call to see if we're the right fit",
                },
                {
                  step: 3,
                  title: "Welcome",
                  description:
                    "If accepted, onboarding begins within 48 hours",
                },
                {
                  step: 4,
                  title: "Transform",
                  description:
                    "Weekly sessions, ongoing support, and real results",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-14 h-14 rounded-full bg-[#C9A86C] text-white font-serif text-2xl flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-serif text-lg text-[#3D3D3D] mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-[#6B6B6B]">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Investment */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-5xl text-[#3D3D3D] mb-4">
                Investment
              </h2>
              <p className="font-sans text-lg text-[#6B6B6B] mb-12">
                An investment in yourself that pays for itself.
              </p>
            </motion.div>

            <motion.div
              className="p-10 rounded-3xl bg-white/60 backdrop-blur-sm border-2 border-[#C9A86C]/30 soft-glow text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-sans text-sm tracking-[0.2em] uppercase text-[#C9A86C] block mb-2">
                In the Studio with Elfina
              </span>
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span className="font-serif text-6xl font-bold text-[#C9A86C]">
                  $898
                </span>
                <span className="font-sans text-[#6B6B6B]">/month</span>
              </div>
              <p className="font-sans text-[#6B6B6B] mb-8 max-w-md mx-auto">
                Weekly 1-on-1 sessions, direct DM access, custom content
                strategy, brand development, and everything you need to
                transform your presence.
              </p>

              <ul className="text-left max-w-sm mx-auto space-y-3 mb-10">
                {[
                  "Weekly 1-on-1 sessions with Elfina",
                  "Custom content strategy",
                  "Brand & presence development",
                  "Direct DM access",
                  "Done-with-you video coaching",
                  "Business growth integration",
                  "Full VIP community access included",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 font-sans text-sm text-[#6B6B6B]"
                  >
                    <Check className="w-4 h-4 text-[#C9A86C] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <motion.button
                onClick={() => {
                  setShowLanding(false);
                  window.scrollTo(0, 0);
                }}
                className="font-sans font-semibold text-lg bg-[#C9A86C] text-white px-12 py-5 rounded-full hover:bg-[#b8975b] transition-all soft-glow inline-flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-5 h-5" />
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

            <motion.p
              className="text-center font-sans text-sm text-[#6B6B6B] mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Limited spots available. Elfina personally reviews every
              application.
            </motion.p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 bg-white/30">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-5xl text-[#3D3D3D] mb-6">
                Ready to Show Up Authentically?
              </h2>
              <p className="font-sans text-lg text-[#6B6B6B] mb-10">
                If you&apos;re serious about transforming your camera presence
                and building something real, let&apos;s talk.
              </p>

              <motion.button
                onClick={() => {
                  setShowLanding(false);
                  window.scrollTo(0, 0);
                }}
                className="font-sans font-semibold text-xl bg-[#C9A86C] text-white px-14 py-6 rounded-full hover:bg-[#b8975b] transition-all soft-glow inline-flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-6 h-6" />
                Apply to Work with Me
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-[#3D3D3D]/5">
          <p className="text-center font-sans text-sm text-[#6B6B6B]">
            &copy; {new Date().getFullYear()} Authentically You. All rights
            reserved.
          </p>
        </footer>
      </div>
    );
  }

  // ─── Application Form ──────────────────────────────────────────────

  // Single-select option card
  const OptionCard = ({
    label,
    selected,
    onClick,
  }: {
    label: string;
    selected: boolean;
    onClick: () => void;
  }) => (
    <motion.button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all font-sans ${
        selected
          ? "border-[#C9A86C] bg-[#C9A86C]/10 text-[#3D3D3D]"
          : "border-[#3D3D3D]/10 bg-white/50 text-[#6B6B6B] hover:border-[#C9A86C]/40 hover:bg-white/80"
      }`}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            selected ? "border-[#C9A86C] bg-[#C9A86C]" : "border-[#3D3D3D]/20"
          }`}
        >
          {selected && <Check className="w-3 h-3 text-white" />}
        </div>
        {label}
      </div>
    </motion.button>
  );

  // Multi-select option card
  const MultiOptionCard = ({
    label,
    selected,
    onClick,
  }: {
    label: string;
    selected: boolean;
    onClick: () => void;
  }) => (
    <motion.button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all font-sans ${
        selected
          ? "border-[#C5B4E3] bg-[#C5B4E3]/10 text-[#3D3D3D]"
          : "border-[#3D3D3D]/10 bg-white/50 text-[#6B6B6B] hover:border-[#C5B4E3]/40 hover:bg-white/80"
      }`}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
            selected
              ? "border-[#C5B4E3] bg-[#C5B4E3]"
              : "border-[#3D3D3D]/20"
          }`}
        >
          {selected && <Check className="w-3 h-3 text-white" />}
        </div>
        {label}
      </div>
    </motion.button>
  );

  const steps: Record<
    string,
    {
      question: string;
      subtitle?: string;
      options?: string[];
      multi?: boolean;
    }
  > = {
    qualifying: {
      question: "Where are you in your journey?",
      subtitle: "This helps us understand if In the Studio is the right fit.",
      options: [
        "I'm already creating content and want to level up",
        "I have a business/brand and need camera confidence",
        "I'm a coach or creator ready to scale with video",
        "Just curious, not ready yet",
      ],
    },
    experience: {
      question: "What's your experience with video content?",
      options: [
        "I haven't started yet",
        "I post occasionally but want to be more consistent",
        "I post regularly but want to improve quality and confidence",
        "I'm experienced but want personalized coaching",
      ],
    },
    challenge: {
      question: "What are your biggest challenges?",
      subtitle: "Select all that apply.",
      options: [
        "Fear of being on camera",
        "Lack of confidence in my presence",
        "Not sure what content to create",
        "Inconsistency in posting",
        "Want to build a personal brand",
        "Need help with business growth through video",
        "Feeling inauthentic or performative",
        "Want to become a better communicator",
      ],
      multi: true,
    },
    goals: {
      question: "What would success look like for you in 6 months?",
      options: [
        "Confidently showing up on camera every week",
        "Building a personal brand that attracts opportunities",
        "Growing my business through authentic video content",
        "Becoming a thought leader in my space",
        "Overcoming camera anxiety and finding my voice",
      ],
    },
    investment: {
      question: "What are you willing to invest in your growth?",
      subtitle: "In the Studio with Elfina is $898/month.",
      options: [
        "Under $200/month",
        "$200-$500/month",
        "$500-$1,000/month",
        "$1,000+/month",
      ],
    },
    commitment: {
      question: "How committed are you to this transformation?",
      options: [
        "I'm all in — ready to do the work",
        "Very committed — I just need the right guide",
        "Interested but want to learn more first",
        "Exploring options",
      ],
    },
  };

  const renderStep = () => {
    // Calendar step
    if (currentStep === "calendar") {
      return (
        <motion.div
          key="calendar"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-[#C9A86C] rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-white" />
            </div>
            <h2 className="font-serif text-2xl text-[#3D3D3D] mb-1">
              Application Submitted!
            </h2>
            <p className="font-sans text-sm text-[#6B6B6B] mb-2">
              Schedule a complimentary call to complete your application.
            </p>
            <p className="font-sans text-xs text-[#6B6B6B]">
              Elfina only takes limited clients. If you&apos;re serious, book
              your call below.
            </p>
          </div>

          {/* Calendly Embed — Replace URL with Elfina's Calendly link */}
          <div
            className="relative rounded-xl overflow-hidden bg-white"
            style={{ minHeight: "580px" }}
          >
            {calendlyLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
                <motion.div
                  className="w-10 h-10 border-4 border-[#C9A86C] border-t-transparent rounded-full mb-3"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <p className="font-sans text-sm text-[#6B6B6B]">
                  Loading calendar...
                </p>
              </div>
            )}
            <iframe
              src="https://calendly.com/elfina/discovery?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=C9A86C"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Schedule a call with Elfina"
              style={{ border: "none", minHeight: "580px" }}
              onLoad={() => {
                setTimeout(() => setCalendlyLoading(false), 1200);
              }}
            />
          </div>

          <button
            onClick={() => setCurrentStep("submitted")}
            className="w-full text-center mt-4 font-sans text-sm text-[#6B6B6B] hover:text-[#3D3D3D] underline transition-colors"
          >
            Skip for now
          </button>
        </motion.div>
      );
    }

    // Submitted confirmation
    if (currentStep === "submitted") {
      return (
        <motion.div
          key="submitted"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-[#C9A86C] rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="font-serif text-3xl text-[#3D3D3D] mb-4">
            Application Received
          </h2>
          <p className="font-sans text-lg text-[#6B6B6B] mb-6 max-w-md mx-auto">
            Thank you, {answers.name}. Elfina will personally review your
            application and reach out within 48 hours.
          </p>
          <div className="bg-[#C9A86C]/10 rounded-2xl p-6 max-w-md mx-auto mb-8">
            <p className="font-sans text-[#6B6B6B] text-sm">
              In the meantime, join the free community to connect with other
              creators on the same journey.
            </p>
          </div>
          <a
            href="https://www.skool.com/authenticallyou/about"
            className="font-sans font-semibold bg-[#C9A86C] text-white px-10 py-4 rounded-full hover:bg-[#b8975b] transition-all inline-block"
          >
            Join the Community
          </a>
        </motion.div>
      );
    }

    // Disqualified
    if (currentStep === "disqualified") {
      return (
        <motion.div
          key="disqualified"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-[#C5B4E3] rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-serif text-2xl text-[#3D3D3D] mb-4">
            We Have Something Better for You
          </h2>
          <p className="font-sans text-[#6B6B6B] mb-8 max-w-md mx-auto">
            {disqualifyReason}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.skool.com/authenticallyou/about"
              className="font-sans font-semibold bg-[#C9A86C] text-white px-8 py-3 rounded-full hover:bg-[#b8975b] transition-all"
            >
              Explore Other Plans
            </a>
            <button
              onClick={handlePrev}
              className="font-sans font-semibold border-2 border-[#C9A86C] text-[#C9A86C] px-8 py-3 rounded-full hover:bg-[#C9A86C]/10 transition-all"
            >
              Go Back
            </button>
          </div>
        </motion.div>
      );
    }

    // Contact form
    if (currentStep === "contact") {
      return (
        <motion.div
          key="contact"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="font-serif text-2xl md:text-3xl text-[#3D3D3D] mb-2">
            Almost there
          </h2>
          <p className="font-sans text-[#6B6B6B] mb-6">
            Share your details so Elfina can personally review your application.
          </p>
          <div className="space-y-4">
            <div>
              <label className="font-sans text-sm text-[#3D3D3D] block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={answers.name}
                onChange={(e) => handleSelect("name", e.target.value)}
                className="w-full bg-white/80 border border-[#3D3D3D]/10 rounded-xl px-4 py-3 font-sans text-[#3D3D3D] placeholder-[#6B6B6B]/50 focus:outline-none focus:border-[#C9A86C] transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="font-sans text-sm text-[#3D3D3D] block mb-1">
                Email *
              </label>
              <input
                type="email"
                value={answers.email}
                onChange={(e) => handleSelect("email", e.target.value)}
                className="w-full bg-white/80 border border-[#3D3D3D]/10 rounded-xl px-4 py-3 font-sans text-[#3D3D3D] placeholder-[#6B6B6B]/50 focus:outline-none focus:border-[#C9A86C] transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="font-sans text-sm text-[#3D3D3D] block mb-1">
                Phone (optional)
              </label>
              <input
                type="tel"
                value={answers.phone}
                onChange={(e) => handleSelect("phone", e.target.value)}
                className="w-full bg-white/80 border border-[#3D3D3D]/10 rounded-xl px-4 py-3 font-sans text-[#3D3D3D] placeholder-[#6B6B6B]/50 focus:outline-none focus:border-[#C9A86C] transition-colors"
                placeholder="(555) 555-5555"
              />
            </div>
          </div>
        </motion.div>
      );
    }

    // Regular question steps
    const step = steps[currentStep];
    if (!step) return null;

    return (
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="font-serif text-2xl md:text-3xl text-[#3D3D3D] mb-2">
          {step.question}
        </h2>
        {step.subtitle && (
          <p className="font-sans text-[#6B6B6B] mb-6">{step.subtitle}</p>
        )}
        {!step.subtitle && <div className="mb-6" />}

        {step.options && !step.multi && (
          <div className="space-y-3">
            {step.options.map((option) => (
              <OptionCard
                key={option}
                label={option}
                selected={answers[currentStep as keyof Answers] === option}
                onClick={() =>
                  handleSelect(currentStep as keyof Answers, option)
                }
              />
            ))}
          </div>
        )}

        {step.options && step.multi && (
          <div className="space-y-3">
            {step.options.map((option) => (
              <MultiOptionCard
                key={option}
                label={option}
                selected={answers.challenge.includes(option)}
                onClick={() => handleMultiSelect("challenge", option)}
              />
            ))}
          </div>
        )}
      </motion.div>
    );
  };

  const showNav =
    currentStep !== "submitted" &&
    currentStep !== "disqualified" &&
    currentStep !== "calendar";

  return (
    <div className="calm-gradient-radial min-h-screen text-[#3D3D3D] relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 bg-[#FFF8F0]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="/"
            className="font-script text-2xl md:text-3xl text-[#3D3D3D]"
          >
            Authentically You
          </a>
          {showNav && (
            <span className="font-sans text-sm text-[#6B6B6B]">
              Step {currentStepIndex + 1} of {totalSteps}
            </span>
          )}
        </div>
      </header>

      {/* Progress bar */}
      {showNav && (
        <div className="fixed top-16 left-0 right-0 z-40 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="h-1 bg-[#3D3D3D]/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#C9A86C]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center px-6 py-24">
        <div
          className={`mx-auto w-full ${currentStep === "calendar" ? "max-w-xl" : "max-w-xl"}`}
        >
          {/* Hero on first step */}
          {currentStep === "qualifying" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <span className="font-sans text-sm tracking-[0.2em] uppercase text-[#C9A86C] block mb-3">
                Apply to Work with Elfina
              </span>
              <h1 className="font-serif text-3xl md:text-4xl text-[#3D3D3D] mb-3">
                In the Studio
              </h1>
              <p className="font-sans text-[#6B6B6B] max-w-md mx-auto">
                1-on-1 coaching for creators ready to transform their
                confidence, presence, and impact on camera.
              </p>
            </motion.div>
          )}

          <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 md:p-10 soft-glow">
            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

            {/* Navigation */}
            {showNav && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#3D3D3D]/10">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-2 font-sans text-[#6B6B6B] hover:text-[#3D3D3D] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <motion.button
                  onClick={handleNext}
                  disabled={!canProceed() || isSubmitting}
                  className={`flex items-center gap-2 font-sans font-semibold px-8 py-3 rounded-full transition-all ${
                    canProceed() && !isSubmitting
                      ? "bg-[#C9A86C] text-white hover:bg-[#b8975b] soft-glow"
                      : "bg-[#3D3D3D]/10 text-[#3D3D3D]/30 cursor-not-allowed"
                  }`}
                  whileTap={canProceed() ? { scale: 0.98 } : undefined}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : currentStep === "contact"
                      ? "Submit Application"
                      : "Continue"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
