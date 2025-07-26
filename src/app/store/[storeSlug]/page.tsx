'use client';

import React from 'react';

type Props = {
  params: {
    storeSlug: string;
  };
};

export default function StorePage({ params }: Props) {
  return (
    <div>
      <h1>Store: {params.storeSlug}</h1>
    </div>
  );
}