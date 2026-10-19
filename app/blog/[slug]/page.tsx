import type { Metadata } from 'next';
import Link from 'next/link';

type BlogContent = {
  title: string;
  description: string;
  keywords: string[];
  date: string;
  readTime: string;
  faq?: Array<{ question: string; answer: string }>;
  content: string;
};

const posts: Record<string, BlogContent> = {
  'what-is-word-chain-game': {
    title: 'What Is a Word Chain Game? Complete Guide for Beginners',
    description: 'Learn everything about word chain games — rules, history, variations like Shiritori, and how to play online with friends for free.',
    keywords: ['what is word chain', 'word chain game rules', 'how to play word chain', 'word chain for beginners', 'word chain explained'],
    date: '2025-10-15',
    readTime: '8 min read',
    faq: [
      {
        question: 'What is the main rule of word chain?',
        answer: 'Each new word submitted must start with the final letter of the previous word. Words cannot be repeated, and only real dictionary words count.',
      },
      {
        question: 'Is WordChain free to play?',
        answer: 'Yes! WordChain is 100% free with no downloads, account requirements, or paywalls. Play directly in your web browser.',
      },
      {
        question: 'Can you play word chain with 2 players?',
        answer: 'Yes, word chain is popular as a 1v1 duel or in multiplayer lobbies with 3 to 8 players.',
      },
    ],
    content: `
## What Is a Word Chain Game?

A **word chain game** (also called *word relay*, *last letter game*, or *word link*) is a classic vocabulary game where players take turns saying or typing words. The catch? **Each new word must start with the last letter of the previous word.**

### Example Word Chain
\`\`\`
CAT → TOP → PEN → NET → TAP → PEAR → RAIN
\`\`\`

### Basic Word Chain Rules
1. **Last Letter Rule**: Your word must begin with the final letter of the previous word.
2. **Valid Words Only**: Only real dictionary words count — no made-up words or proper nouns.
3. **No Repeats**: Once a word is used, it cannot be used again in the same game.
4. **Time Pressure**: In competitive word chain games like WordChain, you have a countdown timer for each turn.

## History of Word Chain Games

Word chain games have been played for **centuries across many cultures**:

- **Shiritori (しりとり)** — Japan's most popular word game, played with Japanese words where the next word starts with the last syllable.
- **Word Relay** — Common in English-speaking countries as a party game or classroom activity.
- **Antakshari** — An Indian variation using songs instead of words.
- **Städte-Land-Fluss** — A German variation combining categories with word chains.

## How to Play Word Chain Online

The easiest way to play word chain online is **WordChain** — a free browser-based multiplayer word chain game:

1. **Visit WordChain** — no download or signup needed
2. **Choose a Mode** — Quick Play (matchmaking), Friends (private rooms), Practice (solo vs AI), or Local (pass-and-play)
3. **Set Your Rules** — word length, timer, lives, categories
4. **Start Chaining** — type words fast, chain smart, win the game!

## Why Word Chain Games Are Great for Your Brain

Research shows word chain games improve:
- **Vocabulary** — you'll discover new words constantly
- **Processing Speed** — time pressure trains fast thinking
- **Working Memory** — remembering used words and planning ahead
- **Spelling** — typing words correctly is essential

[Play WordChain Free Now →](/create)
    `,
  },
  'word-chain-strategies-to-win': {
    title: '10 Word Chain Strategies to Win Every Game',
    description: 'Master word chain with these proven strategies: letter frequency analysis, defensive words, chain-ending tactics, and vocabulary expansion tips.',
    keywords: ['word chain strategy', 'how to win word chain', 'word chain tips', 'word game tactics', 'best word chain moves'],
    date: '2025-10-12',
    readTime: '6 min read',
    faq: [
      {
        question: 'What is the best letter to trap opponents with in word chain?',
        answer: 'Letters like X, Z, Q, and J are the hardest letters to begin words with. Ending your word in X (e.g., MATRIX, CLIMAX) severely limits your opponent options.',
      },
      {
        question: 'How do I avoid getting stuck in a word chain duel?',
        answer: 'Memorize at least 3-4 go-to words for rare letters like X (XYLOPHONE, XENON, XEROX) and Q (QUIZ, QUICK, QUARK) so you never panic under the timer.',
      },
    ],
    content: `
## Master the Art of Word Chaining

Winning at word chain games isn't just about having a big vocabulary — it's about **tactical letter manipulation**. Here are 10 proven strategies to outplay opponents in WordChain.

### 1. Weaponize Hard Letters (X, Z, Q, J)
Most English words don't start with X, Z, Q, or J. If you can end your word with one of these letters, you force your opponent into a tiny corner:
- Words ending in **X**: *CLIMAX, MATRIX, RELAX, SPHINX, REFLEX, COMPLEX*
- Words ending in **Z**: *WALTZ, BLITZ, QUIZ, JAZZ, TOPAZ*

### 2. Prepare Escape Words for Trap Letters
If your opponent drops you on **X** or **Q**, you need instant muscle-memory responses:
- **X starting words**: *XYLOPHONE, XENON, XEROX, XYLOSE*
- **Q starting words**: *QUIZ, QUICK, QUIRK, QUANTUM, QUILT*
- **Z starting words**: *ZEBRA, ZERO, ZEAL, ZENITH, ZINC*

### 3. Cycle Back to Your Strength
Notice letters your opponent struggles with. If they take 8 seconds on letter **E**, systematically steer the chain back to **E** using words like *TABLE, BRIDGE, HORSE*.

### 4. Monitor Time & Conserve Lifelines
In elimination games, speed matters more than word length. A 3-letter word entered in 1 second is better than an 8-letter word entered at 0.5s remaining.

[Test Your Strategies in Practice Mode →](/practice)
    `,
  },
  'best-online-word-games-2025': {
    title: 'Best Free Online Word Games in 2025 — Top 10 Ranked',
    description: 'Discover the best free online word games of 2025 including WordChain, Wordle, word ladders, and multiplayer vocabulary battles.',
    keywords: ['best online word games', 'free word games 2025', 'multiplayer word games', 'browser word games', 'wordle alternatives'],
    date: '2025-10-10',
    readTime: '10 min read',
    content: `
## The Top Free Online Word Games in 2025

Word games have surged in popularity. Here are the top 5 games you can play right now in your browser without downloads or fees:

### 1. WordChain (Rank #1 for Real-Time Multiplayer)
WordChain is the premier real-time multiplayer word chain battler. Featuring customizable timers, custom word lengths, letter restrictions, private lobbies, and pass-and-play local mode.

### 2. Wordle by NYT
The daily 5-letter guessing game that took the world by storm. Great for daily morning routines, though limited to one puzzle a day.

### 3. Shiritori Online
Traditional Japanese syllabic word chain game popular among language learners and anime communities.

### 4. Semantle
A semantic association word game where you guess words based on their contextual meaning rather than spelling.

### 5. Contexto
Similar to Semantle, uses artificial intelligence models to rank words by conceptual distance to a secret target word.

[Play WordChain Free →](/create)
    `,
  },
  'shiritori-vs-word-chain': {
    title: "Shiritori vs Word Chain — What's the Difference?",
    description: "Explore the differences between Japanese Shiritori and English word chain games. Learn rules, cultural origins, and which version to play online.",
    keywords: ['shiritori vs word chain', 'shiritori rules', 'japanese word games', 'word chain history', 'shiritori in english'],
    date: '2025-10-08',
    readTime: '5 min read',
    content: `
## Shiritori (しりとり) and English Word Chain: A Cultural Comparison

Both **Shiritori** and **Word Chain** share the core principle of sequential connection, but they have key structural differences:

| Feature | Japanese Shiritori | English Word Chain (WordChain) |
|---|---|---|
| Unit of Connection | Last Syllable (Mora) | Last Character / Letter |
| Instant Loss Rule | Word ending in 'N' (ん) | Running out of time / duplicate word |
| Language | Japanese (Kana/Kanji) | English (Dictionary-backed) |
| Platform | Parlor game / Mobile | Web Browser (WordChain) |

In Japanese Shiritori, words ending with the mora **N (ん)** lose instantly because no standard Japanese word begins with **N**. In English WordChain, difficulty comes from letter scarcity (like X, Z, Q) and timer pressure!

[Try English WordChain Now →](/matchmaking)
    `,
  },
  'vocabulary-building-word-games': {
    title: 'How Word Chain Games Improve Your Vocabulary (Backed by Science)',
    description: 'Scientific research shows word games boost vocabulary, cognitive speed, and memory. Learn how playing WordChain can make you smarter.',
    keywords: ['vocabulary building games', 'educational word games', 'brain games for adults', 'improve english vocabulary', 'word games cognitive benefits'],
    date: '2025-10-05',
    readTime: '7 min read',
    content: `
## The Cognitive Science Behind Word Chaining

Neuroscience demonstrates that rapid word retrieval games stimulate the left temporal lobe and frontal cortex:

1. **Active Lexical Retrieval**: Searching memory under time constraints reinforces neural pathways between spelling, pronunciation, and meaning.
2. **Spelling Accuracy**: Real-time validation trains your brain to eradicate common spelling slips.
3. **Working Memory Agility**: Remembering previously spoken words prevents duplicates while tracking the next letter.

Playing 10 minutes of WordChain daily improves vocabulary fluency and conversational sharpness.

[Play Solo Practice Mode →](/practice)
    `,
  },
  'multiplayer-word-games-with-friends': {
    title: 'Top 5 Multiplayer Word Games to Play with Friends Online',
    description: 'Looking for word games to play with friends? Here are the 5 best free multiplayer word games you can play in your browser right now.',
    keywords: ['multiplayer word games with friends', 'online word games 2 player', 'browser games with friends', 'word games online free', 'party word games'],
    date: '2025-10-01',
    readTime: '6 min read',
    content: `
## Best Multiplayer Word Games for Game Night

Looking for games that combine friendly competition with quick thinking? Here are the top picks:

1. **WordChain**: Real-time room codes, elimination lives, and custom timers.
2. **Codenames Online**: Team-based spy word association game.
3. **Skribbl.io**: Word guessing through fast-paced doodles.
4. **BombParty**: Rapid typing word association under ticking bomb clocks.
5. **Stop / Scattergories**: Letter category blitz game.

WordChain is completely free with no installations required. Create a room code in seconds and share the link with your group.

[Create Private Match →](/create)
    `,
  },
  'hard-letters-word-chain-q-x-z-j': {
    title: 'Hard Letters in Word Chain: Words Ending in Q, X, Z, J & V (Trap List)',
    description: 'Win word chain by trapping opponents with difficult ending letters. Complete word list for words ending in X, Z, J, Q, and V plus counter-strategies.',
    keywords: ['words ending in x', 'words ending in z', 'words ending in q', 'words ending in j', 'word chain trap words', 'hard letters word chain'],
    date: '2025-10-18',
    readTime: '7 min read',
    faq: [
      {
        question: 'Are there English words ending in Q?',
        answer: 'Yes! Legal dictionary words ending in Q include SUQ, TRANQ, CINQ, and COLQ.',
      },
      {
        question: 'What words end in J?',
        answer: 'Valid English dictionary words ending in J include RAJ, HADJ, and SOJ.',
      },
      {
        question: 'How do you counter an X ending?',
        answer: 'Always have XYLOPHONE, XENON, XEROX, or XYST ready in your memory.',
      },
    ],
    content: `
## The Ultimate Word Chain Trap Playbook

In high-stakes WordChain matches, games are won and lost on **difficult terminal letters**. If you end a word on a rare letter, your opponent must instantly produce a word starting with that letter within 5 to 10 seconds.

Here is the authoritative cheat sheet of offensive trap words and defensive recovery words.

### 1. Words Ending in X (The Classic Trap)
Ending in X is the most reliable trap because while many words end in X, very few start with X:

| Attack Word (Ends in X) | Definition / Tip | Counter Word (Starts with X) |
|---|---|---|
| **CLIMAX** | High impact, common 6-letter word | **XYLOPHONE** |
| **MATRIX** | Easy to remember sci-fi term | **XENON** (noble gas) |
| **SPHINX** | Contains rare consonants | **XEROX** |
| **RELAX** | Common 5-letter word | **XYST** (architectural portico) |
| **REFLEX** | Quick biological term | **XENOPUS** (aquatic frog) |
| **COMPLEX** | Great 7-letter submission | **XYLEM** (plant tissue) |

### 2. Words Ending in Z
Forcing your opponent to start with Z limits them to a tiny fraction of the dictionary:

- **QUIZ** (Double lethal: starts with Q, ends with Z!)
- **WALTZ** (Elegant ballroom dance)
- **BLITZ** (High-energy attack word)
- **TOPAZ** (Precious gemstone)
- **JAZZ** (Starts with J, ends with Z — ultimate double threat)
- **HORIZON** ❌ (Wait! Horizon ends in N, watch your spelling!)
- **FIZ** / **BUZZ** / **FUZZ** / **RAZZ**

### 3. Words Ending in Q (The Tournament Killer)
Very few players know words ending in Q exist in standard English lexicons:
- **SUQ** (Middle Eastern marketplace, variant of souk)
- **TRANQ** (Short for tranquilizer)
- **CINQ** (The number 5 in dice and cards)

### 4. Countering Traps Like a Pro
When someone attacks you with an X or Q, **do not panic**:
- If given **X**: Immediately type **XENON** or **XYLOPHONE**.
- If given **Q**: Immediately type **QUIZ**, **QUICK**, or **QUARK**.
- If given **Z**: Immediately type **ZEBRA**, **ZERO**, or **ZEAL**.

[Practice Trap Defense Solo →](/practice)
    `,
  },
  'word-chain-rules-variations': {
    title: 'Word Chain Game Rules: Official Variations & Custom Settings Guide',
    description: 'The definitive guide to word chain rules: standard rules, Shiritori rules, minimum word lengths, category constraints, elimination mechanics, and timer setups.',
    keywords: ['word chain rules', 'how to play word chain', 'word chain variations', 'shiritori english rules', 'word chain timer rules', 'official word chain format'],
    date: '2025-10-17',
    readTime: '9 min read',
    faq: [
      {
        question: 'Can you use proper nouns like country or city names in WordChain?',
        answer: 'By default, proper nouns (like Paris, John, Google) are disallowed in competitive word chain unless playing under specialized geography category presets.',
      },
      {
        question: 'What is the standard turn timer for online word chain?',
        answer: 'Standard competitive timer is 10 seconds per turn. Blitz mode uses 5 seconds, while relaxed casual modes allow 15 to 20 seconds.',
      },
    ],
    content: `
## Official Rules and Modern Formats of Word Chain

Word chain is among the oldest linguistic games in human history. To ensure fair competition, standard rules and competitive formats have been codified in **WordChain**.

### The Core Universal Rules
1. **The Linking Rule**: The first character of Player B's word must match the terminal character of Player A's word.
2. **Dictionary Validity**: All submissions must exist in recognized English language lexicons (e.g. Scrabble TWL / SOWPODS dictionaries).
3. **No Duplicates**: A word submitted once in a session cannot be reused by any player.
4. **Time Constraint**: Submissions made after the countdown timer hits 0 count as a forfeit of that turn or life.

### Popular Game Variations
- **Elimination Lives Mode**: Each player starts with 3 hearts. Submitting an invalid word, repeating a word, or running out of time loses a life. Last player standing wins.
- **Minimum Length Restrictions**: Casual mode allows 3+ letters. Hardcore mode mandates 5+, 6+, or 7+ letter words to eliminate low-effort words like *CAT* and *DOG*.
- **Category Specific Chaining**: Chaining restricted exclusively to Animals, Food, Science, or Geography.

[Create a Custom Rule Match →](/create)
    `,
  },
  'best-word-chain-words': {
    title: '100+ Best Words for Word Chain: Attack, Trap & Recovery Lists',
    description: 'The ultimate cheat sheet of the best words to play in word chain games. Learn offensive trap words, emergency vowel recovery words, and memory hacks.',
    keywords: ['best words for word chain', 'word chain cheat sheet', 'word chain attack words', 'word chain words list', 'winning words word chain'],
    date: '2025-10-16',
    readTime: '8 min read',
    faq: [
      {
        question: 'What are the best words to play on letter E?',
        answer: 'Words like EQUINOX (ends in X), EPITAPH (ends in H), and EXQUISITE (ends in E) provide great offensive traps.',
      },
      {
        question: 'How do you recover when you draw a rare vowel like U?',
        answer: 'Words starting with U like UMBRELLA, UNIQUE, UNIVERSE, and UTOPIA give you instant exits.',
      },
    ],
    content: `
## The Curated Word Chain Arsenal

When the timer is clicking down from 5 seconds, your mind shouldn't be searching through 100,000 dictionary entries — it should draw from a pre-loaded arsenal of high-percentage words.

### High-Power Attack Words (Drop Opponents on Hard Letters)
- **Ends in X**: CLIMAX, MATRIX, SPHINX, REFLEX, APPENDIX, ANTHRAX, EQUINOX
- **Ends in Z**: BLITZ, TOPAZ, WALTZ, CHINTZ, QUARTZ, SNOOZE
- **Ends in J**: RAJ, HADJ
- **Ends in K**: SHOCK, PLANK, BRICK, TRUCK, SPARK

### Essential Recovery Words for Rare Starting Letters
When opponents drop you on difficult letters, have these instantly typed:
- **Starts with Q**: QUICK, QUIET, QUEEN, QUOTE, QUILT, QUARRY, QUANTUM
- **Starts with X**: XENON, XYLOPHONE, XEROX, XYST
- **Starts with Z**: ZEAL, ZERO, ZONE, ZINC, ZODIAC, ZEPHYR
- **Starts with V**: VAPOR, VIVID, VELVET, VECTOR, VORTEX

[Test Your Vocabulary in Practice Mode →](/practice)
    `,
  },
  'word-chain-solver-tips': {
    title: 'How to Think of Words Faster in Word Chain: Mental Tactics & Speed',
    description: 'Sticking on letters? Train your lexical recall with speed techniques, phonetic anchoring, and categorized mental filing to never run out of words.',
    keywords: ['think of words faster', 'word chain solver tips', 'word game mental tips', 'vocabulary speed training', 'never lose word chain', 'lexical recall'],
    date: '2025-10-14',
    readTime: '7 min read',
    faq: [
      {
        question: 'Why do I blank out under timer pressure in word games?',
        answer: 'Cortisol and adrenaline inhibit prefrontal cortex recall when stressed. Practicing with rhythmic breathing and chunking words into sensory themes eliminates brain freeze.',
      },
      {
        question: 'What is the fastest mental technique for finding words?',
        answer: 'Phonetic anchoring: visualize the first sound and scan visual rooms in your house for objects matching that letter.',
      },
    ],
    content: `
## Mental Agility: How Pro Word Players Think 10x Faster

Have you ever stared at a letter for 8 seconds with total brain freeze, only to think of 10 words the second the timer expired? You are not lacking vocabulary — you are suffering from **retrieval bottlenecking**.

Here is how competitive word game players eliminate brain freeze:

### 1. The "Sensory Room" Technique
Instead of searching an abstract alphabet in your head, mentally scan a physical environment:
- **Kitchen**: Knife, Kettle, Kiwi, Kitchen, Kale
- **Garage**: Gear, Grease, Gasket, Glove
- **Nature**: Grass, Granite, Geyser, Glacier

Anchoring to physical objects triggers visual memory, which accesses vocabulary twice as fast as abstract grammatical lookup.

### 2. Prefix & Suffix Pivoting
When handed a letter, immediately attach common prefixes:
- Handed **R**: RE- (*Return, React, Rewind, Rebuild*)
- Handed **U**: UN- (*Unlock, Unpack, Undo, Unfair*)
- Handed **D**: DE- (*Defend, Detail, Decide, Deploy*)

### 3. Practice With Shorter Timers
Train on WordChain with **5-second turn timers** in Solo Practice mode. Once your brain adapts to 5-second blitzes, a standard 10-second multiplayer match feels like an eternity.

[Train Solo with Instant Feedback →](/practice)
    `,
  },
};

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: 'Post Not Found | WordChain' };
  return {
    title: `${post.title} | WordChain Blog`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `https://wordchain.in/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['WordChain'],
      url: `https://wordchain.in/blog/${slug}`,
      siteName: 'WordChain',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPost({ params }: { params: Params }) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: '#FAF7EE' }}>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blog" className="underline font-bold" style={{ color: '#111' }}>
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://wordchain.in/blog/${slug}`,
    },
    author: {
      '@type': 'Organization',
      name: 'WordChain Team',
      url: 'https://wordchain.in',
    },
    publisher: {
      '@type': 'Organization',
      name: 'WordChain',
      url: 'https://wordchain.in',
    },
    keywords: post.keywords.join(', '),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wordchain.in' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://wordchain.in/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://wordchain.in/blog/${slug}` },
    ],
  };

  const faqSchema = post.faq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <main className="min-h-screen" style={{ background: '#FAF7EE' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <article className="max-w-3xl mx-auto px-4 pt-20 pb-24">
        {/* Breadcrumb nav */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-bold text-[#666]">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:underline">Blog</Link>
          <span>/</span>
          <span className="text-[#111] truncate max-w-[200px] sm:max-w-md">{post.title}</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight" style={{ color: '#111' }}>
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-bold text-[#777]">
            <time dateTime={post.date}>{post.date}</time>
            <span>•</span>
            <span>{post.readTime}</span>
            <span>•</span>
            <span className="text-[#111] bg-[#FFC928] px-2.5 py-0.5 rounded-full border border-[#111]">
              WordChain Strategy
            </span>
          </div>
        </header>

        <div
          className="prose prose-lg max-w-none text-[#222]"
          style={{ lineHeight: '1.8' }}
          dangerouslySetInnerHTML={{
            __html: simpleMarkdown(post.content),
          }}
        />

        {/* Interactive FAQ Section */}
        {post.faq && post.faq.length > 0 && (
          <section className="mt-14 pt-8 border-t-2 border-[#111]">
            <h2 className="text-2xl font-black mb-6 text-[#111]">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {post.faq.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border-2 border-[#111] shadow-[3px_3px_0px_#111]"
                >
                  <h3 className="text-base font-black text-[#111] mb-2">{item.question}</h3>
                  <p className="text-sm font-medium text-[#444] leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA Banner */}
        <div
          className="mt-14 p-8 rounded-2xl text-center border-3 border-[#111] shadow-[5px_5px_0px_#111]"
          style={{ background: '#FFC928' }}
        >
          <h3 className="text-2xl sm:text-3xl font-black mb-2 text-[#111]">
            Ready to Chain Words?
          </h3>
          <p className="mb-6 font-bold text-sm sm:text-base text-[#222] max-w-lg mx-auto">
            Put your vocabulary to the test in real-time multiplayer battles or practice solo against AI. Free, no download needed.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/create"
              className="px-6 py-3 rounded-xl font-black text-sm uppercase transition-transform hover:scale-105 bg-[#111] text-[#FFC928] border-2 border-[#111] shadow-[3px_3px_0px_#111]"
            >
              Create Room →
            </Link>
            <Link
              href="/practice"
              className="px-6 py-3 rounded-xl font-black text-sm uppercase transition-transform hover:scale-105 bg-white text-[#111] border-2 border-[#111] shadow-[3px_3px_0px_#111]"
            >
              Solo Practice Mode
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}

function simpleMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 style="font-size:1.25rem;font-weight:900;margin-top:2rem;margin-bottom:0.5rem;color:#111">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size:1.6rem;font-weight:900;margin-top:2.5rem;margin-bottom:0.75rem;color:#111;border-bottom:2px solid #e5e5e5;padding-bottom:0.4rem">$1</h2>')
    .replace(/```([\s\S]*?)```/g, '<pre style="background:#111;color:#FFC928;padding:1rem 1.25rem;border-radius:1rem;overflow-x:auto;font-family:monospace;font-size:0.9rem;margin:1.25rem 0;border:2px solid #111"><code>$1</code></pre>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#111;background:#FFC928;font-weight:800;padding:0.15rem 0.4rem;border-radius:0.35rem;border:1px solid #111;text-decoration:none">$1</a>')
    .replace(/^\| (.+)$/gm, (match) => {
      const cells = match.split('|').filter(c => c.trim() && !c.includes('---'));
      if (cells.length === 0) return '';
      const row = cells.map(c => `<td style="padding:0.6rem 0.8rem;border:1.5px solid #111;font-size:0.9rem">${c.trim()}</td>`).join('');
      return `<tr>${row}</tr>`;
    })
    .replace(/(<tr>[\s\S]*?<\/tr>\n?)+/g, '<div style="overflow-x:auto;margin:1.25rem 0"><table style="width:100%;border-collapse:collapse;background:#fff;border:2px solid #111;border-radius:0.5rem;overflow:hidden">$&</table></div>')
    .replace(/^(\d+)\. (.+)$/gm, '<li style="margin-bottom:0.4rem;list-style:decimal;margin-left:1.5rem"><strong>$1.</strong> $2</li>')
    .replace(/^- (.+)$/gm, '<li style="margin-bottom:0.4rem;list-style:disc;margin-left:1.5rem">$1</li>')
    .replace(/\n\n/g, '</p><p style="margin-bottom:1rem">')
    .replace(/^(?!<[hupltoa\d]|<div)(.+)$/gm, '<p style="margin-bottom:1rem">$1</p>');
}
