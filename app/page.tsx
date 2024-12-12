export default function Home() {
  return (
    <div>
      <div
        className="video-container"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
        }}
      >
        <iframe
          src="https://www.youtube.com/embed/IzxHDqUz8Sk?autoplay=1&mute=1&modestbranding=1&rel=0"
          allow="autoplay; fullscreen; picture-in-picture"
          style={{ width: "100%", height: "100%" }}
        ></iframe>
      </div>
    </div>
  );
}
