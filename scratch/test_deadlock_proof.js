// Verify the mathematical deadlock in renderFrame logic
const TOTAL_FRAMES = 240;
const STATUS_READY = 2;

function simulateRenderFrame() {
  const status = new Uint8Array(TOTAL_FRAMES);
  const cache = new Array(TOTAL_FRAMES).fill(null);

  // Initial state upon mounting via browser Back:
  // Only frame 0 and warmup frames 1..15 are loaded
  for (let i = 0; i <= 15; i++) {
    status[i] = STATUS_READY;
    cache[i] = { frame: i };
  }

  // Also simulate that scheduler is slowly loading frames around target 200..230
  status[220] = STATUS_READY;
  cache[220] = { frame: 220 };
  status[210] = STATUS_READY;
  cache[210] = { frame: 210 };
  status[200] = STATUS_READY;
  cache[200] = { frame: 200 };

  let lastRendered = 0; // Frame 0 was drawn on mount
  let direction = -1; // Scrolling backward/upward from end of hero

  console.log('--- SIMULATING BACKWARD SCROLLING WITH lastRendered = 0 ---');
  const scrollTargets = [235, 230, 225, 220, 215, 210, 205, 200, 180, 150, 100, 50, 30, 15, 10, 5, 0];

  scrollTargets.forEach(clamped => {
    let frameToRender = null;
    let renderedIndex = -1;

    // The exact renderFrame logic from HeroCanvas.tsx lines 375-447:
    if (status[clamped] === STATUS_READY && cache[clamped]) {
      frameToRender = cache[clamped];
      renderedIndex = clamped;
    } else if (direction >= 0) {
      // forward
    } else {
      // BACKWARD SCROLLING:
      if (clamped < lastRendered) {
        for (let i = clamped; i < lastRendered; i++) {
          if (status[i] === STATUS_READY && cache[i]) {
            frameToRender = cache[i];
            renderedIndex = i;
            break;
          }
        }
        if (!frameToRender && cache[lastRendered] && status[lastRendered] === STATUS_READY) {
          frameToRender = cache[lastRendered];
          renderedIndex = lastRendered;
        }
      } else {
        // Target is >= lastRendered (small backward twitch or equality)
        if (cache[clamped] && status[clamped] === STATUS_READY) {
          frameToRender = cache[clamped];
          renderedIndex = clamped;
        } else if (cache[lastRendered] && status[lastRendered] === STATUS_READY) {
          frameToRender = cache[lastRendered];
          renderedIndex = lastRendered;
        }
      }
    }

    if (frameToRender && renderedIndex !== -1) {
      lastRendered = renderedIndex;
    }

    console.log(`Target: ${clamped} -> Rendered Frame: ${renderedIndex} (clamped < lastRendered was ${clamped < (lastRendered === renderedIndex ? renderedIndex : lastRendered)})`);
  });
}

simulateRenderFrame();
