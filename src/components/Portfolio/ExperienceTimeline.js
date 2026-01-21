'use client'

import { useEffect, useRef, useState } from 'react'

export default function ExperienceTimeline({ experiences }) {
  const [visibleItems, setVisibleItems] = useState({})
  const itemsRef = useRef({})

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleItems((prev) => ({
            ...prev,
            [entry.target.id]: true
          }))
        }
      })
    }, { threshold: 0.3 })

    Object.values(itemsRef.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 0a2 2 0 100 4m0-4a2 2 0 110 4m-6 0a2 2 0 100 4m0-4a2 2 0 110 4" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-white">Experience</h2>
          </div>
          <p className="text-gray-400 text-lg">My professional journey and growth</p>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={(el) => itemsRef.current[index] = el}
              id={`experience-${index}`}
              className={`group transition-all duration-700 ${
                visibleItems[`experience-${index}`]
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-[-2rem]'
              }`}
            >
              {/* Timeline Item */}
              <div className="relative">
                {/* Timeline dot and line */}
                <div className="absolute left-0 top-0 bottom-0 w-8 flex items-start">
                  <div className="relative z-20">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center border-4 border-slate-800 shadow-lg shadow-blue-500/50 group-hover:shadow-xl group-hover:shadow-blue-400/70 transition-shadow">
                      <div className="w-3 h-3 rounded-full bg-white" />
                    </div>
                  </div>
                  {index < experiences.length - 1 && (
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent" />
                  )}
                </div>

                {/* Content Card */}
                <div className="ml-16 pt-2">
                  <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-700/50 rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 overflow-hidden">
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                          {exp.position}
                        </h3>
                        <span className="text-sm px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 font-medium w-fit">
                          {exp.duration}
                        </span>
                      </div>

                      <p className="text-blue-400 font-semibold mb-3">{exp.company}</p>

                      <p className="text-gray-400 text-sm">
                        {exp.period}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
