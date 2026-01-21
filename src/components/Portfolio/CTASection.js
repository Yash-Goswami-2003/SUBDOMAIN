'use client'

export default function CTASection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-8">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Let's Build Something Amazing
          </span>
        </h2>

        <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          I'm always open to new opportunities and collaborations. Whether you have a project in mind or just want to chat about tech, feel free to reach out!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="group relative px-10 py-4 rounded-lg font-semibold overflow-hidden text-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-100 group-hover:opacity-110 transition-opacity" />
            <span className="relative flex items-center gap-2 text-white justify-center">
              Get In Touch
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>

          <button className="px-10 py-4 rounded-lg font-semibold border-2 border-blue-400/50 text-blue-300 hover:bg-blue-500/10 transition-all hover:border-blue-300 text-lg">
            Download Resume
          </button>
        </div>

        {/* Contact Info */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 border-t border-slate-700/50">
          <div className="text-center">
            <div className="inline-block p-3 rounded-lg bg-blue-500/10 border border-blue-400/30 mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">Email</p>
            <a href="mailto:yash@example.com" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">
              yash@example.com
            </a>
          </div>

          <div className="text-center">
            <div className="inline-block p-3 rounded-lg bg-purple-500/10 border border-purple-400/30 mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">Location</p>
            <p className="text-gray-300 font-semibold">
              India
            </p>
          </div>

          <div className="text-center">
            <div className="inline-block p-3 rounded-lg bg-pink-500/10 border border-pink-400/30 mb-4">
              <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">Availability</p>
            <p className="text-green-400 font-semibold">
              Open for Opportunities
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
