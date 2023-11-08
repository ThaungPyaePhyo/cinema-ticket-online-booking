import NavBar from "./NavBar";
import { useParams} from "react-router-dom";
import Data from './data.json'
import { useNavigate } from "react-router-dom";

export default function Map() {
    const param = useParams();
    const data = Data.Tbl_CinemaList
    const selectedData = data.filter(item => item.CinemaId === parseInt(param.id))
    const location = selectedData[0].CinemaLocation
    const [latitude, longitude] = location.split(',').map(parseFloat);
    const navigate = useNavigate();

    const backHandler = () => {
        navigate(-1)
    }


    const mapURL = `https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`;


    return (
        <div>
            <NavBar/>
            <button className="rounded bg-blue-900 text-white p-3 mt-4 mx-20" onClick={() => backHandler()}>Go Back</button>
            <div className="container-2xl mx-20 my-14">
            <iframe src={mapURL}  height="650" className="w-full"
             loading="lazy" 
             ></iframe>
            </div>
        </div>
    )
}