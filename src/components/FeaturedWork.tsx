import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './FeaturedWork.css'

gsap.registerPlugin(ScrollTrigger)

interface WorkItem {
  id: number
  title: string
  category: string
  year: string
  description: string
}

function FeaturedWork() {
  const sectionTitleRef = useRef<HTMLHeadingElement>(null)
  const workItemsRef = useRef<(HTMLDivElement | null)[]>([])

  const works: WorkItem[] = [
    {
      id: 1,
      title: 'Project Alpha',
      category: 'Web Development',
      year: '2024',
      description: 'A comprehensive web platform focused on seamless user experience and modern interface design.',
    },
    {
      id: 2,
      title: 'Design System',
      category: 'UI/UX Design',
      year: '2024',
      description: 'Modular component library built for consistency, accessibility, and scalability across products.',
    },
    {
      id: 3,
      title: 'Mobile Experience',
      category: 'Mobile Development',
      year: '2023',
      description: 'Native mobile application delivering intuitive interactions and fluid performance.',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title reveal
      gsap.from(sectionTitleRef.current, {
        scrollTrigger: {
          trigger: sectionTitleRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      // Staggered work items reveal
      workItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
            y: 80,
            opacity: 0,
            duration: 1,
            delay: index * 0.15,
            ease: 'power3.out',
          })
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="featured-work">
      <div className="featured-work-container">
        <h2 className="section-title" ref={sectionTitleRef}>
          Featured Work
        </h2>
        <div className="work-grid">
          {works.map((work, index) => (
            <div
              key={work.id}
              className="work-item"
              ref={(el) => (workItemsRef.current[index] = el)}
            >
              <div className="work-thumbnail">
                <div className="work-placeholder">
                  <div className="work-overlay"></div>
                </div>
              </div>
              <div className="work-info">
                <div className="work-text">
                  <h3 className="work-title">{work.title}</h3>
                  <p className="work-description">{work.description}</p>
                </div>
                <div className="work-meta">
                  <span className="work-category">{work.category}</span>
                  <span className="work-year">{work.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedWork
