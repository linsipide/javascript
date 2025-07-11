const fs = require('fs');
const path = require('path');
const articles = require('./content.js'); // Import the articles array

// Simple HTML template function
function makeHtml(article) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>${article.title}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="blog">
    <div class="blog-article">
      <h1>${article.title}</h1>
      <h2>${article.subtitle}</h2>
      <p><strong>${article.label}</strong> - ${article.date}</p>
      <div>${article.text}</div>
      <div>${article.mention}</div>
      <div>${article.id}</div>
    </div>
  </div>
</body>
</html>`;
}

// Ensure output directory exists
const outputDir = path.join(__dirname, 'Articles');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Generate one HTML file per article
articles.forEach((article, idx) => {
  // Use label or index for filename
  const safeLabel = article.id.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const filename = `${safeLabel || 'article'}.html`;
  const filepath = path.join(outputDir, filename);

  const html = makeHtml(article);
  fs.writeFileSync(filepath, html, 'utf8');
  console.log(`Generated: ${filepath}`);
});