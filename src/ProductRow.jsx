import { useState } from "react";
import { Pencil, Trash2, Tag, DollarSign, FileText, Image, List, Save } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";


import { api } from "./api/api";
import Modal from "./components/Modal";
import { useToast } from "./context/ToastContext";

function ProductRow({ product }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [categoryId, setCategoryId] = useState(product.category?.id || "");
  const [image, setImage] = useState(product.images?.[0] || "");

  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const editMutation = useMutation({
    mutationFn: (updatedProduct) =>
      api.put(`/products/${product.id}`, updatedProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showToast("Mahsulot muvaffaqiyatli yangilandi ✅", "success");
      setEditOpen(false);
    },
    onError: (error) => {
      showToast(
        error.response?.data?.message || "Mahsulotni tahrirlab bo'lmadi ❌",
        "error"
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/products/${product.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showToast("Mahsulot muvaffaqiyatli o'chirildi 🗑️", "success");
      setDeleteOpen(false);
    },
    onError: (error) => {
      showToast(
        error.response?.data?.message || "Mahsulotni o'chirib bo'lmadi ❌",
        "error"
      );
    },
  });

  function handleEditSubmit(e) {
    e.preventDefault();
    editMutation.mutate({
      title,
      price: Number(price),
      description,
      categoryId: Number(categoryId),
      images: [image],
    });
  }

  function handleDelete() {
    deleteMutation.mutate();
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold line-clamp-2">{product.title}</h2>
        <p className="text-gray-500 text-sm mt-2 line-clamp-3">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-green-600">
            ${product.price}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditOpen(true)}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => setDeleteOpen(true)}
              className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal IsOpen={editOpen} onClose={() => setEditOpen(false)} title="Mahsulotni tahrirlash">
        <form onSubmit={handleEditSubmit} className="grid gap-5 p-6 md:grid-cols-2">
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Mahsulot nomi</span>
            <div className="relative">
              <Tag size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Narx ($)</span>
            <div className="relative">
              <DollarSign size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Kategoriya ID</span>
            <div className="relative">
              <List size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Tavsif</span>
            <div className="relative">
              <FileText size={19} className="absolute left-4 top-4 text-slate-400" />
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 pt-3 outline-none focus:border-blue-500"
              />
            </div>
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Rasm URL</span>
            <div className="relative">
              <Image size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>
          </label>

          <div className="flex justify-end border-t border-slate-100 pt-5 md:col-span-2">
            <button
              type="submit"
              disabled={editMutation.isPending}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 font-semibold text-white transition-colors duration-150 hover:bg-blue-700 disabled:opacity-50"
            >
              <Save size={19} />
              {editMutation.isPending ? "Saqlanmoqda..." : "Save changes"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal IsOpen={deleteOpen} onClose={() => setDeleteOpen(false)} title="Mahsulotni o'chirish">
        <div className="p-6">
          <p className="font-semibold text-slate-800">
            "{product.title}" mahsulotini o'chirishga aminmisiz?
          </p>

          <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              onClick={() => setDeleteOpen(false)}
              className="rounded-xl border border-slate-200 px-5 py-2.5 font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Bekor qilish
            </button>
            <button
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
            >
              {deleteMutation.isPending ? "O'chirilmoqda..." : "Ha, o'chirish"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ProductRow;