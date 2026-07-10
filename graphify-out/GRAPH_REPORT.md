# Graph Report - .  (2026-07-09)

## Corpus Check
- Corpus is ~1,143 words - fits in a single context window. You may not need a graph.

## Summary
- 77 nodes · 72 edges · 15 communities (7 shown, 8 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.95)
- Token cost: 170,237 input · 0 output

## Community Hubs (Navigation)
- TS Compiler Options
- Project README (cross-repo refs)
- Package Scripts
- Dev Dependencies
- Runtime Dependencies
- AGENTS.md Breaking Changes Notice
- Root Layout
- Home Page
- TS Config
- ESLint Config
- Next Config
- PostCSS Config
- File Icon Asset
- Globe Icon Asset
- Window Icon Asset

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `README.md (inventario-tienda)` - 9 edges
3. `scripts` - 5 edges
4. `Next.js` - 4 edges
5. `inventario-app (panel de administración)` - 3 edges
6. `next/font` - 3 edges
7. `Home()` - 2 edges
8. `next` - 2 edges
9. `paths` - 2 edges
10. `Next.js (as used in inventario-tienda)` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Vercel Triangle Logomark (SVG)` ----> `Home()`  [EXTRACTED]
  public/vercel.svg → app/page.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Shared inventory data source flow: inventario-api feeds both inventario-tienda and inventario-app** — readme, readme_inventario_api, readme_inventario_app [EXTRACTED 1.00]

## Communities (15 total, 8 thin omitted)

### Community 0 - "TS Compiler Options"
Cohesion: 0.12
Nodes (17): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+9 more)

### Community 1 - "Project README (cross-repo refs)"
Cohesion: 0.29
Nodes (11): README.md (inventario-tienda), app/page.tsx, create-next-app, Geist (font family), inventario-api, inventario-app (panel de administración), next/font, Next.js (+3 more)

### Community 2 - "Package Scripts"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 3 - "Dev Dependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

### Community 4 - "Runtime Dependencies"
Cohesion: 0.33
Nodes (6): Next.js Framework, dependencies, next, react, react-dom, Next.js Logo (wordmark SVG)

### Community 5 - "AGENTS.md Breaking Changes Notice"
Cohesion: 0.50
Nodes (3): Non-standard Next.js version has breaking changes, node_modules/next/dist/docs/, Next.js (as used in inventario-tienda)

### Community 6 - "Root Layout"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

## Knowledge Gaps
- **46 isolated node(s):** `geistSans`, `geistMono`, `metadata`, `eslintConfig`, `nextConfig` (+41 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `compilerOptions` connect `TS Compiler Options` to `TS Config`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Dev Dependencies` to `Package Scripts`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Runtime Dependencies` to `Package Scripts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **What connects `geistSans`, `geistMono`, `metadata` to the rest of the system?**
  _46 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `TS Compiler Options` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._