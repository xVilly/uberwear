import React from 'react';
import routes from './Router';
import {RouterProvider} from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { queryClient } from './utils/queryClient';
import { CartProvider } from './pages/CartContext'; 


function App() {
  return (
    <>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider maxSnack={2}>
          <CartProvider>
            <RouterProvider router={routes}/>
          </CartProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </React.StrictMode>
    </>
  );
}

export default App;
