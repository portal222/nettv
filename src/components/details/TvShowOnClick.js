import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ResultsTvTime from "../results/ResultsTvTime";
import TvShowClickDetails from "./TvShowClickDetails";
import EpisodeNumberClick from "./EpisodeNumberClick";
import { useNavigate } from "react-router-dom";


const TvShowOnClick = () => {


    const [show, setShow] = useState([]);


    const navigate = useNavigate();


    const params = useParams()
    const showId = params.showId;



    useEffect(() => {
        getShow();

    }, []);

    console.log("iz tvShowOnClick:", showId);

    const getShow = async () => {

        const url = `https://api.tvmaze.com/singlesearch/shows?q=${showId}`;
    
      

        try {
            const response = await axios.get(url);
            const data = response.data;
            setShow(data);
        

        } catch (err) {
            setError(err);
        }
    };

    const clickImg = (images) => {
        const LinkTo = `/imgShow/${images}`;
        navigate(LinkTo);
    }

    const classFunction = (average) => {
        if (average == null ) {
            return 'average';
        } 
    }

    const classFunction2 = (runtime) => {
        if (runtime == null ) {
            return 'average';
        } 
    }

    const classFunction3 = (ended) => {
        if (ended == null ) {
            return 'average';
        } 
    }

    const classFunction4 = (name) => {
        if (name == undefined ) {
            return 'average';
        } 
    }

    const classFunction5 = (name) => {
        if (name == undefined ) {
            return 'average';
        } 
    }

    


    return (
        <>
            <div className="details">
                <div
                    className="holdImg">
                    <img className="imgShow"
                        src={show.image?.original} />
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={2}
                                className="showName">
                                {show.name}
                            </td>
                        </tr>
                        <tr>
                            <td className="language">
                                {show.type}
                            </td>
                            <td >
                                <ul className="genres">
                                    <li>{show.genres?.[0]}</li>
                                    <li>{show.genres?.[1]}</li>
                                </ul>
                                <ul className="genres">
                                    <li>{show.genres?.[2]}</li>
                                    <li>{show.genres?.[3]}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="language">{show.language}</td>
                            <td className="runtime">
                            <p className={`rating ${classFunction(show.rating?.average)}`}>
                                {"rating " + show.rating?.average + " "}
                                </p>
                                <p className={`rating2 ${classFunction2(show.runtime)}`}>
                                    { " " + " runtime " + show.runtime + " min"}
                                    </p>
                                    </td>
                        </tr>

                        <EpisodeNumberClick showId={show.id} />

                        <tr>
                            <td className="rating3">Premiered:{" " + show.premiered}</td>
                            <td className={`rating3 ${classFunction3(show.ended)}`}>
                                {"Ended: " + show.ended}</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="summary" dangerouslySetInnerHTML={{ __html: show.summary }}>
                            </td>
                        </tr>
                        <tr>
                            <td className={`rating3 ${classFunction4(show.webChannel?.name)}`}>
                                Web Chanel
                                <a href={show.webChannel?.officialSite} target="_blank"
                                className={`rating3 ${classFunction4(show.webChannel?.name)}`}>
                                    {" " + show.webChannel?.name}</a>
                            </td>
                            <td className={`rating3 ${classFunction5(show.network?.name)}`}>
                                official Site
                                <a href={show?.officialSite} target="_blank"
                                className={`rating3 ${classFunction5(show.network?.name)}`}>
                                    {" " + show.network?.name}</a>
                            </td>
                        </tr>
                        <tr>
                            <ResultsTvTime datum={show.updated} />
                            <td className="wrap"
                                onClick={() => clickImg(show.id)}>more picture</td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <TvShowClickDetails showId={show.id}/>
</>
    )


}
export default TvShowOnClick;