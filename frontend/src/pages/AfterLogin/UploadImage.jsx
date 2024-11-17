import { Card, CardHeader, CardBody, Image, CardFooter, Button } from "@nextui-org/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfilePicture from "../../assets/ProfilePicture.jpg";
import { toast } from "sonner";

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("profilePicture", selectedImage);

    try {
      const token = localStorage.getItem("token"); // Asumsi token disimpan di localStorage
      const response = await fetch("http://localhost:3000/api/auth/upload-profile-picture", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Gambar berhasil di upload");
        navigate("/mainpage");
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      alert("Error uploading image: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="py-4 border-2 w-[20%] h-[50%]">
        <CardHeader className="pb-0 pt-2 px-4 flex flex-col justify-center items-center ">
          <h5 className="font-medium">Please upload your profile picture</h5>
          <small className="text-default-500">or you can click skip 😊😊</small>
        </CardHeader>
        <CardBody className="overflow-visible py-2 flex justify-center items-center">
          <Image alt="Profile picture" className="object-cover rounded-full" src={previewUrl || ProfilePicture} width={270} height={270} />
        </CardBody>
        <CardFooter className="flex justify-center items-center flex-col gap-5">
          <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" id="profile-picture-input" />
          <Button color="primary" className="font-medium w-[80%]" onClick={() => document.getElementById("profile-picture-input").click()}>
            SELECT IMAGE
          </Button>
          {selectedImage && (
            <Button color="primary" className="font-medium w-[80%]" onClick={handleUpload} disabled={isLoading}>
              {isLoading ? "UPLOADING..." : "UPLOAD IMAGE"}
            </Button>
          )}
          <Link to={"/mainpage"} className="text-sm">
            Click me to skip
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UploadImage;
