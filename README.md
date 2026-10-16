# Portfolio — Computational Fluid Physics

A fast, self-contained [Hugo](https://gohugo.io) portfolio site for a computational
fluid physics researcher working on **CFP**, **electric-field (electrohydrodynamic)
heat transfer**, **topology optimisation** and **multiphase Taylor-bubble cooling**
for semiconductor thermal management.

Everything is a **placeholder**: the name, biography, project text, numbers, images,
videos and CV. Replace them with your own and the layout keeps working.

## Requirements

- Hugo **extended** (v0.146 or newer). Check with `hugo version`.
  If `hugo` is not installed, get the extended binary from the
  [releases page](https://github.com/gohugoio/hugo/releases) and put it on your `PATH`.

## Preview locally

```bash
hugo server --disableFastRender
```

Then open <http://localhost:1313/>. The page reloads automatically when you edit a file.

To build the static site into `public/`:

```bash
hugo --gc --minify
```

## Deployment

The site deploys automatically to GitHub Pages with the workflow in
`.github/workflows/deploy.yml` on every push to `master`.

- **Live site:** <https://ananth-narayan-iitm.github.io/multiphase.github.io/>
- The workflow enables Pages, builds with Hugo and publishes via the official
  GitHub Pages actions. The base URL is injected automatically, so no manual
  configuration is needed.

Because the repository is named `multiphase.github.io` but its owner is
`Ananth-Narayan-IITM`, GitHub serves it as a **project site** under
`/<repo>/`. To serve it at the root `https://multiphase.github.io/`, move the
repository into a GitHub organisation named `multiphase`, or add a custom domain
via a `static/CNAME` file.

## Where everything lives

```
hugo.toml                 site title, name, role, email, social links, menu
data/focus.yaml            the four research-focus cards on the homepage
data/skills.yaml           the "Toolbox" cards
data/timeline.yaml         the education / experience timeline on About
content/_index.md          homepage hero text and statistics
content/about.md           the About page biography
content/projects/          one markdown file per project
content/notes/             one markdown file per note
assets/css/main.css        the entire look and feel (design tokens at the top)
assets/js/main.js          theme toggle, lightbox, filtering, hero animation
static/img/                images (placeholder contours + project covers)
static/videos/             videos (placeholder MP4s + posters)
static/files/cv.pdf        the downloadable CV
layouts/                   the theme templates
```

## Replacing the placeholders

### 1. Name, role and contact

Edit the `[params]` block in `hugo.toml`:

```toml
brand = "Alex Morgan"
initials = "AM"
author = "Dr. Alex Morgan"
role = "Computational Fluid Physics & Thermal Engineering"
email = "alex.morgan@example.com"
```

and the `[params.social]` links just below it.

### 2. Images and videos

The dummy assets were generated to look like simulation output so the layout can be
judged at full fidelity:

- `static/img/gallery/*.jpg` — contour fields, meshes, residuals, etc.
- `static/img/cover-*.jpg` — the project card covers
- `static/img/avatar.jpg` — the portrait on the About page
- `static/videos/*.mp4` and `static/videos/*.jpg` — the video and its poster

Drop your own file over the dummy one **keeping the same filename**, or update the
path in the project front matter (`cover:`) and in the shortcodes in the body.
Nothing else has to change.

### 3. CV

Replace `static/files/cv.pdf` with your real CV.

### 4. Text and numbers

- Homepage hero: `content/_index.md` (`hero:` block).
- Project text: `content/projects/*.md`.
- Notes: `content/notes/*.md`.
- Research focus cards: `data/focus.yaml`.
- Toolbox: `data/skills.yaml`.
- Timeline: `data/timeline.yaml`.

The headline statistics (for example `1.2B+ cells solved`) are placeholders too —
change the `stats:` list in `content/_index.md` and the `metrics:` list in each
project.

## Shortcodes

Use these inside any project or note markdown.

```
{{< figure src="/img/gallery/velocity-contour.jpg" caption="Velocity field" span="half" >}}
{{< video src="/videos/taylor-bubble.mp4" poster="/videos/taylor-bubble.jpg" caption="Bubble train" >}}
{{< gallery cols="2" >}} ...figures... {{< /gallery >}}
{{< callout type="tip" title="Note" >}} markdown {{< /callout >}}
{{< eq label="1" >}} \nabla \cdot \mathbf{u} = 0 {{< /eq >}}
{{< keypoints title="At a glance" >}} - one - two {{< /keypoints >}}
{{< steps >}} 1. first 2. second {{< /steps >}}
{{< m >}}a_l{{< /m >}}   inline math
```

`figure` opens a lightbox when clicked. `callout` types: `note`, `tip`, `warning`,
`result`, `method`. Add `math: true` to a page's front matter to load the equations
renderer.

## Adding a project or a note

```bash
hugo new content projects/my-new-project.md
hugo new content notes/my-new-note.md
```

or copy an existing file in the section and edit its front matter.
