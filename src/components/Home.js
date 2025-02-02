import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import BackToTop from "./BackToTop";
import Loader from "./Loader"

const Home = () => {

    const [error, setError] = useState(null);
    const [vreme, setVreme] = useState([]);
    const [serije, setSerije] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        getTv();
    }, [])

    const getTv = async () => {

        const mestoDatuma = vreme

        const urlTv = `https://api.tvmaze.com/schedule/web?date=${mestoDatuma}`;

        try {
            const responseTv = await axios.get(urlTv);

            const dataTv = responseTv.data
            setSerije(dataTv);
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    };

    const clickShow = (showId) => {
        const LinkTo = `/showDetails/${showId}`;
        navigate(LinkTo);
    }

    if (isLoading) {
        return <Loader />
    }
    return (
        <>
            <div className="gridTv">
                {serije.map((serija) => (
                    <>
                        <div key={serija._embedded.show.id}
                            className="gridItem">
                            <img src={serija._embedded.show.image?.medium} alt="no picture"
                                onClick={() => clickShow(serija._embedded.show.id)}
                            />
                            <p className="showName"
                                onClick={() => clickShow(serija._embedded.show.id)}>
                                {serija._embedded.show.name}</p>
                            <p className="genresTv">S{serija.season}  E{serija.number}</p>
                            <p className="genresTv">{serija._embedded.show.language + " " + serija._embedded.show.type}</p>

                            <ul className="genresTv">
                                <li>{serija._embedded.show.genres?.[0]}</li>
                                <li>{serija._embedded.show.genres?.[1]}</li>
                            </ul>
                            <ul className="genresTv">
                                <li>{serija._embedded.show.genres?.[2]}</li>
                                <li>{serija._embedded.show.genres?.[3]}</li>
                            </ul>

                        </div>
                    </>
                ))}
            </div>
            <BackToTop />
        </>
    )

}
export default Home;