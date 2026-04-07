const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'styles');
const cssFiles = fs.readdirSync(directoryPath).filter(file => file.endsWith('.css'));

const replacements = [
  { match: /#667eea/gi, replace: '#1e3a8a' }, // Primary Indigo to Navy Blue
  { match: /#764ba2/gi, replace: '#0f172a' }, // Secondary Purple to Dark Slate
  { match: /rgba\(102,\s*126,\s*234/gi, replace: 'rgba(30, 58, 138' }, // primary rgba
  { match: /rgba\(118,\s*75,\s*162/gi, replace: 'rgba(15, 23, 42' }, // secondary rgba
  { match: /#ffd700/gi, replace: '#d4af37' }, // Bright Gold to Academic Gold
  { match: /#ffed4e/gi, replace: '#fde047' }, // Lighter variant
  { match: /rgba\(255,\s*215,\s*0/gi, replace: 'rgba(212, 175, 55' }, // gold rgba
  { match: /#4ecdc4/gi, replace: '#0ea5e9' }, // Teal to Sky Blue
  { match: /#44a08d/gi, replace: '#0369a1' }, // Darker Teal to Darker Sky Blue
  { match: /#ff6b6b/gi, replace: '#e11d48' }, // Coral to Crimson/Rose
  { match: /#ee5a6f/gi, replace: '#be123c' }  // Darker Coral to Darker Crimson
];

cssFiles.forEach(file => {
  const filePath = path.join(directoryPath, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  replacements.forEach(({ match, replace }) => {
    content = content.replace(match, replace);
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated theme colors in ${file}`);
  }
});
