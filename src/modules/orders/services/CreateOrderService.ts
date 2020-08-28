import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('customer not found');
    }

    const productsIds = products.filter(product => product.id);

    const allProducts = await this.productsRepository.findAllById(productsIds);

    if (allProducts.length !== products.length) {
      throw new AppError('Your order have a product missing in database');
    }

    const order_products = allProducts.map(product => {
      const obj = {
        product_id: product.id,
        price: product.price,
        quantity: product.quantity,
      };

      return obj;
    });

    const order = await this.ordersRepository.create({
      customer,
      products: order_products.map(product => product),
    });

    return order;
  }
}

export default CreateOrderService;
