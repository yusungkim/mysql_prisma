import { useRouter } from "next/router";
import { useState } from "react";
import Button from "./button";
import Modal from "./modal";

interface LogoutProps {
  onClose: () => void;
}

const Logout = ({ onClose }: LogoutProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    await fetch("/api/users/logout");
    onClose();
    setLoading(false);
    router.replace("/login");
  };

  return (
    <Modal onClose={onClose}>
      <Button onClick={logout} loading={loading} classes="rounded-md px-16 py-5 hover:scale-105 bg-theme-orange text-2xl w-4/5">
        <>Logout</>
      </Button>
    </Modal>
  );
};

export default Logout;
