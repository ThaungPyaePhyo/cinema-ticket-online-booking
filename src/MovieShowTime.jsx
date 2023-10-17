import { useParams } from "react-router-dom"
import NavBar from "./NavBar";
import Data from "./data.json"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MovieShowTime() {

    const data = Data
    const movieShowDate = data.Tbl_MovieShowDate
    const cinema = data.Tbl_CinemaList
    const room = data.Tbl_CinemaRoom
    const showTime = data.Tbl_MovieSchedule
    const { movieId, selectedCinema, selectedRoom } = useParams();
    const navigate = useNavigate();
    const roomArray = selectedRoom.split(',').map(Number);
    const filterMovieShowDate = movieShowDate.filter(movie => {
        return (
            movie.MovieId == movieId &&
            movie.CinemaId == selectedCinema &&
            roomArray.includes(movie.RoomId)
        )
    })
    console.log(filterMovieShowDate)
    const filterCinema = cinema.filter(item => item.CinemaId == selectedCinema)
    const goBack = () => {
        navigate(-1)
    }
    const proceedHandler = (roomId,showId,movieId,selectedCinema) => {
        navigate(`/seat/${roomId}/${showId}/${movieId}/${selectedCinema}`)
    }
    const [selectValue,setSelectValue] = useState('default');
    const selectHandler = (showId) => {
        setSelectValue(showId);
    }
    console.log(selectValue)
    return (
        <div>
            <NavBar />
            <div className="container-2xl mx-8">
                <div className="flex justify-between">
                    <button className="rounded-2xl bg-blue-900 text-white p-3 mt-10" onClick={goBack}>Go Back</button>
                </div>
                <div className="my-10 font-bold text-3xl">
                    <h1>{filterCinema[0].CinemaName}</h1>
                </div>
                <div className="grid grid-cols-4 gap-10">
                    {
                        filterMovieShowDate.map((filterMovie, key) => {
                            const roomInfo = room.find(roomData => roomData.RoomId == filterMovie.RoomId);
                            const showDateName = showTime.find(item => item.ShowDateId == filterMovie.ShowDateId)
                            const showDate = new Date(showDateName.ShowDateTime)
                            const dateOptions = { year: "numeric", month: "long", day: "numeric" };
                            const displayShowDate = showDate ? showDate.toLocaleDateString(undefined, dateOptions) : "N/A"
                            return (
                                <div className="overflow-x-auto shadow-2xl p-10 my-6" key={key}>
                                    <div className="">
                                        <h1 className="font-bold text-2xl text-purple-500 py-2">{roomInfo.RoomName}</h1>
                                        <h1 className="font-bold text-lg py-2">Movie Show Time</h1>
                                        <h1 className="py-2">Show Date - {displayShowDate}</h1>
                                        <select name="" id=""  defaultValue={'default'} className="bg-gray-50 border p-2 my-3 border-gray-500 text-gray-900 w-full"
                                        onChange={(event) => selectHandler(event.target.value)}>
                                                    <option value="default" disabled>Choose an option</option>

                                            {
                                                showTime.filter(item => item.ShowDateId == filterMovie.ShowDateId).map((filterItem, showTimeKey) => {
                                                    const showDateTimeString = filterItem.ShowDateTime
                                                    const showDateTime = new Date(showDateTimeString);
                                                    const hour = showDateTime.getHours()
                                                    const min = showDateTime.getMinutes()
                                                    const sec = showDateTime.getSeconds()
                                                    const period = hour < 12 ? "AM" : "PM"
                                                    const displayHour = hour % 12 || 12
                                                    return (
                                                        <option key={showTimeKey} value={filterItem.ShowId} placeholder="Select Time">
                                                            {`${displayHour}:${min} ${period}`}
                                                        </option>
                                                    )
                                                }
                                                )
                                            }
                                        </select>
                                        <button className="rounded-lg bg-blue-900 text-white p-2 mt-2" onClick={() => proceedHandler(roomInfo.RoomId,selectValue,movieId,selectedCinema)}>
                                            Proceed
                                        </button>
                                    </div>
                                </div>
                            )

                        })
                    }

                </div>
            </div>
        </div>
    )
}