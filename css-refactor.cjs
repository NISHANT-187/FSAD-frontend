const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'src', 'styles');
const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));

const cssReplacements = [
  { match: /border-radius:\s*30px/gi, replace: 'border-radius: 12px' },
  { match: /border-radius:\s*25px/gi, replace: 'border-radius: 8px' },
  { match: /border-radius:\s*20px/gi, replace: 'border-radius: 8px' },
  { match: /border-radius:\s*15px/gi, replace: 'border-radius: 6px' },
  { match: /border-radius:\s*50px/gi, replace: 'border-radius: 8px' }, // buttons usually
  { match: /border:\s*[234]px\s*solid/gi, replace: 'border: 1px solid' },
  { match: /font-weight:\s*[89]00/gi, replace: 'font-weight: 600' },
  { match: /font-weight:\s*bold/gi, replace: 'font-weight: 600' },
  { match: /box-shadow:\s*0\s+\d+px\s+\d+px\s+rgba\([^)]+\)/gi, replace: 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03)' },
  { match: /box-shadow:\s*0\s+0\s+\d+px\s+rgba\([^)]+\)/gi, replace: 'box-shadow: none' },
  { match: /backdrop-filter:\s*blur\(\d+px\)/gi, replace: 'backdrop-filter: blur(8px)' }
];

cssFiles.forEach(file => {
  const filePath = path.join(cssDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  cssReplacements.forEach(({match, replace}) => {
    content = content.replace(match, replace);
  });
  
  if(content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Refactored geometry in ${file}`);
  }
});
