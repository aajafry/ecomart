import { jwtDecode } from "jwt-decode";
import { useUser } from "../../hooks/useUser";
import { useVisibility } from "../../hooks/useVisibility";
import Modal from "../../molecules/Modal";
import UserInfo from "../../molecules/UserInfo";
import EditProfileForm from "../../organisms/EditProfileForm";

const USER_URL = import.meta.env.VITE_EMPLOYEE;


function ShopUserProfile() {
  const decoded = jwtDecode(localStorage.getItem("token"));
  const userId = decoded?.id;
  const shopUserUrl = `${USER_URL}/${userId}`;

  const { 
    visibility, 
    openVisibility, 
    closeVisibility 
  } = useVisibility();

  const { user, handleUpdateUser } = useUser(shopUserUrl);
  
  return (
    <>
      <Modal
        label="Edit Profile"
        isOpen={visibility.EDIT}
        onClose={() => closeVisibility("EDIT")}
      >
        <EditProfileForm
          onClose={() => closeVisibility("EDIT")}
          userUrl={USER_URL}
          userId={userId}
          onUpdateUser={handleUpdateUser}
        />
      </Modal>

      <UserInfo 
        user={user} 
        onEvent={() => openVisibility("EDIT")} 
      />
    </>
  );
}

export default ShopUserProfile;
