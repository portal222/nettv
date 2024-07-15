import React from "react";
import SearchTvShow from "./SearchTvShow.js";
import SearchActors from "./SearchActors.js";

const SearchPlaceTv = () => {

    return (

        <div className="place">
            <div className="placeBut">
                <SearchTvShow placeholder={'Tv Show'} linkTo={'/tvShow'} />
                <SearchActors placeholder={'Tv Actor'} linkTo={'/tvActor'} />
            </div>
        </div>
    )
}
export default SearchPlaceTv;