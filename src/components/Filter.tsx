import { useSearchParams } from "react-router-dom";

interface FilterProps {
  filterKey: string;
  options: { key: string; label: string }[];
}

function Filter({ filterKey, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterKey) || options[0].key;

  const handleFilter = (value: string) => {
    searchParams.set(filterKey, value);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex rounded-lg border border-stone-200 bg-white p-0.5">
      {options.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => handleFilter(key)}
          className={`rounded-md border-none px-3 py-1.5 text-sm transition-all ${
            currentFilter === key
              ? "border border-stone-200 bg-indigo-600 font-medium text-white shadow-sm"
              : "hover:text-stone-900"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
