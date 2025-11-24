import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Mazingira 360" }];
}

// Landing Page
export default function Home() {
  return (
    <div className="font-sans leading-relaxed text-gray-800 bg-white mt-24">
      {/* <Header /> */}
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}

// Components

const Header = () => (
  <header className="bg-white py-4 border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-6xl mx-auto px-5 flex justify-between items-center">
      <h2 className="m-0 text-2xl font-bold text-green-600">Mazingira 360</h2>
      <nav>
        <a
          href="#features"
          className="ml-5 text-gray-600 font-medium hover:text-green-600"
        >
          About
        </a>
        <a
          href="#contact"
          className="ml-5 text-gray-600 font-medium hover:text-green-600"
        >
          Contact Us
        </a>
        <a
          href="/signup"
          className="ml-5 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Log In
        </a>
      </nav>
    </div>
  </header>
);

const HeroSection = () => (
  <section
    className="relative py-20 text-center bg-cover bg-center"
    style={{ backgroundImage: "url('/forest.jpg')" }}
  >
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="max-w-6xl mx-auto px-5 flex flex-col items-center">
      <h1 className="relative text-5xl font-bold m-0 mb-4 leading-tight text-white">
        Protecting Kenya's Forests Together
      </h1>
      <p className="relative text-lg text-gray-200 max-w-2xl mx-auto mb-8">
        Join our community-driven forest protection platform. Report threats,
        learn conservation, and earn rewards for your efforts.
      </p>
      <Link
        to="/signup"
        className="relative bg-green-700 text-white border-none py-4 px-8 text-base font-semibold rounded-lg cursor-pointer transition-colors hover:bg-green-500"
      >
        Get Started
      </Link>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section id="features" className="py-20">
    <div className="max-w-6xl mx-auto px-5">
      <h2 className="text-center text-4xl font-bold mb-12">Core Features</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          title="Real-time Monitoring"
          description="Satellite imagery provide 24/7 forest surveillance."
        />
        <FeatureCard
          title="Community Reporting"
          description="Easy to use reporting system for citizens to alert authorities."
        />
        <FeatureCard
          title="Educational Content"
          description="Learn about conservation and earn rewards for participation."
        />
        <FeatureCard
          title="Token Rewards"
          description="Earn tokens for conservation activities and redeem for rewards"
        />
        <FeatureCard
          title="Analytics Dashboard"
          description="Comprehensive insights for forest management professionals."
        />
        <FeatureCard
          title="Mobile App"
          description="Access all features on-the-go with our mobile application."
        />
      </div>
    </div>
  </section>
);

const FeatureCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="bg-gray-50 p-8 rounded-lg text-center border border-gray-200">
    <h3 className="text-2xl font-bold mb-3">{title}</h3>
    <p>{description}</p>
  </div>
);
<elevenlabs-convai agent-id="agent_2801kanjr4p6exk8hmxpany2vq53"></elevenlabs-convai><script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>

const Footer = () => (
  <footer id="contact" className="bg-green-800 text-white py-5 text-center">
    <div className="max-w-6xl mx-auto px-5">
      <p>
        &copy; {new Date().getFullYear()} Mazingira 360. All Rights Reserved.
      </p>
    </div>
  </footer>
);
