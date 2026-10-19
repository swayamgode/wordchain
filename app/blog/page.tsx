import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Word Game Blog — Tips, Strategies & Guides | WordChain',
  description:
    'Learn word chain game strategies, vocabulary building tips, Shiritori tactics, and multiplayer word game guides. Improve your word game skills with expert articles.',
  keywords: [
    'word chain tips', 'word game strategy', 'how to win word chain',
    'shiritori strategy', 'vocabulary building games', 'word game blog',
    'best words for word chain', 'word chain tricks', 'word relay tips',
  ],
  alternates: { canonical: 'https://wordchain-5hhv.onrender.com/blog' },
};

const blogPosts = [
  {
    slug: 'what-is-word-chain-game',
    title: 'What Is a Word Chain Game? Complete Guide for Beginners',
    excerpt: 'Learn everything about word chain games — rules, history, variations like Shiritori, and how to play online with friends for free.',
    date: '2025-10-15',
    readTime: '8 min read',
    category: 'Guide',
  },
  {
    slug: 'word-chain-strategies-to-win',
    title: '10 Word Chain Strategies to Win Every Game',
    excerpt: 'Master word chain with these proven strategies: letter frequency analysis, defensive words, chain-ending tactics, and vocabulary expansion tips.',
    date: '2025-10-12',
    readTime: '6 min read',
    category: 'Strategy',
  },
  {
    slug: 'best-online-word-games-2025',
    title: 'Best Free Online Word Games in 2025 — Top 10 Ranked',
    excerpt: 'Discover the best free online word games of 2025 including WordChain, Wordle, word ladders, and multiplayer vocabulary battles.',
    date: '2025-10-10',
    readTime: '10 min read',
    category: 'Roundup',
  },
  {
    slug: 'shiritori-vs-word-chain',
    title: 'Shiritori vs Word Chain — What\'s the Difference?',
    excerpt: 'Explore the differences between Japanese Shiritori and English word chain games. Learn rules, cultural origins, and which version to play online.',
    date: '2025-10-08',
    readTime: '5 min read',
    category: 'Culture',
  },
  {
    slug: 'vocabulary-building-word-games',
    title: 'How Word Chain Games Improve Your Vocabulary (Backed by Science)',
    excerpt: 'Scientific research shows word games boost vocabulary, cognitive speed, and memory. Learn how playing WordChain can make you smarter.',
    date: '2025-10-05',
    readTime: '7 min read',
    category: 'Education',
  },
  {
    slug: 'multiplayer-word-games-with-friends',
    title: 'Top 5 Multiplayer Word Games to Play with Friends Online',
    excerpt: 'Looking for word games to play with friends? Here are the 5 best free multiplayer word games you can play in your browser right now.',
    date: '2025-10-01',
    readTime: '6 min read',
    category: 'Roundup',
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen" style={{ background: '#FAF7EE' }}>
      {/* Hero */}
      <section className="pt-24 pb-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#111', fontFamily: 'system-ui' }}>
          Word Game <span style={{ color: '#FFC928' }}>Blog</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: '#555' }}>
          Tips, strategies, and guides to dominate word chain games. Level up your vocabulary and outsmart your opponents.
        </p>
      </section>

      {/* Blog Grid */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: '#fff',
                border: '3px solid #111',
                boxShadow: '4px 4px 0 #111',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: '#FFC928', color: '#111' }}
                >
                  {post.category}
                </span>
                <span className="text-xs" style={{ color: '#888' }}>
                  {post.date}
                </span>
                <span className="text-xs" style={{ color: '#888' }}>
                  • {post.readTime}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-2" style={{ color: '#111' }}>
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#555' }}>
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Content Block */}
      <section className="max-w-3xl mx-auto px-4 pb-24">
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#111' }}>
          About WordChain — The Best Free Online Word Chain Game
        </h2>
        <div className="prose" style={{ color: '#444', lineHeight: '1.8' }}>
          <p>
            WordChain is the ultimate free online word chain game designed for players who love vocabulary challenges
            and competitive word games. Whether you call it word chain, word relay, last letter game, or even the
            English version of Shiritori — WordChain brings the classic word game to life with real-time multiplayer,
            customizable rules, and stunning doodle monster visuals.
          </p>
          <p className="mt-4">
            Unlike simple word games, WordChain offers multiple game modes including Quick Play matchmaking,
            private rooms for playing with friends, solo practice against AI bots, and local pass-and-play for
            game nights. Every match can be customized with different word lengths (3–8 letters or any length),
            turn timers (5–60 seconds), lives (1–10 or unlimited), and word categories (animals, food, countries, technology).
          </p>
          <p className="mt-4">
            Word chain games have been played for centuries across cultures — from Japanese Shiritori to English
            word ladders and relay games. WordChain modernizes this timeless game format with real-time WebSocket
            technology, ensuring instant word validation, live turn tracking, and seamless multiplayer experiences
            across all devices. Play on your phone, tablet, or desktop — no download required.
          </p>
        </div>
      </section>
    </main>
  );
}
