import { useParams } from "react-router-dom"
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import Data from './data.json';
import Map from './assets/google-maps.png'
import Heart from './assets/heart.png'
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

export default function SelectCinemaRoom() {
    const movieData = Data.Tbl_MovieList
    const rooms = Data.Tbl_CinemaRoom
    const cinema = Data.Tbl_CinemaList
    const { movieId } = useParams()
    const navigate = useNavigate()
    const movieShowdate = Data.Tbl_MovieShowDate
    const goBack = () => {
        navigate(-1)
    }
    const mapClickHandler = (id) => {
        navigate(`/map/${id}`)
    }

    const [selectedRoom, setSelectedRoom] = useState([]);
    const [selectedCinema, setSelectedCinema] = useState(null);

    const roomClickHandler = (RoomId) => {
        if (selectedRoom.includes(RoomId)) {
            setSelectedRoom(selectedRoom.filter(id => id != RoomId))
        } else {
            setSelectedRoom([...selectedRoom, RoomId])
        }
    }
    const cinemaClickHandler = (cinemaId) => {
        setSelectedCinema(cinemaId)
    }



    const showDate = movieShowdate.filter(item => item.MovieId == movieId)
    const cinemaIds = showDate.map(item => item.CinemaId);
    const filterCinema = cinema.filter(item => cinemaIds.includes(item.CinemaId));
    const roomIds = showDate.map(item => item.RoomId)
    const filterRoom = rooms.filter(item => roomIds.includes(item.RoomId))

    const goToMovieShowTimePage = (movieId, selectedCinema, selectedRoom) => {

        if (selectedRoom.length > 0 && selectedCinema) {
            navigate(`/movie-show-time/${movieId}/${selectedCinema}/${selectedRoom}`)
        } else if (selectedCinema != null && selectedRoom.length == 0) {
            toast.error("Please select a room before proceeding.");
        } else if (selectedCinema == null && selectedRoom.length > 0) {
            toast.error("Please select a cinema before proceeding.");
        } else {
            toast.error("Please select a cinema and room before proceeding.");
        }
    }
    return (
        <div>
            <NavBar />
            <div className="container-2xl mx-8">
                <div className="flex justify-between">
                    <button className="rounded-2xl bg-blue-900 text-white p-3 mt-10" onClick={goBack}>Go Back</button>
                    <button className="rounded-2xl bg-blue-900 text-white p-3 mt-10" onClick={() => goToMovieShowTimePage(movieId, selectedCinema, selectedRoom)}>Go to Movie Showtime</button>
                </div>
                <div className="relative overflow-x-auto shadow-2xl sm:rounded-lg my-6">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 my-10">
                        <tbody>
                            {filterCinema.map((item, index) => {
                                const isCinemaSelected = selectedCinema === item.CinemaId;
                                const isRoomSelected = selectedRoom.includes(item.RoomId);
                                return (
                                    <tr key={index} className={isCinemaSelected && !isRoomSelected ? "bg-red-100" : ""}>
                                        <td className="cursor-pointer" onClick={() => cinemaClickHandler(item.CinemaId)}>
                                            <span className="mx-10 " >
                                                <FontAwesomeIcon icon={faHeart} size="2x" className={`${isCinemaSelected ? "text-blue-900" : ""}`} />
                                            </span>
                                        </td>
                                        <td className="cursor-pointer" onClick={() => cinemaClickHandler(item.CinemaId)}>
                                            <span className="inline-block align-bottom cursor-pointer">{item.CinemaName}</span>
                                        </td>
                                        <td>
                                            <span><button><img src={Map} width={30} onClick={() => mapClickHandler(item.CinemaId)} /></button></span>
                                        </td>
                                        <td className="px-6 py-4 flex justify-start gap-4">
                                            {filterRoom.filter(roomItem => roomItem.CinemaId === item.CinemaId)
                                                .map((room, roomIndex) => (
                                                    <button className={`rounded  p-3 text-white ${selectedRoom.includes(room.RoomId) ? "bg-blue-900" : "bg-slate-400"}`} onClick={() => roomClickHandler(room.RoomId)} key={roomIndex}>{room.RoomName}</button>
                                                ))}
                                        </td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}