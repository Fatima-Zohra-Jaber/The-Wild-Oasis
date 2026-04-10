import {
  HiEllipsisVertical,
  HiOutlinePencilSquare,
  HiXMark,
} from "react-icons/hi2";
import { useCabins, useDeleteCabin } from "../hooks/useCabins";
import { formatCurrency } from "../utils/helpers";
import { useState } from "react";
import Modal from "../components/Modal";
import CabinForm, { type Cabin } from "../components/CabinForm";

function Cabins() {
  const [filter, setFilter] = useState("all");
  const [openModal, setOpenModal] = useState(false);
  const [updatedCabin, setUpdatedCabin] = useState<Cabin | undefined>();

  const { data: cabins, isLoading, error } = useCabins();
  const { mutate: deleteCabin } = useDeleteCabin();

  const filteredCabins = cabins?.filter((cabin) => {
    if (filter === "no-discount") return !cabin.discount;
    if (filter === "with-discount") return !!cabin.discount;
    return true;
  });

  const handleUpdateCabin = (cabin: Cabin) => {
    setUpdatedCabin(cabin);
    setOpenModal(true);
  };
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-medium text-stone-800">All cabins</h1>
        <div className="flex items-center gap-4">
          <button
            className="rounded-md border border-stone-200 bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
            onClick={() => {
              setOpenModal(true);
              setUpdatedCabin(undefined);
            }}
          >
            Add new cabin
          </button>

          <div className="flex rounded-lg border border-stone-200 bg-white p-0.5">
            {[
              { key: "all", label: "All" },
              { key: "no-discount", label: "No discount" },
              { key: "with-discount", label: "With discount" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`rounded-md border-none px-3 py-1.5 text-sm transition-all ${
                  filter === key
                    ? "border border-stone-200 bg-indigo-600 font-medium text-white shadow-sm"
                    : "hover:text-stone-900"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <select className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 focus:outline-none">
            <option>Sort by name (A-Z)</option>
            <option>Sort by name (Z-A)</option>
            <option>Sort by price (low)</option>
            <option>Sort by price (high)</option>
          </select>
        </div>
      </div>

        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="w-20 p-3"></th>
                <th className="p-3 text-left text-xs font-medium tracking-wider text-stone-600 uppercase">
                  Cabin
                </th>
                <th className="p-3 text-left text-xs font-medium tracking-wider text-stone-600 uppercase">
                  Capacity
                </th>
                <th className="p-3 text-left text-xs font-medium tracking-wider text-stone-600 uppercase">
                  Price
                </th>
                <th className="p-3 text-left text-xs font-medium tracking-wider text-stone-600 uppercase">
                  Discount
                </th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredCabins?.map((cabin) => (
                <tr
                  key={cabin.id}
                  className="border-b border-stone-200/60 transition-colors last:border-none hover:bg-stone-50"
                >
                  <td className="p-1">
                    <img
                      src={cabin.image}
                      alt={cabin.name}
                      className="block h-12 w-18 rounded-lg object-cover"
                    />
                  </td>
                  <td className="p-3 text-sm font-medium text-stone-800">
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
                      className="rounded-md p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700"
                      onClick={() => handleUpdateCabin(cabin)}
                      // disabled={isDelting}
                    >
                      <HiOutlinePencilSquare size={18} />
                    </button>
                    <button
                      className="rounded-md p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700"
                      onClick={() => deleteCabin(cabin.id)}
                      // disabled={isDelting}
                    >
                      <HiXMark size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <CabinForm
            cabinToUpdate={updatedCabin}
            onCloseModal={() => setOpenModal(false)}
          />
        </Modal>
      )}
    </>
  );}

export default Cabins;
