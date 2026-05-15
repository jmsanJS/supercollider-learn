# SC Learn

An interactive platform to **introduce SuperCollider** through hands-on exercises in the browser. No installation required.

## Scope and design intent

**SC Learn** is not meant to be a full SuperCollider environment or a complete reference of the language. The goal is to lower the barrier to entry — give beginners a feel for SuperCollider's syntax and audio concepts before they commit to installing and learning the real software.

A few things this project deliberately does not do:

- **The actual SuperCollider server (`scsynth`) does not run here.** Audio is simulated via [Tone.js](https://tonejs.github.io/), which approximates the sound of common UGens in the browser.
- **Not all UGens are covered.** Only a curated subset relevant to the exercises is documented. The UGen reference and glossary are teaching aids, not a full language spec.
- **Code is not real SC code.** The editor validates SuperCollider-style syntax and simulates the audio output, but it does not execute actual SuperCollider code.

If you want to contribute content, keep this scope in mind: the aim is a clear, progressive introduction — not completeness.

## Features

- **Progressive exercises** — leveled exercises that introduce UGens (Unit Generators) step by step
- **Live audio** — code is evaluated and played back in real time via [Tone.js](https://tonejs.github.io/)
- **Code editor** — syntax-highlighted editor with SuperCollider coloring
- **UGen reference** — built-in glossary and UGen catalog
- **Progress tracking** — exercise completion is saved to `localStorage`, no account needed

## Tech stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | React 19, TypeScript 5 |
| Styling | CSS Modules, CSS custom properties |
| Code editor | Custom `<textarea>` with syntax highlighting |
| Audio engine | [Tone.js 15](https://tonejs.github.io/) |

## Project structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── exercises/        # Exercise player
│   ├── glossary/         # Glossary page
│   ├── ugens/            # UGen reference
│   ├── progress/         # Progress overview
│   └── about/            # About page
├── components/           # Shared UI components
├── context/              # React contexts (Theme, Progress, Exercises)
├── data/                 # Static content (exercises, UGens, glossary, themes)
├── hooks/                # Custom hooks (useAudio)
├── lib/                  # Utilities (audio engine, parser, highlight, progress)
└── types/                # TypeScript types
```

Content lives in `src/data/`. Adding a new exercise, UGen entry, or glossary term only requires editing those files — no logic changes needed.

## Getting started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

## Adding content

### New exercise

Add an entry to `src/data/exercises.ts`. Each exercise implements a `validate(code: string)` function that returns `{ ok, tips, audio }`. Look at existing exercises for reference — the pattern is straightforward.

### New UGen entry

Add an entry to `src/data/ugens.ts`.

### New glossary term

Add an entry to `src/data/glossary.ts`.

## Contributing

Contributions are welcome. The project follows a standard open-source workflow:

1. **Open an issue first** for any non-trivial change (new feature, significant refactor).
2. **Fork** the repository and create a branch from `main`.
   ```
   git checkout -b feat/your-feature-name
   ```
3. **Make your changes.** Keep commits focused — one logical change per commit.
4. **Follow [Conventional Commits](https://www.conventionalcommits.org/)** for commit messages:
   ```
   feat: add LFO exercise to level 3
   fix: correct validate function for WhiteNoise
   docs: update UGen reference for Reverb
   ```
5. **Open a pull request** against `main`. Describe what the change does and why.

### Good first contributions

- New exercises (new UGens, new audio concepts)
- Improvements to existing exercise feedback/tips
- UGen reference entries
- Glossary terms
- Accessibility improvements
- UI bugs

## License

MIT