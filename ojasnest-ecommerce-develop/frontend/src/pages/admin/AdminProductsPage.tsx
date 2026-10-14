import React, { useEffect, useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { InventoryTable } from '../../components/admin/InventoryTable';
import api from '../../api/client';
import { Product } from '../../types';

export const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get('/products').then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8 space-y-6">
        <h1 className="text-2xl font-black text-white">Live Inventory Levels</h1>
        <InventoryTable products={products} />
      </div>
    </div>
  );
};