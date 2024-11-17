// src/services/CheckToken.jsx
const CheckToken = (navigate) => {
  const token = localStorage.getItem("token");
  console.log("Token:", token);

  if (!token) {
    navigate("/");
  }
};

export default CheckToken;
