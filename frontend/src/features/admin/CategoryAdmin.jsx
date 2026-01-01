import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getAllCategories, deleteCategory } from '../../api/axios';

export default function CategoryAdmin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showDelete, setShowDelete] = useState(null);

  // 1. Fetch Categories (Real Data)
  const { data: categories = [], isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });

  // 2. Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      setShowDelete(null);
    },
    onError: (err) => {
      alert(err.response?.data?.detail || 'Failed to delete category');
    }
  });

  // 3. Handle Edit Navigation
  const handleEdit = (category) => {
    navigate('/add-category', { state: { categoryToEdit: category } });
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <div className="p-10 text-center text-[#222222]/60 font-['Lexend']">Loading categories...</div>;
  if (isError) return <div className="p-10 text-center text-red-500 font-['Lexend']">Error loading categories.</div>;

  return (
    <>
      {/* fonts & icons */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap" rel="stylesheet" />

      <div className="min-h-screen bg-[#FAF3E1]/30 font-['Lexend'] text-[#222222] p-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#222222]">Category Management</h1>
            <p className="text-[#222222]/60 mt-1">View, update, and manage course categories</p>
          </div>
          <button 
            onClick={() => navigate('/add-category')}
            className="flex items-center gap-2 px-5 py-3 bg-[#FF6D1F] text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:bg-[#e0560e] transition-all"
          >
            <span className="material-symbols-outlined">add</span>
            Add Category
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="group relative bg-white border border-[#F5E7C6] rounded-[24px] p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="size-12 rounded-2xl bg-[#FF6D1F]/10 flex items-center justify-center text-[#FF6D1F]">
                  <span className="material-symbols-outlined text-[28px]">{cat.icon || 'category'}</span>
                </div>
                {/* Action Buttons */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button 
                    onClick={() => handleEdit(cat)}
                    className="p-2 rounded-lg bg-[#FAF3E1] text-[#222222] hover:bg-[#FF6D1F] hover:text-white transition-all duration-200"
                    title="Edit"
                  >
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button 
                    onClick={() => setShowDelete(cat)}
                    className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
                    title="Delete"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-[#222222] mb-2">{cat.name}</h3>
              <p className="text-[#222222]/60 text-sm leading-relaxed line-clamp-3">
                {cat.description || "No description provided."}
              </p>
            </div>
          ))}

          {categories.length === 0 && (
            <div className="col-span-full py-12 text-center bg-white rounded-[24px] border border-dashed border-[#F5E7C6]">
              <p className="text-[#222222]/40 font-medium">No categories found. Create one to get started!</p>
            </div>
          )}
        </div>

        {/* Delete Modal */}
        {showDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#222222]/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div className="w-full max-w-md bg-[#FAF3E1] border border-[#F5E7C6] rounded-[24px] p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4 text-[#FF6D1F]">
                <span className="material-symbols-outlined">warning</span>
                <h3 className="text-lg font-bold text-[#222222]">Delete Category?</h3>
              </div>
              <p className="text-[#222222]/70 mb-8 leading-relaxed">
                Are you sure you want to delete <span className="font-semibold text-[#222222]">"{showDelete.name}"</span>? This action cannot be undone and will affect associated courses.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDelete(null)}
                  className="px-5 py-2.5 rounded-[12px] bg-[#F5E7C6] text-[#222222] font-bold text-sm hover:bg-opacity-80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDelete.id)}
                  className="px-5 py-2.5 rounded-[12px] bg-[#FF6D1F] text-[#FAF3E1] font-bold text-sm hover:bg-[#e0560e] transition-colors shadow-sm"
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}

        <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        `}</style>
      </div>
    </>
  );
}