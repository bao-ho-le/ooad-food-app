export default function MenuGrid({ items, onAdd }) {
  return (
    <div className="max-h-[600px] overflow-y-auto pr-2">
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(256px,1fr))]">
        {items.map((item) => (
        <div key={item._id} className="rounded-lg border bg-white shadow-sm">
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="h-40 w-full rounded-t-lg object-cover"
            />
          )}
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <span className="text-orange-600 font-semibold">
                ${item.price.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              {item.category}
            </p>
            {onAdd && (
              <button
                className="mt-2 w-full rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-700"
                onClick={() => onAdd(item)}
              >
                Add to order
              </button>
            )}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
