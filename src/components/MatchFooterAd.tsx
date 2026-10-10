import React, { useState, useEffect, useRef } from 'react';

/**
 * Adcash 728x90 Banner (Zone: 12259722)
 * Rotates automatically every 15 seconds silently.
 * Responsive scaled container to fit mobile screens cleanly without clipping.
 */
export const MatchFooterAd: React.FC = () => {
  const [adCycle, setAdCycle] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.48);

  // Auto-refresh ad silently every 15 seconds
  useEffect(() => {
    const cycleTimer = setInterval(() => {
      setAdCycle(prev => prev + 1);
    }, 15000);

    return () => {
      clearInterval(cycleTimer);
    };
  }, []);

  // Compute responsive scale for 728px banner based on container width
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth || 360;
        const computedScale = Math.min(0.55, Math.max(0.42, (width - 12) / 728));
        setScale(computedScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Adcash 728x90 banner snippet with zoneId: '12259722'
  const adHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=728, user-scalable=no">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body {
        width: 728px;
        height: 90px;
        overflow: hidden;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
    <script id="aclib" type="text/javascript" src="https://acscdn.com/script/aclib.js"></script>
  </head>
  <body>
    <div>
      <script type="text/javascript">
        aclib.runBanner({
          zoneId: '12259722',
        });
      </script>
    </div>
  </body>
</html>`;

  return (
    <div
      ref={containerRef}
      className="w-full shrink-0 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md border-t border-white/15 px-1 py-1 z-30 shadow-2xl mt-auto"
    >
      <div
        className="w-full flex items-center justify-center overflow-hidden relative"
        style={{ height: `${Math.round(90 * scale)}px` }}
      >
        <div
          className="origin-center flex items-center justify-center"
          style={{
            width: '728px',
            height: '90px',
            transform: `scale(${scale})`,
          }}
        >
          <iframe
            key={adCycle}
            title={`match-ad-${adCycle}`}
            srcDoc={adHtml}
            width="728"
            height="90"
            scrolling="no"
            frameBorder="0"
            style={{
              border: 'none',
              overflow: 'hidden',
              width: '728px',
              height: '90px',
              background: 'transparent'
            }}
          />
        </div>
      </div>
    </div>
  );
};
