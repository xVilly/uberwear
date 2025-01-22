import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../CartContext';
import { Product } from '../../models/Product';
import { getProductsByCategoryColor } from '../../requests';
import { enqueueSnackbar } from 'notistack';

export function ProductPage() {
    const navigate = useNavigate();
    const { shopId, category, color } = useParams<any>();

    const [products, setProducts] = useState<Product[]>([]);
    const [sizes, setSizes] = useState<string[]>([]);

    const [selectedProduct, setSelectedProduct] = useState<Product|null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productData: Product[] = await getProductsByCategoryColor(shopId ?? '', category ?? '', color ?? '');
                setProducts(productData);
                setSelectedProduct(productData[0]);
                const sizesTemp: string[] = [];
                productData.forEach(product => {
                    if (!sizesTemp.includes(product.size)) {
                        sizesTemp.push(product.size);
                    }
                });
                setSizes(sizesTemp);
            } catch (error) {
                console.error('Failed to fetch colors:', error);
            }
        };

        fetchProducts();
    }, []);

    const { addToCart, removeFromCart } = useCart();

    const handleSizeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const product = products.find(product => product.size === event.target.value);
        if (!product) {
            alert('Wybrano nieprawidłowy rozmiar!');
            return;
        }
        setSelectedProduct(product);
    };



    const handleAddToCart = () => {
        if (!selectedProduct) {
            alert('Wybrano nieprawidłowy produkt!');
            return;
        }

        addToCart(selectedProduct);

        enqueueSnackbar(`Dodano do koszyka: ${selectedProduct.name} - kolor ${color} w rozmiarze ${selectedProduct.size} za ${selectedProduct.price} zł`, { 
            variant: 'success',
            action: (key) => (<>
                <button 
                className="py-1 px-3 text-cyan-200 bg-black bg-opacity-0 hover:bg-opacity-15 rounded-md transition-all duration-200"
                onClick={() => { 
                    navigate('/cart');
                }}>
                    Sprawdź koszyk
                </button>
                <button 
                className="py-1 px-3 text-rose-200 bg-black bg-opacity-0 hover:bg-opacity-15 rounded-md transition-all duration-200"
                onClick={() => { 
                    removeFromCart(selectedProduct.product_ID);
                }}>
                    Cofnij
                </button></>
            )
        });
    };

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
            <h1 style={{ marginBottom: '40px', fontSize: '2.5rem', fontWeight: 'bold' }}>
                {selectedProduct?.name} - kolor {color?.toLowerCase()}
            </h1>

            {/* Display the selected hoodie */}
            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <img
                    src={`${selectedProduct?.image}`}
                    alt={`${selectedProduct?.name} - kolor ${color?.toLowerCase()}`}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        marginBottom: '10px',
                        border: '3px solid #FFBF00',
                    }}
                />
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E3A5F' }}>
                    {selectedProduct?.price} zł
                </p>
            </div>

            <div style={{ marginTop: '20px' }}>
                <label htmlFor="size-select" style={{ fontSize: '1.2rem' }}>
                    Wybierz rozmiar:
                </label>
                <select
                    id="size-select"
                    value={selectedProduct?.size}
                    onChange={handleSizeSelect}
                    style={{
                        padding: '8px',
                        fontSize: '1rem',
                        margin: '10px',
                        borderRadius: '4px',
                        width: '65px',
                    }}
                >
                    {sizes.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>

            <button
                onClick={handleAddToCart}
                className="px-4 py-2 bg-[#1E3A5F] text-white rounded-md shadow-md hover:shadow-lg text-lg mt-5 hover:scale-110 transition-all duration-200"
            >
                Dodaj do koszyka
            </button>
        </div>
    );
}
