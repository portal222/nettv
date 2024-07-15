import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SezoneList from "./SezoneList";
import BackToTop from "../BackToTop";


const TvShowClickDetails = (props) => {
    const [error, setError] = useState(null);
    const [cast, setCast] = useState([]);
    const [sezons, setSezons] = useState([]);

    const navigate = useNavigate();


const showNumber = props.showId

    useEffect(() => {
        getShow(showNumber);

    }, [showNumber]);

    const getShow = async (showNumber) => {

        const url = `https://api.tvmaze.com/shows/${showNumber}?embed=cast`
        const urlSez = `https://api.tvmaze.com/shows/${showNumber}/seasons`

        try {
            const response = await axios.get(url);
            const responseSez = await axios.get(urlSez);


            const data = response.data;
            const dataSez = responseSez.data.reverse();

            setCast(data._embedded.cast);
            setSezons(dataSez)

        } catch (err) {
            setError(err);
        }
    };


    const clickPerson = (actorId) => {
        const LinkTo = `/actorDetails/${actorId}`;
        navigate(LinkTo);
    }

 



    return (
        <>
         
            <table className="showActor">
                <tbody>
                    <tr>
                        <td colSpan={3}>

                            <div className="imgCastMain">
                                <table>
                                    <tbody>
                                        <tr >
                                            {cast.map((person) => (
                                                <td key={person.character.id}>
                                                    <div className="guest">
                                                        <img className="guestImg"
                                                            src={person.character?.image?.medium} alt="no picture" />
                                                        <img className="guestImgClick"
                                                            src={person.person?.image?.medium} alt="no picture"
                                                            onClick={() => clickPerson(person.person.id)} />
                                                    </div>
                                                    <div className="guestName">
                                                        <p>{person.character?.name}</p>
                                                        <p className="click"
                                                            onClick={() => clickPerson(person.person.id)}>{person.person?.name}</p>
                                                    </div>

                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}><hr></hr></td>
                    </tr>

                </tbody>
            </table>
            <SezoneList sezone={sezons} />
            <BackToTop />
        </>
    )


};
export default TvShowClickDetails;