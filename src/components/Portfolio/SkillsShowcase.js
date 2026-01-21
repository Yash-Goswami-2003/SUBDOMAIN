'use client'

import { useState, useEffect, useRef } from 'react'

export default function SkillsShowcase({ skills }) {
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [visibleSkills, setVisibleSkills] = useState({})
  const skillsRef = useRef({})

  const categories = [...new Set(skills.map(s => s.category))]

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillName = entry.target.dataset.skill
          setVisibleSkills((prev) => ({
            ...prev,
            [skillName]: true
          }))
        }
      })
    }, { threshold: 0.1 })

    Object.values(skillsRef.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-white">Skills & Expertise</h2>
          </div>
          <p className="text-gray-400 text-lg">Technologies and tools I work with</p>
        </div>

        {/* Skills Grid by Category */}
        <div className="space-y-16">
          {categories.map((category) => {
            const categorySkills = skills.filter(s => s.category === category)
            return (
              <div key={category}>
                {/* Category Header */}
                <div className="mb-8">
                  <div className="inline-block">
                    <h3 className="text-2xl font-bold text-white mb-2">{category}</h3>
                    <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-16" />
                  </div>
                </div>

                {/* Skills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categorySkills.map((skill, idx) => (
                    <div
                      key={idx}
                      ref={(el) => skillsRef.current[skill.name] = el}
                      data-skill={skill.name}
                      className={`group transition-all duration-500 ${
                        visibleSkills[skill.name]
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-8'
                      }`}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="relative h-full">
                        {/* Card */}
                        <div className="relative bg-gradient-to-br from-slate-700/60 to-slate-800/40 rounded-xl p-6 border border-slate-600/50 group-hover:border-purple-500/50 transition-all duration-300 overflow-hidden h-full flex flex-col">
                          {/* Animated background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                          {/* Content */}
                          <div className="relative z-10 flex-1 flex flex-col">
                            <h4 className="text-lg font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                              {skill.name}
                            </h4>

                            {/* Proficiency Visualization */}
                            <div className="space-y-2 flex-1 flex flex-col justify-end">
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span className="text-xs text-gray-400">Proficiency</span>
                                <span className="text-sm font-semibold text-purple-300">{skill.proficiency}%</span>
                              </div>

                              {/* Progress Bar */}
                              <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                <div
                                  className={`h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ${
                                    hoveredSkill === skill.name ? 'shadow-lg shadow-purple-500/50' : ''
                                  }`}
                                  style={{
                                    width: visibleSkills[skill.name] ? `${skill.proficiency}%` : '0%'
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Hover Icon */}
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Skills Summary Stats */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-16 border-t border-slate-700/50">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">{skills.length}</div>
            <p className="text-gray-400 text-sm">Total Skills</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-400 mb-2">{categories.length}</div>
            <p className="text-gray-400 text-sm">Categories</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
            <p className="text-gray-400 text-sm">Commitment</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">∞</div>
            <p className="text-gray-400 text-sm">Learning</p>
          </div>
        </div>
      </div>
    </section>
  )
}
