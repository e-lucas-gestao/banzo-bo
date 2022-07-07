import React from 'react';

export function Boolean({ value }: any) {
  return (
    <div>
      {
        value ? 'Sim' : 'Não'
      }
    </div>
  );
}
