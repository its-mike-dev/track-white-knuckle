DROP RENDERS HERE

Expected file names (the gallery reads exactly these):
  render_01.jpg
  render_02.jpg
  render_03.jpg
  render_04.jpg
  render_05.jpg
  render_06.jpg

Any slot without a file shows a styled "NO SIGNAL" placeholder and is
skipped by the lightbox - so 4 renders instead of 6 is fine.

Recommended: 1920x1200 (16:10), JPG quality ~82, under 500 KB each.
If you use .png or .webp instead, change the src/captions in index.html
(block: <div class="gallery">).
