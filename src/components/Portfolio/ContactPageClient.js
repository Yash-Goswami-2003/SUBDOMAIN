'use client'

import { useState } from 'react'
import Footer from '@/components/Portfolio/Footer'

export default function ContactPageClient({ data }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })

      setTimeout(() => setSubmitStatus(null), 5000)
    }, 1500)
  }

  const socialLinks = [
    { name: 'GitHub', url: data.social.github, icon: '💻' },
    { name: 'LinkedIn', url: data.social.linkedin, icon: '👔' },
    { name: 'Portfolio', url: data.social.portfolio, icon: '🌐' }
  ]

  return (
    <main className="page-transition">
      {/* Contact Hero */}
      <section className="container animate-fade-in-up" style={{
        minHeight: '40vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--spacing-xl) 0'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 7vw, 3rem)',
          fontWeight: '900',
          letterSpacing: '-0.03em',
          marginBottom: 'var(--spacing-md)',
          color: 'var(--color-text-primary)'
        }}>
          Get In Touch
        </h1>
        <p style={{
          fontSize: '1.05rem',
          color: 'var(--color-text-secondary)',
          maxWidth: '700px',
          lineHeight: '1.6'
        }}>
          Have a project in mind or just want to chat? I'd love to hear from you.
        </p>
      </section>

      {/* Contact Content */}
      <section className="container" style={{
        padding: 'var(--spacing-xl) 0',
        marginBottom: 'var(--spacing-xl)'
      }}>
        <div className="grid" style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--spacing-xl)',
          alignItems: 'start'
        }}>
          {/* Contact Form */}
          <div className="card" style={{ animation: 'fadeInUp 0.6s ease 0.1s both' }}>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              marginBottom: 'var(--spacing-lg)',
              color: 'var(--color-text-primary)'
            }}>
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-md)'
            }}>
              {/* Name Field */}
              <div>
                <label htmlFor="name" style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  marginBottom: 'var(--spacing-xs)',
                  color: 'var(--color-text-primary)'
                }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    fontSize: '1rem',
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'border-color var(--transition-fast), transform var(--transition-fast)',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-accent)'
                    e.target.style.transform = 'translateY(-2px)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--color-border)'
                    e.target.style.transform = 'translateY(0)'
                  }}
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  marginBottom: 'var(--spacing-xs)',
                  color: 'var(--color-text-primary)'
                }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    fontSize: '1rem',
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'border-color var(--transition-fast), transform var(--transition-fast)',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-accent)'
                    e.target.style.transform = 'translateY(-2px)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--color-border)'
                    e.target.style.transform = 'translateY(0)'
                  }}
                />
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  marginBottom: 'var(--spacing-xs)',
                  color: 'var(--color-text-primary)'
                }}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    fontSize: '1rem',
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'border-color var(--transition-fast), transform var(--transition-fast)',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-accent)'
                    e.target.style.transform = 'translateY(-2px)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--color-border)'
                    e.target.style.transform = 'translateY(0)'
                  }}
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  marginBottom: 'var(--spacing-xs)',
                  color: 'var(--color-text-primary)'
                }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    fontSize: '1rem',
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'border-color var(--transition-fast), transform var(--transition-fast)',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-accent)'
                    e.target.style.transform = 'translateY(-2px)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--color-border)'
                    e.target.style.transform = 'translateY(0)'
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="button"
                style={{
                  marginTop: 'var(--spacing-sm)',
                  opacity: isSubmitting ? 0.6 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {/* Status Message */}
              {submitStatus === 'success' && (
                <div className="animate-fade-in" style={{
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  border: '1px solid rgba(76, 175, 80, 0.3)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'rgb(76, 175, 80)',
                  fontSize: '0.875rem',
                  textAlign: 'center'
                }}>
                  ✓ Message sent successfully! I'll get back to you soon.
                </div>
              )}
            </form>
          </div>

          {/* Contact Info & Social */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-lg)'
          }}>
            {/* Contact Info Card */}
            <div className="card" style={{ animation: 'fadeInUp 0.6s ease 0.2s both' }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: 'var(--spacing-md)',
                color: 'var(--color-text-primary)'
              }}>
                Contact Information
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-md)'
              }}>
                <div>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-xs)'
                  }}>
                    Email
                  </div>
                  <a
                    href={`mailto:${data.email}`}
                    style={{
                      fontSize: '1rem',
                      color: 'var(--color-text-primary)',
                      textDecoration: 'underline'
                    }}
                  >
                    {data.email}
                  </a>
                </div>
                <div>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-xs)'
                  }}>
                    Location
                  </div>
                  <div style={{
                    fontSize: '1rem',
                    color: 'var(--color-text-primary)'
                  }}>
                    {data.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="card" style={{ animation: 'fadeInUp 0.6s ease 0.3s both' }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: 'var(--spacing-md)',
                color: 'var(--color-text-primary)'
              }}>
                Connect With Me
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'var(--spacing-sm)'
              }}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-lift"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-sm)',
                      padding: 'var(--spacing-md)',
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: 'var(--color-text-primary)',
                      textDecoration: 'none',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>{social.icon}</span>
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer data={data} />
    </main>
  )
}

