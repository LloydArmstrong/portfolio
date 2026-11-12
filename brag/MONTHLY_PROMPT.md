# Monthly brag run

This file is the instruction set for the scheduled "Monthly brag update" task.
It is versioned in the repo so it can be tuned without touching the schedule.

## Inputs

- `MONTH` = the previous calendar month (YYYY-MM), unless the run was told otherwise.
- Portfolio repo: the connected folder named `portfolio`.
- Work repos: the connected folder `~/Documents/Work` (shown as `Work` under `$HOME/mnt/`);
  any directory inside it (depth ≤ 3) containing `.git` is a repo to scan.
- Inbox: `portfolio/brag/inbox.md` (gitignored notes Lloyd jots during the month).

## Steps

1. **Collect evidence** for MONTH (use `device_bash`, read-only on work repos):
   - For each work repo: `git fetch --quiet` is NOT required — use local history only.
     `git log --all --no-merges --since=<MONTH-01> --until=<next-month-01>
 --author="<emails>" --format='%h %ad %s' --date=short --stat`
     (with `git -C <repo>` — never `cd` into a work repo to run anything else)
     where emails = that repo's `git config user.email`, `lloydarmstrong@gmail.com`,
     and any `%ae` in the repo's last 200 commits that matches name "Lloyd".
   - Merge commits/PR titles on main branches mentioning Lloyd are useful too.
   - Read the `## Notes` section of the inbox.
   - Read existing `content/brag/**` entries to avoid duplicates and to match tone.
2. **Cluster** commits + notes into achievements. One achievement = one outcome
   (a migration finished, an incident resolved, a cost cut, a doc written,
   someone mentored). Ignore routine noise (typo fixes, version bumps, merges)
   unless they add up to something.
3. **Draft entries** (typically 1–5 per month; zero is fine — then stop and report).
   Write them into a staging dir in the device scratch area (NOT the portfolio
   working tree), at `content/brag/<YYYY>/<MONTH>-<slug>.md`, using the format in
   `brag/README.md`. Rules:
   - Outcome-first title; `impact` = one line with a number if the evidence has one.
     Never invent numbers — write `impact: 'TODO: quantify'` instead.
   - Pick `theme` from the THEMES list in `src/pages/brag.js`.
   - `skills`: 2–5 concrete technologies (match spelling already used on the page).
   - `highlight: true` only for clearly significant work (≈1 in 4 entries).
   - Body: 2–5 sentences — context, what Lloyd did, result, who it helped.
   - Use `skills:` never `tags:`.
4. **Commit to a branch** without touching Lloyd's checkout:
   `bash scripts/brag/commit-to-branch.sh <MONTH> <staging-dir>`
   (run from inside the portfolio folder). This creates/updates local branch `brag/<MONTH>`.
5. **Archive the inbox**: append the processed `## Notes` bullets to
   `brag/inbox-archive/<MONTH>.md`, then rewrite `brag/inbox.md` with an empty
   `## Notes` section (keep the header text). Both paths are gitignored.
6. **Report** (final message, and it's what the notification shows):
   - The entries drafted (title + impact), and any TODOs needing Lloyd's input.
   - The one command to publish: `git push -u origin brag/<MONTH>` — a GitHub
     Action then opens the PR automatically.

## HARD RULES for ~/Documents/Work (set by Lloyd — non-negotiable)

- **Strictly read-only.** Never create, edit, move, rename or delete anything in that
  folder. No `git fetch/pull/checkout/switch/stash/gc/commit/config --add`, no
  `cd` + build/test commands, no writing temp files there. Only `git log`,
  `git show --stat`, `git rev-parse`, `git config --get`, `ls`, `find` (read-only).
- **Metadata only.** Read commit subjects, dates and file names — do not read file
  contents or diffs, and never copy code, config values, hostnames, IPs, credentials,
  customer data, colleague names or internal ticket text into an entry.
- Entries describe Lloyd's work at the level of outcome and technology only.
- **If anything is unclear or seems to need more than the above, STOP** — do not
  proceed or guess. Report what you would need and why, and let Lloyd decide.

## Other constraints

- Never push, never commit to `main`, never touch Lloyd's portfolio working tree
  other than `brag/inbox.md` and `brag/inbox-archive/`.
