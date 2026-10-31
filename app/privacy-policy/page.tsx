import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { TopoDoodlePattern } from '../../components/doodles/DoodleBackground';
import { AdContainer } from '../../components/ads/AdContainer';
import { AdUnit } from '../../components/ads/AdUnit';
import { Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — WordChain',
  description:
    'Comprehensive Privacy Policy for WordChain (wordchain.in). Details on data storage, cookies, local multiplayer guest state, Vercel analytics, and Google advertising technologies.',
  alternates: {
    canonical: 'https://wordchain.in/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy — WordChain',
    description: 'Learn how WordChain handles user privacy, local storage, cookies, and advertising partners.',
    url: 'https://wordchain.in/privacy-policy',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'October 31, 2026';

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#FAF7EE]">
      <TopoDoodlePattern opacity={0.06} />
      <Navbar />

      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 flex-1 space-y-8">
        <section className="space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#FFC928] text-xs font-black uppercase px-3 py-1 rounded-full border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
            <Shield size={14} />
            <span>Legal Transparency</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm font-bold text-[#666666]">
            Last Updated: {lastUpdated} &bull; Effective Date: October 2025
          </p>
        </section>

        <article className="doodle-card p-6 sm:p-10 bg-white space-y-6 text-sm leading-relaxed text-[#333333]">
          <section className="space-y-2">
            <h2 className="text-xl font-black text-[#111111] flex items-center gap-2">
              <Eye size={20} /> 1. Overview &amp; Commitment
            </h2>
            <p>
              At <strong>WordChain</strong> (accessible at <a href="https://wordchain.in" className="underline font-bold text-[#111111]">wordchain.in</a>), player privacy is of utmost importance. WordChain provides free, real-time multiplayer word games and RGB color challenges directly in the web browser.
            </p>
            <p>
              We do not require account registration or passwords to play. Most game sessions run purely in guest mode with ephemeral local storage. This policy outlines how information is gathered, managed, and safeguarded when using our services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-black text-[#111111] flex items-center gap-2">
              <Lock size={20} /> 2. Information We Collect
            </h2>
            <p>
              Depending on how you interact with our platform, we may collect the following types of data:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-medium">
              <li>
                <strong>Guest Profile &amp; Preferences:</strong> When you play, we save your chosen nickname, selected monster avatar, and sound volume preferences in your browser&apos;s <code>localStorage</code>. This data stays on your device and is not sold.
              </li>
              <li>
                <strong>Gameplay &amp; Room Session Data:</strong> In multiplayer rooms, temporary room codes, submitted words, color guesses, and turn timers are transmitted across WebSockets/Socket.IO to synchronize gameplay among participants. Room states are ephemeral and purged from server memory upon completion.
              </li>
              <li>
                <strong>Device &amp; Usage Information:</strong> When accessing our website, web servers and hosting infrastructure (such as Vercel) automatically log standard diagnostic data, including your IP address, browser user-agent, operating system, referring URL, and page timestamps.
              </li>
            </ul>
          </section>

          {/* Ad Container Placement */}
          <AdContainer minHeight="100px">
            <AdUnit slot="privacy-policy-mid" />
          </AdContainer>

          <section className="space-y-2">
            <h2 className="text-xl font-black text-[#111111] flex items-center gap-2">
              <FileText size={20} /> 3. Cookies, Web Beacons &amp; Local Storage
            </h2>
            <p>
              WordChain uses browser local storage to maintain session persistence and essential gameplay settings. Third-party vendors and analytics partners may also set cookies to measure traffic and deliver relevant advertising:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-medium">
              <li>
                <strong>Essential Cookies &amp; Storage:</strong> Required for site navigation, audio mute toggles, monster customization, and Progressive Web App (PWA) functionality.
              </li>
              <li>
                <strong>Analytics (Vercel Analytics):</strong> We utilize privacy-friendly, cookieless analytics to monitor overall site performance, page load speed, and visitor volumes without profiling individuals.
              </li>
              <li>
                <strong>Google AdSense &amp; Advertising Partners:</strong> Google, as a third-party vendor, uses cookies (including the DoubleClick cookie) to serve advertisements based on prior visits to this and other websites. You may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="underline font-bold text-[#111111]">Google Ads Settings</a> or <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="underline font-bold text-[#111111]">aboutads.info</a>.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-black text-[#111111] flex items-center gap-2">
              <CheckCircle2 size={20} /> 4. California (CCPA) &amp; European (GDPR/UK) Rights
            </h2>
            <p>
              Users in the European Economic Area (EEA), United Kingdom, Switzerland, and California possess statutory privacy rights:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-medium">
              <li>The right to access, rectify, or erase any personal information we hold.</li>
              <li>The right to restrict or object to certain processing operations.</li>
              <li>The right to opt out of the sale or sharing of personal information. WordChain does not sell personal identifiers.</li>
            </ul>
            <p>
              To exercise any applicable data subject rights or clear your locally stored guest data, you can simply clear your browser&apos;s site data or email us at <a href="mailto:contact@wordchain.in" className="underline font-bold text-[#111111]">contact@wordchain.in</a>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-black text-[#111111]">5. Children&apos;s Online Privacy (COPPA)</h2>
            <p>
              WordChain is designed as a family-friendly educational word game suitable for all ages. We do not knowingly collect personal identifiable information from children under the age of 13. If you believe your child has submitted personal details, please contact us immediately to have them removed.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-black text-[#111111]">6. Contact &amp; Updates</h2>
            <p>
              We may update this policy periodically to reflect changes in our games or legal standards. If you have questions concerning this Privacy Policy, please reach us at:
            </p>
            <p className="font-bold">
              WordChain Privacy Team &bull; <a href="mailto:contact@wordchain.in" className="underline">contact@wordchain.in</a>
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

