import { useEffect, useRef, useState } from "react";
import { workItems } from "../data/workItems";

export function useVideoLightbox() {
  const [activeVideo, setActiveVideo] = useState(null);

  const openVideo = (index) => setActiveVideo(index);
  const closeVideo = () => setActiveVideo(null);

  const goPrevVideo = () => {
    setActiveVideo((current) =>
      current === null ? 0 : (current - 1 + workItems.length) % workItems.length
    );
  };

  const goNextVideo = () => {
    setActiveVideo((current) =>
      current === null ? 0 : (current + 1) % workItems.length
    );
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (activeVideo === null) return;

      if (event.key === "Escape") closeVideo();
      if (event.key === "ArrowLeft") goPrevVideo();
      if (event.key === "ArrowRight") goNextVideo();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeVideo]);

  return {
    activeVideo,
    openVideo,
    closeVideo,
    goPrevVideo,
    goNextVideo,
  };
}

export function WorkCard({ item, index, onOpen }) {
  return (
    <article className="c-card">
      <button
        className="c-card-media"
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Open ${item.title}`}
      >
        <video src={item.videoSrc} autoPlay muted loop playsInline preload="metadata" />
        <span className="c-card-num">{String(index + 1).padStart(3, "0")}</span>
        <span className="c-card-open">OPEN</span>
      </button>

      <div className="c-card-info">
        <h3>{item.title}</h3>
        <p>{item.tag}</p>
      </div>
    </article>
  );
}

export function PreviewCard({ item, index }) {
  return (
    <article className="c-card c-preview-card">
      <div className="c-card-media c-preview-media">
        <video src={item.videoSrc} autoPlay muted loop playsInline preload="metadata" />
        <span className="c-card-num">{String(index + 1).padStart(3, "0")}</span>
      </div>

      <div className="c-card-info">
        <h3>{item.title}</h3>
        <p>{item.tag}</p>
      </div>
    </article>
  );
}

export default function VideoLightbox({ activeVideo, onClose, onPrev, onNext }) {
  const lightboxVideoRef = useRef(null);

  useEffect(() => {
    if (activeVideo === null || !lightboxVideoRef.current) return;

    const video = lightboxVideoRef.current;
    video.muted = false;
    video.volume = 1;

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // controls remain visible if browser blocks autoplay with sound
      });
    }
  }, [activeVideo]);

  if (activeVideo === null) return null;

  return (
    <div className="c-lightbox" role="dialog" aria-modal="true" aria-label="Video preview">
      <button
        className="c-lightbox-backdrop"
        type="button"
        onClick={onClose}
        aria-label="Close video"
      />

      <div className="c-lightbox-window">
        <div className="c-lightbox-top">
          <div>
            <p>{workItems[activeVideo].tag}</p>
            <h3>{workItems[activeVideo].title}</h3>
          </div>

          <button className="c-lightbox-close" type="button" onClick={onClose}>
            CLOSE
          </button>
        </div>

        <div className="c-lightbox-media">
          <video
            ref={lightboxVideoRef}
            key={workItems[activeVideo].videoSrc}
            src={workItems[activeVideo].videoSrc}
            autoPlay
            loop
            playsInline
            controls
          />
        </div>

        <div className="c-lightbox-controls">
          <button type="button" onClick={onPrev}>
            ← PREV
          </button>
          <span>
            {String(activeVideo + 1).padStart(2, "0")} / {String(workItems.length).padStart(2, "0")}
          </span>
          <button type="button" onClick={onNext}>
            NEXT →
          </button>
        </div>
      </div>
    </div>
  );
}
