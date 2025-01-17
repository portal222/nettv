import React from "react";
import { useNavigate } from "react-router-dom";

const GuestCaracter = (props) => {

    const navigate = useNavigate();

    const clickPerson = (actorId) => {
        const LinkTo = `/actorDetails/${actorId}`;
        navigate(LinkTo);
    }

    return (
        <>
            <table className="showActor">
                <tbody>
                    <tr>
                        <td colSpan={5}>
                            <div className="imgCastMain">
                                <table>
                                    <tbody>
                                        <tr >
                                            {props.embedded.map((person) => (
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
                </tbody>
            </table>
        </>
    )
}
export default GuestCaracter;