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
      throw new AppError('Customer not found');
    }

    const existintProducts = await this.productsRepository.findAllById(
      products,
    );

    if (!existintProducts.length) {
      throw new AppError('Could not find any products with the given ids');
    }

    const existintProductsIds = existintProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existintProductsIds.includes(product.id),
    );

    const checkInexistentProductsIds = checkInexistentProducts.filter(
      product => product.id,
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProductsIds}`,
      );
    }

    const findProductsWithNoQuantityAvailable = products.filter(
      product =>
        existintProducts.filter(p => product.id === p.id)[0].quantity <
        product.quantity,
    );

    // const quantityOfNoAvaibleProducts = findProductsWithNoQuantityAvailable.filter(
    //   p => p.id,
    // );

    if (findProductsWithNoQuantityAvailable.length) {
      throw new AppError(
        `Theres no quantity in stock of this products: ${findProductsWithNoQuantityAvailable[0].id}`,
      );
    }

    const serializedProducts = existintProducts.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existintProducts.filter(p =>
        p.id === product.id ? p.price : undefined,
      )[0].price,
    }));

    const order = await this.ordersRepository.create({
      customer,
      products: serializedProducts.map(product => product),
    });

    const { order_products } = order;

    const orderedProductsQuantity = order_products.map(product => {
      const { quantity } = products.filter(p => p.id === product.id)[0];

      return {
        id: product.product_id,
        quantity: product.quantity - quantity,
      };
    });

    await this.productsRepository.updateQuantity(orderedProductsQuantity);

    return order;
  }
}

export default CreateOrderService;
