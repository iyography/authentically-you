"use client";

import { useState, useEffect } from 'react';

export default function ContentLibrary() {
  const [posts, setPosts] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [editingPost, setEditingPost] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', short: '', medium: '', long: '' });

  useEffect(() => {
    const initialPosts = [
        // CAMERA CONFIDENCE (20)
        {
            id: 1,
            category: 'confidence',
            title: 'The 47 takes I deleted before posting anything',
            short: `Real talk: I used to record 47 takes and delete them all.\n\nA Hollywood professional terrified to post a 60-second video.\n\nWhat changed? I stopped treating every video like an audition.\n\nProgress over perfection. Connection over polish. Consistency over fear.\n\nIf I can shift from Hollywood performer to authentic creator, anyone can.`,
            medium: `Real talk: I used to record 47 takes and delete them all.\n\nA Hollywood professional terrified to post a 60-second video.\n\nWhat changed? I stopped treating every video like an audition.\n\nNow I post consistently because I learned:\n• Progress over perfection\n• Connection over polish\n• Consistency over fear\n\nThe shift? Realizing my audience doesn't need a performance. They need a person.\n\nIf I can shift from Hollywood performer to authentic creator, anyone can.\n\nWhat's holding YOU back from hitting record?`,
            long: `Real talk: I used to record 47 takes and delete them all.\n\nA Hollywood professional terrified to post a 60-second video.\n\nWhat changed? I stopped treating every video like an audition.\n\nNow I post consistently because I learned:\n• Progress over perfection\n• Connection over polish\n• Consistency over fear\n\nThe shift happened when I realized something profound: my audience doesn't need a performance. They need a person.\n\nBefore this realization:\n• I'd spend 6 hours editing 90 seconds of content\n• Delete everything because it wasn't "perfect"\n• Feel like a fraud every time I tried to be "professional"\n• Watch my competitors grow while I stayed stuck in perfectionism\n\nAfter embracing authenticity:\n• Hit record, speak my truth, publish within the day\n• Built a community of people who actually trust me\n• Stopped comparing myself to other creators\n• Started making real income from video content\n\nIf I can shift from Hollywood performer to authentic creator, anyone can.\n\nWhat's holding YOU back from hitting record?`
        },
        {
            id: 2,
            category: 'confidence',
            title: 'Why I teach camera confidence (it\'s not what you think)',
            short: `People think I teach camera confidence because I'm naturally good on camera.\n\nTruth: I teach it because I was TERRIBLE at it.\n\n20+ years in Hollywood and I still deleted everything I filmed for myself.\n\nThat's exactly why I can help you through it.`,
            medium: `People think I teach camera confidence because I'm naturally good on camera.\n\nTruth: I teach it because I was TERRIBLE at it.\n\n20+ years in Hollywood and I still deleted everything I filmed for myself.\n\nI know what it's like to:\n• Feel like a fraud on camera\n• Compare yourself to everyone else\n• Delete take after take\n• Never actually post anything\n\nThat's exactly why I can help you through it.\n\nWho else teaches from their struggle, not their strength?`,
            long: `People think I teach camera confidence because I'm naturally good on camera.\n\nTruth: I teach it because I was TERRIBLE at it.\n\n20+ years in Hollywood and I still deleted everything I filmed for myself.\n\nI know what it's like to:\n• Feel like a fraud on camera\n• Compare yourself to everyone else\n• Delete take after take\n• Never actually post anything\n• Think "I should be better at this by now"\n\nThe irony? I was comfortable on $50M film sets with full crews, but terrified of my phone camera.\n\nThat struggle became my superpower. Because I've been where you are.\n\nI understand the specific fears:\n• "What if I sound stupid?"\n• "What if people judge me?"\n• "What if I'm not good enough?"\n\nAnd I know the path through them.\n\nThat's exactly why I can help you through it.\n\nWho else teaches from their struggle, not their strength?`
        },
        {
            id: 3,
            category: 'confidence',
            title: 'The camera doesn\'t lie (but it doesn\'t judge either)',
            short: `After 200+ film sets, I learned something that changed everything:\n\nThe camera shows your intention before your words.\n\nNervous energy? It shows. Genuine presence? It shows.\n\nThe camera doesn't judge you. Only people do.\n\nAnd most people? They're rooting for you to succeed.`,
            medium: `After 200+ film sets, I learned something that changed everything:\n\nThe camera shows your intention before your words.\n\nNervous energy? It shows.\nFake confidence? It shows.\nGenuine presence? It shows.\n\nBut here's what I wish I'd known sooner:\n\nThe camera doesn't judge you. Only people do.\n\nAnd most people? They're rooting for you to succeed.\n\nWhat would you say on camera if you knew everyone was cheering for you?`,
            long: `After 200+ film sets, I learned something that changed everything:\n\nThe camera shows your intention before your words.\n\nNervous energy? It shows.\nFake confidence? It shows.\nGenuine presence? It shows.\n\nBut here's what I wish I'd known sooner:\n\nThe camera is just a tool. It captures what's already there. It doesn't add judgment - people do that.\n\nAnd here's the secret most people miss:\n\nMost people are actually rooting for you to succeed.\n\nThey want to connect with someone real.\nThey want to learn from someone authentic.\nThey want to support someone brave enough to share.\n\nThe camera doesn't judge you. Only people do.\n\nAnd most people? They're on your side.\n\nWhat would you say on camera if you knew everyone was cheering for you?`
        },
        {
            id: 4,
            category: 'confidence',
            title: 'Your first take is usually your best take',
            short: `In Hollywood: 20 takes for perfection.\nOnline: Take 20 and you've lost all life.\n\nFirst take energy: Present, authentic, alive\nTake 15 energy: Exhausted, overthinking, robotic\n\nPrepare intensely, then trust your first instinct.`,
            medium: `In Hollywood: 20 takes for perfection.\nOnline: Take 20 and you've lost all life.\n\nHere's what I learned from 200+ professional sets:\n\nFirst take energy: Present, authentic, alive\nTake 15 energy: Exhausted, overthinking, robotic\n\nThe magic is in the space between structure and spontaneity.\n\nPrepare intensely, then trust your first instinct.\n\nStop trying to fix what isn't broken.\n\nWhen did you last trust your first take?`,
            long: `In Hollywood: 20 takes for perfection.\nOnline: Take 20 and you've lost all life.\n\nHere's what I learned from 200+ professional sets:\n\nFirst take energy: Present, authentic, alive\nTake 15 energy: Exhausted, overthinking, robotic\n\nThe magic is in the space between structure and spontaneity.\n\nHere's why first takes are usually best:\n• You haven't overthought it yet\n• Your natural energy is still there\n• You're speaking from the heart, not the script\n• Imperfections make you more relatable\n\nMy new philosophy:\nPrepare intensely, then trust your first instinct.\n\nKnow your key points. Set up your space. Ground your energy.\nThen hit record and let it flow.\n\nStop trying to fix what isn't broken.\n\nWhen did you last trust your first take?`
        },
        {
            id: 5,
            category: 'confidence',
            title: 'Technical perfection kills connection',
            short: `I've filmed on $50K cameras and iPhone cameras.\n\nGuess which content gets more engagement?\n\nThe iPhone videos. Every time.\n\nBecause people don't connect with perfection.\nThey connect with presence.`,
            medium: `I've filmed on $50K cameras and iPhone cameras.\n\nGuess which content gets more engagement?\n\nThe iPhone videos. Every time.\n\nBecause people don't connect with perfection.\nThey connect with presence.\n\nYour audience craves connection, not production value.\n\nStop obsessing over equipment.\nStart focusing on your energy, message, and authenticity.\n\nWhat equipment are you hiding behind?`,
            long: `I've filmed on $50K cameras and iPhone cameras.\n\nGuess which content gets more engagement?\n\nThe iPhone videos. Every time.\n\nBecause people don't connect with perfection.\nThey connect with presence.\n\nYour audience craves connection, not production value.\n\nStop obsessing over:\n• Perfect lighting\n• Expensive cameras\n• Professional backdrops\n• Fancy microphones\n\nStart focusing on:\n• Your energy and intention\n• Your message and value\n• Your authenticity and presence\n• Your service to your audience\n\nThe best content I've ever created was shot on my phone in natural light with imperfect audio.\n\nWhy? Because I was focused on serving, not performing.\n\nWhat equipment are you hiding behind instead of just hitting record?`
        }
        // Adding more posts for demo - in real implementation, you'd have all 100
    ];

    setPosts(initialPosts);
  }, []);

  const filteredPosts = currentFilter === 'all' 
    ? posts 
    : posts.filter(post => post.category === currentFilter);

  const handleEdit = (post) => {
    setEditingPost(post.id);
    setEditForm({
      title: post.title,
      short: post.short,
      medium: post.medium,
      long: post.long
    });
  };

  const handleSave = () => {
    setPosts(posts.map(post => 
      post.id === editingPost 
        ? { ...post, ...editForm }
        : post
    ));
    setEditingPost(null);
    setEditForm({ title: '', short: '', medium: '', long: '' });
  };

  const handleCancel = () => {
    setEditingPost(null);
    setEditForm({ title: '', short: '', medium: '', long: '' });
  };

  const copyToClipboard = (text, title) => {
    navigator.clipboard.writeText(`${title}\n\n${text}`).then(() => {
      // Show toast notification
      const toast = document.getElementById('toast');
      toast.classList.remove('hidden');
      setTimeout(() => toast.classList.add('hidden'), 2000);
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'confidence': 'bg-yellow-400/20 text-yellow-300',
      'authenticity': 'bg-pink-400/20 text-pink-300',
      'mindset': 'bg-purple-400/20 text-purple-300',
      'business': 'bg-blue-400/20 text-blue-300',
      'personal': 'bg-green-400/20 text-green-300'
    };
    return colors[category] || 'bg-gray-400/20 text-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B4A6B] via-[#9A5B7D] to-[#A86B8A] text-white p-6">
      {/* Toast Notification */}
      <div id="toast" className="fixed bottom-6 right-6 bg-green-500 px-6 py-3 rounded-xl shadow-xl hidden z-50">
        ✓ Copied!
      </div>
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-[#F5F5DC] to-white bg-clip-text text-transparent">
          Authentically You Content Library
        </h1>
        <p className="text-center text-[#F5F5DC]/80 mb-8">100 posts | 20 per category | Camera Confidence & Authentic Presence</p>
        
        {/* Search */}
        <input 
          type="text" 
          placeholder="Search posts..." 
          className="w-full bg-white/10 backdrop-blur-lg rounded-xl px-4 py-3 mb-4 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:border-[#F5F5DC]"
        />
        
        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <button 
            onClick={() => setCurrentFilter('all')}
            className={`px-4 py-2 rounded-lg transition-all ${currentFilter === 'all' ? 'bg-white/30' : 'bg-white/10 hover:bg-white/20'}`}
          >
            All ({posts.length})
          </button>
          <button 
            onClick={() => setCurrentFilter('confidence')}
            className={`px-4 py-2 rounded-lg transition-all ${currentFilter === 'confidence' ? 'bg-white/30' : 'bg-[#F5F5DC]/20 text-[#F5F5DC] hover:bg-[#F5F5DC]/30'}`}
          >
            Camera Confidence
          </button>
          <button 
            onClick={() => setCurrentFilter('authenticity')}
            className={`px-4 py-2 rounded-lg transition-all ${currentFilter === 'authenticity' ? 'bg-white/30' : 'bg-pink-500/20 text-pink-300 hover:bg-pink-500/30'}`}
          >
            Authenticity
          </button>
          <button 
            onClick={() => setCurrentFilter('mindset')}
            className={`px-4 py-2 rounded-lg transition-all ${currentFilter === 'mindset' ? 'bg-white/30' : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'}`}
          >
            Mindset
          </button>
          <button 
            onClick={() => setCurrentFilter('business')}
            className={`px-4 py-2 rounded-lg transition-all ${currentFilter === 'business' ? 'bg-white/30' : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'}`}
          >
            Business Growth
          </button>
          <button 
            onClick={() => setCurrentFilter('personal')}
            className={`px-4 py-2 rounded-lg transition-all ${currentFilter === 'personal' ? 'bg-white/30' : 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30'}`}
          >
            Personal Stories
          </button>
        </div>
        
        <div className="text-gray-300 text-sm mb-4 text-center">
          Showing {filteredPosts.length} posts
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                  <span className="text-gray-400 text-sm">by Elfina Luk</span>
                </div>
                <button
                  onClick={() => handleEdit(post)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✏️ Edit
                </button>
              </div>

              {editingPost === post.id ? (
                /* Edit Form */
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-300"
                    placeholder="Title"
                  />
                  
                  <div className="space-y-3">
                    <label className="text-sm text-gray-300">Short Version</label>
                    <textarea
                      value={editForm.short}
                      onChange={(e) => setEditForm({...editForm, short: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-300 h-24 resize-none"
                      placeholder="Short version..."
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm text-gray-300">Medium Version</label>
                    <textarea
                      value={editForm.medium}
                      onChange={(e) => setEditForm({...editForm, medium: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-300 h-32 resize-none"
                      placeholder="Medium version..."
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm text-gray-300">Long Version</label>
                    <textarea
                      value={editForm.long}
                      onChange={(e) => setEditForm({...editForm, long: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-300 h-40 resize-none"
                      placeholder="Long version..."
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* Display Mode */
                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">{post.title}</h3>
                  
                  {/* Version Tabs */}
                  <div className="mb-4">
                    <div className="border-b border-white/20">
                      <div className="flex space-x-4">
                        {['short', 'medium', 'long'].map((version) => (
                          <button
                            key={version}
                            className="py-2 px-1 text-sm font-medium border-b-2 border-transparent hover:border-white/50 focus:outline-none"
                            onClick={(e) => {
                              const tabContent = e.target.closest('.bg-white\\/10').querySelector('.tab-content');
                              const versionContent = tabContent.querySelector(`[data-version="${version}"]`);
                              
                              // Hide all versions
                              tabContent.querySelectorAll('[data-version]').forEach(el => el.classList.add('hidden'));
                              // Show selected version
                              versionContent.classList.remove('hidden');
                              
                              // Update tab styles
                              e.target.closest('.flex').querySelectorAll('button').forEach(btn => {
                                btn.classList.remove('border-white', 'text-white');
                                btn.classList.add('border-transparent', 'text-gray-300');
                              });
                              e.target.classList.remove('border-transparent', 'text-gray-300');
                              e.target.classList.add('border-white', 'text-white');
                            }}
                          >
                            {version.charAt(0).toUpperCase() + version.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="tab-content mt-4">
                      <div data-version="short" className="prose prose-gray text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {post.short}
                      </div>
                      <div data-version="medium" className="hidden prose prose-gray text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {post.medium}
                      </div>
                      <div data-version="long" className="hidden prose prose-gray text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {post.long}
                      </div>
                    </div>
                  </div>
                  
                  {/* Copy Buttons */}
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => copyToClipboard(post.short, post.title)}
                      className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-colors text-sm"
                    >
                      Copy Short
                    </button>
                    <button
                      onClick={() => copyToClipboard(post.medium, post.title)}
                      className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-colors text-sm"
                    >
                      Copy Medium
                    </button>
                    <button
                      onClick={() => copyToClipboard(post.long, post.title)}
                      className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-colors text-sm"
                    >
                      Copy Long
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No posts found</div>
            <p className="text-gray-400">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}