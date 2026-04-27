import { useNavigate } from "react-router-dom";
import { workItems } from "../data/workItems";
import VideoLightbox, { useVideoLightbox, WorkCard } from "../components/VideoLightbox";

export default function CreatureFolder() {
  const navigate = useNavigate();
  const lightbox = useVideoLightbox();

  return (
    <section className="c-section c-folder-page" aria-label="Creature archive folder">
      <div className="c-folder-page-head">
        <button type="button" onClick={() => navigate(-1)}>
          ← BACK
        </button>

        <div>
          <p>CREATURE / MEDIA FILE</p>
          <h2>Archive</h2>
        </div>

        <span>{workItems.length} ITEMS</span>
      </div>

      <div className="c-archive c-folder-archive">
        <div className="c-archive-grid">
          {workItems.map((item, index) => (
            <WorkCard item={item} index={index} onOpen={lightbox.openVideo} key={item.videoSrc} />
          ))}
        </div>
      </div>

      <VideoLightbox
        activeVideo={lightbox.activeVideo}
        onClose={lightbox.closeVideo}
        onPrev={lightbox.goPrevVideo}
        onNext={lightbox.goNextVideo}
      />
    </section>
  );
}
