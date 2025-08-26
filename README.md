# Shared Project 🚀

Ein gemeinsames Next.js Projekt für die Zusammenarbeit.

## 📋 Über das Projekt

Dieses Projekt wurde mit Next.js 15, TypeScript und Tailwind CSS erstellt. Es bietet eine moderne Entwicklungsumgebung für die gemeinsame Arbeit an Web-Anwendungen.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (mit App Router)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS
- **Linting:** ESLint
- **Package Manager:** npm

## 🚀 Getting Started

### Voraussetzungen

- Node.js (Version 18 oder höher)
- npm oder yarn
- Git

### Installation

1. Repository klonen:
```bash
git clone <repository-url>
cd shared-project
```

2. Dependencies installieren:
```bash
npm install
```

3. Entwicklungsserver starten:
```bash
npm run dev
```

4. Öffne [http://localhost:3000](http://localhost:3000) in deinem Browser

## 📝 Verfügbare Scripts

- `npm run dev` - Startet den Entwicklungsserver mit Turbopack
- `npm run build` - Erstellt die Produktionsversion
- `npm run start` - Startet den Produktionsserver
- `npm run lint` - Führt ESLint aus

## 🤝 Zusammenarbeit

### Git Workflow

1. **Neue Features/Fixes:**
   ```bash
   git checkout -b feature/dein-feature-name
   # Arbeite an deinem Feature
   git add .
   git commit -m "feat: beschreibung des features"
   git push origin feature/dein-feature-name
   ```

2. **Pull Request erstellen** auf GitHub

3. **Code Review** durch den anderen Entwickler

4. **Merge** nach Approval

### Commit Conventions

Wir verwenden [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Neue Features
- `fix:` - Bugfixes
- `docs:` - Dokumentation
- `style:` - Code-Formatierung
- `refactor:` - Code-Refactoring
- `test:` - Tests
- `chore:` - Build-Prozess, Dependencies

### Projektstruktur

```
shared-project/
├── src/
│   ├── app/              # App Router (Next.js 13+)
│   │   ├── globals.css   # Globale Styles
│   │   ├── layout.tsx    # Root Layout
│   │   └── page.tsx      # Homepage
│   ├── components/       # Wiederverwendbare Komponenten
│   ├── lib/             # Utility-Funktionen
│   └── types/           # TypeScript Type Definitionen
├── public/              # Statische Assets
├── package.json
└── README.md
```

## 🎨 Styling

Das Projekt verwendet Tailwind CSS für das Styling. Die Konfiguration findest du in:
- `tailwind.config.js`
- `src/app/globals.css`

## 📦 Dependencies hinzufügen

```bash
# Produktions-Dependency
npm install package-name

# Entwicklungs-Dependency
npm install -D package-name
```

## 🐛 Debugging

- Verwende die Browser DevTools
- Next.js bietet detaillierte Error-Messages
- ESLint hilft bei Code-Qualität

## 📚 Nützliche Links

- [Next.js Dokumentation](https://nextjs.org/docs)
- [TypeScript Dokumentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Dokumentation](https://tailwindcss.com/docs)
- [React Dokumentation](https://react.dev/)

## 🤔 Fragen?

Bei Fragen oder Problemen:
1. Schaue in die Dokumentation
2. Erstelle ein Issue auf GitHub
3. Frage den anderen Entwickler

---

**Happy Coding! 🎉**