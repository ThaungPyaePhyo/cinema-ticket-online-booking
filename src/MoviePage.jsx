import NavBar from "./NavBar";
import Data from "./data.json";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MoviePage() {
    const data = Data.Tbl_MovieList;
    const navigate = useNavigate();

    const clickHandler = (movieId) => {
        navigate(`/select-cinema-room/${movieId}`);
    };

    return (
        <>
            <div>
                <NavBar />
                <div className="mx-72 flex justify-cente">
                    <div className="grid grid-cols-3 my-10 justify-items-center">
                        {data.map((movie, index) => (
                            <div
                                className="block rounded-lg shadow-lg mx-10 my-4 hover:cursor-pointer transform hover:scale-105 hover:transition-transform duration-1000 hover:animate-pulse"
                                onClick={() => clickHandler(movie.MovieId)}
                                key={index}
                            >
                                <img
                                    className="rounded-t-lg w-full h-48 "
                                    src={`src/assets/${movie.MoviePhoto}`}

                                    alt=""
                                />
                                <div className="p-6 m-6">
                                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                        {movie.MovieTitle}
                                    </h5>
                                    <h1>
                                        <span className="font-bold">Release Date:</span>&nbsp;&nbsp;
                                        {movie.ReleaseDate}
                                    </h1>
                                    <h1>
                                        <span className="font-bold">Duration:</span>&nbsp;&nbsp;
                                        {movie.Duration}
                                    </h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
