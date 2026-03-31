import './FeaturedWork.css'

interface WorkItem {
  id: number
  title: string
  category: string
  year: string
}

function FeaturedWork() {
  const works: WorkItem[] = [
    {
      id: 1,
      title: 'Project Alpha',
      category: 'Web Development',
      year: '2024',
    },
    {
      id: 2,
      title: 'Design System',
      category: 'UI/UX Design',
      year: '2024',
    },
    {
      id: 3,
      title: 'Mobile Experience',
      category: 'Mobile Development',
      year: '2023',
    },
  ]

  return (
    <section className="featured-work">
      <div className="featured-work-container">
        <h2 className="section-title">Featured Work</h2>
        <div className="work-grid">
          {works.map((work) => (
            <div key={work.id} className="work-item">
              <div className="work-thumbnail">
                <div className="work-placeholder"></div>
              </div>
              <div className="work-info">
                <h3 className="work-title">{work.title}</h3>
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
