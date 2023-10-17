import NavBar from "./NavBar";
import Data from "./data.json"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MoviePage() {
    const data = Data.Tbl_MovieList;
    const navigate = useNavigate()
    const clickHandler = (movieId) => {
            navigate(`/select-cinema-room/${movieId}`)
      
    }
    return (
        <>
            <div>
                <NavBar />
                <div className="mx-40 flex justify-center ...">
                    <div className="grid grid-cols-3 my-10 justify-items-center">
                        {data.map((movie, index) => (
                            <div className="block rounded-lg shadow-lg mx-10 w-3/6 my-4 hover:cursor-pointer" onClick={() => clickHandler(movie.MovieId)} key={index}>
                                    <img className="rounded-t-lg w-full" src={`src/assets/${movie.MoviePhoto}`} height={200} alt=""/>
                                <div className="p-6 m-6">
                                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                        {movie.MovieTitle}
                                    </h5>
                                    <h1><span className="font-bold">Release Date:</span>&nbsp;&nbsp;{movie.ReleaseDate}</h1>
                                    <h1><span className="font-bold">Duration:</span>&nbsp;&nbsp;{movie.Duration}</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}   