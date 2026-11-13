const objectUrls = [];

function showFile(input, file) {
  const card = input.closest('.media-card');
  if (!card || !file) return;

  const oldMedia = card.querySelector('img, video');
  if (oldMedia) {
    const oldUrl = oldMedia.dataset.objectUrl;
    if (oldUrl) URL.revokeObjectURL(oldUrl);
    oldMedia.remove();
  }

  const url = URL.createObjectURL(file);
  objectUrls.push(url);
  const media = document.createElement(file.type.startsWith('video/') ? 'video' : 'img');
  media.src = url;
  media.dataset.objectUrl = url;

  if (media instanceof HTMLVideoElement) {
    media.controls = true;
    media.playsInline = true;
    media.preload = 'metadata';
    media.autoplay = true;
    media.loop = true;
    media.muted = true;
  } else {
    media.alt = file.name;
  }

  card.prepend(media);
  card.classList.add('has-media');
  const label = card.querySelector('.media-label');
  if (label) label.textContent = file.name;
}

document.addEventListener('change', (event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || input.type !== 'file') return;
  const files = [...input.files];
  const card = input.closest('.media-card');
  if (!card || files.length === 0) return;

  showFile(input, files[0]);
  const container = card.closest('.media-grid');
  if (container && files.length > 1 && container.dataset.kind === 'image') {
    files.slice(1).forEach((file) => {
      const extraCard = document.createElement('label');
      extraCard.className = 'media-card';
      const extraInput = document.createElement('input');
      extraInput.type = 'file';
      extraInput.accept = 'image/*';
      const placeholder = document.createElement('span');
      placeholder.className = 'media-placeholder';
      placeholder.innerHTML = '<span class="plus">＋</span><small>PILIH FOTO</small>';
      const mediaLabel = document.createElement('span');
      mediaLabel.className = 'media-label';
      mediaLabel.textContent = 'PROJECT IMAGE';
      extraCard.append(extraInput, placeholder, mediaLabel);
      container.append(extraCard);
      showFile(extraInput, file);
    });
  }
  input.value = '';
});

document.querySelectorAll('[data-add]').forEach((button) => {
  button.addEventListener('click', () => {
    const container = document.getElementById(button.dataset.add);
    const isVideo = container.dataset.kind === 'video';
    const card = document.createElement(isVideo ? 'article' : 'label');
    card.className = isVideo ? 'process-card' : 'media-card';
    const mediaCard = isVideo ? document.createElement('label') : card;
    if (isVideo) mediaCard.className = 'media-card';

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = isVideo ? 'video/*' : 'image/*';
    input.multiple = !isVideo;
    const placeholder = document.createElement('span');
    placeholder.className = 'media-placeholder';
    placeholder.innerHTML = '<span class="plus">＋</span><small>' + (isVideo ? 'PILIH VIDEO' : 'PILIH FOTO') + '</small>';
    const label = document.createElement('span');
    label.className = 'media-label';
    label.textContent = isVideo ? 'PROCESS VIDEO' : 'PROJECT IMAGE';
    mediaCard.append(input, placeholder, label);

    if (isVideo) {
      const copy = document.createElement('div');
      copy.className = 'process-copy';
      copy.innerHTML = '<span class="kicker">PROCESS / NEW</span><h3>Proses desain</h3><p>Tambahkan penjelasan untuk video ini.</p>';
      card.append(mediaCard, copy);
    }

    container.append(card);
    input.click();
  });
});

const sections = document.querySelectorAll('.content-section[id]');
const sectionLinks = document.querySelectorAll('.section-bar a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    sectionLinks.forEach((link) => link.classList.toggle('active', link.hash === '#' + entry.target.id));
  });
}, { rootMargin: '-25% 0px -65% 0px' });
sections.forEach((section) => observer.observe(section));

window.addEventListener('pagehide', () => objectUrls.forEach((url) => URL.revokeObjectURL(url)));