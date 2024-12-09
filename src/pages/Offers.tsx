import React from 'react';

const offers = [
  {
    id: '1',
    title: '20% off on Organic Avocados',
    description: 'Get 20% off on all organic avocados. Limited time offer!',
    imageUrl: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce',
    validUntil: '2023-12-31'
  },
  {
    id: '2',
    title: 'Buy 1 Get 1 Free on Whole Wheat Bread',
    description: 'Buy one get one free on our freshly baked whole wheat bread.',
    imageUrl: 'https://images.unsplash.com/photo-1571046812121-7d2f9c9f6f6f',
    validUntil: '2023-11-30'
  }
];

const Offers: React.FC = () => {
  return (
    <div>
      <h1>Special Offers</h1>
      <div>
        {offers.map(offer => (
          <div key={offer.id}>
            <h2>{offer.title}</h2>
            <p>{offer.description}</p>
            <img src={offer.imageUrl} alt={offer.title} />
            <p>Valid Until: {offer.validUntil}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;