import React from "react";
import {
  Headphones,
  Star,
  Download,
  Settings,
  Heart,
  Timer,
  Palette,
  Leaf,
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-sky-50">
      {/* SEO Metadata */}
      <Head>
        <title>
          Arehna - Experience Divine Quran Recitation with Nature Sounds
        </title>
        <meta
          name="description"
          content="Enhance your Quran recitation experience with Arehna's unique combination of beautiful tilawat and calming nature sounds. Listen to the Holy Quran online with peace and tranquility."
        />
        <meta
          name="keywords"
          content="Arehna, al Quran, Quran online, Koran, recitation, Quran recitation, Quran Audio, tilawat Quran, relaxing Quran, calming, relaxing, rain sounds, natural sounds, peaceful"
        />
        <meta
          property="og:title"
          content="Arehna - Divine Quran Recitation with Nature"
        />
        <meta
          property="og:description"
          content="Experience the perfect harmony of Quranic recitation and nature sounds."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/arehna-preview.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://arehna.com" />
        <meta name="theme-color" content="#0c4a6e" />
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <section className="my-16">
          <h1 className="text-4xl md:text-4xl font-bold text-sky-900 mb-6">
            An Online Quran Recitation Platform with Nature Sounds
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Enhance your well-being through the perfect blend of Quran
            recitations and calming nature sounds.
          </p>
        </section>

        {/* What is Arehna Section */}
        <section className="mb-16" aria-labelledby="about-heading">
          <h2
            id="about-heading"
            className="text-3xl font-bold text-sky-900 mb-4"
          >
            What is Arehna?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Arehna is a unique digital platform that combines Quran recitation
            with natural sounds, accessible on both desktop & mobile browsers.
            it’s designed to promote well-being and provide a peaceful,
            immersive connection with the Holy Quran.
          </p>
        </section>

        {/* Unique Features Section */}
        <section className="mb-16" aria-labelledby="unique-heading">
          <h2
            id="unique-heading"
            className="text-3xl font-bold text-sky-900 mb-4"
          >
            What makes Arehna unique?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Arehna combines the sacred recitation of the Holy Quran with calming
            nature sounds to create a harmonious spiritual experience. Each
            recitation is carefully paired with ambient sounds like gentle rain,
            flowing water, or soft wind, creating an atmosphere that enhances
            focus and spiritual connection.
          </p>
        </section>

        {/* How to Use Section */}
        <section className="mb-16" aria-labelledby="usage-heading">
          <h2
            id="usage-heading"
            className="text-3xl font-bold text-sky-900 mb-4"
          >
            How to Use Arehna for Relaxation and Well-Being
          </h2>

          <p className="text-lg text-gray-700  mb-8">
            Relax effortlessly—just press the space bar to begin your calming
            journey.
            <br />
            With Arehna you can:
          </p>
          <ol className="list-decimal pl-6 space-y-4">
            <li className="text-lg text-gray-700">
              Browse and select a Surah to begin your spiritual journey.
            </li>
            <li className="text-lg text-gray-700">
              Choose a Qari (reciter) whose voice brings you peace.
            </li>
            <li className="text-lg text-gray-700">
              Pick natural sounds, like rain or ocean waves, to enhance
              relaxation.
            </li>
            <li className="text-lg text-gray-700">
              Adjust the audio mix between Quran recitation and nature sounds
            </li>
            <li className="text-lg text-gray-700">
              Start your session and immerse yourself in a calming, spiritual
              atmosphere.
            </li>
            <li className="text-lg text-gray-700">
              Save your preferences for quick access to your favorite settings
              next time.
            </li>
          </ol>
        </section>

        {/* Features Grid */}
        <section className="mb-16" aria-labelledby="features-heading">
          <h2
            id="features-heading"
            className="text-3xl font-bold text-sky-900 mb-8"
          >
            App Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="feature-card p-6 bg-white shadow-sm rounded-xl">
              <Headphones className="w-8 h-8 text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold text-sky-900 mb-2">
                Multiple Recitations
              </h3>
              <p className="text-gray-700">
                Access various styles of Quran recitation from respected Qaris
              </p>
            </div>
            <div className="feature-card p-6 bg-white shadow-sm rounded-xl">
              <Leaf className="w-8 h-8 text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold text-sky-900 mb-2">
                Natural Sound Library
              </h3>
              <p className="text-gray-700">
                Choose from a collection of calming nature sounds
              </p>
            </div>
            <div className="feature-card p-6 bg-white shadow-sm rounded-xl">
              <Settings className="w-8 h-8 text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold text-sky-900 mb-2">
                Audio Mixing
              </h3>
              <p className="text-gray-700">
                Customize the balance between recitation and ambient sounds
              </p>
            </div>
            <div className="feature-card p-6 bg-white shadow-sm rounded-xl">
              <Timer className="w-8 h-8 text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold text-sky-900 mb-2">
                Usage Timer
              </h3>
              <p className="text-gray-700">
                Track your daily listening journey with an infinite timer
              </p>
            </div>
            <div className="feature-card p-6 bg-white shadow-sm rounded-xl">
              <Palette className="w-8 h-8 text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold text-sky-900 mb-2">
                Personalization Experience
              </h3>
              <p className="text-gray-700">
                Customize your experience with adaptable preferences
              </p>
            </div>
            <div className="feature-card p-6 bg-white shadow-sm rounded-xl">
              <Heart className="w-8 h-8 text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold text-sky-900 mb-2">
                Minimalist Interface
              </h3>
              <p className="text-gray-700">
                Clean, distraction-free design that promotes focus and
                tranquility
              </p>
            </div>
          </div>
        </section>

        <section className="download-app text-gray-800">
          <h2
            id="features-heading"
            className="text-3xl font-bold text-sky-900 mb-8"
          >
            Arehna is Availbale on :
          </h2>
          <ul className="pl-6 space-y-4">
            <li className="text-lg text-gray-700">
              <span className="font-medium">Chrome Extension: </span>
              <a href="arehna">Arehna - cLM</a>
            </li>
            <li className="text-lg text-gray-700">
              <span className="font-medium">FireFox Extension: </span>
              Coming Soon...
            </li>
            <li className="text-lg text-gray-700">
              <span className="font-medium">Safari Extension: </span>
              Coming Soon...
            </li>
          </ul>
        </section>
      </main>

      <footer className="py-6 border-t border-emerald-800/40 text-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center text-gray-600 border-t border-white/10 pt-8">
            <p className="mb-2 text-lg">
              Developed with <span>🤲</span> by{" "}
              <a
                href="https://nzar.dev"
                className="underline underline-offset-4"
              >
                nzar
              </a>
            </p>
            <span className="text-sm">
              &copy; {new Date().getFullYear()} Arehna. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
