export const PDF_SIZES = {
    A4: [595, 842],
    A3: [842, 1191],
    A5: [420, 595],
    Letter: [612, 792],
    Legal: [612, 1008],
    Tabloid: [792, 1224]
  };
  
  export const PDF_FEATURES = {
    compression: ['none', 'low', 'medium', 'high'],
    colorSpace: ['rgb', 'cmyk', 'grayscale'],
    pageLayout: ['single', 'double', 'grid', 'custom'],
    textFeatures: ['watermark', 'header', 'footer', 'pageNumbers']
  };