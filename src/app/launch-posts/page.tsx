"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

// ─── Post Data ───────────────────────────────────────────────────────

interface PostVariant {
  short: string;
  medium: string;
  long: string;
}

interface LaunchPost {
  id: number;
  title: string;
  description: string;
  alts: PostVariant[];
}

const launchPosts: LaunchPost[] = [
  {
    id: 1,
    title: "Post 1 — Message Resonance Test",
    description:
      "Test what your audience wants help with. Find what resonates before you launch.",
    alts: [
      {
        // Alt 1
        short: `I spent 20+ years on Hollywood sets — 200+ productions, $50M budgets, full crews.

And I still deleted 47 takes of a 60-second video for myself.

If I could help you with ONE thing on camera — what would it be?

Drop it below. I'll personally respond.`,
        medium: `I spent 20+ years on Hollywood sets — 200+ productions, $50M budgets, full crews.

And I still deleted 47 takes of a 60-second video for myself.

I know what it's like to feel confident in every room except the one with a camera pointed at you.

If I could help you with ONE thing on camera — what would it be?

Your confidence? Your content? Your presence? Your consistency?

Drop it below. I'll personally respond to every single one.

Because the answer you give might be exactly the thing I build next.`,
        long: `I spent 20+ years on Hollywood sets — 200+ productions, $50M budgets, full crews.

I've coached actors through their worst moments on camera. I've directed scenes that moved audiences to tears.

And I still deleted 47 takes of a 60-second video for myself.

That's when I realized something:

Camera confidence isn't about experience. It's about relationship — your relationship with yourself on camera.

I've spent the last year transforming my own relationship with video. And now I help others do the same.

Here's my question for you:

If I could help you achieve ONE result with video — just one — what would it be?

Your confidence on camera?
Finding your authentic voice?
Actually posting consistently?
Building a brand through video?
Overcoming the fear of being seen?

Drop it below. I'll personally respond to every single one.

Because the thing you need most? That's exactly what I want to help with.`,
      },
      {
        // Alt 2
        short: `After 200+ film sets and 20 years in Hollywood, I now teach camera confidence.

Not because I was born with it.

Because I had to fight for it — and I know how to help you do the same.

If you could ask me to help you with one thing, what would it be?`,
        medium: `After 200+ film sets and 20 years in Hollywood, I now teach camera confidence.

Not because I was born with it.

Because I had to fight for it — and I know how to help you do the same.

I've been on both sides:
• The professional who could perform on any set
• The creator who couldn't press "post" on her own content

That gap? That's where the real work lives.

If you could ask me to help you with one thing on camera — just one thing — what would it be?

Tell me below. Every answer helps me serve you better.`,
        long: `After 200+ film sets and 20 years in Hollywood, I now teach camera confidence.

Not because I was born with it.

Because I had to fight for it — and I know how to help you do the same.

I've been on both sides:
• The professional who could perform flawlessly on any set
• The creator who couldn't press "post" on her own content
• The coach who understood the theory
• The person who was paralyzed by the practice

That gap between knowing and doing? That's where the real transformation lives.

I didn't become a camera confidence coach because I had it figured out. I became one because I figured it out the hard way — through failure, through fear, through 47 deleted takes.

And now I've helped others find their voice, their presence, their power on camera.

So here's my question:

If you could ask me to help you with ONE thing — one result, one shift, one breakthrough — what would it be?

Maybe it's:
• Finally feeling natural on camera
• Knowing what to say and how to say it
• Posting without second-guessing yourself
• Building a brand that feels like you
• Something I haven't even thought of yet

Tell me below. I read every single comment.

Your answer shapes what I create next.`,
      },
      {
        // Alt 3
        short: `You get one wish.

If I could wave a wand and fix one thing about your relationship with video — what would it be?

I'm asking because I've been where you are. And I want to help.

Comment below. I'll respond to every one.`,
        medium: `You get one wish.

If I could wave a wand and fix one thing about your relationship with video — what would it be?

Would you want to:
• Hit record without anxiety?
• Know exactly what to say?
• Actually post consistently?
• Feel like yourself on camera?
• Build something real through video?

I'm asking because I've been where you are. Hollywood set veteran who couldn't post a 60-second reel.

Now I help creators find their voice on camera.

Comment below with your one wish. I'll respond to every single one.`,
        long: `You get one wish.

If I could wave a wand and fix one thing about your relationship with video — what would it be?

Would you want to:
• Hit record without that knot in your stomach?
• Know exactly what to say without scripting every word?
• Actually post consistently without overthinking?
• Feel like yourself instead of performing a version of yourself?
• Build something real — a brand, a community, a business — through video?

I'm asking because I've been exactly where you are.

20+ years in Hollywood. Comfortable on $50M film sets with 500 crew members watching. But terrified to post a 60-second video of myself being... myself.

The camera didn't scare me. Being seen as me scared me.

Now I help creators find their authentic voice on camera. Not the performed version. The real one.

Comment below with your one wish.

I read every single response. And the thing you need most? That's exactly what I want to build for you.`,
      },
    ],
  },
  {
    id: 2,
    title: "Post 2 — Backstory",
    description:
      "Share your transformation journey. Build connection and trust before the launch.",
    alts: [
      {
        // Alt 1
        short: `Let's celebrate.

I used to be a Hollywood professional who was terrified of her own phone camera.

It sucked because I could perform on a $50M set but couldn't post a 60-second video without deleting it 47 times.

But then I stopped performing and started being real.

Which led me to building Authentically You — a community for creators finding their voice on camera.

I couldn't be more grateful.`,
        medium: `Let's celebrate.

I used to be a Hollywood professional who was terrified of her own phone camera.

It sucked because I could direct scenes that moved audiences to tears, but I couldn't look at my own reflection on screen without cringing. I had 20+ years of experience and zero confidence in being myself on camera.

But then I had an epiphany: the skills that made me great on set were the same skills killing my authenticity online. I was performing when I needed to be present.

Which led me to building Authentically You — a community for creators who want to show up on camera as themselves, not a polished version of themselves.

I went from deleting 47 takes to posting my first take.

From hiding behind perfection to leading with presence.

I couldn't be more grateful for this journey.`,
        long: `Let's celebrate.

I used to be a Hollywood professional who was terrified of her own phone camera.

It sucked because:
• I could perform on $50M film sets but couldn't post a 60-second video
• I had 20+ years of experience and zero confidence in myself on camera
• I deleted 47 takes and still thought none of them were good enough
• I watched other creators post effortlessly while I was paralyzed
• I felt like a fraud — how could someone with my background struggle this much?

It was exhausting. Performing confidence while feeling terrified inside.

But then something shifted.

I stopped treating my phone like a camera on a film set. I stopped performing for an audience. I started having a conversation with one person.

I stopped asking "How do I look?" and started asking "How can I help?"

That shift changed everything.

Which led me to building Authentically You — a community for creators who want to show up on camera as themselves. Not a polished version. Not a performance. Themselves.

I went from deleting 47 takes to trusting my first take.
From hiding behind perfection to leading with presence.
From performing confidence to actually feeling it.

I couldn't be more grateful for this journey.

And I'm just getting started.`,
      },
      {
        // Alt 2
        short: `Can I be real with you for a second?

A year ago, I was a 20-year Hollywood veteran who couldn't post a video of herself.

The irony wasn't lost on me.

But then I realized: performing and being authentic are two completely different skills.

Now I teach the second one. And it changed my life.`,
        medium: `Can I be real with you for a second?

A year ago, I was a 20-year Hollywood veteran who couldn't post a video of herself.

The irony wasn't lost on me.

I knew lighting. I knew angles. I knew how to move on camera. But I didn't know how to be myself on camera.

That's a completely different skill. And no one teaches it.

So I learned it the hard way:
• Through 47 deleted takes
• Through comparing myself to every other creator
• Through finally breaking down and asking "Why is this so hard?"

The answer? I was performing when I needed to be present.

Now I teach camera confidence — not the Hollywood kind. The real kind. The kind where you show up as yourself and it's actually enough.

That shift built Authentically You. And it changed everything.`,
        long: `Can I be real with you for a second?

A year ago, I was a 20-year Hollywood veteran who couldn't post a video of herself.

200+ film sets. Major productions. Full crews. I could perform anything.

But put me alone with my phone camera? I froze.

The irony wasn't lost on me.

I knew lighting. I knew angles. I knew blocking, pacing, emotional beats. But I didn't know how to be myself on camera. Because no one ever asked me to be.

Hollywood trained me to perform. To calculate every emotion. To rehearse every gesture. To be someone else — brilliantly.

But online? People don't want a performance. They want a person.

I learned this the hard way:
• 47 deleted takes of a 60-second video
• Hours of "getting ready" to avoid actually filming
• Comparing myself to creators who seemed effortless
• Finally breaking down and asking: "Why is this so hard for someone like me?"

The answer was simple and devastating:

I had spent 20 years learning to perform. And zero time learning to be authentic on camera.

So I rebuilt everything. From the ground up.

Different approach. Different energy. Different relationship with the camera.

Not performance. Presence.
Not perfection. Connection.
Not acting. Authenticity.

Now I teach this to creators through Authentically You.

And watching others have that same breakthrough? That's the best thing I've ever done with a camera.`,
      },
      {
        // Alt 3
        short: `Plot twist: The woman teaching camera confidence used to be terrified of her own camera.

20 years in Hollywood. Comfortable on any set.

But posting as myself? Absolutely not.

Until I learned that authenticity beats performance. Every time.

Now I help others learn it too. Welcome to Authentically You.`,
        medium: `Plot twist: The woman teaching camera confidence used to be terrified of her own camera.

20 years in Hollywood. 200+ productions. Comfortable on any set on the planet.

But posting as myself? Absolutely not.

I deleted everything. Every take felt wrong. Every version of me felt fake.

Because it was fake. I was performing — even for my phone.

The moment I stopped performing and started being present, everything shifted:
• I posted my first take instead of my forty-seventh
• I built a community of people who actually trust me
• I found my voice — not my "camera voice," my real voice

Now I help others learn what took me years to figure out.

Welcome to Authentically You. We're just getting started.`,
        long: `Plot twist: The woman teaching camera confidence used to be terrified of her own camera.

20 years in Hollywood. 200+ productions. $50M budgets. Full crews. I could perform anything for anyone.

But posting a 60-second video as myself? Absolutely not.

Here's what that looked like:
• Record a video. Watch it back. Delete it.
• Record it again. Hate my voice. Delete it.
• Record it again. "My face looks weird." Delete it.
• 47 takes later, delete them all.
• Close the app. Feel like a fraud.
• Watch someone else post effortlessly.
• Feel worse.
• Repeat tomorrow.

Sound familiar?

The breakthrough came when I realized I was applying Hollywood rules to a completely different game.

In Hollywood: Perform. Be someone else. Make it perfect.
Online: Be present. Be yourself. Make it real.

Two completely different skills. And I had only trained one.

So I rebuilt my entire relationship with the camera:
• From performing to being present
• From perfection to connection
• From scripted to spontaneous
• From audition energy to conversation energy

The result?

I went from deleting 47 takes to trusting my first.
From hiding behind perfection to leading with authenticity.
From terrified creator to camera confidence coach.

Now I help others make that same shift through Authentically You.

Because if a Hollywood veteran can struggle this much — and come out the other side — anyone can.

We're just getting started.`,
      },
    ],
  },
  {
    id: 3,
    title: "Post 3 — Validation Test",
    description:
      "Test interest in your offer. See who's ready to commit before you officially launch.",
    alts: [
      {
        // Alt 1
        short: `After going from 47 deleted takes to posting confidently every single day...

It's my mission to help 10 creators overcome their camera fear in the next 90 days.

Not with fancy equipment. Not with scripts. With authentic presence.

Comment "READY" if that's you.`,
        medium: `After going from 47 deleted takes to posting confidently every single day...

It's my mission to help 10 creators overcome their camera fear in the next 90 days.

Not with fancy equipment.
Not with scripts or teleprompters.
Not with "fake it till you make it."

With authentic presence. The kind that makes people trust you in the first 3 seconds.

Here's what that looks like:
• Hitting record without anxiety
• Posting your first take, not your forty-seventh
• Showing up as yourself — and having it be enough
• Building a brand through real connection, not performance

Comment "READY" if you want in.

I'll reach out personally to every single one.`,
        long: `After going from 47 deleted takes to posting confidently every single day...

After helping creators go from "I can't even look at myself on camera" to "I just posted my first video and it felt amazing"...

It's my mission to help 10 creators overcome their camera fear in the next 90 days.

Not with fancy equipment or Hollywood production.
Not with scripts, teleprompters, or rehearsed lines.
Not with "fake it till you make it" confidence hacks.

With authentic presence. The kind you can't manufacture.

The kind that makes people stop scrolling.
The kind that builds trust in the first 3 seconds.
The kind that turns viewers into community.

Here's what I know after 20+ years on camera:

Technical skill gets you started.
Authentic presence gets you followed.

And presence is a skill that anyone can learn.

If you're:
• Tired of deleting every take
• Exhausted from performing instead of being yourself
• Ready to show up on camera as the real you
• Serious about building something through video

Comment "READY" below.

I'll reach out personally. Not a bot. Not a DM funnel. Me.

Because I only want to work with 10 people who are actually ready to transform their relationship with the camera.

Is that you?`,
      },
      {
        // Alt 2
        short: `I'm thinking about helping 10 creators go from camera-shy to camera-confident in 90 days.

Using the same methods that took me from Hollywood performer to authentic creator.

Interested? Comment "ME" below.

Serious inquiries only — limited spots.`,
        medium: `I'm thinking about helping 10 creators go from camera-shy to camera-confident in 90 days.

Using the same methods that took me from deleting 47 takes to trusting my first.

What I'd help you with:
• Overcoming the fear of being seen on camera
• Finding your authentic voice (not a "camera voice")
• Building consistency without burning out
• Creating content that actually connects

This isn't about perfection. It's about presence.

Interested? Comment "ME" below.

I'll reach out personally to see if it's the right fit.

Serious inquiries only — I'm keeping this small for a reason.`,
        long: `I'm thinking about helping 10 creators go from camera-shy to camera-confident in 90 days.

Using the same methods that took me from deleting 47 takes to trusting my first.

After 20+ years in Hollywood and my own transformation from terrified creator to confident one, I've identified exactly what holds people back on camera:

It's not equipment. It's not lighting. It's not knowing the "right" angles.

It's your relationship with being seen.

Here's what I'd help you with:
• Overcoming the specific fear that keeps you from hitting record
• Finding your authentic voice — not a "camera voice," your real voice
• Building a consistency practice that doesn't feel exhausting
• Creating content that connects because it's real, not rehearsed
• Developing the kind of presence that makes people stop scrolling

This isn't a course. It's not a downloadable PDF.

It's real coaching. Real support. Real transformation.

And I'm keeping it small — 10 creators maximum — because this work is personal.

Interested? Comment "ME" below.

I'll reach out personally to see if it's the right fit. Not everyone will be accepted — and that's by design. I want people who are serious about showing up, not just curious about the idea.

Is that you?`,
      },
      {
        // Alt 3
        short: `What if you could show up on camera tomorrow — and actually feel like yourself?

I'm looking for 10 creators who are done hiding and ready to be seen.

90 days. Real transformation. No performance required.

Comment "IN" if that sounds like you.`,
        medium: `What if you could show up on camera tomorrow — and actually feel like yourself?

Not performing. Not scripting every word. Not deleting 47 takes.

Just... you. Being you. And having that be more than enough.

I'm looking for 10 creators who are done hiding and ready to be seen.

90 days. Real transformation. No performance required.

What you'd walk away with:
• Confidence that doesn't require a script
• A voice that's authentically yours
• The ability to hit record and trust what comes out
• Content that builds real connection

Comment "IN" if that sounds like you.

I'll reach out to everyone who responds.`,
        long: `What if you could show up on camera tomorrow — and actually feel like yourself?

Not performing. Not scripting every word. Not spending 3 hours on lighting.

Just... you. Being you. And having that be more than enough.

I know that sounds impossible if you're the person who:
• Records 47 takes and deletes them all
• Watches other creators and thinks "I could never"
• Knows exactly what they'd say — but freezes when the red light turns on
• Feels like a completely different person on camera than off camera

I was that person. For 20 years.

Even with a Hollywood career. Even with 200+ productions. Even with all the "right" experience.

Because camera confidence isn't about experience. It's about authenticity. And authenticity is a skill most of us were never taught.

I'm looking for 10 creators who are done hiding and ready to be seen.

90 days. Real transformation. No performance required.

What you'd walk away with:
• Confidence that doesn't require a script or perfect conditions
• A voice that's unmistakably yours
• The ability to hit record, speak your truth, and trust what comes out
• Content that builds real connection — not just engagement metrics
• A completely new relationship with being seen

This is personal work. That's why I'm keeping it to 10 people.

Comment "IN" if that sounds like you.

I'll reach out to everyone who responds. Personally. Because this matters too much for automation.`,
      },
    ],
  },
];

// ─── Component ───────────────────────────────────────────────────────

export default function LaunchPostsPage() {
  const [activePost, setActivePost] = useState(0);
  const [activeAlt, setActiveAlt] = useState(0);
  const [activeVersion, setActiveVersion] = useState<"short" | "medium" | "long">("short");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const post = launchPosts[activePost];
  const variant = post.alts[activeAlt];
  const content = variant[activeVersion];

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#3D3D3D]">
      {/* Header */}
      <header className="py-6 px-6 border-b border-[#3D3D3D]/10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl text-[#3D3D3D]">
              Launch Posts
            </h1>
            <p className="font-sans text-sm text-[#6B6B6B] mt-1">
              Pre-launch content in Elfina&apos;s voice. Copy, customize, and post.
            </p>
          </div>
          <a
            href="/"
            className="font-sans text-sm text-[#6B6B6B] hover:text-[#C9A86C] transition-colors"
          >
            Back to Site
          </a>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Post Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {launchPosts.map((p, i) => (
            <button
              key={p.id}
              onClick={() => {
                setActivePost(i);
                setActiveAlt(0);
              }}
              className={`px-5 py-3 rounded-xl font-sans text-sm font-medium whitespace-nowrap transition-all ${
                activePost === i
                  ? "bg-[#C9A86C] text-white"
                  : "bg-white/60 text-[#6B6B6B] hover:bg-white hover:text-[#3D3D3D] border border-[#3D3D3D]/10"
              }`}
            >
              Post {p.id}
            </button>
          ))}
        </div>

        {/* Post Info */}
        <div className="mb-6">
          <h2 className="font-serif text-xl text-[#3D3D3D] mb-1">
            {post.title}
          </h2>
          <p className="font-sans text-sm text-[#6B6B6B]">
            {post.description}
          </p>
        </div>

        {/* Alt Tabs */}
        <div className="flex gap-2 mb-4">
          {post.alts.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveAlt(i)}
              className={`px-4 py-2 rounded-lg font-sans text-sm font-medium transition-all ${
                activeAlt === i
                  ? "bg-[#C5B4E3] text-white"
                  : "bg-white/60 text-[#6B6B6B] hover:bg-white hover:text-[#3D3D3D] border border-[#3D3D3D]/10"
              }`}
            >
              Alt {i + 1}
            </button>
          ))}
        </div>

        {/* Version Tabs */}
        <div className="flex gap-2 mb-6">
          {(["short", "medium", "long"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setActiveVersion(v)}
              className={`px-4 py-2 rounded-lg font-sans text-xs font-medium capitalize transition-all ${
                activeVersion === v
                  ? "bg-[#3D3D3D] text-white"
                  : "bg-white/60 text-[#6B6B6B] hover:bg-white hover:text-[#3D3D3D] border border-[#3D3D3D]/10"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Content Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-[#3D3D3D]/5 p-6 md:p-8 mb-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <span className="font-sans text-xs text-[#6B6B6B] bg-[#3D3D3D]/5 px-3 py-1 rounded-full">
              Post {post.id} &middot; Alt {activeAlt + 1} &middot;{" "}
              {activeVersion.charAt(0).toUpperCase() + activeVersion.slice(1)}
            </span>
            <button
              onClick={() =>
                copyToClipboard(
                  content,
                  `${post.id}-${activeAlt}-${activeVersion}`
                )
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-sans text-sm font-medium transition-all ${
                copiedKey === `${post.id}-${activeAlt}-${activeVersion}`
                  ? "bg-green-100 text-green-700"
                  : "bg-[#C9A86C]/10 text-[#C9A86C] hover:bg-[#C9A86C]/20"
              }`}
            >
              {copiedKey === `${post.id}-${activeAlt}-${activeVersion}` ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>

          <div className="font-sans text-[#3D3D3D] text-[15px] leading-relaxed whitespace-pre-wrap">
            {content}
          </div>
        </div>

        {/* Quick Copy All Versions */}
        <div className="bg-white/50 rounded-2xl border border-[#3D3D3D]/5 p-6">
          <h3 className="font-serif text-lg text-[#3D3D3D] mb-4">
            Quick Copy — Alt {activeAlt + 1}
          </h3>
          <div className="grid md:grid-cols-3 gap-3">
            {(["short", "medium", "long"] as const).map((v) => {
              const key = `quick-${post.id}-${activeAlt}-${v}`;
              return (
                <button
                  key={v}
                  onClick={() => copyToClipboard(variant[v], key)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-sans text-sm font-medium transition-all ${
                    copiedKey === key
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-white border border-[#3D3D3D]/10 text-[#6B6B6B] hover:border-[#C9A86C]/30 hover:text-[#C9A86C]"
                  }`}
                >
                  {copiedKey === key ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied {v}
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy {v}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
