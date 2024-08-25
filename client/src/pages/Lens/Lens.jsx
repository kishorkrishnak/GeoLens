import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getLens } from "../../api/lens";
import Sidebar from "../../components/Sidebar/Sidebar";
import TileLayerSelector from "../../components/TopActionBar/TileLayerSelector/TileLayerSelector";
import { useMapContext } from "../../contexts/MapContext";
import Map from "./Map/Map";
import TopActionBar from "../../components/TopActionBar/TopActionBar";

const Lens = () => {
  const navigate = useNavigate();
  const { lens, setLens } = useMapContext();
  const { id } = useParams();

  useEffect(() => {
    const fetchLensDetails = async () => {
      try {
        const response = await getLens(id);
        setLens(response.data.data);
      } catch (error) {
        toast.error("Invalid lens");
        navigate("/");
      }
    };

    fetchLensDetails();
  }, [id]);

  return (
    <div className="App">
      {lens && (
        <>
          <TopActionBar />
          <Sidebar />
          <Map />
        </>
      )}
    </div>
  );
};

export default Lens;
