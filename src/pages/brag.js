import React, { useMemo, useState } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Seo from '@components/head';
import { Layout } from '@components';

// Display order of themes. Entries with an unknown theme fall into "Other".
const THEMES = [
  'Platform & Architecture',
  'Reliability & Incidents',
  'Cost & Efficiency',
  'Delivery & Automation',
  'Data & Analytics',
  'Leadership & Mentoring',
  'Learning & Community',
];

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const StyledMain = styled.main`
  max-width: 1000px;
  counter-reset: section;

  & > section {
    padding: 40px 0;
  }

  & > header {
    margin-bottom: 20px;

    .intro {
      max-width: 640px;
      margin-top: 20px;
      color: var(--slate);
    }
  }
`;

const StyledThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;

  .theme {
    padding: 1.5rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    box-shadow: 0 10px 30px -15px var(--navy-shadow);

    h3 {
      margin: 0 0 15px;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-sm);
      font-weight: 400;
    }

    ul {
      ${({ theme }) => theme.mixins.resetList};
    }

    li {
      margin-bottom: 14px;
      &:last-child {
        margin-bottom: 0;
      }
    }

    .title {
      color: var(--lightest-slate);
      font-size: var(--fz-lg);
      font-weight: 600;
      line-height: 1.3;
    }

    .impact {
      margin-top: 4px;
      color: var(--slate);
      font-size: var(--fz-md);
    }

    .when {
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
    }
  }
`;

const StyledFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 20px 0 40px;

  button {
    padding: 6px 12px;
    border: 1px solid var(--lightest-navy);
    border-radius: var(--border-radius);
    background: transparent;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    cursor: pointer;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      border-color: var(--green);
      color: var(--green);
    }

    &.active {
      border-color: var(--green);
      background-color: var(--green-tint);
      color: var(--green);
    }
  }
`;

const StyledTimeline = styled.div`
  .year {
    margin: 50px 0 10px;
    color: var(--lightest-slate);
    font-size: clamp(24px, 4vw, var(--fz-heading));
  }

  .month {
    position: relative;
    padding: 0 0 10px 30px;
    border-left: 2px solid var(--lightest-navy);

    &::before {
      content: '';
      position: absolute;
      left: -7px;
      top: 6px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: var(--green);
    }

    h4 {
      margin: 0 0 15px;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-sm);
      font-weight: 400;
    }
  }

  article {
    margin-bottom: 30px;

    h5 {
      margin: 0;
      color: var(--lightest-slate);
      font-size: var(--fz-xl);
      line-height: 1.3;

      .star {
        margin-left: 8px;
        color: var(--green);
        font-size: var(--fz-md);
      }
    }

    .meta {
      margin: 6px 0 10px;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);

      .sep {
        margin: 0 6px;
      }
    }

    .impact {
      margin: 0 0 8px;
      color: var(--lightest-slate);
    }

    .body {
      color: var(--slate);
      font-size: var(--fz-lg);

      p {
        margin: 0 0 10px;
      }

      ul {
        ${({ theme }) => theme.mixins.fancyList};
      }
    }

    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 14px;
      margin-top: 8px;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
    }
  }

  .empty {
    color: var(--slate);
  }
`;

const monthLabel = date => {
  const d = new Date(date);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
};

const BragPage = ({ location, data }) => {
  const entries = data.allMarkdownRemark.nodes.map(n => ({
    ...n.frontmatter,
    html: n.html,
    id: n.id,
  }));
  const [skill, setSkill] = useState(null);

  const allSkills = useMemo(() => {
    const counts = {};
    entries.forEach(e => (e.skills || []).forEach(s => (counts[s] = (counts[s] || 0) + 1)));
    return Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b));
  }, [entries]);

  const highlightsByTheme = useMemo(() => {
    const groups = {};
    entries
      .filter(e => e.highlight)
      .forEach(e => {
        const t = THEMES.includes(e.theme) ? e.theme : 'Other';
        (groups[t] = groups[t] || []).push(e);
      });
    return [...THEMES, 'Other'].filter(t => groups[t]).map(t => [t, groups[t]]);
  }, [entries]);

  const timeline = useMemo(() => {
    const filtered = skill ? entries.filter(e => (e.skills || []).includes(skill)) : entries;
    const years = [];
    filtered.forEach(e => {
      const d = new Date(e.date);
      const y = d.getUTCFullYear();
      const m = d.getUTCMonth();
      let year = years.find(x => x.year === y);
      if (!year) {
        year = { year: y, months: [] };
        years.push(year);
      }
      let month = year.months.find(x => x.month === m);
      if (!month) {
        month = { month: m, label: monthLabel(e.date), items: [] };
        year.months.push(month);
      }
      month.items.push(e);
    });
    return years;
  }, [entries, skill]);

  return (
    <Layout location={location}>
      <StyledMain>
        <header>
          <h1 className="big-heading">Brag Document</h1>
          <p className="subtitle">The work I&apos;m proud of, updated monthly</p>
          <p className="intro">
            A running log of what I&apos;ve shipped, fixed, and helped others with — inspired by{' '}
            <a href="https://jvns.ca/blog/brag-documents/">Julia Evans&apos; brag documents</a>.
            Highlights are grouped by theme; the full timeline is below.
          </p>
        </header>

        {highlightsByTheme.length > 0 && (
          <section>
            <h2 className="numbered-heading">Highlights</h2>
            <StyledThemeGrid>
              {highlightsByTheme.map(([theme, items]) => (
                <div className="theme" key={theme}>
                  <h3>{theme}</h3>
                  <ul>
                    {items.map(e => (
                      <li key={e.id}>
                        <div className="title">{e.title}</div>
                        {e.impact && <div className="impact">{e.impact}</div>}
                        <div className="when">
                          {monthLabel(e.date)}
                          {e.company ? ` · ${e.company}` : ''}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </StyledThemeGrid>
          </section>
        )}

        <section>
          <h2 className="numbered-heading">Timeline</h2>

          {allSkills.length > 0 && (
            <StyledFilters role="group" aria-label="Filter by skill">
              <button
                type="button"
                className={skill === null ? 'active' : ''}
                aria-pressed={skill === null}
                onClick={() => setSkill(null)}>
                All
              </button>
              {allSkills.map(s => (
                <button
                  type="button"
                  key={s}
                  className={skill === s ? 'active' : ''}
                  aria-pressed={skill === s}
                  onClick={() => setSkill(skill === s ? null : s)}>
                  {s}
                </button>
              ))}
            </StyledFilters>
          )}

          <StyledTimeline>
            {timeline.length === 0 && <p className="empty">Nothing here yet — check back soon.</p>}
            {timeline.map(y => (
              <div key={y.year}>
                <h3 className="year">{y.year}</h3>
                {y.months.map(m => (
                  <div className="month" key={m.month}>
                    <h4>{m.label}</h4>
                    {m.items.map(e => (
                      <article key={e.id}>
                        <h5>
                          {e.title}
                          {e.highlight && (
                            <span className="star" aria-label="Highlight">
                              ★
                            </span>
                          )}
                        </h5>
                        <div className="meta">
                          {[e.company, e.theme].filter(Boolean).map((x, i) => (
                            <span key={x}>
                              {i > 0 && <span className="sep">/</span>}
                              {x}
                            </span>
                          ))}
                        </div>
                        {e.impact && <p className="impact">{e.impact}</p>}
                        <div className="body" dangerouslySetInnerHTML={{ __html: e.html }} />
                        {e.skills?.length > 0 && (
                          <div className="skills">
                            {e.skills.map(s => (
                              <span key={s}>{s}</span>
                            ))}
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </StyledTimeline>
        </section>
      </StyledMain>
    </Layout>
  );
};

BragPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default BragPage;

export const Head = ({ location }) => (
  <Seo
    title="Brag Document"
    description="A running log of Lloyd Armstrong's engineering achievements, updated monthly."
    pathname={location.pathname}
  />
);

Head.propTypes = {
  location: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/brag/" }
        frontmatter: { draft: { ne: true } }
      }
      sort: [{ frontmatter: { date: DESC } }, { frontmatter: { title: ASC } }]
    ) {
      nodes {
        id
        html
        frontmatter {
          date
          title
          impact
          theme
          company
          skills
          highlight
        }
      }
    }
  }
`;
