const UPLOAD_PRESET = "azwalt-chat";
const CLOUD_NAME = "dx1plneez";
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

const uploadToCloudinary = async (pics) => {
  const data = new FormData();
  data.append("file", pics);
  data.append("upload_preset", UPLOAD_PRESET);
  data.append("cloud_name", CLOUD_NAME);
  return await fetch(UPLOAD_URL, {
    method: "post",
    body: data,
  });
};

export const uploadProfileImage = ({
  pics,
  setIsLoading,
  setTempPicture,
  dispatch,
  updateUser,
  auth,
}) => {
  setIsLoading(true);

  try {
    uploadToCloudinary(pics)
      .then((res) => res.json())
      .then((data) => {
        setTempPicture(data.url.toString());
        const reqData = {
          id: auth.user.id,
          data: { profilePicture: data.url.toString() },
        };
        dispatch(updateUser(reqData));
        setIsLoading(false);
      });
  } catch (error) {
    console.error("Error occured while uploading profile image", error);
  }
};

export const updateGroupImage = ({
  pics,
  setIsImageUploading,
  setGroupImage,
}) => {
  setIsImageUploading(true);
  try {
    uploadToCloudinary(pics)
      .then((res) => res.json())
      .then((data) => {
        setGroupImage(data.url.toString());
        setIsImageUploading(false);
      });
  } catch (error) {
    console.error("Error occured while uploading group image", error);
  }
};
