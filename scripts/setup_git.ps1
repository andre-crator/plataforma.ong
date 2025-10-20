param(
  [string]$RepoUrl = "https://github.com/andre-crator/plataforma.ong.git",
  [string]$Branch = "main"
)
git init
git add .
git commit -m "Versão final comentada e acessível"
git branch -M $Branch
git remote remove origin 2>$null
git remote add origin $RepoUrl
git pull --rebase origin $Branch --allow-unrelated-histories 2>$null
git push -u origin $Branch
