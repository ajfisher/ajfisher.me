const DEFAULT_DELAY = 5000;
const MIN_DELAY = 2000;
const MAX_DELAY = 20000;
const SETTLE_DELAY_MS = 90;

const clampDelay = (value) => {
  const parsedValue = Number.parseInt(String(value), 10);

  if (Number.isNaN(parsedValue)) {
    return DEFAULT_DELAY;
  }

  return Math.min(MAX_DELAY, Math.max(MIN_DELAY, parsedValue));
};

const mod = (value, max) => {
  if (max === 0) {
    return 0;
  }

  return ((value % max) + max) % max;
};

const findClosestSlideIndex = (track, slides) => {
  let closestDistance = Number.POSITIVE_INFINITY;
  let closestIndex = 0;

  slides.forEach((slide, index) => {
    const distance = Math.abs(track.scrollLeft - slide.offsetLeft);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
};

const buildLoopSlides = (track, originalSlides) => {
  if (originalSlides.length <= 1) {
    return {
      slides: originalSlides,
      hasLoop: false,
      firstRealIndex: 0,
      lastRealIndex: originalSlides.length - 1,
    };
  }

  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);

  firstClone.classList.add('ss-slide-clone');
  firstClone.dataset.ssClone = 'first';
  lastClone.classList.add('ss-slide-clone');
  lastClone.dataset.ssClone = 'last';

  track.insertBefore(lastClone, track.firstChild);
  track.append(firstClone);

  const slides = Array.from(track.querySelectorAll(':scope > .ss-slide'));

  return {
    slides,
    hasLoop: true,
    firstRealIndex: 1,
    lastRealIndex: slides.length - 2,
  };
};

const initSlideshow = (gallery) => {
  if (!gallery || gallery.dataset.ssEnhanced === 'true') {
    return;
  }

  const track = gallery.querySelector('.ss-track');
  const prevButton = gallery.querySelector('[data-ss-action="prev"]');
  const nextButton = gallery.querySelector('[data-ss-action="next"]');
  const toggleButton = gallery.querySelector('[data-ss-action="toggle"]');
  const currentIndicator = gallery.querySelector('[data-ss-current]');
  const totalIndicator = gallery.querySelector('[data-ss-total]');
  const statusIndicator = gallery.querySelector('.ss-status');
  let progressBar = gallery.querySelector('.ss-status-progress');

  if (!progressBar && statusIndicator) {
    progressBar = document.createElement('span');
    progressBar.className = 'ss-status-progress';
    progressBar.setAttribute('aria-hidden', 'true');
    statusIndicator.append(progressBar);
  }

  if (!track) {
    return;
  }

  const originalSlides = Array.from(track.querySelectorAll(':scope > .ss-slide'));

  if (originalSlides.length === 0) {
    return;
  }

  const delay = clampDelay(gallery.dataset.ssDelay);
  gallery.style.setProperty('--ss-delay', `${delay}ms`);

  const {
    slides,
    hasLoop,
    firstRealIndex,
    lastRealIndex,
  } = buildLoopSlides(track, originalSlides);

  let visualIndex = firstRealIndex;
  let currentIndex = 0;
  let autoplayTimer = null;
  let settleTimer = null;
  let scrollBehaviorResetFrame = null;
  let pausedByUser = false;
  let pausedForContext = false;
  let controlsVisible = false;

  const hoverSupported = window.matchMedia('(hover: hover)').matches;
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const toCurrentIndex = (index) => {
    if (!hasLoop) {
      return index;
    }

    if (index <= 0) {
      return originalSlides.length - 1;
    }

    if (index >= slides.length - 1) {
      return 0;
    }

    return index - 1;
  };

  const isAutoplayPaused = () =>
    pausedByUser ||
    pausedForContext ||
    reducedMotionQuery.matches ||
    originalSlides.length <= 1;

  const setPausedState = () => {
    gallery.dataset.ssPaused = isAutoplayPaused() ? 'true' : 'false';
  };

  const setControlsVisible = (visible) => {
    controlsVisible = visible;
    gallery.dataset.ssControlsVisible = visible ? 'true' : 'false';
  };

  const updateToggleButton = () => {
    if (!toggleButton) {
      return;
    }

    const userPaused = pausedByUser;
    toggleButton.textContent = userPaused ? 'Resume' : 'Pause';
    toggleButton.setAttribute('aria-pressed', userPaused ? 'true' : 'false');
    toggleButton.setAttribute(
      'aria-label',
      userPaused ? 'Resume slideshow' : 'Pause slideshow'
    );
  };

  const updateStatus = () => {
    if (currentIndicator) {
      currentIndicator.textContent = String(currentIndex + 1);
    }

    if (totalIndicator) {
      totalIndicator.textContent = String(originalSlides.length);
    }
  };

  const updateActiveHeight = () => {
    const activeSlide = slides[visualIndex];

    if (!activeSlide) {
      return;
    }

    const nextHeight = Math.ceil(activeSlide.getBoundingClientRect().height);

    if (nextHeight > 0) {
      gallery.style.setProperty('--ss-active-height', `${nextHeight}px`);
    }
  };

  const forceInstantScrollTo = (left) => {
    if (scrollBehaviorResetFrame !== null) {
      window.cancelAnimationFrame(scrollBehaviorResetFrame);
      scrollBehaviorResetFrame = null;
    }

    const previousInlineBehavior = track.style.scrollBehavior;
    track.style.scrollBehavior = 'auto';
    track.scrollLeft = left;

    scrollBehaviorResetFrame = window.requestAnimationFrame(() => {
      if (previousInlineBehavior) {
        track.style.scrollBehavior = previousInlineBehavior;
      } else {
        track.style.removeProperty('scroll-behavior');
      }

      scrollBehaviorResetFrame = null;
    });
  };

  const goToVisualIndex = (index, smooth) => {
    const targetSlide = slides[index];

    if (!targetSlide) {
      return;
    }

    const targetLeft = targetSlide.offsetLeft;

    if (smooth) {
      track.scrollTo({
        left: targetLeft,
        behavior: 'smooth',
      });
      return;
    }

    forceInstantScrollTo(targetLeft);
  };

  const restartProgress = () => {
    if (!progressBar) {
      return;
    }

    progressBar.style.animation = 'none';
    // force a reflow so animation reliably restarts
    void progressBar.offsetWidth;
    progressBar.style.animation = `ss-progress-countdown ${delay}ms linear forwards`;
    progressBar.style.animationPlayState = 'running';
  };

  const pauseProgress = () => {
    if (!progressBar) {
      return;
    }

    progressBar.style.animationPlayState = 'paused';
  };

  const stopAutoplay = () => {
    if (autoplayTimer !== null) {
      window.clearTimeout(autoplayTimer);
      autoplayTimer = null;
    }

    pauseProgress();
  };

  const settleFromScroll = () => {
    visualIndex = findClosestSlideIndex(track, slides);

    if (hasLoop) {
      if (visualIndex <= 0) {
        visualIndex = lastRealIndex;
        goToVisualIndex(visualIndex, false);
      } else if (visualIndex >= slides.length - 1) {
        visualIndex = firstRealIndex;
        goToVisualIndex(visualIndex, false);
      }
    }

    currentIndex = toCurrentIndex(visualIndex);
    updateStatus();
    updateActiveHeight();
  };

  const scheduleAutoplay = () => {
    stopAutoplay();
    setPausedState();

    if (isAutoplayPaused()) {
      return;
    }

    restartProgress();

    autoplayTimer = window.setTimeout(() => {
      goByStep(1, true);
      scheduleAutoplay();
    }, delay);
  };

  const goByStep = (delta, fromAutoplay = false) => {
    if (originalSlides.length <= 1) {
      return;
    }

    let nextVisualIndex = visualIndex + delta;

    if (!hasLoop) {
      nextVisualIndex = mod(nextVisualIndex, slides.length);
    }

    goToVisualIndex(nextVisualIndex, true);
    visualIndex = nextVisualIndex;
    currentIndex = toCurrentIndex(visualIndex);
    updateStatus();
    updateActiveHeight();

    if (!fromAutoplay) {
      scheduleAutoplay();
    }
  };

  const showControlsAndPause = () => {
    setControlsVisible(true);
    pausedByUser = true;
    updateToggleButton();
    scheduleAutoplay();
  };

  if (prevButton) {
    prevButton.addEventListener('click', (event) => {
      event.stopPropagation();
      goByStep(-1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', (event) => {
      event.stopPropagation();
      goByStep(1);
    });
  }

  if (toggleButton) {
    toggleButton.addEventListener('click', (event) => {
      event.stopPropagation();
      pausedByUser = !pausedByUser;
      updateToggleButton();
      scheduleAutoplay();
    });
  }

  track.addEventListener(
    'scroll',
    () => {
      if (settleTimer !== null) {
        window.clearTimeout(settleTimer);
      }

      settleTimer = window.setTimeout(() => {
        settleFromScroll();
      }, SETTLE_DELAY_MS);
    },
    { passive: true }
  );

  if (hoverSupported) {
    gallery.addEventListener('mouseenter', () => {
      pausedForContext = true;
      setControlsVisible(true);
      scheduleAutoplay();
    });

    gallery.addEventListener('mouseleave', () => {
      pausedForContext = false;
      setControlsVisible(false);
      scheduleAutoplay();
    });
  }

  gallery.addEventListener('focusin', () => {
    pausedForContext = true;
    setControlsVisible(true);
    scheduleAutoplay();
  });

  gallery.addEventListener('focusout', (event) => {
    if (event.relatedTarget && gallery.contains(event.relatedTarget)) {
      return;
    }

    pausedForContext = false;

    if (hoverSupported && !gallery.matches(':hover')) {
      setControlsVisible(false);
    }

    scheduleAutoplay();
  });

  track.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('button')) {
      return;
    }

    showControlsAndPause();
  });

  track.querySelectorAll('img').forEach((image) => {
    if (image.complete) {
      return;
    }

    image.addEventListener('load', () => {
      updateActiveHeight();
    });
  });

  window.addEventListener('resize', () => {
    updateActiveHeight();
  });

  reducedMotionQuery.addEventListener('change', () => {
    scheduleAutoplay();
  });

  if (originalSlides.length <= 1) {
    pausedByUser = true;

    if (prevButton) {
      prevButton.disabled = true;
    }

    if (nextButton) {
      nextButton.disabled = true;
    }

    if (toggleButton) {
      toggleButton.disabled = true;
    }
  }

  requestAnimationFrame(() => {
    if (hasLoop) {
      goToVisualIndex(firstRealIndex, false);
      visualIndex = firstRealIndex;
    }

    currentIndex = toCurrentIndex(visualIndex);
    updateStatus();
    updateActiveHeight();
    updateToggleButton();
    setPausedState();
    setControlsVisible(false);
    gallery.dataset.ssEnhanced = 'true';
    scheduleAutoplay();
  });
};

export const initSlideshows = () => {
  const galleries = document.querySelectorAll('[data-ss]');
  galleries.forEach(initSlideshow);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSlideshows, { once: true });
} else {
  initSlideshows();
}
