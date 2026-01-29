"use client";

import { useState } from "react";
import cvData from "@/data/cv.json";

interface ExperienceItem {
  id: string;
  company: string;
  title: string;
  start: string;
  end: string;
  bullets: string[];
  tags: string[];
}

interface ProjectItem {
  id: string;
  name: string;
  type: string;
  start: string;
  end: string;
  bullets: string[];
  tags: string[];
}

const InteractiveCv = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [expandedExperience, setExpandedExperience] = useState<string[]>([]);
  const [expandedProjects, setExpandedProjects] = useState<string[]>([]);

  const allSkills = [
    ...cvData.skills.languages,
    ...cvData.skills.frameworks,
    ...cvData.skills.tools,
  ];

  const toggleExperience = (id: string) => {
    setExpandedExperience((prev) =>
      prev.includes(id) ? prev.filter((expId) => expId !== id) : [...prev, id]
    );
  };

  const toggleProject = (id: string) => {
    setExpandedProjects((prev) =>
      prev.includes(id) ? prev.filter((projId) => projId !== id) : [...prev, id]
    );
  };

  const handleSkillClick = (skill: string) => {
    setSelectedSkill(selectedSkill === skill ? null : skill);
  };

  const isExperienceHighlighted = (experience: ExperienceItem) => {
    if (!selectedSkill) return false;
    return experience.tags.some((tag) => tag.toLowerCase() === selectedSkill.toLowerCase());
  };

  const isProjectHighlighted = (project: ProjectItem) => {
    if (!selectedSkill) return false;
    return project.tags.some((tag) => tag.toLowerCase() === selectedSkill.toLowerCase());
  };

  const resetFilters = () => {
    setSelectedSkill(null);
  };

  return (
    <div className="space-y-16">
      {/* Skills Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Technical Skills</h2>
          {selectedSkill && (
            <button
              onClick={resetFilters}
              className="text-sm px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>

        {selectedSkill && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              Filtering by: <strong>{selectedSkill}</strong>. Click on a skill to filter or click
              &quot;Reset Filters&quot; to show all.
            </p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
              Programming Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.languages.map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleSkillClick(skill)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedSkill === skill
                      ? "bg-gray-900 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
              Frameworks & Libraries
            </h3>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.frameworks.map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleSkillClick(skill)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedSkill === skill
                      ? "bg-gray-900 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
              Tools & Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.tools.map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleSkillClick(skill)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedSkill === skill
                      ? "bg-gray-900 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
              Methods & Practices
            </h3>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.methods.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg border border-gray-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Experience</h2>
        <div className="space-y-4">
          {cvData.experience.map((exp) => {
            const isExpanded = expandedExperience.includes(exp.id);
            const isHighlighted = isExperienceHighlighted(exp);

            return (
              <div
                key={exp.id}
                className={`border rounded-xl p-6 transition-all ${
                  isHighlighted
                    ? "border-gray-900 bg-gray-50 shadow-lg ring-2 ring-gray-900"
                    : "border-gray-200 bg-white hover:shadow-md"
                }`}
              >
                <div
                  className="flex items-start justify-between cursor-pointer"
                  onClick={() => toggleExperience(exp.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                        <p className="text-gray-600 font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                        {exp.start} - {exp.end}
                      </span>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 space-y-4 animate-fade-in">
                        <ul className="space-y-2">
                          {exp.bullets.map((bullet, idx) => (
                            <li key={idx} className="text-gray-700 flex gap-2">
                              <span className="text-gray-400 font-bold">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {exp.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`text-xs px-3 py-1 rounded-full font-medium ${
                                selectedSkill?.toLowerCase() === tag.toLowerCase()
                                  ? "bg-gray-900 text-white"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    className="ml-4 text-gray-400 hover:text-gray-600 transition-transform"
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                  >
                    <svg
                      className={`w-6 h-6 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Portfolio Section */}
      {cvData.projects.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Portfolio</h2>
          <div className="space-y-4">
            {cvData.projects.map((project) => {
              const isExpanded = expandedProjects.includes(project.id);
              const isHighlighted = isProjectHighlighted(project);

              return (
                <div
                  key={project.id}
                  className={`border rounded-xl p-6 transition-all ${
                    isHighlighted
                      ? "border-gray-900 bg-gray-50 shadow-lg ring-2 ring-gray-900"
                      : "border-gray-200 bg-white hover:shadow-md"
                  }`}
                >
                  <div
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => toggleProject(project.id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                          <p className="text-gray-600 font-medium">{project.type}</p>
                        </div>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                          {project.start} - {project.end}
                        </span>
                      </div>

                      {isExpanded && (
                        <div className="mt-4 space-y-4 animate-fade-in">
                          <ul className="space-y-2">
                            {project.bullets.map((bullet, idx) => (
                              <li key={idx} className="text-gray-700 flex gap-2">
                                <span className="text-gray-400 font-bold">•</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="flex flex-wrap gap-2 pt-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`text-xs px-3 py-1 rounded-full font-medium ${
                                  selectedSkill?.toLowerCase() === tag.toLowerCase()
                                    ? "bg-gray-900 text-white"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      className="ml-4 text-gray-400 hover:text-gray-600 transition-transform"
                      aria-label={isExpanded ? "Collapse" : "Expand"}
                    >
                      <svg
                        className={`w-6 h-6 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Education */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Education</h2>
        <div className="space-y-4">
          {cvData.education.map((edu) => (
            <div
              key={edu.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow print-friendly"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{edu.program}</h3>
                  <p className="text-gray-600 font-medium">{edu.school}</p>
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
                  {edu.start} - {edu.end}
                </span>
              </div>
              <p className="text-gray-700 mb-3">{edu.description}</p>
              {edu.highlights && edu.highlights.length > 0 && (
                <ul className="space-y-1">
                  {edu.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-gray-600 text-sm flex gap-2">
                      <span className="text-gray-400">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Certifications & Languages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Certifications */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Certifications</h2>
          <div className="space-y-3">
            {cvData.certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-gray-900">{cert.name}</h3>
                {cert.issuer && <p className="text-sm text-gray-600">{cert.issuer}</p>}
                <div className="flex flex-wrap gap-2 mt-2">
                  {cert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Languages</h2>
          <div className="space-y-3">
            {cvData.languages.map((lang, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-gray-900">{lang.language}</h3>
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {lang.proficiency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Awards */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Awards & Recognition</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cvData.awards.map((award) => (
            <div
              key={award.id}
              className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="font-bold text-lg mb-2">{award.name}</h3>
              <p className="text-gray-300 text-sm">{award.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Extracurricular */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Extracurricular Activities</h2>
        <div className="space-y-4">
          {cvData.extracurricular.map((activity) => (
            <div
              key={activity.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold text-lg text-gray-900 mb-1">{activity.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{activity.organization}</p>
              <p className="text-gray-700">{activity.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default InteractiveCv;
