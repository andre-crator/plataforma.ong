# Instruções Git/GitHub — Push e Publicação

Use o **Terminal do VS Code** (ou PowerShell).

```powershell
git init
git add .
git commit -m "Versão final comentada e acessível"
git branch -M main
git remote add origin https://github.com/andre-crator/plataforma.ong.git
git pull --rebase origin main --allow-unrelated-histories
git push -u origin main
```
Se pedir senha, use seu **usuário GitHub** e cole o **token (PAT)**.

**GitHub Pages:** Settings → Pages → Source: `Deploy from a branch` → Branch: `main` → Folder: `/ (root)`.
