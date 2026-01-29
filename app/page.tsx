import ChatWidget from "@/components/ChatWidget";
import ContactForm from "@/components/ContactForm";
import cvData from "@/data/cv.json";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Chatbot - Above the Fold */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Text */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  {cvData.profile.name}
                </h1>
                <p className="text-2xl md:text-3xl text-gray-700 font-medium">
                  {cvData.profile.headline}
                </p>
                <p className="text-lg text-gray-600">{cvData.profile.location}</p>
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-lg">
                    Developing enterprise AI chatbots with RAG architectures
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-lg">
                    Intern Programming in LangGraph, LlamaIndex, and semantic search optimization
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-lg">
                    Teaching mathematics in AI degree program
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <a
                  href="#cv-section"
                  className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:gap-3 transition-all group"
                >
                  <span>Scroll to see the complete CV</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-y-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: Chatbot Widget */}
            <div className="flex justify-center lg:justify-end">
              <ChatWidget />
            </div>
          </div>
        </div>
      </section>

      {/* CV Preview Section */}
      <section id="cv-section" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 max-w-3xl mx-auto leading-tight">
              Explore my experience, skills, and achievements in an interactive format
            </h1>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-6 text-center">
              <div className="text-3xl font-bold mb-2">{cvData.experience.length}</div>
              <div className="text-gray-300">Positions</div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-6 text-center">
              <div className="text-3xl font-bold mb-2">{cvData.projects.length}</div>
              <div className="text-gray-300">Projects</div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-6 text-center">
              <div className="text-3xl font-bold mb-2">
                {cvData.skills.languages.length + cvData.skills.frameworks.length}
              </div>
              <div className="text-gray-300">Technologies</div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-6 text-center">
              <div className="text-3xl font-bold mb-2">{cvData.certifications.length}</div>
              <div className="text-gray-300">Certifications</div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-6 text-center">
              <div className="text-3xl font-bold mb-2">{cvData.languages.length}</div>
              <div className="text-gray-300">Languages</div>
            </div>
          </div>

          {/* Experience Preview */}
          <div className="max-w-4xl mx-auto space-y-6 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Experience</h2>
            {cvData.experience.map((exp) => (
              <div
                key={exp.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {exp.start} - {exp.end}
                  </span>
                </div>
                <ul className="space-y-2">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-gray-700 flex gap-2">
                      <span className="text-gray-400">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Portfolio Section */}
          {cvData.projects.length > 0 && (
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Portfolio</h2>
              {cvData.projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                      <p className="text-gray-600">{project.type}</p>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {project.start} - {project.end}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx} className="text-gray-700 flex gap-2">
                        <span className="text-gray-400">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/cv"
              className="inline-block px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              View Full CV
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Interested in collaborating or learning more about my work? Fill out the form below and I'll get back to you soon!
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
