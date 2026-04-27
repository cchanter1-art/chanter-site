export const workItems = Array.from({ length: 13 }, (_, index) => {
  const num = String(index + 1).padStart(2, "0");

  return {
    title: `Creature ${num}`,
    tag:
      index === 0
        ? "Prototype"
        : index === 1
        ? "Motion Test"
        : index === 2
        ? "Creature Study"
        : "Visual System",
    videoSrc: `/media/creature/creature_${num}.mp4`,
  };
});
