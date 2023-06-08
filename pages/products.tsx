import React from 'react';
import { GetServerSideProps } from 'next';
import payload from 'payload';
import Head from '../components/Head';
import { Product } from '../payload-types';

interface ProductProps {
  products: [Product];
}

const Products: React.FC<ProductProps> = ({ products }) => (
  <main className="products-page">
    <Head title="Product list" />
    <div className="container">
      <h2>
        Products (
        {products.length}
        )

      </h2>


      <ul className="product-list">
        {products.map((product) => (
          <li
            key={product.id}
            className="product-item"
          >
            <h3>{product.name}</h3>

            <strong className="price">
              $
              {' '}
              {product.price}
            </strong>


            <strong>Colors:</strong>
            <ul className="sub-list">
              {product.colors.map((color) => (<li key={color.id}>{color.name}</li>))}
            </ul>

            <strong>Sizes:</strong>
            <ul className="sub-list">
              {product.sizes.map((size) => <li key={size.id}>{size.name}</li>)}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  </main>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const pageQuery = await payload.find({
    collection: 'products',
    limit: 30,
    where: {
      or: [
        {
          'colors.name': {
            equals: 'Red',
          },
        },
        {
          and: [{
            price: {
              greater_than: 100,
            },
            'sizes.name': {
              equals: 'XS',
            },
          }],
        },
      ],
    },
  });

  return {
    props: {
      products: pageQuery.docs,
    },
  };
};

export default Products;
