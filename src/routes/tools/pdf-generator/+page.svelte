<script>
  import { onMount } from 'svelte';
  import { PDFDocument, rgb, cmyk, degrees, StandardFonts } from 'pdf-lib';
  import { db } from '$lib/dexie/pdf-generator.js';
	import { PDF_SIZES } from '$lib/types/pdf-converter.js';
  
  let files = [];
  let savedPdfs = [];
  let currentPdfId = null;
  
  // Enhanced PDF options
  let pdfOptions = {
    // Basic options
    pageSize: 'A4',
    orientation: 'portrait',
    margin: 20,
    quality: 0.8,
    rotation: 0,
    
    // Advanced options
    compression: 'medium',
    colorSpace: 'rgb',
    layout: {
      type: 'single',
      gridCols: 2,
      customPositions: []
    },
    
    // Text features
    text: {
      watermark: '',
      header: '',
      footer: '',
      pageNumbers: false,
      font: 'Helvetica',
    },
    
    // Image options
    imageOptions: {
      filter: 'none', // none, grayscale, sepia
      opacity: 1,
      brightness: 1,
      contrast: 1
    },
    
    // Security
    security: {
      userPassword: '',
      ownerPassword: '',
      permissions: {
        printing: true,
        modifying: false,
        copying: true,
        annotating: true
      }
    }
  };

  let processing = false;
  let progress = 0;
  let error = '';

  onMount(async () => {
    await loadSavedPdfs();
  });

  async function loadSavedPdfs() {
    try {
      savedPdfs = await db.pdfs.orderBy('createdAt').reverse().toArray();
    } catch (err) {
      error = 'Failed to load saved PDFs';
    }
  }

  async function handleFiles(event) {
    const newFiles = Array.from(event.target.files);
    files = [...files, ...newFiles.filter(file => file.type.startsWith('image/'))];
  }

  async function createPDF() {
    if (files.length === 0) {
      error = 'Please add at least one image';
      return;
    }

    processing = true;
    progress = 0;
    error = '';

    try {
      const pdfDoc = await PDFDocument.create();
      
      // Set metadata
      pdfDoc.setTitle('Converted Images');
      pdfDoc.setAuthor('PDF Converter');
      pdfDoc.setCreator('PDF Converter App');
      
      // Set default font
      const font = await pdfDoc.embedFont(StandardFonts[pdfOptions.text.font]);
      
      // Process each image
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageBytes = await file.arrayBuffer();
        
        let image;
        if (file.type === 'image/jpeg') {
          image = await pdfDoc.embedJpg(imageBytes);
        } else if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(imageBytes);
        }

        // Calculate page dimensions
        const [pageWidth, pageHeight] = getPageDimensions();
        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        // Apply image transformations
        const { width, height, x, y } = calculateImagePosition(image, i);
        
        // Draw image with all options
        page.drawImage(image, {
          x,
          y,
          width,
          height,
          rotate: degrees(pdfOptions.rotation),
          opacity: pdfOptions.imageOptions.opacity
        });

        // Add watermark if specified
        if (pdfOptions.text.watermark) {
          addWatermark(page, font);
        }

        // Add header/footer
        if (pdfOptions.text.header) {
          addHeader(page, font);
        }
        if (pdfOptions.text.footer) {
          addFooter(page, font);
        }

        // Add page numbers
        if (pdfOptions.text.pageNumbers) {
          addPageNumber(page, font, i + 1);
        }

        progress = ((i + 1) / files.length) * 100;
      }

      // Save PDF
      const pdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 50,
      });

      // Store in IndexedDB
      const pdfData = {
        name: `Converted_${new Date().toISOString()}.pdf`,
        data: pdfBytes,
        createdAt: new Date(),
        metadata: {
          pageCount: pdfDoc.getPageCount(),
          options: pdfOptions
        }
      };

      currentPdfId = await db.pdfs.add(pdfData);
      
      // Store associated images
      for (const file of files) {
        await db.images.add({
          name: file.name,
          data: await file.arrayBuffer(),
          pdfId: currentPdfId
        });
      }

      // Refresh saved PDFs list
      await loadSavedPdfs();

      // Trigger download
      downloadPDF(pdfBytes, pdfData.name);

    } catch (err) {
      error = `Error creating PDF: ${err.message}`;
    } finally {
      processing = false;
    }
  }

  function getPageDimensions() {
    const [width, height] = PDF_SIZES[pdfOptions.pageSize];
    return pdfOptions.orientation === 'portrait' ? [width, height] : [height, width];
  }

 // Add this function inside the PdfConverter.svelte script section
// Replace the previous empty calculateImagePosition function with this:

function calculateImagePosition(image, index) {
  const [pageWidth, pageHeight] = getPageDimensions();
  const margin = pdfOptions.margin;

  // Calculate max dimensions accounting for margins
  const maxWidth = pageWidth - (margin * 2);
  const maxHeight = pageHeight - (margin * 2);

  // Calculate scaled dimensions while maintaining aspect ratio
  let width, height;
  const imageRatio = image.width / image.height;
  const pageRatio = maxWidth / maxHeight;

  if (imageRatio > pageRatio) {
    // Image is wider than page ratio
    width = maxWidth;
    height = width / imageRatio;
  } else {
    // Image is taller than page ratio
    height = maxHeight;
    width = height * imageRatio;
  }

  let x, y;

  switch (pdfOptions.layout.type) {
    case 'single':
      // Center image on page
      x = (pageWidth - width) / 2;
      y = (pageHeight - height) / 2;
      break;

    case 'double':
      // Calculate position for two images per page
      const isSecondImage = index % 2;
      const halfPage = (pageWidth - (margin * 3)) / 2;
      
      // Recalculate width and height for half page
      if (width > halfPage) {
        width = halfPage;
        height = width / imageRatio;
      }
      
      x = margin + (isSecondImage ? (halfPage + margin) : 0);
      y = (pageHeight - height) / 2;
      break;

    case 'grid':
      // Calculate grid position
      const cols = pdfOptions.layout.gridCols;
      const rows = Math.ceil(files.length / cols);
      const cellWidth = (pageWidth - (margin * (cols + 1))) / cols;
      const cellHeight = (pageHeight - (margin * (rows + 1))) / rows;
      
      // Recalculate dimensions to fit grid cell
      if (imageRatio > cellWidth / cellHeight) {
        width = cellWidth;
        height = width / imageRatio;
      } else {
        height = cellHeight;
        width = height * imageRatio;
      }
      
      const col = index % cols;
      const row = Math.floor(index / cols);
      
      x = margin + (col * (cellWidth + margin));
      y = pageHeight - margin - height - (row * (cellHeight + margin));
      break;

    case 'custom':
      // Use custom positions if defined
      if (pdfOptions.layout.customPositions[index]) {
        const pos = pdfOptions.layout.customPositions[index];
        x = pos.x;
        y = pos.y;
        width = pos.width || width;
        height = pos.height || height;
      } else {
        // Default to centered if no custom position
        x = (pageWidth - width) / 2;
        y = (pageHeight - height) / 2;
      }
      break;

    default:
      // Default to centered
      x = (pageWidth - width) / 2;
      y = (pageHeight - height) / 2;
  }

  return {
    width,
    height,
    x,
    y
  };
}

  function addWatermark(page, font) {
    const { width, height } = page.getSize();
    page.drawText(pdfOptions.text.watermark, {
      x: width / 2,
      y: height / 2,
      font,
      size: 24,
      opacity: 0.2,
      rotate: degrees(45)
    });
  }

  function addHeader(page, font) {
    const { width } = page.getSize();
    page.drawText(pdfOptions.text.header, {
      x: pdfOptions.margin,
      y: page.getSize().height - pdfOptions.margin,
      font,
      size: 12
    });
  }

  function addFooter(page, font) {
    const { width } = page.getSize();
    page.drawText(pdfOptions.text.footer, {
      x: pdfOptions.margin,
      y: pdfOptions.margin,
      font,
      size: 12
    });
  }

  function addPageNumber(page, font, number) {
    const { width, height } = page.getSize();
    page.drawText(`Page ${number}`, {
      x: width - 50,
      y: pdfOptions.margin,
      font,
      size: 10
    });
  }

  async function downloadSavedPdf(id) {
    try {
      const pdf = await db.pdfs.get(id);
      if (pdf) {
        downloadPDF(pdf.data, pdf.name);
      }
    } catch (err) {
      error = 'Failed to download PDF';
    }
  }

  async function deleteSavedPdf(id) {
    try {
      await db.pdfs.delete(id);
      await db.images.where('pdfId').equals(id).delete();
      await loadSavedPdfs();
    } catch (err) {
      error = 'Failed to delete PDF';
    }
  }

  function downloadPDF(pdfBytes, filename) {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
</script>

<!-- Template -->
<div class="container mx-auto p-4">
  <!-- File Input Section -->
  <div class="mb-6">
    <input
      type="file"
      accept="image/*"
      multiple
      on:change={handleFiles}
      class="mb-4"
    />
  </div>

  <!-- Advanced Options Panels -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
    <!-- Page Settings -->
    <div class="border p-4 rounded">
      <h3 class="font-bold mb-2">Page Settings</h3>
      <select bind:value={pdfOptions.pageSize} class="w-full mb-2">
        {#each Object.keys(PDF_SIZES) as size}
          <option value={size}>{size}</option>
        {/each}
      </select>
      <!-- Add other page settings controls -->
    </div>

    <!-- Image Settings -->
    <div class="border p-4 rounded">
      <h3 class="font-bold mb-2">Image Settings</h3>
      <input
        type="range"
        bind:value={pdfOptions.imageOptions.opacity}
        min="0"
        max="1"
        step="0.1"
        class="w-full"
      />
      <!-- Add other image settings controls -->
    </div>

    <!-- Text Features -->
    <div class="border p-4 rounded">
      <h3 class="font-bold mb-2">Text Features</h3>
      <input
        type="text"
        bind:value={pdfOptions.text.watermark}
        placeholder="Watermark text"
        class="w-full mb-2"
      />
      <!-- Add other text feature controls -->
    </div>

    <!-- Security Settings -->
    <div class="border p-4 rounded">
      <h3 class="font-bold mb-2">Security</h3>
      <input
        type="password"
        bind:value={pdfOptions.security.userPassword}
        placeholder="User password"
        class="w-full mb-2"
      />
      <!-- Add other security controls -->
    </div>
  </div>

  <!-- Preview and Create Button -->
  {#if files.length > 0}
    <div class="mb-6">
      <button
        on:click={createPDF}
        disabled={processing}
        class="bg-blue-500 text-white px-6 py-3 rounded disabled:bg-gray-400"
      >
        {processing ? 'Creating PDF...' : 'Create PDF'}
      </button>
    </div>
  {/if}

  <!-- Saved PDFs List -->
  {#if savedPdfs.length > 0}
    <div class="mt-8">
      <h2 class="text-xl font-bold mb-4">Saved PDFs</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each savedPdfs as pdf}
          <div class="border p-4 rounded flex justify-between items-center">
            <div>
              <p class="font-medium">{pdf.name}</p>
              <p class="text-sm text-gray-600">
                Created: {new Date(pdf.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <button
                on:click={() => downloadSavedPdf(pdf.id)}
                class="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Download
              </button>
              <button
                on:click={() => deleteSavedPdf(pdf.id)}
                class="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Progress Bar -->
  {#if processing}
    <div class="w-full bg-gray-200 rounded h-2 mt-4">
      <div
        class="bg-blue-500 h-2 rounded"
        style="width: {progress}%"
      ></div>
    </div>
  {/if}

  <!-- Error Message -->
  {#if error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
      {error}
    </div>
  {/if}
</div>