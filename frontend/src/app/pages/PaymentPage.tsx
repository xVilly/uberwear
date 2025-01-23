import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';
import { makeOrderRequest, payOrder } from '../requests';
import { Product } from '../models/Product';
import { UserData } from '../redux/userSlice';
import { AppDispatch, RootState } from '../store/mainStore';
import { connect } from 'react-redux';
import { enqueueSnackbar } from 'notistack';

const PaymentForm = ({ totalPrice, cart, accessToken }: { totalPrice: number, cart: Product[], accessToken: string }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'blik' | 'cash'>('card');
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    blikCode: '', // For BLIK
  });

  // Card Payment Handlers
  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 4) {
      value = value.replace(/(\d{4})(?=\d)/g, '$1 '); // Insert space every 4 digits
    }
    setPaymentInfo({ ...paymentInfo, cardNumber: value });
  };

  const handleExpiryDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2); // Insert slash after MM
    }
    setPaymentInfo({ ...paymentInfo, expiryDate: value });
  };

  const handleCvvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 3) {
      value = value.slice(0, 3); // Limit to 3 digits
    }
    setPaymentInfo({ ...paymentInfo, cvv: value });
  };

  const handleBlikCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({ ...paymentInfo, blikCode: event.target.value });
  };
  const isCardPaymentValid = (): boolean => {
    const { cardNumber, expiryDate, cvv } = paymentInfo;
    return (
      cardNumber.length === 19 && // Matches "1234 5678 9012 3456" format
      expiryDate.length === 5 &&  // Matches "MM/YY" format
      cvv.length === 3            // CVV is 3 digits
    );
  };
  
  // Validate if all fields are filled
  const isPaymentValid = (): boolean => {
    if (paymentInfo.cardNumber && paymentInfo.expiryDate && paymentInfo.cvv) {
      return (
        paymentInfo.cardNumber.length === 19 && 
        paymentInfo.expiryDate.length === 5 &&
        paymentInfo.cvv.length === 3
      );
    }
    if (paymentInfo.blikCode) {
      return paymentInfo.blikCode.length === 6;
    }
    if (paymentMethod === 'cash') {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Payment information submitted:', paymentInfo);
    await handleClick();
  };

  const handleClick = async () => {
    if (isPaymentValid()) {
      try {
        const products = cart.map(product => ({
          id: product.product_ID,
          count: 1,
        }));
        const orderResponse = await makeOrderRequest(accessToken, products, paymentMethod);
        if (orderResponse.status === 200) {
          console.log('Order successful:', orderResponse.data);
          navigate('/purchase/delivery/'+orderResponse.data.created_order_id);
          enqueueSnackbar('Zamówienie złożone pomyślnie (Nr zamówienia: '+orderResponse.data.created_order_id+')', { variant: 'success' });
          const payResponse = await payOrder(accessToken, orderResponse.data.created_order_id);
          enqueueSnackbar('Zamówienie nr '+ orderResponse.data.created_order_id + ' zostało opłacone!', { variant: 'success' });
        } else {
          console.error('Failed to make order:', orderResponse);
          enqueueSnackbar('Wystąpił błąd podczas składania zamówienia', { variant: 'error' });
        }
      } catch (error) {
        console.error('Failed to make order:', error);
        enqueueSnackbar('Wystąpił błąd podczas składania zamówienia', { variant: 'error' });
      }
    }
  };
  const isBlikValid = (): boolean => paymentInfo.blikCode.length === 6; // Example: BLIK code is 6 digits

  return (
    <form
    onSubmit={handleSubmit}
    style={{
      width: '80%',
      maxWidth: '600px',
      background: '#FFFFFF',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    }}
  >
    {/* Payment Method Buttons */}
    <div style={{marginBottom: '15px', display: 'flex', justifyContent: 'center'}}>
      <button
        type="button"
        onClick={() => setPaymentMethod('card')}
        style={{
          padding: '10px 20px',
          backgroundColor: paymentMethod === 'card' ? '#FFBF00' : '#F3F4F6',
          color: paymentMethod === 'card' ? '#1E3A5F' : '#333',
          border: '2px solid',
          borderColor: paymentMethod === 'card' ? '#FFBF00' : '#E5E7EB',
          borderRadius: '4px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          marginRight: '10px',
        }}
      >
        Karta
      </button>
      <button
        type="button"
        onClick={() => setPaymentMethod('blik')}
        style={{
          padding: '10px 20px',
          backgroundColor: paymentMethod === 'blik' ? '#FFBF00' : '#F3F4F6',
          color: paymentMethod === 'blik' ? '#1E3A5F' : '#333',
          border: '2px solid',
          borderColor: paymentMethod === 'blik' ? '#FFBF00' : '#E5E7EB',
          borderRadius: '4px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
      >
        BLIK
      </button>
      <button
        type="button"
        onClick={() => setPaymentMethod('cash')}
        style={{
          padding: '10px 20px',
          backgroundColor: paymentMethod === 'cash' ? '#FFBF00' : '#F3F4F6',
          color: paymentMethod === 'cash' ? '#1E3A5F' : '#333',
          border: '2px solid',
          borderColor: paymentMethod === 'cash' ? '#FFBF00' : '#E5E7EB',
          borderRadius: '4px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          marginLeft: '9px',
        }}
      >
        Gotówka
      </button>
    </div>
  
    {paymentMethod === 'card' && (
      <>
        {/* Card Number Input */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Numer karty</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={handleCardNumberChange}
            required
            placeholder="xxxx xxxx xxxx xxxx"
            maxLength={19}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #E5E7EB',
            }}
          />
        </div>
  
        {/* Expiry Date Input */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Data ważności</label>
          <input
            type="text"
            name="expiryDate"
            value={paymentInfo.expiryDate}
            onChange={handleExpiryDateChange}
            required
            maxLength={5}
            placeholder="MM/YY"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #E5E7EB',
            }}
          />
        </div>
  
        {/* CVV Input */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>CVV</label>
          <input
            type="text"
            name="cvv"
            value={paymentInfo.cvv}
            maxLength={3}
            onChange={handleCvvChange}
            required
            placeholder="xxx"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #E5E7EB',
            }}
          />
        </div>
      </>
    )}
  
    {paymentMethod === 'blik' && (
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>BLIK </label>
        <input
          type="text"
          name="blikCode"
          value={paymentInfo.blikCode}
          onChange={handleBlikCodeChange}
          required
          placeholder="Wprowadź kod BLIK"
          maxLength={6}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #E5E7EB',
          }}
        />
      </div>
    )}
  
    {paymentMethod === 'cash' && (
      <div style={{ marginTop: '20px', fontSize: '1.5rem', fontWeight: 'bold' }}>
        <p>Kwota do zapłaty: {totalPrice} zł (Gotówka)</p>
      </div>
    )}
  
          <button
        type="submit"
        style={{
          width: '100%',
          padding: '15px',
          background: '#FFBF00',
          color: '#1E3A5F',
          border: 'none',
          borderRadius: '4px',
          cursor: (paymentMethod === 'card' && isCardPaymentValid()) || (paymentMethod === 'blik' && isBlikValid()) || paymentMethod === 'cash' ? 'pointer' : 'not-allowed',
          fontWeight: 'bold',
          fontSize: '1.2rem',
        }}
        disabled={!((paymentMethod === 'card' && isCardPaymentValid()) || (paymentMethod === 'blik' && isBlikValid()) || paymentMethod === 'cash')}
      >
        {paymentMethod === 'cash' ? 'Przejdź do dostawy' : 'Przejdź do płatności'}
      </button>
  </form>
  
  );
};

function PaymentPage({userData}: {userData: UserData}) {
  const location = useLocation();
  const { cart, getTotalPrice } = useCart();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#F3F4F6',
        color: '#1E3A5F',
        fontFamily: "'Playfair Display', serif",
        padding: '20px',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
        Uzupełnij dane o płatności
        <span
          style={{
            display: 'block',
            height: '4px',
            backgroundColor: '#FFBF00',
            margin: '8px auto 0',
            borderRadius: '2px',
          }}
        />
      </h1>

      <div style={{ marginBottom: '20px' }}>
      </div>

      <PaymentForm totalPrice={getTotalPrice()} cart={cart} accessToken={userData.access} />


      {/* Cart Summary */}
      <div
        style={{
          minHeight: '50vh',
          display: 'flex',
          padding: '20px',
          position: 'fixed',
          right: '240px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            background: '#FFFFFF',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            marginTop: '70px',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px' }}>Podsumowanie koszyka</h2>
          <div>
            {cart.map((item, index) => (
              <div key={index} style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
                {/* Item details */}
                <div>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {item.color} {item.name} - {item.size}
                  </p>
                  <p>{item.price} zł</p>
                </div>
              </div>
            ))}
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '15px' }}>
            Całkowita cena: {getTotalPrice()} zł
          </h3>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({ userData: state.user.user });

export default connect(mapStateToProps)(PaymentPage);
