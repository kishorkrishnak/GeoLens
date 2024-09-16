import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Box, Button, Container, IconButton, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { logoutUser } from "../../api/auth";
import { fetchUserProfile, updateUser } from "../../api/user";
import Footer from "../../components/Footer/Footer";
import HtmlInput from "../../components/HtmlInput";
import Navbar from "../../components/Navbar/Navbar";
import { useAuthContext } from "../../contexts/AuthContext";
import { formatTimestamp } from "../../utils";
import "./UserProfile.css";

const UserProfile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const { user, setUser, loading, setLoading } = useAuthContext();
  const { id } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        if (user?._id === id) {
          setProfileUser(user);
          setUserName(user.name);
        } else {
          const response = await fetchUserProfile(id);
          if (response.data.status === "success") {
            setProfileUser(response.data.data);
            setUserName(response.data.data.name);
          } else {
            toast.error("Failed to fetch user profile");
          }
        }
      } catch (error) {
        toast.error("Error loading user profile");
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [id, user]);

  const handleLogout = async () => {
    const response = await logoutUser();
    if (response.data.status === "success") {
      setUser(null);
      window.location.reload();
      toast.success("Successfully logged out");
    } else {
      toast.error("Error while logging out");
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await updateUser({
        name: userName,
      });
      if (response.data.status === "success") {
        setUser({
          ...user,
          name: userName,
        });
        setProfileUser({
          ...profileUser,
          name: userName,
        });
        toast.success("Profile updated successfully");
      } else throw new Error();
    } catch (error) {
      toast.error("Error while updating profile");
    } finally {
      setEditProfile(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        component={"main"}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "100%",
            padding: "2rem 0",
          }}
          component={Paper}
          maxWidth="md"
          elevation={2}
          className="userProfileContainer"
        >
          <img
            style={{
              height: "150px",
              borderRadius: 100000,
            }}
            src={profileUser?.image}
            alt="profile"
          />

          <div className="userProfileContainer__Details">
            {user?._id === id && (
              <div className="userProfileContainer__DetailsHeading">
                <IconButton onClick={() => setEditProfile((ele) => !ele)}>
                  {editProfile ? <CloseRoundedIcon /> : <EditRoundedIcon />}
                </IconButton>

                <Button
                  onClick={handleLogout}
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
            )}
            <div className="userProfileContainer__DetailsRow">
              <p>Full Name</p>
              {editProfile && user?._id === id ? (
                <HtmlInput
                  placeholder="studentName"
                  name="studentName"
                  id="studentName"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              ) : (
                <h2>{profileUser?.name}</h2>
              )}
            </div>
            <div className="userProfileContainer__DetailsRow">
              <p>Email</p>
              <h2>{profileUser?.email}</h2>
            </div>
            <div className="userProfileContainer__DetailsRow">
              <p>Lenses Created</p>
              <h2>{profileUser?.lensesCreated?.length || 0}</h2>
            </div>
            <div className="userProfileContainer__DetailsRow">
              <p>Date Joined</p>
              <h2>{formatTimestamp(profileUser?.dateJoined)}</h2>
            </div>
          </div>

          {editProfile && user?._id === id && (
            <Button
              onClick={handleUpdateUser}
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
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default UserProfile;
