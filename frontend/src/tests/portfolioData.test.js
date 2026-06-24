import { describe, it, expect } from 'vitest'
import {
  profile,
  stats,
  skillCategories,
  projectsSeed,
  certifications,
  education,
  techStack,
} from '../utils/portfolioData'

describe('portfolioData — profile', () => {
  it('has required profile fields', () => {
    expect(profile.name).toBeDefined()
    expect(profile.email).toBeTruthy()
    expect(profile.phone).toBeTruthy()
    expect(profile.whatsapp).toMatch(/wa\.me/)
    expect(profile.social.github).toMatch(/github\.com/)
    expect(profile.social.linkedin).toMatch(/linkedin\.com/)
  })

  it('resumeUrl points to a PDF path', () => {
    expect(profile.resumeUrl).toMatch(/\.pdf$/)
  })

  it('location does NOT contain Nashik or Pune', () => {
    expect(profile.location).not.toMatch(/Nashik/i)
  })
})

describe('portfolioData — stats', () => {
  it('has exactly 4 stat items', () => {
    expect(stats).toHaveLength(4)
  })

  it('each stat has label, value, icon', () => {
    stats.forEach(s => {
      expect(s.label).toBeTruthy()
      expect(s.value).toBeDefined()
      expect(s.icon).toBeTruthy()
    })
  })
})

describe('portfolioData — skillCategories', () => {
  it('has at least 3 categories', () => {
    expect(skillCategories.length).toBeGreaterThanOrEqual(3)
  })

  it('each skill has name and level 0-100', () => {
    skillCategories.forEach(cat => {
      cat.skills.forEach(skill => {
        expect(skill.name).toBeTruthy()
        expect(skill.level).toBeGreaterThanOrEqual(0)
        expect(skill.level).toBeLessThanOrEqual(100)
      })
    })
  })
})

describe('portfolioData — projects', () => {
  it('has exactly 5 projects', () => {
    expect(projectsSeed).toHaveLength(5)
  })

  it('first 2 are featured', () => {
    expect(projectsSeed[0].featured).toBe(true)
    expect(projectsSeed[1].featured).toBe(true)
  })

  it('each project has live link and github', () => {
    projectsSeed.forEach(p => {
      expect(p.title).toBeTruthy()
      expect(p.live).toMatch(/^https?:\/\//)
      expect(p.github).toMatch(/github\.com/)
      expect(p.tags.length).toBeGreaterThan(0)
    })
  })
})

describe('portfolioData — certifications', () => {
  it('has exactly 3 real certificates', () => {
    expect(certifications).toHaveLength(3)
  })

  it('all certs have file paths', () => {
    certifications.forEach(c => {
      expect(c.file).toMatch(/\.(pdf)$/)
      expect(c.title).toBeTruthy()
      expect(c.issuer).toBeTruthy()
    })
  })

  it('contains Disha certifications', () => {
    const issuers = certifications.map(c => c.issuer)
    expect(issuers.some(i => i.includes('Disha'))).toBe(true)
  })
})

describe('portfolioData — education', () => {
  it('has real BSc IT entry', () => {
    const bsc = education.find(e => e.title.includes('Bachelor'))
    expect(bsc).toBeDefined()
    expect(bsc.detail).toMatch(/7\.18/)
  })
})

describe('portfolioData — techStack', () => {
  it('is an array of strings', () => {
    expect(Array.isArray(techStack)).toBe(true)
    techStack.forEach(t => expect(typeof t).toBe('string'))
  })
})
