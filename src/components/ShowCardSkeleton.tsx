const ShowCardSkeleton = () => {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
      <div className="aspect-5/6 animate-pulse bg-gray-800" />

      <div className="space-y-4 p-5">
        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-800" />

        <div className="flex gap-2">
          <div className="h-6 w-16 animate-pulse rounded-full bg-gray-800" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-gray-800" />
        </div>

        <div className="h-11 w-full animate-pulse rounded-xl bg-gray-800" />
      </div>
    </article>
  )
}

export default ShowCardSkeleton