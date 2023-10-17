import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import Data from './data.json'

export default function Voucher() {
    const navigate = useNavigate();
    const { roomId, showId, movieId, selectedCinema, seatId } = useParams();

    const seatDecodedArray = JSON.parse(decodeURIComponent(seatId));

    const goBackHandler = () => {
        navigate(-1)
    }
    const data = Data;
    const movie = data.Tbl_MovieList;
    const cinema = data.Tbl_CinemaList
    const room = data.Tbl_CinemaRoom
    const showDate = data.Tbl_MovieSchedule
    const seat = data.Tbl_RoomSeat
    const seatPrice = data.Tbl_SeatPrice
    const filterMovie = movie.filter(item => item.MovieId == movieId);
    const filterCinema = cinema.filter(item => item.CinemaId == selectedCinema)
    const filterRoom = room.filter(item => item.RoomId == roomId)
    const filterShowDate = showDate.filter(item => item.ShowId == showId)
    const date = new Date(filterShowDate[0].ShowDateTime);

    const options = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    };

    const formattedDate = date.toLocaleDateString(undefined, options);
    const filterSeatPrice = seatPrice.filter(item => item.RoomId == roomId)
    const filterSeat = seat.filter(item => seatDecodedArray.includes(item.SeatId))
    const mergedData = filterSeat.map(item => {
        const seatPriceItem = filterSeatPrice.find(seatPriceItem => seatPriceItem.RowName === item.RowName)
        return {
            ...item,
            SeatPrice: seatPriceItem ? seatPriceItem.SeatPrice : null,
        }
    })

    return (
        <div>
            <NavBar />
            <div className="container-2xl mx-8">
                <div className="flex justify-between">
                    <button className="rounded-lg bg-blue-900 text-white p-3 mt-10" onClick={() => goBackHandler()}>Go Back</button>
                </div>
                <div className="grid grid-cols-4 gap-5 my-10">
                    {
                        mergedData.map((item, key) => (
                            <div className="flex justify-star shadow-md shadow-orange-300" key={key}>

                                <div className="mx-6 my-8 leading-8" >
                                    <h1 className="text-2xl font-bold">Voucher</h1>
                                    <h1>{item.RowName}{item.SeatNo}</h1>
                                    <h1>{item.SeatPrice}Kyats</h1>
                                    <h1>{filterRoom[0].RoomName}</h1>
                                    <h1>{formattedDate}</h1>
                                    <h1>{filterMovie[0].MovieTitle}</h1>
                                    <h1>{filterCinema[0].CinemaName}</h1>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    )
}