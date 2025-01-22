import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoriesResponse, Category } from '../../models/Category';
import { getCategories } from '../../requests';

export function ShopPage() {
    const { shopId } = useParams<{ shopId: string }>();
    const navigate = useNavigate();

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const shopData : CategoriesResponse = await getCategories(shopId ?? '');
                setCategories(shopData.categories);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []);

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
            {/* Header */}
            <h1 style={{ marginBottom: '40px', fontSize: '2.5rem', fontWeight: 'bold' }}>
                Wybierz kategorię
            </h1>

            {/* Category Tiles */}
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    justifyContent: 'center',
                }}
            >
                {categories.map((category) => (
                    <div
                        key={category.name}
                        className="category-tile"
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
                        onClick={() => navigate(`/offer/${shopId}/category/${category.name}`)}
                    >
                        {/* Representative Image */}
                        <img
                            src={`${category.image}`}
                            alt={category.name}
                            style={{
                                width: '300px',
                                height: '300px',
                                objectFit: 'scale-down',
                            }}
                        />

                        {/* Category Name */}
                        <h2
                            style={{
                                padding: '10px',
                                background: '#1E3A5F',
                                color: '#fff',
                            }}
                        >
                            {category.name}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
}
