<!doctype html>
<!--
Static Video Portfolio (HTML + CSS + tiny JS)
- Single file: copy the contents of this file into `index.html`.
- Replace sample items in the <div id="gallery"> with your own thumbnails and links.

How to use your Google Drive link for a preview:
- Upload video to Google Drive, set "Anyone with the link -> Viewer"
- Use the preview iframe URL format: https://drive.google.com/file/d/FILE_ID/preview
- Put that URL into the data-src attribute in the gallery item (see samples below)

Supports:
- YouTube (paste full watch URL or share URL)
- Google Drive (preview URL)
- Direct MP4 links (public URL)

Deploy to GitHub Pages:
1. Create a new GitHub repo (e.g. `my-portfolio`).
2. Add this index.html to the repo root and commit.
3. Push to GitHub.
4. In repo Settings -> Pages -> Deploy from branch `main` root. Save.
5. Your site will be available at `https://<your-username>.github.io/<repo-name>/` (or `https://<your-username>.github.io/` if repo is named `<username>.github.io`).

-->
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Video Editor Portfolio — Your Name</title>
  <meta name="description" content="Video editor portfolio — cinematic edits, promos, wedding highlights." />

  <style>
    /* Simple reset */
    *{box-sizing:border-box}
    html,body{height:100%;margin:0;font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial}
    body{background:#0f172a;color:#0f172a;line-height:1.45}

    /* Layout */
    .container{max-width:1100px;margin:28px auto;padding:20px}
    header{display:flex;gap:20px;align-items:center;justify-content:space-between}
    .brand{display:flex;gap:12px;align-items:center}
    .logo{width:56px;height:56px;border-radius:8px;background:linear-gradient(135deg,#06b6d4,#3b82f6);display:flex;align-items:center;justify-content:center;color:white;font-weight:700}
    h1{margin:0;font-size:20px}
    p.lead{margin:6px 0 0;color:#475569}

    .actions{display:flex;gap:8px}
    .btn{padding:10px 14px;border-radius:8px;text-decoration:none;border:1px solid rgba(15,23,42,0.06);background:white;color:#0f172a;font-weight:600}
    .btn.primary{background:#0f172a;color:white;border:0}

    /* Hero */
    .hero{display:grid;grid-template-columns:1fr 420px;gap:28px;margin-top:28px;align-items:center}
    .hero h2{font-size:28px;margin:0 0 8px}
    .hero p{color:#475569;margin:0}

    /* Search */
    .search{margin-top:14px}
    .search input{width:100%;padding:12px;border-radius:10px;border:1px solid #e2e8f0}

    /* Tags */
    .tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
    .tag{padding:6px 10px;border-radius:999px;border:1px solid #e6eef8;background:white;font-size:13px}

    /* Gallery */
    #gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;margin-top:22px}
    .card{background:white;border-radius:12px;overflow:hidden;box-shadow:0 6px 18px rgba(2,6,23,0.08);cursor:pointer}
    .thumb{position:relative;height:160px;overflow:hidden}
    .thumb img{width:100%;height:100%;object-fit:cover;display:block}
    .duration{position:absolute;left:8px;bottom:8px;background:rgba(0,0,0,0.7);color:white;padding:4px 8px;border-radius:6px;font-size:12px}
    .card .meta{padding:12px}
    .card h3{margin:0;font-size:16px}
    .card p{margin:6px 0 0;color:#64748b;font-size:13px}

    /* Modal */
    .modal{position:fixed;inset:0;background:rgba(2,6,23,0.6);display:flex;align-items:center;justify-content:center;z-index:60;padding:20px;visibility:hidden;opacity:0;transition:opacity .18s ease,visibility .18s}
    .modal.open{visibility:visible;opacity:1}
    .player{width:100%;max-width:1000px;background:white;border-radius:12px;overflow:hidden}
    .player .head{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid #eef2ff}
    .player iframe,.player video{width:100%;height:560px;border:0;display:block}
    .close-btn{background:#0f172a;color:white;padding:8px 12px;border-radius:8px;text-decoration:none}

    /* Footer */
    footer{margin-top:26px;color:#94a3b8;font-size:14px;text-align:center}

    /* responsive */
    @media (max-width:900px){
      .hero{grid-template-columns:1fr}
      .player iframe,.player video{height:360px}
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="brand">
        <div class="logo">VE</div>
        <div>
          <h1>Your Name — Video Editor</h1>
          <p class="lead">Cinematic edits • Color grading • Motion graphics</p>
        </div>
      </div>

      <div class="actions">
        <a class="btn" href="#contact">Contact</a>
        <a class="btn primary" href="#gallery">See Work</a>
      </div>
    </header>

    <section class="hero">
      <div>
        <h2>I craft stories with motion.</h2>
        <p>Professional video editor — wedding highlights, promos, and short films. Click any card to preview.</p>

        <div class="search">
          <input id="search" placeholder="Search projects (e.g., wedding, promo)" />
        </div>

        <div class="tags" id="tags">
          <!-- static tags for visual; you can make them interactive later -->
          <div class="tag">All</div>
          <div class="tag">Wedding</div>
          <div class="tag">Promo</div>
          <div class="tag">Cinematic</div>
        </div>
      </div>

      <div>
        <div style="border-radius:12px;overflow:hidden;box-shadow:0 8px 30px rgba(2,6,23,0.08)">
          <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=abcd" style="width:100%;height:260px;object-fit:cover;display:block" alt="Hero"/>
        </div>
      </div>
    </section>

    <!-- Gallery: replace the items below with your own -->
    <div id="gallery">
      <!-- Example: Google Drive preview -->
      <article class="card" data-type="drive" data-src="https://drive.google.com/file/d/FILE_ID_HERE/preview" data-title="Wedding Highlight — Rahim & Sumi">
        <div class="thumb">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=thumb1" alt="Wedding" />
          <div class="duration">4:12</div>
        </div>
        <div class="meta">
          <h3>Wedding Highlight — Rahim & Sumi</h3>
          <p>Wedding • Cinematic • Storytelling</p>
        </div>
      </article>

      <!-- Example: YouTube video (works with watch?v= or youtu.be) -->
      <article class="card" data-type="youtube" data-src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" data-title="Cinematic Short — City Lights">
        <div class="thumb">
          <img src="https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=thumb2" alt="Cinematic" />
          <div class="duration">2:34</div>
        </div>
        <div class="meta">
          <h3>Cinematic Short — City Lights</h3>
          <p>Cinematic • Color Grading • Short</p>
        </div>
      </article>

      <!-- Example: Direct MP4 link -->
      <article class="card" data-type="mp4" data-src="https://example.com/path/to/your-video.mp4" data-title="Product Promo — Smart Bottle">
        <div class="thumb">
          <img src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=thumb3" alt="Promo" />
          <div class="duration">0:45</div>
        </div>
        <div class="meta">
          <h3>Product Promo — Smart Bottle</h3>
          <p>Promo • Motion Graphics • Product</p>
        </div>
      </article>

    </div>

    <!-- Contact -->
    <section id="contact" style="margin-top:28px;background:white;padding:18px;border-radius:12px;box-shadow:0 6px 18px rgba(2,6,23,0.06)">
      <h3 style="margin:0 0 8px">Contact</h3>
      <p style="margin:0 0 12px;color:#475569">Interested in hiring? Email me at <a href="mailto:your.email@example.com">your.email@example.com</a></p>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <a class="btn" href="mailto:your.email@example.com">Send Email</a>
        <a class="btn" href="#gallery">View Work</a>
      </div>
    </section>

    <footer>
      © <span id="year"></span> Your Name — Video Editor
    </footer>
  </div>

  <!-- Modal / Lightbox -->
  <div id="modal" class="modal" role="dialog" aria-hidden="true">
    <div class="player" role="document">
      <div class="head">
        <div id="player-title" style="font-weight:700;padding-right:8px"></div>
        <div>
          <a id="close" class="close-btn">Close</a>
        </div>
      </div>
      <div id="player-container">
        <!-- iframe or video will be injected here -->
      </div>
    </div>
  </div>

  <script>
    // small helper functions
    const gallery = document.getElementById('gallery');
    const modal = document.getElementById('modal');
    const playerContainer = document.getElementById('player-container');
    const playerTitle = document.getElementById('player-title');
    const closeBtn = document.getElementById('close');
    const yearSpan = document.getElementById('year');
    yearSpan.textContent = new Date().getFullYear();

    function isYouTube(url){return /youtube|youtu.be/.test(url)}
    function isDrive(url){return /drive.google.com/.test(url)}
    function isMP4(url){return /.mp4(\?|$)/i.test(url)}

    // open modal with appropriate player
    function openPlayer(type, src, title){
      playerContainer.innerHTML = '';
      playerTitle.textContent = title || '';

      if(type === 'youtube' || isYouTube(src)){
        // convert to embed URL
        let id = '';
        if(src.includes('youtu.be')){id = src.split('/').pop();}
        else{const m = src.match(/[?&]v=([^&]+)/); id = m ? m[1] : ''}
        const embed = id ? `https://www.youtube.com/embed/${id}?rel=0&autoplay=1` : src.replace('watch?v=','embed/');
        const iframe = document.createElement('iframe');
        iframe.src = embed;
        iframe.allow = 'autoplay; encrypted-media; accelerometer; picture-in-picture';
        iframe.allowFullscreen = true;
        playerContainer.appendChild(iframe);
      } else if(type === 'drive' || isDrive(src)){
        // Drive preview is already an embeddable iframe
        const iframe = document.createElement('iframe');
        iframe.src = src;
        iframe.allowFullscreen = true;
        playerContainer.appendChild(iframe);
      } else if(type === 'mp4' || isMP4(src)){
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.autoplay = true;
        playerContainer.appendChild(video);
      } else {
        // fallback: open in new tab
        window.open(src, '_blank');
        return;
      }

      modal.classList.add('open');
      modal.setAttribute('aria-hidden','false');
    }

    // attach click handlers
    gallery.addEventListener('click', (e)=>{
      const card = e.target.closest('.card');
      if(!card) return;
      const type = card.dataset.type || '';
      const src = card.dataset.src || '';
      const title = card.dataset.title || '';
      openPlayer(type, src, title);
    });

    // close modal
    closeBtn.addEventListener('click', ()=>{
      playerContainer.innerHTML = '';
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden','true');
    });

    // close on background click
    modal.addEventListener('click', (e)=>{ if(e.target === modal){ closeBtn.click(); }});

    // simple search
    document.getElementById('search').addEventListener('input', function(){
      const q = this.value.toLowerCase().trim();
      document.querySelectorAll('#gallery .card').forEach(card=>{
        const title = card.dataset.title.toLowerCase();
        card.style.display = title.includes(q) ? '' : 'none';
      });
    });
  </script>
</body>
</html>
