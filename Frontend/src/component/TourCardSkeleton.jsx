export default function TourCardSkeleton() {
  return (
    <div
      className="
        w-full max-w-[420px] mx-auto
        bg-white rounded-2xl
        border border-gray-200
        shadow-xl
        animate-pulse
      "
    >
      {/* IMAGE */}
      <div className="p-3">
        <div className="h-[300px] w-full rounded-xl bg-gray-200" />
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-4">
        {/* TITLE */}
        <div className="h-6 w-3/4 mx-auto bg-gray-200 rounded" />

        {/* DATE + LOCATION */}
        <div className="flex justify-between gap-4">
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
          <div className="h-4 w-1/3 bg-gray-200 rounded" />
        </div>

        {/* FEATURES */}
        <div className="flex justify-center gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <div className="w-10 h-2 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        {/* PRICE */}
        <div className="h-5 w-1/2 mx-auto bg-gray-200 rounded" />
        <div className="h-6 w-1/3 mx-auto bg-gray-300 rounded" />

        {/* BUTTONS */}
        <div className="flex gap-3">
          <div className="h-10 w-1/2 bg-gray-200 rounded-full" />
          <div className="h-10 w-1/2 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}
