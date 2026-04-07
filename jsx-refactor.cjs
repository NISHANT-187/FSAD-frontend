const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if(fs.statSync(filePath).isDirectory()) {
      processDir(filePath);
    } else if (filePath.endsWith('.jsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let original = content;
      
      // Replace spring physical animations with smooth temporal eases
      content = content.replace(/type:\s*['"]spring['"],?\s*stiffness:\s*\d+/g, "ease: 'easeOut', duration: 0.5");
      content = content.replace(/type:\s*['"]spring['"]/g, "ease: 'easeOut', duration: 0.5");
      
      // Remove text rotation that acts cartoonish
      content = content.replace(/rotate:\s*\[[^\]]+\]/g, "y: [-2, 2, -2]"); // fallback subtle movement if needed
      
      // Tone down crazy scale bounces
      content = content.replace(/scale:\s*\[1,\s*1\.\d+,\s*1\]/g, "opacity: [0.8, 1, 0.8]");
      
      if(content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Refactored motions in ${file}`);
      }
    }
  });
}

processDir(path.join(__dirname, 'src'));
