// NYHoodies.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useNavigate instead of useHistory
import { Color } from '../../models/Color';
import { getColors } from '../../requests';

export function CategoryPage() {
    const navigate = useNavigate(); // Updated hook
    const { shopId, category } = useParams<any>();

    const [colors, setColors] = useState<Color[]>([]);
    useEffect(() => {
        const fetchColors = async () => {
            try {
                const colorData: Color[] = await getColors(shopId ?? '', category ?? '');
                setColors(colorData);
            } catch (error) {
                console.error('Failed to fetch colors:', error);
            }
        };

        fetchColors();
    }, []);

    const handleSelectHoodie = (color: string) => {
        // Use navigate instead of history.push()
        navigate(`/offer/${shopId}/category/${category}/color/${color}/purchase`);
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
            <h1 style={{ marginBottom: '40px', fontSize: '2.5rem', fontWeight: 'bold' }}>Wybierz {category}</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {colors.map((color) => (
                    <div
                        key={color.color}
                        className="hoodie-tile"
                        style={{
                            width: '300px',
                            borderRadius: '8px',
                            background: '#fff',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'transform 0.3s',
                        }}
                        onClick={() => handleSelectHoodie(color.color)}
                    >
                        <img
                            src={`${color.image}`}
                            alt={`${color.color} ${category}`}
                            style={{
                                width: '300px',
                                height: '300px',
                                objectFit: 'scale-down',
                            }}
                        />
                        <h2 style={{ padding: '10px', background: '#1E3A5F', color: '#fff' }}>
                            {`${color.product} - kolor ${color.color.toLowerCase()}`}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
}
