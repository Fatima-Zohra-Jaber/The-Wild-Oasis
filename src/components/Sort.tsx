import { useSearchParams } from "react-router-dom";

interface SortProps {
  options?: { key: string; label: string }[];
}

function Sort({ options }: SortProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sortBy") || options?.[0].key;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <select
      className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 focus:outline-none"
      onChange={handleChange}
      value={currentSort}
    >
      {options?.map((option) => (
        <option key={option.key} value={option.key}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Sort;
