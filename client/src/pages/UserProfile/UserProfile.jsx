import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Button, IconButton } from "@mui/material";
import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import HtmlInput from "../../components/HtmlInput";
import Navbar from "../../components/Navbar/Navbar";
import useAuthContext from "../../contexts/AuthContext/useAuthContext";
import "./UserProfile.css";

function UserProfile() {
  const [editProfile, setEditProfile] = useState(false);
  const { user, logoutUser, setUser } = useAuthContext();

  const [studentName, setStudentName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  return (
    <>
      <Navbar />

      <div className="userProfile">
        <div className="userProfileContainer">
          <img src={user?.image} alt="profile" />

          <div className="userProfileContainer__Details">
            <div className="userProfileContainer__DetailsHeading">
              <IconButton onClick={() => setEditProfile((ele) => !ele)}>
                {editProfile ? <CloseRoundedIcon /> : <EditRoundedIcon />}
              </IconButton>
              <Button
                sx={{
                  color: "white",
                }}
                type="button"
                variant="contained"
                color="warning"
              >
                Logout
              </Button>
            </div>
            <div className="userProfileContainer__DetailsRow">
              <p>Full Name</p>
              {editProfile ? (
                <HtmlInput
                  placeholder="studentName"
                  name="studentName"
                  id="studentName"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              ) : (
                <h2>{user?.name}</h2>
              )}
            </div>
            <div className="userProfileContainer__DetailsRow">
              <p>Email</p>
              {editProfile ? (
                <HtmlInput
                  placeholder="email"
                  name="email"
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <h2>{user?.email}</h2>
              )}
            </div>

            <div className="userProfileContainer__DetailsRow">
              <p>Date Joined</p>
              <h2>{user?.dateJoined}</h2>
            </div>
          </div>

          {editProfile && (
            <Button
              sx={{
                color: "white",
              }}
              type="button"
              variant="contained"
              color="success"
            >
              Save
            </Button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;
