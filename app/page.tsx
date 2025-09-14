"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/couple-running.jpg')",
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="absolute top-8 right-8 z-20">
          <div className="flex gap-4">
            <Button
              onClick={scrollToAbout}
              size="sm"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              About StriveAI
            </Button>
            <Button asChild size="sm" className="bg-white text-black hover:bg-gray-200 transition-all duration-300">
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Quote */}
          <blockquote className="mb-12">
            <p className="text-4xl md:text-6xl font-light italic leading-tight text-white mb-4">
              "You didn't get this far to only go this far."
            </p>
            <cite className="text-xl md:text-2xl text-gray-300 font-light">— Ben Alldis</cite>
          </blockquote>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gray-900 scroll-mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">About StriveAI</h2>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
            StriveAI is an advanced AI assistant designed specifically for athletes training for marathons. Our platform
            helps medical teams track and monitor crucial health metrics during the intensive month-long training period
            before major marathons.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Heart Monitoring</h3>
              <p className="text-gray-400">Comprehensive cardiovascular health tracking</p>
            </div>
            <div className="text-center">

            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-800 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Medical State</h3>
              <p className="text-gray-400">Complete health status monitoring and reporting</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-white">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div className="border-b border-gray-700 pb-6">
              <h3 className="text-xl font-semibold mb-3 text-white">What is StriveAI?</h3>
              <p className="text-gray-300 leading-relaxed">
                StriveAI is an advanced AI-powered platform designed specifically for marathon athletes and their
                medical teams. We provide comprehensive health monitoring and analysis during the critical month-long
                training period before major marathons.
              </p>
            </div>
            <div className="border-b border-gray-700 pb-6">
              <h3 className="text-xl font-semibold mb-3 text-white">How does the health monitoring work?</h3>
              <p className="text-gray-300 leading-relaxed">
                Our platform tracks three key areas: heart monitoring for cardiovascular health, sleep quality analysis
                for recovery optimization, and comprehensive medical state reporting. All data is processed using
                advanced AI algorithms to provide actionable insights.
              </p>
            </div>
            <div className="border-b border-gray-700 pb-6">
              <h3 className="text-xl font-semibold mb-3 text-white">Who can use StriveAI?</h3>
              <p className="text-gray-300 leading-relaxed">
                StriveAI is designed for marathon athletes preparing for major competitions and their supporting medical
                teams. Athletes can track their own progress while medical professionals can monitor multiple athletes
                simultaneously.
              </p>
            </div>
            <div className="border-b border-gray-700 pb-6">
              <h3 className="text-xl font-semibold mb-3 text-white">Is my health data secure?</h3>
              <p className="text-gray-300 leading-relaxed">
                Yes, we take data security very seriously. All health information is encrypted and stored securely,
                complying with healthcare data protection standards. Only authorized medical team members can access
                athlete data.
              </p>
            </div>
            <div className="pb-6">
              <h3 className="text-xl font-semibold mb-3 text-white">How do I get started?</h3>
              <p className="text-gray-300 leading-relaxed">
                Simply sign up for an account using the registration form. Athletes will need to provide basic health
                information and training goals, while medical team members will need professional verification before
                accessing patient data.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
