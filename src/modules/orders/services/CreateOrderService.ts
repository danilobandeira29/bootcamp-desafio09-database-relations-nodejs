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
    const costumer = await this.customersRepository.findById(customer_id);

    if (!costumer) {
      throw new AppError('Costumer not found');
    }

    const productsIds = products.filter(product => product.id);

    const allProducts = await this.productsRepository.findAllById(productsIds);

    if (allProducts.length !== products.length) {
      throw new AppError('Your order have a product missing in database');
    }
  }
}

export default CreateOrderService;
