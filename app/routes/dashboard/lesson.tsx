export default function Lesson() {
  return (
    <div className="md:max-w-xl lg:max-w-6xl">
      <h1 className="font-semibold text-3xl">Lesson 1</h1>
      <div className="mt-8">
        <iframe
          // width="560"
          // height="315"
          src="https://www.youtube.com/embed/S9hcOuLYKBI?si=vtB6lIPYDYMWTsFN"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
          className="w-full aspect-video rounded-lg"
        ></iframe>
      </div>
    </div>
  );
}
