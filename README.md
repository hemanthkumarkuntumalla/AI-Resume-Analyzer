# MatchCraft — Resume Analyzer

A responsive, browser-based resume analyzer and job matcher. Upload a text-based PDF, paste a job description, and get a skill overlap score, section checklist, suggestions, and a downloadable text report.

**Live demo:** Add your GitHub Pages URL here after publishing: `https://YOUR-USERNAME.github.io/ai-resume-analyzer/`

## Features
- PDF text extraction with PDF.js
- Curated technical-skill matching with boundary-aware aliases
- Job overlap score and resume completeness checklist
- Suggestions and downloadable report
- Browser-only processing: the app does not upload or store resumes
- Responsive design and accessible form labels

## Run locally

From the folder containing `index.html`, run `python -m http.server 8000`, then open `http://localhost:8000`. PDF.js loads from cdnjs, so internet access is needed for PDF extraction. The fonts load from Google Fonts and have local fallbacks.

## Publish to GitHub Pages

1. Create a **public** GitHub repository named `ai-resume-analyzer` (leave it empty).
2. Extract the ZIP. Upload **the contents of the `ai-resume-analyzer` folder**, including `index.html`, `assets/`, and `.nojekyll`, to the repository root. You can use GitHub's **Add file → Upload files** or Git:
   ```bash
   cd ai-resume-analyzer
   git init
   git add .
   git commit -m "Build MatchCraft resume analyzer"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/ai-resume-analyzer.git
   git push -u origin main
   ```
3. In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/(root)**, then **Save**.
4. The public site will be `https://YOUR-USERNAME.github.io/ai-resume-analyzer/`. Replace `YOUR-USERNAME` with your GitHub username. GitHub displays the actual link on the Pages settings page once deployment completes.
5. Add the live link to your repository description and replace the demo placeholder above.

If you use a different repository name, replace the last URL segment accordingly. Publishing requires access to your GitHub account; the ZIP itself does not create a live URL.

## How scores work

The job match is the number of recognized job skills also found in the resume divided by the number of recognized job skills. When no curated job skills are found, match is N/A. Completeness is the proportion of six common resume sections/contact checks detected by simple text patterns. These are explainable heuristics, **not an AI model, ATS score, hiring prediction, or proof of qualification**. No database or Java backend is required for this Pages-compatible version. Image-only/scanned PDFs need OCR before use; encrypted or broken PDFs may fail. Skill lists can be expanded in `assets/analyzer.js`.

## Project structure

```
index.html
assets/style.css
assets/app.js
assets/analyzer.js
tests/analyzer.test.mjs
.nojekyll
```

## Test

Run `node --test tests/analyzer.test.mjs` for core matching checks.

## License

MIT, see `LICENSE`.
