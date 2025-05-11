const TableSkeletonLoading = () => {
    return (
      <div className="p-6 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 animate-pulse rounded"></div>
        ))}
      </div>
    );
}

export default TableSkeletonLoading;