import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Word Game Blog — Guides, Trap Words & Strategies | WordChain',
  description:
    'The ultimate word chain resource: master offensive letter traps (X, Q, Z), learn official rules, compare Shiritori, and level up vocabulary in multiplayer word games.',
  keywords: [
    'word chain blog', 'word chain strategy', 'how to win word chain',
    'words ending in x', 'words ending in z', 'words ending in q',
    'shiritori tips', 'multiplayer word games', 'best words for word chain',
  ],
  alternates: { canonical: 'https://wordchain-5hhv.onrender.com/blog' },
  openGraph: {
    title: 'Word Game Blog — Guides, Trap Words & Strategies',
    description: 'Expert tactics, trap words lists, and game theory for real-time word chain battlers.',
    type: 'website',
    url: 'https://wordchain-5hhv.onrender.com/blog',
  },
};

const blogPosts = [
  {
    slug: 'hard-letters-word-chain-q-x-z-j',
    title: 'Hard Letters in Word Chain: Words Ending in Q, X, Z, J & V (Trap List)',
    excerpt: 'Win matches by trapping opponents with brutal terminal letters. Comprehensive cheat sheet of words ending in X, Z, J, Q, and V plus instant recovery words.',
    date: '2025-10-18',
    readTime: '7 min read',
    category: 'Strategy',
    featured: true,
  },
  {
    slug: 'word-chain-rules-variations',
    title: 'Word Chain Game Rules: Official Variations & Custom Settings Guide',
    excerpt: 'Complete breakdown of word chain mechanics: linking rules, dictionary validation, minimum word lengths, category constraints, and elimination systems.',
    date: '2025-10-17',
    readTime: '9 min read',
    category: 'Guide',
    featured: true,
  },
  {
    slug: 'best-word-chain-words',
    title: '100+ Best Words for Word Chain: Attack, Trap & Recovery Lists',
    excerpt: 'The curated arsenal of high-percentage words. Drop opponents on rare letters, escape vowel droughts, and maintain 5-second typing rhythm.',
    date: '2025-10-16',
    readTime: '8 min read',
    category: 'Cheat Sheet',
    featured: false,
  },
  {
    slug: 'what-is-word-chain-game',
    title: 'What Is a Word Chain Game? Complete Guide for Beginners',
    excerpt: 'Learn everything about word chain games — rules, history, variations like Shiritori, and how to play online with friends for free.',
    date: '2025-10-15',
    readTime: '8 min read',
    category: 'Guide',
    featured: false,
  },
  {
    slug: 'word-chain-solver-tips',
    title: 'How to Think of Words Faster in Word Chain: Mental Tactics & Speed',
    excerpt: 'Break through brain freeze. Cognitive strategies, sensory room scanning, and prefix pivoting to retrieve dictionary words twice as fast.',
    date: '2025-10-14',
    readTime: '7 min read',
    category: 'Tactics',
    featured: false,
  },
  {
    slug: 'word-chain-strategies-to-win',
    title: '10 Word Chain Strategies to Win Every Game',
    excerpt: 'Master word chain with proven strategies: letter frequency analysis, defensive words, chain-ending tactics, and vocabulary expansion tips.',
    date: '2025-10-12',
    readTime: '6 min read',
    category: 'Strategy',
    featured: false,
  },
  {
    slug: 'best-online-word-games-2025',
    title: 'Best Free Online Word Games in 2025 — Top 10 Ranked',
    excerpt: 'Discover the best free online word games of 2025 including WordChain, Wordle, word ladders, and multiplayer vocabulary battles.',
    date: '2025-10-10',
    readTime: '10 min read',
    category: 'Roundup',
    featured: false,
  },
  {
    slug: 'shiritori-vs-word-chain',
    title: "Shiritori vs Word Chain — What's the Difference?",
    excerpt: 'Explore the differences between Japanese Shiritori and English word chain games. Learn rules, cultural origins, and which version to play online.',
    date: '2025-10-08',
    readTime: '5 min read',
    category: 'Culture',
    featured: false,
  },
  {
    slug: 'vocabulary-building-word-games',
    title: 'How Word Chain Games Improve Your Vocabulary (Backed by Science)',
    excerpt: 'Scientific research shows word games boost vocabulary, cognitive speed, and memory. Learn how playing WordChain can make you smarter.',
    date: '2025-10-05',
    readTime: '7 min read',
    category: 'Education',
    featured: false,
  },
  {
    slug: 'multiplayer-word-games-with-friends',
    title: 'Top 5 Multiplayer Word Games to Play with Friends Online',
    excerpt: 'Looking for word games to play with friends? Here are the 5 best free multiplayer word games you can play in your browser right now.',
    date: '2025-10-01',
    readTime: '6 min read',
    category: 'Roundup',
    featured: false,
  },
];

export default function BlogPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wordchain-5hhv.onrender.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://wordchain-5hhv.onrender.com/blog' },
    ],
  };

  return (
    <main className="min-h-screen" style={{ background: '#FAF7EE' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="pt-20 pb-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-black uppercase bg-white px-3 py-1.5 rounded-full border-2 border-[#111] shadow-[2px_2px_0px_#111] mb-6 hover:translate-y-[-1px] transition-transform"
          >
            ← Back to WordChain
          </Link>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tight" style={{ color: '#111' }}>
            Word Game <span className="bg-[#FFC928] px-3 py-0.5 rounded-2xl border-2 sm:border-3 border-[#111] shadow-[3px_3px_0px_#111] inline-block">Guides & Tactics</span>
          </h1>
          <p className="text-base sm:text-lg font-bold text-[#555] max-w-2xl mx-auto leading-relaxed">
            Master the dictionary, trap opponents with killer ending letters, and climb the leaderboard in real-time word chain battles.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl p-6 sm:p-7 transition-all duration-200 hover:-translate-y-1.5 flex flex-col justify-between"
              style={{
                background: '#fff',
                border: '3px solid #111',
                boxShadow: '4px 4px 0 #111',
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span
                    className="text-xs font-black px-3 py-1 rounded-full border border-[#111] uppercase tracking-wide"
                    style={{ background: '#FFC928', color: '#111' }}
                  >
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#888]">
                    <time dateTime={post.date}>{post.date}</time>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-black mb-3 text-[#111] group-hover:text-[#000] leading-snug">
                  {post.title}
                </h2>

                <p className="text-sm font-medium text-[#555] mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t-2 border-neutral-100 flex items-center justify-between text-xs font-black text-[#111]">
                <span className="group-hover:translate-x-0.5 transition-transform">Read Full Guide →</span>
                <span className="text-[#999]">WordChain Blog</span>
              </div>
            </Link>
          ))}
        </div>

        {/* SEO Bottom Content Box */}
        <div
          className="mt-16 p-8 rounded-2xl border-3 border-[#111] shadow-[4px_4px_0px_#111] bg-white"
        >
          <h2 className="text-2xl font-black mb-4 text-[#111]">
            Why Word Chain is the #1 Word Game of 2025
          </h2>
          <div className="text-sm text-[#444] space-y-3 leading-relaxed">
            <p>
              Whether you call it <strong>Word Chain</strong>, <strong>Shiritori</strong>, <strong>Word Relay</strong>, or <strong>Last Letter First Letter</strong>, sequential word matching is the world's most accessible verbal combat.
            </p>
            <p>
              Traditional word games like Scrabble or Boggle can take 45+ minutes to set up and play. WordChain delivers rapid 10-second adrenaline rushes directly in your web browser. Play 1v1 with friends, jump into public matchmaking, or hone your lexical speed in offline pass-and-play and solo modes.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/create"
              className="px-5 py-2.5 rounded-xl font-black text-xs uppercase bg-[#FFC928] text-[#111] border-2 border-[#111] shadow-[2px_2px_0px_#111] hover:scale-105 transition-transform"
            >
              Play WordChain Free
            </Link>
            <Link
              href="/practice"
              className="px-5 py-2.5 rounded-xl font-black text-xs uppercase bg-[#111] text-[#FFC928] border-2 border-[#111] shadow-[2px_2px_0px_#111] hover:scale-105 transition-transform"
            >
              Solo Practice vs AI
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
