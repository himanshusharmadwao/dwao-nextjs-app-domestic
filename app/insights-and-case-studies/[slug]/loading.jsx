export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="animate-pulse">
        {/* Banner skeleton */}
        <div className="h-[400px] bg-gray-200"></div>
        
        {/* Content skeleton */}
        <div className="container mx-auto py-8">
          <div className="flex gap-8">
            {/* Main content */}
            <div className="flex-1">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
            </div>
            
            {/* Sidebar */}
            <div className="w-1/3">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}