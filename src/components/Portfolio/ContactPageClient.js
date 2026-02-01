'use client'

import { useState } from 'react'
import Footer from '@/components/Portfolio/Footer'

export default function ContactPageClient({ data }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitStatus(null), 5000)
    }, 1500)
  }

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1 className="page-title">Contact</h1>
          <p className="page-subtitle">Get in touch for collaborations or questions.</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-card">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                  />
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitStatus === 'success' && (
                  <div className="success-msg">Message sent successfully!</div>
                )}
              </form>
            </div>

            <div className="contact-info">
              <div className="info-group">
                <span className="info-label">Email</span>
                <a href={`mailto:${data.email}`} className="info-value">{data.email}</a>
              </div>
              <div className="info-group">
                <span className="info-label">Location</span>
                <span className="info-value">{data.location}</span>
              </div>
              <div className="info-group">
                <span className="info-label">Connect</span>
                <div className="social-links">
                  <a href={data.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer data={data} />

      <style jsx>{`
        .contact-page {
          padding-top: 80px;
        }

        .contact-hero {
          padding: 2rem 0 1rem;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .page-subtitle {
          font-size: 1rem;
          color: var(--color-text-secondary);
        }

        .contact-content {
          padding: 2rem 0 4rem;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        .contact-form-card {
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 1.5rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }

        .form-group label {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--color-text-secondary);
        }

        .form-group input,
        .form-group textarea {
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          background-color: var(--color-bg);
          color: var(--color-text-primary);
          font-family: inherit;
          outline: none;
          transition: border-color var(--transition-fast);
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: var(--color-text-muted);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .submit-btn {
          padding: 0.75rem 1.5rem;
          background-color: var(--color-accent);
          color: var(--color-bg);
          border: none;
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: opacity var(--transition-fast);
          align-self: flex-start;
        }

        .submit-btn:hover {
          opacity: 0.9;
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .success-msg {
          padding: 0.75rem;
          background-color: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #16a34a;
          border-radius: var(--radius-sm);
          font-size: 0.8125rem;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .info-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .info-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .info-value {
          font-size: 0.9375rem;
          color: var(--color-text-primary);
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-links a {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        .social-links a:hover {
          color: var(--color-text-primary);
        }

        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  )
}
