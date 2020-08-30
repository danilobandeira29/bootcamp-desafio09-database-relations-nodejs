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
    const findCustomer = await this.customersRepository.findById(customer_id);

    if (!findCustomer) {
      throw new AppError('Customer not found.');
    }

    const productsIds = products.map(product => {
      return { id: product.id };
    });

    const findAllProductsById = await this.productsRepository.findAllById(
      productsIds,
    );

    if (findAllProductsById.length !== products.length) {
      throw new AppError('Some of this itens is not in stock.');
    }

    // findAllProductsById = [{ id: 10, price: 100, quantity: 3 ... }, {...}]

    findAllProductsById.map(product =>
      products.map(item => {
        if (item.quantity > product.quantity) {
          throw new AppError('Insufficient in stock');
        }

        return undefined;
      }),
    );

    const subtractQuantityProductsInStock = findAllProductsById.map(product => {
      const { quantity } = products.filter(item => item.id === product.id)[0];

      return {
        id: product.id,
        quantity: product.quantity - quantity,
      };
    });

    const productsOrder = findAllProductsById.map(product => {
      return {
        product_id: product.id,
        price: product.price,
        quantity: product.quantity,
      };
    });

    const order = await this.ordersRepository.create({
      customer: findCustomer,
      products: productsOrder,
    });

    await this.productsRepository.updateQuantity(
      subtractQuantityProductsInStock,
    );

    return order;
  }
}

export default CreateOrderService;
