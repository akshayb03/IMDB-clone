import { useNavigate } from "react-router-dom";
import { DEFAULT_IMAGE_URL } from "../../utils/constants";

const ActorCard = ({ actor }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-32 cursor-pointer"
      onClick={() => {
        navigate(`/actor/${actor.personality_id}`);
      }}
    >
      <div
        className="w-full h-full rounded-full border-solid border-1"
        style={{
          backgroundImage: `url(${DEFAULT_IMAGE_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <img
          src={actor.image || DEFAULT_IMAGE_URL}
          className="w-full h-full rounded-full"
        />
      </div>
      <p className="text-center mt-1">{actor.name}</p>
    </div>
  );
};

export default ActorCard;
