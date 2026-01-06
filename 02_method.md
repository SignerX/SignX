## Method

We summarize the core architecture and training workflow for SignX below.

<style>
.signx-carousel {
  position: relative;
  margin: 12px 0 24px;
}

.signx-carousel-track {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 16px;
  padding: 8px 48px;
  background: #000;
  border-radius: 8px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.signx-carousel-track::-webkit-scrollbar {
  display: none;
}

.signx-carousel-slide {
  flex: 0 0 100%;
  scroll-snap-align: center;
  background: #000;
  border-radius: 8px;
  padding: 16px 16px 12px;
  position: relative;
}

.signx-carousel-slide img {
  width: auto;
  height: 250px;
  max-width: 100%;
  object-fit: contain;
  border: none;
  border-radius: 6px;
  background: #000;
  display: block;
  margin: 0 auto;
}

.signx-carousel-caption {
  margin-top: 8px;
  font-size: 0.95em;
  color: #c9d1d9;
  text-align: center;
}

.signx-carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #b3b8be;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  color: #111;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
}

.signx-carousel-left {
  left: 8px;
}

.signx-carousel-right {
  right: 8px;
}

.signx-carousel-arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.signx-carousel-arrow.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: rgba(120, 120, 120, 0.6);
  border-color: #6b6f75;
  color: #f0f0f0;
  pointer-events: none;
}

.signx-zoom {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #3b3f44;
  background: rgba(0, 0, 0, 0.7);
  color: #f5f7fa;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.signx-carousel-slide.is-active .signx-zoom {
  opacity: 1;
  pointer-events: auto;
}

.signx-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 24px;
}

.signx-modal.is-open {
  display: flex;
}

.signx-modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.signx-modal-content img {
  max-width: 90vw;
  max-height: 90vh;
  width: auto;
  height: auto;
  border-radius: 8px;
  background: #000;
}

.signx-modal-close {
  position: absolute;
  top: -16px;
  right: -16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #3b3f44;
  background: rgba(0, 0, 0, 0.8);
  color: #f5f7fa;
  cursor: pointer;
}
</style>

### Architecture+Training Flow

<div class="signx-carousel" data-carousel>
  <button class="signx-carousel-arrow signx-carousel-left" type="button" aria-label="Scroll left"><i class="fa fa-chevron-left"></i></button>
  <div class="signx-carousel-track">
    <figure class="signx-carousel-slide">
      <button class="signx-zoom" type="button" aria-label="Zoom image"><i class="fa fa-search-plus"></i></button>
      <img src="static/paper_part/fig2.png" alt="Figure 2: Compact pose-rich latent space overview">
      <figcaption class="signx-carousel-caption">Figure 2. Compact pose-rich latent space overview.</figcaption>
    </figure>
    <figure class="signx-carousel-slide">
      <button class="signx-zoom" type="button" aria-label="Zoom image"><i class="fa fa-search-plus"></i></button>
      <img src="static/paper_part/fig3.png" alt="Figure 3: Continuous recognition in the latent space">
      <figcaption class="signx-carousel-caption">Figure 3. Continuous recognition in the latent space.</figcaption>
    </figure>
  </div>
  <button class="signx-carousel-arrow signx-carousel-right" type="button" aria-label="Scroll right"><i class="fa fa-chevron-right"></i></button>
</div>

### Algorithm+Configuration

<div class="signx-carousel" data-carousel>
  <button class="signx-carousel-arrow signx-carousel-left" type="button" aria-label="Scroll left"><i class="fa fa-chevron-left"></i></button>
  <div class="signx-carousel-track">
    <figure class="signx-carousel-slide">
      <button class="signx-zoom" type="button" aria-label="Zoom image"><i class="fa fa-search-plus"></i></button>
      <img src="static/paper_part/algo1.png" alt="Algorithm 1: Pose-aware feature compilation">
      <figcaption class="signx-carousel-caption">Algorithm 1. Pose-aware feature compilation.</figcaption>
    </figure>
    <figure class="signx-carousel-slide">
      <button class="signx-zoom" type="button" aria-label="Zoom image"><i class="fa fa-search-plus"></i></button>
      <img src="static/paper_part/algo2.png" alt="Algorithm 2: Hierarchical latent training">
      <figcaption class="signx-carousel-caption">Algorithm 2. Hierarchical latent training.</figcaption>
    </figure>
    <figure class="signx-carousel-slide">
      <button class="signx-zoom" type="button" aria-label="Zoom image"><i class="fa fa-search-plus"></i></button>
      <img src="static/paper_part/algo3.png" alt="Algorithm 3: Latent sequence decoding">
      <figcaption class="signx-carousel-caption">Algorithm 3. Latent sequence decoding.</figcaption>
    </figure>
    <figure class="signx-carousel-slide">
      <button class="signx-zoom" type="button" aria-label="Zoom image"><i class="fa fa-search-plus"></i></button>
      <img src="static/paper_part/table6.png" alt="Table 6: Training configurations and hyperparameters">
      <figcaption class="signx-carousel-caption">Table 6. Training configurations and hyperparameters.</figcaption>
    </figure>
  </div>
  <button class="signx-carousel-arrow signx-carousel-right" type="button" aria-label="Scroll right"><i class="fa fa-chevron-right"></i></button>
</div>

<div class="signx-modal" id="signx-modal" aria-hidden="true">
  <div class="signx-modal-content">
    <button class="signx-modal-close" type="button" aria-label="Close"><i class="fa fa-times"></i></button>
    <img src="" alt="">
  </div>
</div>

<script>
(function() {
  function setupCarousel(carousel) {
    const track = carousel.querySelector('.signx-carousel-track');
    const prev = carousel.querySelector('.signx-carousel-left');
    const next = carousel.querySelector('.signx-carousel-right');
    if (!track || !prev || !next) {
      return;
    }

    const getScrollAmount = () => Math.max(track.clientWidth, 320);
    if (!track.dataset.loopInitialized) {
      const originals = Array.from(track.querySelectorAll('.signx-carousel-slide'));
      originals.forEach((slide, index) => {
        if (!slide.dataset.slide) {
          slide.dataset.slide = String(index);
        }
      });

      if (originals.length <= 1) {
        prev.classList.add('is-disabled');
        next.classList.add('is-disabled');
        track.dataset.loopInitialized = 'true';
        return;
      }

      if (originals.length > 1) {
        const firstClone = originals[0].cloneNode(true);
        const lastClone = originals[originals.length - 1].cloneNode(true);
        firstClone.dataset.clone = 'first';
        lastClone.dataset.clone = 'last';
        track.appendChild(firstClone);
        track.insertBefore(lastClone, originals[0]);
      }

      track.dataset.loopInitialized = 'true';
    }

    const slides = Array.from(track.querySelectorAll('.signx-carousel-slide[data-slide]'));
    const lastIndex = slides.length - 1;
    const getSlideByIndex = (index) => track.querySelector(`.signx-carousel-slide[data-slide="${index}"]`);
    const firstOriginal = getSlideByIndex(0);
    const lastOriginal = getSlideByIndex(lastIndex);
    const firstClone = track.querySelector('.signx-carousel-slide[data-clone="first"]');
    const lastClone = track.querySelector('.signx-carousel-slide[data-clone="last"]');
    let rafId = null;

    prev.addEventListener('click', () => {
      track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    next.addEventListener('click', () => {
      track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    const setActiveSlide = () => {
      const trackRect = track.getBoundingClientRect();
      const trackCenter = trackRect.left + trackRect.width / 2;
      let bestSlide = null;
      let bestDistance = Number.POSITIVE_INFINITY;

      slides.forEach((slide) => {
        const rect = slide.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const distance = Math.abs(center - trackCenter);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestSlide = slide;
        }
      });

      slides.forEach((slide) => {
        slide.classList.toggle('is-active', slide === bestSlide);
      });
    };

    const resetToFirst = () => {
      if (firstOriginal) {
        track.scrollLeft = firstOriginal.offsetLeft;
      }
    };

    const resetToLast = () => {
      if (lastOriginal) {
        track.scrollLeft = lastOriginal.offsetLeft;
      }
    };

    if (firstOriginal && lastOriginal && firstClone && lastClone) {
      resetToFirst();
    }
    setActiveSlide();

    track.addEventListener('scroll', () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(setActiveSlide);

      if (firstClone && lastClone && firstOriginal && lastOriginal) {
        const leftEdge = track.scrollLeft;
        const rightEdge = leftEdge + track.clientWidth;
        const leftTrigger = lastClone.offsetLeft + lastClone.offsetWidth;
        const rightTrigger = firstClone.offsetLeft;

        if (leftEdge <= leftTrigger - 1) {
          resetToLast();
        } else if (rightEdge >= rightTrigger + 1) {
          resetToFirst();
        }
      }
    });

    window.addEventListener('resize', setActiveSlide);
  }

  const modal = document.getElementById('signx-modal');
  const modalImage = modal ? modal.querySelector('img') : null;
  const modalClose = modal ? modal.querySelector('.signx-modal-close') : null;

  function openModal(src, alt) {
    if (!modal || !modalImage) {
      return;
    }
    modalImage.src = src;
    modalImage.alt = alt || '';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    if (!modal || !modalImage) {
      return;
    }
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modalImage.src = '';
  }

  document.addEventListener('click', (event) => {
    const zoomButton = event.target.closest('.signx-zoom');
    if (zoomButton) {
      const figure = zoomButton.closest('figure');
      const image = figure ? figure.querySelector('img') : null;
      if (image) {
        openModal(image.src, image.alt);
      }
      return;
    }

    const zoomImage = event.target.closest('.signx-carousel-slide img');
    if (zoomImage) {
      openModal(zoomImage.src, zoomImage.alt);
      return;
    }

    if (event.target === modal) {
      closeModal();
    }
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  function initCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(setupCarousel);
  }

  initCarousels();

  const observer = new MutationObserver(() => {
    initCarousels();
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
</script>
