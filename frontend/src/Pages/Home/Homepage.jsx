import React from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import SearchBox from '../../Components/Comons/SearchBars';
import Header from '../../Components/Comons/Header';

const hotelData = [
    { id: 1, name: 'Grand Hotel', location: 'USA', rating: 4.8, price: 200, image: 'https://cdn.pixabay.com/photo/2016/09/19/22/46/lake-1681485_960_720.jpg' },
    { id: 2, name: 'Grand Hotel', location: 'USA', rating: 4.6, price: 200, image: 'https://cdn.pixabay.com/photo/2012/06/23/02/03/singapore-50547_1280.jpg' },
    { id: 3, name: 'Grand Hotel', location: 'USA', rating: 4.8, price: 200, image: 'https://cdn.pixabay.com/photo/2016/08/03/15/33/mountain-hotel-1567013_1280.jpg' },
    { id: 4, name: 'Grand Hotel', location: 'USA', rating: 4.6, price: 200, image: 'https://cdn.pixabay.com/photo/2017/10/14/16/24/the-hotel-complex-2850907_960_720.jpg' },
];

const HotelCard = ({ name, location, rating, price, image }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.background.default,
                borderRadius: 2,
                boxShadow: theme.shadows[1],
                p: 2,
                m: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                width: '100%',
                flexGrow: 1,
                border: `1px solid ${theme.palette.divider}`
            }}
        >
            <Box
                component="img"
                src={image}
                alt={name}
                sx={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: 1
                }}
            />
            <Box sx={{ mt: 1 }}>
                <Box sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{name}</Box>
                <Box sx={{ color: theme.palette.text.secondary }}>{location}</Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: 1
                    }}
                >
                    {'★'.repeat(Math.floor(rating))} {rating}
                </Box>
                <Box sx={{ mt: 1, fontWeight: 'bold' }}>
                    ${price}{' '}
                    <span style={{ fontWeight: 'normal' }}>per night</span>
                </Box>
            </Box>
        </Box>
    );
};

const Homepage = () => {
    const theme = useTheme();

    return (
        <Box>
            <Grid container spacing={2}>
                <Header />
                {/* <Grid item xs={12}>
                    <SearchBox onSearch={(data) => console.log(data)} />
                </Grid> */}
                <Grid item xs={12}>
                    <Box sx={{ mt: 1, mb: 1, fontWeight: 'bold', fontSize: '1.2rem' }}>
                        Featured Hotels
                    </Box>

                    {/* Container for hotel cards */}
                    <Grid
                        container
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 2,
                            border: `1px solid ${theme.palette.divider}`,
                        }}
                    >
                        {hotelData.map((hotel) => (
                            <Grid
                                item
                                key={hotel.id}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                sx={{ display: 'flex' }}
                            >
                                <HotelCard
                                    name={hotel.name}
                                    location={hotel.location}
                                    rating={hotel.rating}
                                    price={hotel.price}
                                    image={hotel.image}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Homepage;
