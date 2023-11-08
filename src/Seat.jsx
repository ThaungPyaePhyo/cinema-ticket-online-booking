import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import Data from './data.json'
import { useParams } from "react-router-dom";
import { useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Seat() {
    const navigate = useNavigate();
    const data = Data
    const seat = data.Tbl_RoomSeat
    const seatPrice = data.Tbl_SeatPrice
    const goBackHandler = () => {
        navigate(-1)
    }
    const { roomId,showId,movieId,selectedCinema } = useParams();
    
    const singleFilteredSeats = seat.filter(item => item.RoomId == roomId &&
        item.SeatType == 'single')

    const CoupleFilteredSeats = seat.filter(item => item.RoomId == roomId && item.SeatNo != null &&
        item.SeatType == 'couple')

    const groupedData = singleFilteredSeats.reduce((result, item) => {
        if (!result[item.RowName]) {
            result[item.RowName] = [];
        }
        result[item.RowName].push(item);
        return result;
    }, {});

    let firstNullIndex = -1;
    let secondNullIndex = -1;

    for (const rowName in groupedData) {
        const row = groupedData[rowName];
        for (let i = 0; i < row.length; i++) {
            const item = row[i];
            if (item.SeatNo === null) {
                if (firstNullIndex === -1) {
                    firstNullIndex = i;
                } else {
                    secondNullIndex = i;
                    break;
                }
            }
        }
        if (firstNullIndex !== -1 && secondNullIndex !== -1) {
            break;
        }
    }

    const firstColumn = [];
    const secondColumn = [];
    const thirdColumn = [];

    for (const rowName in groupedData) {
        const row = groupedData[rowName];
        if (firstNullIndex >= 4 && secondNullIndex >= (firstNullIndex + 4)) {
            firstColumn.push(...row.slice(firstNullIndex - 4, firstNullIndex));
            secondColumn.push(...row.slice(firstNullIndex + 1, secondNullIndex));
            thirdColumn.push(...row.slice(secondNullIndex + 1, secondNullIndex + 5));
        }
    }

    const [selectedSeat, setSelectedSeat] = useState([])

    const seatHandler = (seatId) => {

        if (selectedSeat.includes(seatId)) {
            setSelectedSeat(selectedSeat.filter(id => id != seatId))
        } else {
            setSelectedSeat([...selectedSeat, seatId])
        }
    }
    const [table, setTable] = useState(null); // State to hold the generated table

    const filterSeatPrice = seatPrice.filter(item => item.RoomId == roomId)
    const checkedHandler = () => {
        const costSeats = seat.filter(item => selectedSeat.includes(item.SeatId))
        const mergedData = costSeats.map(costSeat => {
            const seatPriceItem = filterSeatPrice.find(item => item.RowName === costSeat.RowName);
            return {
                ...costSeat,
                SeatPrice: seatPriceItem ? seatPriceItem.SeatPrice : null,
            };
        });
        const totalSeatPrice = mergedData.reduce((total, item) => {
            if (typeof item.SeatPrice === 'number') {
                return total + item.SeatPrice;
            }
            return total;
        }, 0)

        const tableRows = mergedData.map((item, index) => (
            <tr key={index}>
                <td className="border">{item.RowName}{item.SeatNo}</td>
                <td className="border">{item.SeatPrice}</td>
                <td className="border text-center text-red-500 cursor-pointer" onClick={() => handleDelete(index)}>
                    <button >Delete&nbsp;<FontAwesomeIcon icon={faTrash}  className="text-red-500"></FontAwesomeIcon></button>
                </td>
            </tr>
        ));

        const totalRow = (
            <tr>
                <td className="border">Total:</td>
                <td className="border">{totalSeatPrice}</td>
                <td className="border"></td>
            </tr>
        );

        const table = (
            <table className="w-1/2 text-sm text-left my-10 mx-10">
                <thead>
                    <tr>
                        <th className="border">Chosen Seats</th>
                        <th className="border">Seat Price</th>
                        <th className="border text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                    {totalRow}
                </tbody>
            </table>
        );
        setTable(table);

    }

    const proceedHandler = (roomId,showId,movieId,selectedCinema,seatId) => {
        const encodedSeatId = encodeURIComponent(JSON.stringify(seatId));
        navigate(`/voucher/${roomId}/${showId}/${movieId}/${selectedCinema}/${encodedSeatId}`)
    }

    return (
        <div>
            <NavBar />
            <div className="container-2xl mx-20">
                <div className="flex justify-between ">
                    <button className="rounded bg-blue-900 text-white p-3 my-10" onClick={() => goBackHandler()}>Go Back</button>
                </div>
                <div className="flex justify-center">
                    <div className="w-screen h-40 bg-black flex items-center justify-center mx-28">
                        <div className="w-3/4 h-3/4 bg-gray-800 relative flex justify-center">
                            <h1 className="text-2xl text-white flex self-center">Movie Screen</h1>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-20 my-4">

                    <div className="grid grid-cols-4 gap-2">
                        {
                            firstColumn.map((item, key) => (
                                <div className="my-4 cursor-pointer" key={key} onClick={() => seatHandler(item.SeatId)}>
                                    <span className={`rounded-lg ${selectedSeat.includes(item.SeatId) ? "bg-blue-900" : "bg-slate-400"}  text-white p-4`}>{item.RowName}{item.SeatNo}</span>
                                </div>
                            ))
                        }
                    </div>
                    <div className="grid grid-cols-10 gap-2">
                        {
                            secondColumn.map((item, key) => (
                                <div className="my-4 cursor-pointer" key={key} onClick={() => seatHandler(item.SeatId)}>
                                    <span className={`rounded-lg ${selectedSeat.includes(item.SeatId) ? "bg-blue-900" : "bg-slate-400"}  text-white p-4`}>{item.RowName}{item.SeatNo}</span>
                                </div>
                            ))
                        }
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {
                            thirdColumn.map((item, key) => (
                                <div className={`my-4 cursor-pointer `} key={key} onClick={() => seatHandler(item.SeatId)}>
                                    <span className={`rounded-lg ${selectedSeat.includes(item.SeatId) ? "bg-blue-900" : "bg-slate-400"}  text-white p-4`}>{item.RowName}{item.SeatNo}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex justify-center self-center">
                    <div className="flex  gap-4">
                        {
                            CoupleFilteredSeats.map((item, key) => (
                                <div className="my-4 cursor-pointer" key={key} onClick={() => seatHandler(item.SeatId)}>
                                    <span className={`rounded-lg ${selectedSeat.includes(item.SeatId) ? "bg-blue-900" : "bg-slate-400"}  text-white p-4`}>{item.RowName}{item.SeatNo}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex justify-center">
                    {table}
                </div>
                <div className="flex justify-end gap-4 mx-28 mb-10">
                <button className="rounded-lg bg-purple-500 text-white p-3 mb-10" onClick={() => checkedHandler()}>Checked</button>
                <button className="rounded-lg bg-blue-900 text-white p-3 mb-10" onClick={() => proceedHandler(roomId,showId,movieId,selectedCinema,selectedSeat)}>Proceed</button>
                </div>
            </div>
        </div>
    )
}