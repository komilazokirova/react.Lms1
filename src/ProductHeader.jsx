import { Plus, Tag, DollarSign, FileText, Image, List } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";


import { api } from "./api/api";
import z from "zod";
import Modal from "./components/Modal";
import { useToast } from "./context/ToastContext";

const productSchema = z.object({
  title: z
    .string()
    .min(1, "Mahsulot nomi kiritilishi shart")
    .min(3, "Kamida 3 ta harf bo'lishi kerak"),
  price: z
    .string()
    .min(1, "Narx kiritilishi shart")
    .regex(/^[0-9]+(\.[0-9]{1,2})?$/, "Faqat son kiriting")
    .refine((val) => Number(val) > 0, "Narx 0 dan katta bo'lishi kerak"),
  categoryId: z
    .string()
    .min(1, "Kategoriya ID kiritilishi shart")
    .regex(/^[0-9]+$/, "Faqat butun son bo'lishi kerak"),
  description: z
    .string()
    .min(1, "Tavsif kiritilishi shart")
    .min(10, "Kamida 10 ta belgi bo'lishi kerak"),
  image: z
    .string()
    .min(1, "Rasm URL kiritilishi shart")
    .regex(/^(https?:\/\/).+/, "URL http:// yoki https:// bilan boshlanishi kerak"),
});

function ProductHeader() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    mode: "onBlur",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (newProduct) =>
      api.post("/products", {
        title: newProduct.title,
        price: Number(newProduct.price),
        description: newProduct.description,
        categoryId: Number(newProduct.categoryId),
        images: [newProduct.image],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showToast("Mahsulot muvaffaqiyatli qo'shildi ✅", "success");
      reset();
      setOpen(false);
    },
    onError: (error) => {
      showToast(
        error.response?.data?.message || "Mahsulot qo'shib bo'lmadi ❌",
        "error"
      );
    },
  });

  function onSubmit(data) {
    mutate(data);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Mahsulotlar</h1>
          <p className="mt-2 text-slate-500">
            Barcha mahsulotlarni shu yerdan boshqaring.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition-colors duration-150 hover:bg-blue-700"
        >
          <Plus size={20} />
          Mahsulot qo'shish
        </button>
      </div>

      <Modal IsOpen={open} onClose={() => setOpen(false)} title="Mahsulot qo'shish">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-5 p-6 md:grid-cols-2"
        >
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">
              Mahsulot nomi
            </span>
            <div className="relative">
              <Tag size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Masalan: Nike krossovka"
                {...register("title")}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Narx ($)</span>
            <div className="relative">
              <DollarSign size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="99"
                {...register("price")}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>
            {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Kategoriya ID</span>
            <div className="relative">
              <List size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="1"
                {...register("categoryId")}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>
            {errors.categoryId && <p className="text-sm text-red-500">{errors.categoryId.message}</p>}
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Tavsif</span>
            <div className="relative">
              <FileText size={19} className="absolute left-4 top-4 text-slate-400" />
              <textarea
                rows={3}
                placeholder="Mahsulot haqida qisqacha ma'lumot"
                {...register("description")}
                className="w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 pt-3 outline-none focus:border-blue-500"
              />
            </div>
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Rasm URL</span>
            <div className="relative">
              <Image size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                {...register("image")}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>
            {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
          </label>

          <div className="flex justify-end border-t border-slate-100 pt-5 md:col-span-2">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 font-semibold text-white transition-colors duration-150 hover:bg-blue-700 disabled:opacity-50"
            >
              <Plus size={19} />
              {isPending ? "Qo'shilmoqda..." : "Mahsulot qo'shish"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default ProductHeader;