export default function CarCardSkeleton() {
  return (
    <div
      className="
        bg-white rounded-2xl shadow
        overflow-hidden
        w-[92%] mx-auto
        animate-pulse
      "
    >
      {/* IMAGE */}
      <div className="h-40 bg-gray-200" />

      {/* CONTENT */}
      <div className="p-4 space-y-3">
        {/* CAR NAME */}
        <div className="h-4 w-3/4 bg-gray-200 rounded" />

        {/* SEATS + PRICE */}
        <div className="flex justify-between">
          <div className="h-3 w-1/3 bg-gray-200 rounded" />
          <div className="h-3 w-1/4 bg-gray-300 rounded" />
        </div>

        {/* FEATURES */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="h-6 w-16 bg-gray-200 rounded-full"
            />
          ))}
        </div>

        {/* CTA BUTTON */}
        <div className="h-10 w-full bg-gray-300 rounded-xl mt-3" />
      </div>
    </div>
  );
}
