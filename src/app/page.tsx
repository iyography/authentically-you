"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";

// Pre-generated particle positions for performance (no state updates)
const PARTICLES = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  left: `${(i * 2.1) % 100}%`,
  delay: `${(i * 0.4) % 12}s`,
  size: `${1 + (i % 3)}px`,
}));

const SPARKLES = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: `${(i * 7.3) % 100}%`,
  top: `${(i * 11.7) % 100}%`,
  delay: `${(i * 0.3) % 2}s`,
}));

// Floating particles - pure CSS animation, no re-renders
function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[100]">
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
      <div className="aurora-layer fixed inset-0 z-[2]" />
      {/* Soft floating light orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[3]">
        <div
          className="floating-light w-[600px] h-[600px] bg-[#C5B4E3]/30"
          style={{ top: "5%", left: "-5%", animation: "auroraWave1 40s ease-in-out infinite" }}
        />
        <div
          className="floating-light w-[500px] h-[500px] bg-[#B4D4E3]/25"
          style={{ top: "50%", right: "-10%", animation: "auroraWave2 35s ease-in-out infinite" }}
        />
        <div
          className="floating-light w-[550px] h-[550px] bg-[#E3B4D4]/20"
          style={{ bottom: "10%", left: "20%", animation: "auroraWave3 45s ease-in-out infinite" }}
        />
        <div
          className="floating-light w-[450px] h-[450px] bg-[#E8D5B5]/25"
          style={{ top: "30%", left: "50%", animation: "auroraWave1 50s ease-in-out infinite reverse" }}
        />
      </div>
    </>
  );
}

interface Question {
  id: number;
  question: string;
  options: string[];
  multiSelect?: boolean;
  category: "primary" | "style" | "content";
}

interface QuizSection {
  title: string;
  description: string;
  questions: Question[];
}

const quizData: QuizSection[] = [
  {
    title: "Baseline & Context",
    description: "Let's understand where you are right now",
    questions: [
      {
        id: 1,
        question: "How often do you currently record video of yourself?",
        options: ["Rarely or never", "Occasionally", "Weekly", "Multiple times per week", "Daily"],
        category: "primary",
      },
      {
        id: 2,
        question: "Where do you usually show up on video (if at all)?",
        options: ["I don't post yet", "Stories only", "Short-form (Reels / TikTok)", "Long-form (YouTube / Lives)", "Multiple platforms"],
        category: "primary",
      },
      {
        id: 3,
        question: "How long have you been trying to show up on camera?",
        options: ["Just starting", "A few months", "6–12 months", "1–2 years", "2+ years"],
        category: "primary",
      },
      {
        id: 4,
        question: "When you think about recording today, you feel:",
        options: ["Avoidant", "Nervous", "Neutral", "Calm", "Excited"],
        category: "primary",
      },
    ],
  },
  {
    title: "Output & Behavior",
    description: "What actually happens when you try",
    questions: [
      {
        id: 5,
        question: "How many videos do you actually publish per week?",
        options: ["0", "1", "2–3", "4–5", "Daily"],
        category: "primary",
      },
      {
        id: 6,
        question: "On average, how many takes does one video require before you're \"okay\" posting it?",
        options: ["I don't usually post", "10+ takes", "5–9 takes", "2–4 takes", "1 take"],
        category: "primary",
      },
      {
        id: 7,
        question: "How long does one short video usually take from start to finish?",
        options: ["I don't usually finish", "30–60 minutes", "20–30 minutes", "10–15 minutes", "Under 10 minutes"],
        category: "primary",
      },
      {
        id: 8,
        question: "What happens most often after you hit record?",
        options: ["I stop and restart constantly", "I overthink every sentence", "I push through but feel stiff", "I stay mostly present", "I forget the camera is there"],
        category: "primary",
      },
    ],
  },
  {
    title: "Inner Experience",
    description: "Presence vs performance",
    questions: [
      {
        id: 9,
        question: "Watching your videos back usually feels:",
        options: ["Cringey", "Uncomfortable", "Neutral", "Encouraging", "Grounded"],
        category: "primary",
      },
      {
        id: 10,
        question: "Do you feel like you're performing on camera?",
        options: ["Always", "Often", "Sometimes", "Rarely", "Never"],
        category: "primary",
      },
      {
        id: 11,
        question: "How connected do you feel to yourself on camera?",
        options: ["Disconnected", "Slightly disconnected", "Somewhat present", "Mostly present", "Fully embodied"],
        category: "primary",
      },
      {
        id: 12,
        question: "When you make a mistake on camera, you usually:",
        options: ["Stop immediately", "Spiral internally", "Push through awkwardly", "Laugh and continue", "Barely notice"],
        category: "primary",
      },
      {
        id: 13,
        question: "Which thought shows up most while recording?",
        options: ["\"I look / sound bad.\"", "\"This isn't good enough.\"", "\"I hope this makes sense.\"", "\"This will help someone.\"", "\"I trust myself.\""],
        category: "primary",
      },
    ],
  },
  {
    title: "Style Awareness",
    description: "Exploring what feels natural for you",
    questions: [
      {
        id: 14,
        question: "When filming feels the least intimidating, you imagine yourself:",
        options: ["Talking directly to the camera", "Walking and talking", "Sitting and explaining something", "Being asked questions", "Showing what you're doing instead of talking"],
        category: "style",
      },
      {
        id: 15,
        question: "Which option feels most supportive right now?",
        options: ["Knowing exactly what I'll say", "Having bullet points", "Having a loose idea and flowing", "Discovering it as I speak", "I honestly don't know yet"],
        category: "style",
      },
      {
        id: 16,
        question: "Your body feels safest on camera when you are:",
        options: ["Sitting still", "Standing and presenting", "Moving (walking, pacing, gesturing)", "Doing something with your hands", "I haven't found this yet"],
        category: "style",
      },
      {
        id: 17,
        question: "What feels more natural for you?",
        options: ["Teaching or explaining", "Sharing personal reflections", "Having a conversation", "Responding to questions or ideas", "I'm still figuring this out"],
        category: "style",
      },
      {
        id: 18,
        question: "Which type of video feels the most uncomfortable right now?",
        options: ["Scripted videos", "Talking head videos", "Being seen on camera at all", "Longform videos", "Letting myself ramble"],
        category: "style",
      },
    ],
  },
  {
    title: "Consistency & Identity",
    description: "Plateau vs expansion signals",
    questions: [
      {
        id: 19,
        question: "Showing up on camera currently feels like:",
        options: ["A threat", "A chore", "A practice", "A tool", "Self-expression"],
        category: "primary",
      },
      {
        id: 20,
        question: "How consistent are you really with video?",
        options: ["Not consistent", "On and off", "Fairly consistent", "Very consistent", "It's part of who I am"],
        category: "primary",
      },
      {
        id: 21,
        question: "Which sounds most like your current situation?",
        options: ["I'm avoiding camera altogether", "I'm trying but stuck", "I'm improving but inconsistent", "I'm confident but refining", "I'm ready to lead"],
        category: "primary",
      },
      {
        id: 22,
        question: "What's your biggest fear about showing up on camera?",
        options: ["I'll be judged", "I'll sound stupid", "I'll never feel natural", "I won't make an impact", "I'll outgrow my current level"],
        category: "primary",
      },
      {
        id: 23,
        question: "If nothing changed, what worries you most?",
        options: ["I'll never start", "I'll stay stuck", "I'll plateau", "I'll blend in", "I'll waste my potential"],
        category: "primary",
      },
    ],
  },
  {
    title: "Desire & Support",
    description: "Understanding what would help you most",
    questions: [
      {
        id: 24,
        question: "What would help you most right now?",
        options: ["Confidence to start", "Consistency", "Presence & authenticity", "Refinement", "Leadership"],
        multiSelect: true,
        category: "primary",
      },
      {
        id: 25,
        question: "How do you prefer to get unstuck?",
        options: ["Give me resources", "Some guidance + feedback", "Someone alongside me", "Personalized mentorship"],
        category: "primary",
      },
      {
        id: 26,
        question: "Right now, what are you most drawn to creating?",
        options: ["A simple intro or welcome video", "Short-form videos (reels / shorts)", "Longer conversations or teaching", "Educational or course-style content", "I'm not sure yet"],
        category: "content",
      },
      {
        id: 27,
        question: "Which feels most true right now?",
        options: ["\"I want to show up but I'm scared.\"", "\"I'm figuring it out.\"", "\"I'm close.\"", "\"I'm confident.\"", "\"I'm ready for mastery.\""],
        category: "primary",
      },
    ],
  },
];

const allQuestions = quizData.flatMap((section) => section.questions);

// Calculate confidence zone based on answers
function calculateResults(answers: Record<number, string[]>) {
  let score = 0;
  const maxScore = 18 * 5; // 18 primary questions, max 5 points each (index 4)

  // Score primary questions (higher index = more confident)
  const primaryQuestions = allQuestions.filter(q => q.category === "primary");

  primaryQuestions.forEach(q => {
    const answer = answers[q.id]?.[0];
    if (answer) {
      const index = q.options.indexOf(answer);
      if (index !== -1) {
        score += index + 1;
      }
    }
  });

  const percentage = (score / maxScore) * 100;

  if (percentage <= 25) {
    return {
      zone: "Starting Zone",
      headline: "You're at the beginning of your journey",
      description: "You want to show up but something holds you back. The camera feels unfamiliar, maybe even unsafe. That's okay—everyone starts here.",
      patterns: [
        "You may avoid recording altogether",
        "When you do record, you restart constantly",
        "Watching yourself back feels uncomfortable",
        "Fear of judgment is your biggest barrier"
      ],
      support: "You need a safe space to begin. Not more tactics—permission to start imperfectly.",
    };
  } else if (percentage <= 45) {
    return {
      zone: "Building Zone",
      headline: "You're figuring it out",
      description: "You've started showing up, but consistency is a struggle. You know what you want to say but something gets lost between intention and recording.",
      patterns: [
        "You record, but posting feels hard",
        "Multiple takes are normal",
        "You feel like you're performing, not connecting",
        "Progress happens, then stalls"
      ],
      support: "You need systems and support to stay consistent. Guidance that helps you find your voice, not copy someone else's.",
    };
  } else if (percentage <= 65) {
    return {
      zone: "Growing Zone",
      headline: "You're close",
      description: "You're showing up more regularly and it's getting easier. But there are still moments where you feel disconnected or stuck in your own way.",
      patterns: [
        "You post, but not as often as you'd like",
        "Some videos feel great, others don't",
        "You're refining your style",
        "Confidence comes and goes"
      ],
      support: "You need refinement—feedback, accountability, and tools to move from good to great.",
    };
  } else if (percentage <= 85) {
    return {
      zone: "Confident Zone",
      headline: "You're confident",
      description: "The camera feels like home. You trust yourself on video, and your audience feels that. Now it's about impact and reach.",
      patterns: [
        "You create consistently",
        "Mistakes don't derail you",
        "You feel authentic on camera",
        "You're ready to expand"
      ],
      support: "You need strategy—ways to scale your presence and deepen your impact.",
    };
  } else {
    return {
      zone: "Mastery Zone",
      headline: "You're ready for mastery",
      description: "Video is self-expression for you. You're not just confident—you're ready to lead others. The question is: what's next?",
      patterns: [
        "Video is part of who you are",
        "You inspire others",
        "You're looking for new challenges",
        "You want to mentor or teach"
      ],
      support: "You need community and challenge—opportunities to lead and grow alongside peers at your level.",
    };
  }
}

// Get style insights based on answers
function getStyleInsights(answers: Record<number, string[]>) {
  const insights: string[] = [];

  // Q14 - Filming comfort
  const q14 = answers[14]?.[0];
  if (q14 === "Walking and talking" || q14 === "Showing what you're doing instead of talking") {
    insights.push("You may feel more natural with movement-based content");
  } else if (q14 === "Being asked questions") {
    insights.push("Conversational formats might feel more supportive");
  }

  // Q15 - Preparation style
  const q15 = answers[15]?.[0];
  if (q15 === "Knowing exactly what I'll say") {
    insights.push("You prefer structure—scripts or detailed outlines could help");
  } else if (q15 === "Discovering it as I speak") {
    insights.push("You're drawn to spontaneity—freestyle formats may work well");
  }

  // Q17 - Natural format
  const q17 = answers[17]?.[0];
  if (q17 === "Teaching or explaining") {
    insights.push("Educational content aligns with your natural style");
  } else if (q17 === "Sharing personal reflections") {
    insights.push("Personal storytelling resonates with how you communicate");
  }

  // Q18 - Discomfort
  const q18 = answers[18]?.[0];
  if (q18 === "Scripted videos") {
    insights.push("You may need more room for authenticity—loose frameworks over scripts");
  } else if (q18 === "Letting myself ramble") {
    insights.push("Structure gives you safety—bullet points may help");
  }

  return insights;
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const question = allQuestions[currentQuestion];
  const totalQuestions = allQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  // Find which section the current question belongs to
  let questionCount = 0;
  let currentSectionIndex = 0;
  for (let i = 0; i < quizData.length; i++) {
    if (currentQuestion < questionCount + quizData[i].questions.length) {
      currentSectionIndex = i;
      break;
    }
    questionCount += quizData[i].questions.length;
  }
  const currentSection = quizData[currentSectionIndex];

  const handleSelectOption = (option: string) => {
    const currentAnswers = answers[question.id] || [];

    if (question.multiSelect) {
      if (currentAnswers.includes(option)) {
        setAnswers({
          ...answers,
          [question.id]: currentAnswers.filter((a) => a !== option),
        });
      } else {
        setAnswers({
          ...answers,
          [question.id]: [...currentAnswers, option],
        });
      }
    } else {
      setAnswers({
        ...answers,
        [question.id]: [option],
      });

      // Auto-advance for single select
      setTimeout(async () => {
        if (currentQuestion < totalQuestions - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          await completeQuiz();
        }
      }, 300);
    }
  };

  const handleNext = async () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      await completeQuiz();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const canProceed = (answers[question?.id] || []).length > 0;

  // Function to save quiz results
  const saveQuizResults = async (results: ReturnType<typeof calculateResults>, styleInsights: string[]) => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          phone: userPhone,
          answers,
          results,
          styleInsights,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save results');
      }

      const data = await response.json();
      console.log('Quiz results saved:', data.id);
    } catch (error) {
      console.error('Error saving quiz results:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Show contact form after last question
  const completeQuiz = async () => {
    setShowContactForm(true);
  };

  // Submit contact info + quiz results
  const submitContactAndResults = async () => {
    const results = calculateResults(answers);
    const styleInsights = getStyleInsights(answers);

    await saveQuizResults(results, styleInsights);

    setShowContactForm(false);
    setIsComplete(true);
  };

  if (showIntro) {
    return (
      <div className="calm-gradient-radial min-h-screen text-[#3D3D3D] relative">
        <AuroraBackground />
        <FloatingParticles />

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 bg-[#FFF8F0]/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="font-script text-2xl md:text-3xl text-[#3D3D3D]">
              Authentically You
            </span>
            <nav className="flex items-center gap-3 md:gap-5">
              <a
                href="https://www.skool.com/authenticallyou/about"
                className="font-sans text-xs md:text-sm text-[#6B6B6B] hover:text-[#C9A86C] transition-colors"
              >
                Join the Community
              </a>
              <a
                href="/apply"
                className="font-sans text-xs md:text-sm font-semibold bg-[#C9A86C] text-white px-4 py-2 rounded-full hover:bg-[#b8975b] transition-all"
              >
                Apply to Work with Me
              </a>
            </nav>
          </div>
        </header>

        <div className="min-h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-12 md:p-16 soft-glow">
              <Sparkles className="w-12 h-12 text-[#C9A86C] mx-auto mb-6" />
              <h1 className="font-serif text-4xl md:text-5xl mb-4 text-[#3D3D3D]">
                Camera Confidence Zone Quiz
              </h1>
              <p className="font-sans text-lg text-[#6B6B6B] mb-8 leading-relaxed">
                Discover where you are on your camera confidence journey. Get clarity on your patterns, friction points, and where support helps most.
              </p>
              <p className="font-sans text-sm text-[#6B6B6B]/70 mb-8">
                27 questions · Takes about 5 minutes
              </p>
              <button
                onClick={() => setShowIntro(false)}
                className="font-sans font-semibold bg-[#C9A86C] text-white px-12 py-4 rounded-full hover:bg-[#b8975b] transition-all soft-glow"
              >
                Start the Quiz
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (showContactForm) {
    const canSubmit = userName.trim().length > 0 && userEmail.trim().length > 0;
    return (
      <div className="calm-gradient-radial min-h-screen text-[#3D3D3D] relative">
        <AuroraBackground />
        <FloatingParticles />

        <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 bg-[#FFF8F0]/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="font-script text-2xl md:text-3xl text-[#3D3D3D]">
              Authentically You
            </span>
            <nav className="flex items-center gap-3 md:gap-5">
              <a
                href="https://www.skool.com/authenticallyou/about"
                className="font-sans text-xs md:text-sm text-[#6B6B6B] hover:text-[#C9A86C] transition-colors"
              >
                Join the Community
              </a>
              <a
                href="/apply"
                className="font-sans text-xs md:text-sm font-semibold bg-[#C9A86C] text-white px-4 py-2 rounded-full hover:bg-[#b8975b] transition-all"
              >
                Apply to Work with Me
              </a>
            </nav>
          </div>
        </header>

        <div className="min-h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto w-full"
          >
            <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-12 md:p-16 soft-glow">
              <Sparkles className="w-10 h-10 text-[#C9A86C] mx-auto mb-4" />
              <h2 className="font-serif text-3xl md:text-4xl mb-2 text-[#3D3D3D] text-center">
                Almost there!
              </h2>
              <p className="font-sans text-[#6B6B6B] mb-8 text-center">
                Enter your details to see your results
              </p>

              <div className="space-y-5 max-w-md mx-auto">
                <div>
                  <label htmlFor="name" className="font-sans text-sm font-medium text-[#3D3D3D] block mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Sarah"
                    className="w-full px-5 py-3 rounded-2xl border-2 border-[#3D3D3D]/10 bg-white/70 font-sans text-sm text-[#3D3D3D] placeholder:text-[#6B6B6B]/40 focus:outline-none focus:border-[#C9A86C] transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="font-sans text-sm font-medium text-[#3D3D3D] block mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="e.g. sarah@example.com"
                    className="w-full px-5 py-3 rounded-2xl border-2 border-[#3D3D3D]/10 bg-white/70 font-sans text-sm text-[#3D3D3D] placeholder:text-[#6B6B6B]/40 focus:outline-none focus:border-[#C9A86C] transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="font-sans text-sm font-medium text-[#3D3D3D] block mb-2">
                    Phone number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="e.g. (555) 123-4567"
                    className="w-full px-5 py-3 rounded-2xl border-2 border-[#3D3D3D]/10 bg-white/70 font-sans text-sm text-[#3D3D3D] placeholder:text-[#6B6B6B]/40 focus:outline-none focus:border-[#C9A86C] transition-all"
                  />
                </div>
                <button
                  onClick={submitContactAndResults}
                  disabled={!canSubmit || isSaving}
                  className={`w-full font-sans font-semibold px-12 py-4 rounded-full transition-all mt-4 ${
                    canSubmit && !isSaving
                      ? "bg-[#C9A86C] text-white hover:bg-[#b8975b] soft-glow"
                      : "bg-[#3D3D3D]/10 text-[#6B6B6B]/50 cursor-not-allowed"
                  }`}
                >
                  {isSaving ? "Loading..." : "See My Results"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (isComplete) {
    const results = calculateResults(answers);
    const styleInsights = getStyleInsights(answers);

    return (
      <div className="calm-gradient-radial min-h-screen text-[#3D3D3D] relative">
        <AuroraBackground />
        <FloatingParticles />

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 bg-[#FFF8F0]/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="font-script text-2xl md:text-3xl text-[#3D3D3D]">
              Authentically You
            </span>
            <nav className="flex items-center gap-3 md:gap-5">
              <a
                href="https://www.skool.com/authenticallyou/about"
                className="font-sans text-xs md:text-sm text-[#6B6B6B] hover:text-[#C9A86C] transition-colors"
              >
                Join the Community
              </a>
              <a
                href="/apply"
                className="font-sans text-xs md:text-sm font-semibold bg-[#C9A86C] text-white px-4 py-2 rounded-full hover:bg-[#b8975b] transition-all"
              >
                Apply to Work with Me
              </a>
            </nav>
          </div>
        </header>

        <div className="px-6 py-24">
          {/* Results Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 soft-glow">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#C9A86C] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <span className="font-sans text-sm tracking-[0.2em] uppercase text-[#C9A86C] block mb-2">
                  Your Results
                </span>
                <h1 className="font-serif text-3xl md:text-4xl mb-2 text-[#3D3D3D]">
                  {results.zone}
                </h1>
                <p className="font-serif text-xl text-[#C9A86C] italic">
                  {results.headline}
                </p>
              </div>

              <div className="mb-8">
                <p className="font-sans text-lg text-[#6B6B6B] leading-relaxed mb-6">
                  {results.description}
                </p>

                <div className="bg-[#C9A86C]/10 rounded-2xl p-6 mb-6">
                  <h3 className="font-serif text-lg text-[#3D3D3D] mb-3">What we noticed:</h3>
                  <ul className="space-y-2">
                    {results.patterns.map((pattern, i) => (
                      <li key={i} className="font-sans text-[#6B6B6B] flex items-start gap-2">
                        <span className="text-[#C9A86C]">•</span>
                        {pattern}
                      </li>
                    ))}
                  </ul>
                </div>

                {styleInsights.length > 0 && (
                  <div className="bg-[#C5B4E3]/10 rounded-2xl p-6 mb-6">
                    <h3 className="font-serif text-lg text-[#3D3D3D] mb-3">Style signals:</h3>
                    <ul className="space-y-2">
                      {styleInsights.map((insight, i) => (
                        <li key={i} className="font-sans text-[#6B6B6B] flex items-start gap-2">
                          <span className="text-[#C5B4E3]">•</span>
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-[#B4D4E3]/10 rounded-2xl p-6">
                  <h3 className="font-serif text-lg text-[#3D3D3D] mb-2">Where support helps most:</h3>
                  <p className="font-sans text-[#6B6B6B]">{results.support}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Upsell Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl mx-auto mt-16"
          >
            <div className="text-center mb-10">
              <span className="font-sans text-sm tracking-[0.2em] uppercase text-[#C9A86C] block mb-3">
                Your Next Step
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-[#3D3D3D] mb-3">
                Continue Your Journey with Elfina
              </h2>
              <p className="font-sans text-[#6B6B6B] max-w-xl mx-auto">
                Based on your results, here&apos;s the path that fits where you are right now.
              </p>
            </div>

            {/* Recommended badge based on zone */}
            {(() => {
              const recommendedTier =
                results.zone === "Starting Zone" ? "standard" :
                results.zone === "Building Zone" ? "premium" :
                results.zone === "Growing Zone" ? "vip" :
                results.zone === "Confident Zone" ? "vip" :
                "studio";

              const tiers = [
                {
                  id: "standard",
                  name: "Standard",
                  price: "Free",
                  period: "",
                  description: "Join the community and start your journey",
                  features: [
                    "Access to community discussions",
                    "Weekly group content & prompts",
                    "Connect with like-minded creators",
                    "Free resources & guides",
                  ],
                  cta: "Join Free Community",
                  href: "https://www.skool.com/authenticallyou/about",
                  color: "#6B6B6B",
                  bgGradient: "from-[#6B6B6B]/5 to-[#6B6B6B]/0",
                  borderColor: "border-[#6B6B6B]/20",
                },
                {
                  id: "premium",
                  name: "Premium",
                  price: "$28",
                  period: "/mo",
                  description: "Guided support to build your confidence",
                  features: [
                    "Everything in Standard",
                    "Monthly group coaching calls",
                    "Camera confidence workshops",
                    "Content templates & frameworks",
                    "Accountability partnerships",
                  ],
                  cta: "Join Premium",
                  href: "https://www.skool.com/authenticallyou/about",
                  color: "#C9A86C",
                  bgGradient: "from-[#C9A86C]/10 to-[#C9A86C]/0",
                  borderColor: "border-[#C9A86C]/30",
                },
                {
                  id: "vip",
                  name: "VIP",
                  price: "$98",
                  period: "/mo",
                  description: "Deep transformation with personal attention",
                  features: [
                    "Everything in Premium",
                    "Weekly group coaching",
                    "Direct feedback on your content",
                    "Personalized confidence roadmap",
                    "Priority support & mentorship",
                    "Exclusive masterclasses",
                  ],
                  cta: "Join VIP",
                  href: "https://www.skool.com/authenticallyou/about",
                  color: "#C5B4E3",
                  bgGradient: "from-[#C5B4E3]/10 to-[#C5B4E3]/0",
                  borderColor: "border-[#C5B4E3]/30",
                },
                {
                  id: "studio",
                  name: "In the Studio",
                  price: "$898",
                  period: "/mo",
                  description: "1-on-1 with Elfina — for serious creators ready to lead",
                  features: [
                    "Everything in VIP",
                    "Weekly 1-on-1 sessions with Elfina",
                    "Custom content strategy",
                    "Brand & presence development",
                    "Direct access via DM",
                    "Done-with-you video coaching",
                    "Business growth integration",
                  ],
                  cta: "Apply Now",
                  href: "/apply",
                  color: "#C9A86C",
                  bgGradient: "from-[#C9A86C]/15 to-[#C5B4E3]/10",
                  borderColor: "border-[#C9A86C]/40",
                },
              ];

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tiers.map((tier) => {
                    const isRecommended = tier.id === recommendedTier;
                    return (
                      <motion.div
                        key={tier.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + tiers.indexOf(tier) * 0.1 }}
                        className={`relative flex flex-col bg-gradient-to-br ${tier.bgGradient} backdrop-blur-sm rounded-2xl p-6 border ${
                          isRecommended
                            ? 'border-[#C9A86C] ring-2 ring-[#C9A86C]/30'
                            : tier.borderColor
                        }`}
                      >
                        {isRecommended && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <span className="bg-[#C9A86C] text-white text-xs font-sans font-semibold px-4 py-1 rounded-full flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              Recommended for You
                            </span>
                          </div>
                        )}

                        <div className="mb-4">
                          <h3 className="font-serif text-xl text-[#3D3D3D]">{tier.name}</h3>
                          <div className="flex items-baseline gap-1 mt-1">
                            <span className="font-serif text-3xl font-bold" style={{ color: tier.color }}>
                              {tier.price}
                            </span>
                            {tier.period && (
                              <span className="font-sans text-sm text-[#6B6B6B]">{tier.period}</span>
                            )}
                          </div>
                          <p className="font-sans text-sm text-[#6B6B6B] mt-2">{tier.description}</p>
                        </div>

                        <ul className="space-y-2 mb-6 flex-grow">
                          {tier.features.map((feature, i) => (
                            <li key={i} className="font-sans text-sm text-[#6B6B6B] flex items-start gap-2">
                              <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: tier.color }} />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <a
                          href={tier.href}
                          className={`block text-center font-sans font-semibold py-3 px-6 rounded-full transition-all mt-auto ${
                            isRecommended
                              ? 'bg-[#C9A86C] text-white hover:bg-[#b8975b] soft-glow'
                              : tier.id === 'studio'
                              ? 'bg-[#3D3D3D] text-white hover:bg-[#2D2D2D]'
                              : 'border-2 text-[#3D3D3D] hover:bg-white/50'
                          }`}
                          style={!isRecommended && tier.id !== 'studio' ? { borderColor: tier.color } : undefined}
                        >
                          {tier.cta}
                        </a>
                      </motion.div>
                    );
                  })}
                </div>
              );
            })()}

            {/* Retake Quiz */}
            <div className="text-center mt-10">
              <button
                onClick={() => {
                  setAnswers({});
                  setCurrentQuestion(0);
                  setIsComplete(false);
                  setShowIntro(true);
                  setShowContactForm(false);
                  setUserName("");
                  setUserEmail("");
                  setUserPhone("");
                }}
                className="font-sans text-sm text-[#6B6B6B] hover:text-[#C9A86C] underline underline-offset-4 transition-colors"
              >
                Retake Quiz
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="calm-gradient-radial min-h-screen text-[#3D3D3D] relative">
      <AuroraBackground />
      <FloatingParticles />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 bg-[#FFF8F0]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="font-script text-2xl md:text-3xl text-[#3D3D3D]">
            Authentically You
          </span>
          <nav className="flex items-center gap-3 md:gap-5">
            <span className="font-sans text-xs md:text-sm text-[#6B6B6B]">
              {currentQuestion + 1} of {totalQuestions}
            </span>
            <a
              href="https://www.skool.com/authenticallyou/about"
              className="hidden md:inline font-sans text-xs md:text-sm text-[#6B6B6B] hover:text-[#C9A86C] transition-colors"
            >
              Join the Community
            </a>
            <a
              href="/apply"
              className="font-sans text-xs md:text-sm font-semibold bg-[#C9A86C] text-white px-4 py-2 rounded-full hover:bg-[#b8975b] transition-all"
            >
              Apply to Work with Me
            </a>
          </nav>
        </div>
      </header>

      {/* Progress bar */}
      <div className="fixed top-20 left-0 right-0 z-40 px-6">
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

      <div className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-2xl mx-auto w-full">
          {/* Section header */}
          <motion.div
            key={`section-${currentSectionIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-6"
          >
            <span className="font-sans text-sm tracking-[0.2em] uppercase text-[#C9A86C]">
              {currentSection.title}
            </span>
            <p className="font-sans text-xs text-[#6B6B6B] mt-1">{currentSection.description}</p>
          </motion.div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 md:p-10 soft-glow"
            >
              <h2 className="font-serif text-xl md:text-2xl text-[#3D3D3D] mb-2">
                {question.question}
              </h2>
              <p className="font-sans text-sm text-[#6B6B6B] mb-6">
                {question.multiSelect ? "Select all that apply" : "Select one option"}
              </p>

              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = (answers[question.id] || []).includes(option);
                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleSelectOption(option)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all font-sans text-sm ${
                        isSelected
                          ? "bg-[#C9A86C]/10 border-[#C9A86C] text-[#3D3D3D]"
                          : "bg-white/50 border-[#3D3D3D]/10 text-[#6B6B6B] hover:border-[#C9A86C]/50 hover:bg-white/70"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            isSelected
                              ? "bg-[#C9A86C] border-[#C9A86C]"
                              : "border-[#3D3D3D]/30"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className={isSelected ? "font-medium" : ""}>{option}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#3D3D3D]/10">
                <button
                  onClick={handleBack}
                  disabled={currentQuestion === 0}
                  className={`flex items-center gap-2 font-sans text-sm transition-all ${
                    currentQuestion === 0
                      ? "text-[#6B6B6B]/30 cursor-not-allowed"
                      : "text-[#6B6B6B] hover:text-[#3D3D3D]"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                {question.multiSelect && (
                  <button
                    onClick={handleNext}
                    disabled={!canProceed}
                    className={`flex items-center gap-2 font-sans font-semibold px-6 py-3 rounded-full transition-all ${
                      canProceed
                        ? "bg-[#C9A86C] text-white hover:bg-[#b8975b]"
                        : "bg-[#3D3D3D]/10 text-[#6B6B6B]/50 cursor-not-allowed"
                    }`}
                  >
                    {currentQuestion === totalQuestions - 1 ? "See Results" : "Next"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
