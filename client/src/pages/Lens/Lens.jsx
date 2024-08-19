import { useNavigate, useParams } from "react-router-dom";
import Map from "./Map/Map";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { getLens } from "../../api/lens";
import toast from "react-hot-toast";
import { useMapContext } from "../../contexts/MapContext";

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
          <Sidebar />
          <Map />
        </>
      )}
    </div>
  );
};

export default Lens;
