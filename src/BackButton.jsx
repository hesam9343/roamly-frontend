import { useNavigate } from "react-router-dom";

export default function BackButton({ className = "back-button", children = "Back" }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/explore", { replace: true });
  };

  return (
    <button type="button" className={className} onClick={handleBack}>
      {children}
    </button>
  );
}
