import React, { createContext, useContext } from 'react';
import { CardsService , CardsServiceImplementation } from '../services/CardsService';

type CardsContextProps = {
  cardsService: CardsService;
}

const CardsContext = createContext<CardsContextProps | undefined>(undefined);

export const CardsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cardsService = new CardsServiceImplementation();

  return (
    <CardsContext.Provider value={{ cardsService }}>
      {children}
    </CardsContext.Provider>
  );
};

export const useCardsContext = (): CardsContextProps => {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error('useCardsContext must be used inside a CardsContextProvider');
  }
  return context;
};
