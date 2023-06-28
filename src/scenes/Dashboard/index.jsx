import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import MapComponent from "../../components/Map";


function Dashboard() {
    const startPoint = { lat: 51.505, lng: -0.09 }; 
    const endPoint = { lat: 51.51, lng: -0.1 }; 
    return (
        <Box>
            <MapComponent startPoint={startPoint} endPoint={endPoint} />
        </Box>
      );
}

export default Dashboard;