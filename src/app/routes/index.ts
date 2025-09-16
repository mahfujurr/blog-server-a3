import { Router } from 'express';
import { EntityRoutes } from '../modules/entity/entity.route';
import { ItemRoutes } from '../modules/item/item.route';
import { WarehouseRoutes } from '../modules/warehouse/warehouse.route';
import { ProductRoutes } from '../modules/product/product.route';
import { OrderRoutes } from '../modules/order/order.route';
import { WarehouseItemRoutes } from '../modules/warehouseItmes/warehouseItems.route';
import { ReceiptRoutes } from '../modules/receipt/receipt.route';
import { StockRoutes } from '../modules/stocks/stocks.route';

const router = Router();

const moduleRoutes = [

  {
    path: '/entities',
    route: EntityRoutes,
  },
  {
    path: '/categories',
    route: ItemRoutes,
  },
  {
    path: '/warehouses',
    route: WarehouseRoutes,
  },
  {
    path: '/warehouseitems',
    route: WarehouseItemRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/receipts',
    route: ReceiptRoutes,
  },
  {
    path: '/stocks',
    route: StockRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
