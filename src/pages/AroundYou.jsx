import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Error, Loader, SongCard } from '../components';
import { useGetSongsbyCountryQuery } from '../redux/services/ShazamCore';

const AroundYou = () => {
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(true);
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetSongsbyCountryQuery(country)

    useEffect(() => {
        axios.get('https://geo.ipify.org/api/v2/country?apiKey=at_OA6dy0xbWq2XirFq0hwE9pPfWQB3G')
        .then((res) => setCountry(res?.data?.location?.country))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
    }, [country]);

    if (isFetching && loading) {
        return <Loader title='Loading songs around you' />
    }

    if (error && country !== '') {
        return <Error />
    }
    

    return (
        <div className='flex flex-col'>
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Around You <span className='font-black'>{country}</span></h2>
            <div className="flex flex-wrap sm:justify-start justify-center gap-4">
                {data?.map((song, i) => (
                    <SongCard 
                        key={song.key}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                        i={i}
                    />
                ))}
            </div>
        </div>
    );
};


export default AroundYou;
