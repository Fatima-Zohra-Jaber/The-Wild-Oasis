import { HiEllipsisVertical } from "react-icons/hi2";
import { useCabins, useDeleteCabin } from "../hooks/useCabins";
import { formatCurrency } from "../utils/helpers";
import { useState } from "react";

function Cabins() {
  const [filter, setFilter] = useState("all");

  const { data: cabins, isLoading, error } = useCabins();
  const { mutate: deleteCabin, isLoading: isDelting } = useDeleteCabin();

  const filteredCabins = cabins?.filter((cabin) => {
    if (filter === "no-discount") return !cabin.discount;
    if (filter === "with-discount") return !!cabin.discount;
    return true;
  });

  return (
    <>
      <div className="flex items-center justify-between mb-6 ">
        <h1 className="text-2xl font-medium text-stone-800">All cabins</h1>
        <div className="flex items-center gap-4">
       

          <div className="flex bg-white border border-stone-200 rounded-lg p-0.5">
            {[
              { key: "all", label: "All" },
              { key: "no-discount", label: "No discount" },
              { key: "with-discount", label: "With discount" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1.5 text-sm rounded-md transition-all border-none ${
                  filter === key
                    ? "bg-indigo-600 text-white font-medium shadow-sm border border-stone-200 "
                    : " hover:text-stone-900"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <select className="text-sm border border-stone-200 rounded-lg px-3 py-2 bg-white text-stone-800 focus:outline-none">
            <option>Sort by name (A-Z)</option>
            <option>Sort by name (Z-A)</option>
            <option>Sort by price (low)</option>
            <option>Sort by price (high)</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden ">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-200">
              <th className="w-20 p-3"></th>
              <th className="p-3 text-left text-xs font-medium text-stone-600 uppercase tracking-wider">
                Cabin
              </th>
              <th className="p-3 text-left text-xs font-medium text-stone-600 uppercase tracking-wider">
                Capacity
              </th>
              <th className="p-3 text-left text-xs font-medium text-stone-600 uppercase tracking-wider">
                Price
              </th>
              <th className="p-3 text-left text-xs font-medium text-stone-600 uppercase tracking-wider">
                Discount
              </th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredCabins?.map((cabin) => (
              <tr
                key={cabin.id}
                className="border-b border-stone-200/60 last:border-none hover:bg-stone-50 transition-colors"
              >
                <td className="p-1">
                  <img
                    src={cabin.image}
                    alt={cabin.name}
                    className="w-18 h-12 object-cover rounded-lg block"
                  />
                </td>
                <td className="p-3 font-medium text-stone-800 text-sm">
                  {cabin.name}
                </td>
                <td className="p-3 text-sm text-stone-600">
                  Fits up to {cabin.maxCapacity} guests
                </td>
                <td className="p-3 text-sm font-medium text-stone-800">
                  {formatCurrency(cabin.regularPrice)}
                </td>
                <td
                  className={`p-3 text-sm font-medium ${cabin.discount ? "text-green-600" : "text-stone-300"}`}
                >
                  {cabin.discount ? formatCurrency(cabin.discount) : "—"}
                </td>
                <td className="p-3">
                  <button
                    className="p-1 rounded-md text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
                    onClick={() => deleteCabin(cabin.id)}
                    disabled={isDelting}
                  >
                    <HiEllipsisVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Cabins;
