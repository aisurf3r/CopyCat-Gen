document.addEventListener('DOMContentLoaded', function() {
  const signatureInput = document.getElementById('signatureInput');
  const signaturesGrid = document.getElementById('signaturesGrid');
  const emptyState = document.getElementById('emptyState');
  const clearBtn = document.getElementById('clearBtn');
  const colorPicker = document.getElementById('colorPicker');
  const colorCircle = document.getElementById('colorCircle');
  const colorValue = document.getElementById('colorValue');
  const signatureCat = document.querySelector('.signature-cat');
  const sizeSlider = document.getElementById('sizeSlider');
  
  let currentColor = '#000000';
  let currentSize = 2; // Medium by default
  
  // Handwriting fonts only
  const handwritingFonts = [
    { name: 'Dancing Script', class: 'dancing-script' },
    { name: 'Sacramento', class: 'sacramento' },
    { name: 'Caveat', class: 'caveat' },
    { name: 'Shadows Into Light', class: 'shadows-into-light' },
    { name: 'Pacifico', class: 'pacifico' },
    { name: 'Homemade Apple', class: 'homemade-apple' },
    { name: 'Alex Brush', class: 'alex-brush' },
    { name: 'Allura', class: 'allura' },
    { name: 'Bad Script', class: 'bad-script' },
    { name: 'Berkshire Swash', class: 'berkshire-swash' },
    { name: 'Cedarville Cursive', class: 'cedarville-cursive' },
    { name: 'Clicker Script', class: 'clicker-script' },
    { name: 'Cookie', class: 'cookie' },
    { name: 'Courgette', class: 'courgette' },
    { name: 'Damion', class: 'damion' },
    { name: 'Dawning of a New Day', class: 'dawning-of-a-new-day' },
    { name: 'Devonshire', class: 'devonshire' },
    { name: 'Engagement', class: 'engagement' },
    { name: 'Ephesis', class: 'ephesis' },
    { name: 'Farsan', class: 'farsan' },
    { name: 'Freehand', class: 'freehand' },
    { name: 'Gloria Hallelujah', class: 'gloria-hallelujah' },
    { name: 'Gochi Hand', class: 'gochi-hand' },
    { name: 'Grand Hotel', class: 'grand-hotel' },
    { name: 'Great Vibes', class: 'great-vibes' },
    { name: 'Handlee', class: 'handlee' },
    { name: 'Herr Von Muellerhoff', class: 'herr-von-muellerhoff' },
    { name: 'Indie Flower', class: 'indie-flower' },
    { name: 'Itim', class: 'itim' },
    { name: 'Italianno', class: 'italianno' },
    { name: 'Just Another Hand', class: 'just-another-hand' },
    { name: 'Just Me Again Down Here', class: 'just-me-again-down-here' },
    { name: 'Kalam', class: 'kalam' },
    { name: 'Kaushan Script', class: 'kaushan-script' },
    { name: 'Kavoon', class: 'kavoon' },
    { name: 'Kristi', class: 'kristi' },
    { name: 'La Belle Aurore', class: 'la-belle-aurore' },
    { name: 'League Script', class: 'league-script' },
    { name: 'Leckerli One', class: 'leckerli-one' },
    { name: 'Lobster', class: 'lobster' },
    { name: 'Lobster Two', class: 'lobster-two' },
    { name: 'Long Cang', class: 'long-cang' },
    { name: 'Mali', class: 'mali' },
    { name: 'Marck Script', class: 'marck-script' },
    { name: 'Meow Script', class: 'meow-script' },
    { name: 'Mrs Saint Delafield', class: 'mrs-saint-delafield' },
    { name: 'Niconne', class: 'niconne' },
    { name: 'Norican', class: 'norican' },
    { name: 'Nova Script', class: 'nova-script' },
    { name: 'Over the Rainbow', class: 'over-the-rainbow' },
    { name: 'Parisienne', class: 'parisienne' },
    { name: 'Patrick Hand', class: 'patrick-hand' },
    { name: 'Petit Formal Script', class: 'petit-formal-script' },
    { name: 'Pinyon Script', class: 'pinyon-script' },
    { name: 'Princess Sofia', class: 'princess-sofia' },
    { name: 'Qwigley', class: 'qwigley' },
    { name: 'Redressed', class: 'redressed' },
    { name: 'Rochester', class: 'rochester' },
    { name: 'Romanesco', class: 'romanesco' },
    { name: 'Rouge Script', class: 'rouge-script' },
    { name: 'Ruthie', class: 'ruthie' },
    { name: 'Satisfy', class: 'satisfy' },
    { name: 'Sedgwick Ave', class: 'sedgwick-ave' },
    { name: 'Shrikhand', class: 'shrikhand' },
    { name: 'Sofia', class: 'sofia' },
    { name: 'Stalemate', class: 'stalemate' },
    { name: 'Tangerine', class: 'tangerine' },
    { name: 'The Girl Next Door', class: 'the-girl-next-door' },
    { name: 'Yellowtail', class: 'yellowtail' },
    { name: 'Zeyada', class: 'zeyada' },
    { name: 'Mrs Sheppards', class: 'mrs-sheppards' },
    { name: 'WindSong', class: 'windsong' }
  ];
  
  // Generate signature cards
  function generateSignatures(text) {
    if (!text.trim()) {
      signaturesGrid.innerHTML = '';
      emptyState.classList.remove('hidden');
      signatureCat.textContent = '🐱';
      return;
    }
    
    // Change cat emoji when typing
    const catEmojis = ['😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'];
    const randomCat = catEmojis[Math.floor(Math.random() * catEmojis.length)];
    signatureCat.textContent = randomCat;
    
    emptyState.classList.add('hidden');
    signaturesGrid.innerHTML = '';
    
    handwritingFonts.forEach(font => {
      const card = document.createElement('div');
      card.className = 'signature-card';
      
      const fontName = document.createElement('div');
      fontName.className = 'font-name';
      fontName.textContent = font.name;
      
      const preview = document.createElement('div');
      preview.className = `signature-preview ${font.class}`;
      preview.textContent = text;
      preview.style.color = currentColor;
      
      // Apply size to preview
      let fontSize;
      if (currentSize === 1) { // Small
        fontSize = '1.5rem';
      } else if (currentSize === 2) { // Medium
        fontSize = '2rem';
      } else { // Large
        fontSize = '2.5rem';
      }
      preview.style.fontSize = fontSize;
      
      const downloadBtn = document.createElement('button');
      downloadBtn.className = 'download-btn';
      downloadBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
        </svg>
        Download
      `;
      
      downloadBtn.addEventListener('click', () => {
        downloadSignature(text, font.class, currentColor, currentSize, font.name);
      });
      
      card.appendChild(fontName);
      card.appendChild(preview);
      card.appendChild(downloadBtn);
      
      signaturesGrid.appendChild(card);
    });
  }
  
  // Download signature as image
  function downloadSignature(text, fontClass, color, size, fontName) {
    // Wait for fonts to load
    document.fonts.ready.then(() => {
      // Create a temporary canvas to measure text
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      
      // Set temporary font style
      let fontSize;
      if (size === 1) { // Small
        fontSize = 30;
      } else if (size === 2) { // Medium
        fontSize = 40;
      } else { // Large
        fontSize = 50;
      }
      
      // Apply font to temporary context
      tempCtx.font = `${fontSize}px ${fontClass}`;
      
      // Measure text
      const textWidth = tempCtx.measureText(text).width;
      
      // Create final canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      canvas.width = textWidth + 40; // Add padding
      canvas.height = fontSize * 2; // Add padding
      
      // Transparent background
      context.fillStyle = 'transparent';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw text with correct font
      context.font = `${fontSize}px ${fontClass}`;
      context.fillStyle = color;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, canvas.width / 2, canvas.height / 2);
      
      // Create download link
      const link = document.createElement('a');
      link.download = `signature-${fontName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }
  
  // Event listeners
  signatureInput.addEventListener('input', function() {
    generateSignatures(this.value);
  });
  
  clearBtn.addEventListener('click', function() {
    signatureInput.value = '';
    generateSignatures('');
  });
  
  // Color picker
  colorPicker.addEventListener('input', function() {
    currentColor = this.value;
    colorCircle.style.backgroundColor = currentColor;
    colorValue.textContent = currentColor;
    generateSignatures(signatureInput.value);
  });
  
  // Size slider
  sizeSlider.addEventListener('input', function() {
    currentSize = parseInt(this.value);
    generateSignatures(signatureInput.value);
  });
  
  // View toggle
  document.querySelectorAll('.view-option').forEach(button => {
    button.addEventListener('click', function() {
      document.querySelectorAll('.view-option').forEach(btn => {
        btn.classList.remove('active');
      });
      this.classList.add('active');
      
      const view = this.getAttribute('data-view');
      if (view === 'list') {
        signaturesGrid.classList.add('list-view');
      } else {
        signaturesGrid.classList.remove('list-view');
      }
    });
  });
  
  // Initial state
  generateSignatures(signatureInput.value);
  
  // Add some fun cat effects
  signatureInput.addEventListener('focus', () => {
    signatureCat.style.transform = 'translateY(-50%) scale(1.2)';
  });
  
  signatureInput.addEventListener('blur', () => {
    signatureCat.style.transform = 'translateY(-50%)';
  });
});