import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  // HiEllipsisVertical,
  HiOutlinePencilSquare,
  HiXMark,
} from "react-icons/hi2";
import { useCabins, useDeleteCabin } from "../hooks/useCabins";
import { formatCurrency } from "../utils/helpers";
import Modal from "../components/Modal";
import CabinForm, { type Cabin } from "../components/CabinForm";
import Spinner from "../components/Spinner";
import Error from "../components/Error";
import ConfirmationModal from "../components/ConfirmationModal";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import Table from "../components/Table";

const optionsFilter = [
  { key: "all", label: "All" },
  { key: "no-discount", label: "No discount" },
  { key: "with-discount", label: "With discount" },
];

const optionsSort = [
  { key: "name-asc", label: "Sort by name (A-Z)" },
  { key: "name-desc", label: "Sort by name (Z-A)" },
  { key: "regularPrice-asc", label: "Sort by price (low first)" },
  { key: "regularPrice-desc", label: "Sort by price (high first)" },
  { key: "maxCapacity-asc", label: "Sort by capacity (low first)" },
  { key: "maxCapacity-desc", label: "Sort by capacity (high first)" },
];

function Cabins() {
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [cabinToUpdate, setCabinToUpdate] = useState<Cabin | undefined>();
  const [cabinToDelete, setCabinToDelete] = useState<number | null>(null);

  const { data: cabins, isLoading, error } = useCabins();
  const { mutate: deleteCabin } = useDeleteCabin();

  const [searchParams] = useSearchParams();

  const filteredCabins = cabins?.filter((cabin) => {
    if (searchParams.get("discount") === "no-discount") return !cabin.discount;
    if (searchParams.get("discount") === "with-discount")
      return !!cabin.discount;
    return true;
  });

  // const sortedCabins = filteredCabins?.sort((a, b) => {
  //   const sortBy = searchParams.get("sortBy");
  //   if (sortBy === "name-asc") return a.name.localeCompare(b.name);
  //   if (sortBy === "name-desc") return b.name.localeCompare(a.name);
  //   if (sortBy === "regularPrice-asc")
  //     return a.regularPrice - b.regularPrice;
  //   if (sortBy === "regularPrice-desc")
  //     return b.regularPrice - a.regularPrice;
  //   if (sortBy === "maxCapacity-asc")
  //     return a.maxCapacity - b.maxCapacity;
  //   if (sortBy === "maxCapacity-desc")
  //     return b.maxCapacity - a.maxCapacity;
  //   return 0;
  // });

  const sortBy = searchParams.get("sortBy") || optionsSort[0].key;
  const [field, direction] = sortBy.split("-") as [string, "asc" | "desc"];
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort((a, b) => {
    if (field === "name") return a.name.localeCompare(b.name) * modifier;
    return (a[field] - b[field]) * modifier;
  });

  const handleUpdateCabin = (cabin: Cabin) => {
    setCabinToUpdate(cabin);
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
              setCabinToUpdate(undefined);
            }}
          >
            Add new cabin
          </button>
          <Filter filterKey="discount" options={optionsFilter} />
          <Sort options={optionsSort} />
        </div>
      </div>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Error message="An error occurred while fetching cabins." />
      ) : filteredCabins && filteredCabins.length > 0 ? (
        <Table>
          <Table.Header columns={["", "Name", "Capacity", "Regular price", "Discount", "Actions"]} />
          <Table.Body>
            {sortedCabins?.map((cabin) => (
              <Table.Row key={cabin.id}>
                <Table.ImageCell src={cabin.image} alt={cabin.name} />
                <Table.TextCell>{cabin.name}</Table.TextCell>
                <Table.TextCell>
                  Fits up to {cabin.maxCapacity} guests
                </Table.TextCell>
                <Table.TextCell>{formatCurrency(cabin.regularPrice)}</Table.TextCell>
                <Table.TextCell
                  className={
                    cabin.discount ? "text-green-600" : "text-stone-300"
                  }
                >
                  {cabin.discount ? formatCurrency(cabin.discount) : "—"}
                </Table.TextCell>
                <Table.ActionCell>
                  <button
                    className="rounded-md p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700"
                    onClick={() => handleUpdateCabin(cabin)}
                  >
                    <HiOutlinePencilSquare size={18} />
                  </button>
                  <button
                    className="rounded-md p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700"
                    onClick={() => {
                      setCabinToDelete(cabin.id);
                      setOpenConfirmModal(true);
                    }}
                  >
                    <HiXMark size={18} />
                  </button>
                </Table.ActionCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <Error message="No cabins found. Please adjust your filters or add new cabins." />
      )}

      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <CabinForm
            cabinToUpdate={cabinToUpdate}
            onCloseModal={() => setOpenModal(false)}
          />
        </Modal>
      )}

      {openConfirmModal && (
        <ConfirmationModal
          title="Delete cabin"
          message={`Are you sure you want to delete this cabin permanently?\n 
           This action cannot be undone.`}
          onConfirm={() => {
            if (cabinToDelete !== null) {
              deleteCabin(cabinToDelete);
            }
            setOpenConfirmModal(false);
          }}
          onClose={() => setOpenConfirmModal(false)}
        />
      )}
    </>
  );
}

export default Cabins;
