import { useForm } from "react-hook-form";
import Input from "./Input";
import { useCreateCabin, useUpdateCabin } from "../hooks/useCabins";

export interface Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: File | string;
}
function CabinForm({
  cabinToUpdate,
  onCloseModal,
}: {
  cabinToUpdate?: Cabin;
  onCloseModal?: () => void;
}) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Cabin>({
    defaultValues: cabinToUpdate ?? {},
  });

  const { mutate: createCabin } = useCreateCabin();
  const { mutate: updateCabin } = useUpdateCabin();

  const isEditSession = !!cabinToUpdate?.id;

  const onSubmit = (data: Cabin) => {
    const fileList = data.image as unknown as FileList | null;
    const image =
      fileList && fileList.length > 0
        ? fileList[0]
        : (cabinToUpdate?.image ?? "");

    if (isEditSession) {
      updateCabin(
        {
          newCabin: { ...data, image },
          id: cabinToUpdate.id,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        type="text"
        placeholder="e.g. Cabin 001"
        {...register("name", { required: "This field is required" })}
        error={errors.name?.message}
      />
      <Input
        label="Maximum capacity"
        type="number"
        placeholder="e.g. 4"
        {...register("maxCapacity", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Capacity should be at least 1",
          },
        })}
        error={errors.maxCapacity?.message}
      />
      <Input
        label="Regular price"
        type="number"
        placeholder="e.g. 350"
        {...register("regularPrice", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Regular price should be at least 1",
          },
        })}
        error={errors.regularPrice?.message}
      />
      <Input
        label="Discount"
        type="number"
        placeholder="e.g. 25"
        {...register("discount", {
          required: "This field is required",
          validate: (value) =>
            value <= getValues().regularPrice ||
            "Discount should be less than regular price",
        })}
        error={errors.discount?.message}
      />
      <Input
        label="Description"
        type="textarea"
        placeholder="Brief description for the website…"
        {...register("description", {
          required: "This field is required",
        })}
        error={errors.description?.message}
      />
      <div className="grid grid-cols-[1fr_2fr] items-center gap-4 px-6 py-4">
        <label className="text-sm font-medium text-stone-800">
          Cabin photo
        </label>
        <label
          htmlFor="image"
          className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-stone-300 bg-stone-50 px-4 py-2 text-center transition hover:bg-stone-100"
        >
          <span className="text-sm text-stone-800">
            Drop image here or{" "}
            <span className="font-medium text-indigo-500">browse</span>
          </span>
          <span className="text-xs text-stone-400">PNG, JPG up to 5MB</span>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="hidden"
            {...register("image", {
              required: isEditSession ? false : "This field is required",
            })}
          />
        </label>
        {errors.image?.message && (
          <p className="text-xs text-red-500">{errors.image?.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-3 px-6 py-4">
        <button
          type="reset"
          className="rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium text-stone-800 transition hover:bg-stone-50"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          {isEditSession
            ? isSubmitting
              ? "Update cabin..."
              : "Update cabin"
            : isSubmitting
              ? "Add cabin..."
              : "Add cabin"}
        </button>
      </div>
    </form>
  );
}

export default CabinForm;
