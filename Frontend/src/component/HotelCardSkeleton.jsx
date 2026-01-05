export default function HotelCardSkeleton() {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden
                 border border-gray-200 shadow-sm animate-pulse"
    >
      {/* IMAGE SKELETON */}
      <div className="p-2">
        <div className="h-52 w-full rounded-2xl bg-gray-200" />
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-4">
        {/* TITLE */}
        <div className="space-y-2">
          <div className="h-5 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
        </div>

        {/* AMENITIES */}
        <div className="flex justify-around">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-lg bg-gray-200" />
              <div className="w-8 h-2 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        {/* SELECT */}
        <div className="h-10 w-full bg-gray-200 rounded-lg" />

        {/* PRICE */}
        <div className="flex flex-col items-center gap-2">
          <div className="h-3 w-24 bg-gray-200 rounded" />
          <div className="h-6 w-20 bg-gray-200 rounded" />
        </div>

        {/* BUTTON */}
        <div className="h-12 w-full bg-gray-300 rounded-lg" />
      </div>
    </div>
  );
}
