# 🚀 Setup Anleitung für GitHub

## GitHub Repository erstellen

### 1. Repository auf GitHub erstellen

1. Gehe zu [GitHub](https://github.com) und logge dich ein
2. Klicke auf das **"+"** Symbol oben rechts → **"New repository"**
3. Repository-Name: `shared-project` (oder einen anderen Namen deiner Wahl)
4. Beschreibung: `Ein gemeinsames Next.js Projekt für die Zusammenarbeit`
5. **Wichtig:** Wähle **"Public"** oder **"Private"** je nach Bedarf
6. **NICHT** "Initialize this repository with a README" anklicken (wir haben bereits eins)
7. Klicke **"Create repository"**

### 2. Lokales Repository mit GitHub verbinden

Führe diese Befehle in deinem Terminal aus (im Projektordner):

```bash
# Wechsle in das Projektverzeichnis
cd /Users/maxheyder/shared-project

# Füge GitHub als Remote hinzu (ersetze USERNAME und REPO-NAME)
git remote add origin https://github.com/USERNAME/REPO-NAME.git

# Pushe den Code zu GitHub
git branch -M main
git push -u origin main
```

**Beispiel:**
```bash
git remote add origin https://github.com/maxheyder/shared-project.git
git push -u origin main
```

### 3. Freundin als Collaborator hinzufügen

1. Gehe zu deinem Repository auf GitHub
2. Klicke auf **"Settings"** (oben rechts im Repository)
3. Klicke auf **"Collaborators"** im linken Menü
4. Klicke **"Add people"**
5. Gib den GitHub-Username oder die E-Mail deiner Freundin ein
6. Wähle **"Write"** Berechtigung
7. Klicke **"Add [username] to this repository"**

### 4. Freundin kann Repository klonen

Deine Freundin kann das Repository so klonen:

```bash
# Repository klonen
git clone https://github.com/USERNAME/REPO-NAME.git
cd shared-project

# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

## 🤝 Workflow für die Zusammenarbeit

### Branch-basierter Workflow

1. **Neue Features entwickeln:**
   ```bash
   # Neuen Branch erstellen
   git checkout -b feature/mein-feature
   
   # Änderungen machen...
   
   # Änderungen committen
   git add .
   git commit -m "feat: beschreibung des features"
   
   # Branch zu GitHub pushen
   git push origin feature/mein-feature
   ```

2. **Pull Request erstellen:**
   - Gehe zu GitHub
   - Klicke **"Compare & pull request"**
   - Beschreibe deine Änderungen
   - Weise deine Freundin als Reviewer zu
   - Klicke **"Create pull request"**

3. **Code Review:**
   - Freundin reviewed den Code
   - Diskussion über Änderungen
   - Approval oder Änderungswünsche

4. **Merge:**
   - Nach Approval: **"Merge pull request"**
   - Branch löschen: **"Delete branch"**

### Lokale Änderungen synchronisieren

```bash
# Neueste Änderungen holen
git checkout main
git pull origin main

# Lokale Branches aufräumen
git branch -d feature/altes-feature
```

## 🛠️ Nützliche Git-Befehle

```bash
# Status anzeigen
git status

# Änderungen anzeigen
git diff

# Commit-Historie anzeigen
git log --oneline

# Branch wechseln
git checkout branch-name

# Alle Branches anzeigen
git branch -a

# Remote Branches anzeigen
git branch -r
```

## 🔧 Troubleshooting

### Problem: "Permission denied"
- Überprüfe, ob du als Collaborator hinzugefügt wurdest
- Verwende HTTPS statt SSH: `https://github.com/username/repo.git`

### Problem: "Repository not found"
- Überprüfe den Repository-Namen
- Stelle sicher, dass das Repository public ist oder du Zugriff hast

### Problem: Merge Conflicts
```bash
# Konflikt-Dateien bearbeiten
# Dann:
git add .
git commit -m "resolve merge conflict"
```

---

**Viel Erfolg bei der Zusammenarbeit! 🎉**
