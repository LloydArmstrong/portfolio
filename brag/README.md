Brag entries live here, one markdown file per achievement, grouped by year:

content/brag/<YYYY>/<YYYY-MM>-<short-slug>.md

Frontmatter:
date: 'YYYY-MM-01' # month the work landed
title: 'Short, outcome-first headline'
impact: 'One line: the measurable result / why it mattered'
theme: one of THEMES in src/pages/brag.js
company: 'METRO Markets'
skills: ['Flink', 'Terraform'] # NOT `tags` (that would create /pensieve tag pages)
highlight: true|false # true = shows in the "Highlights" section
draft: true|false # true = hidden from the site

Body: 2-5 sentences or bullets — context, what you did, result, who it helped.
See brag/MONTHLY_PROMPT.md for how monthly updates are generated.
