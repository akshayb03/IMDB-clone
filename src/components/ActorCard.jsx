import { useNavigate } from "react-router-dom";

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
          backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <img
          src={
            actor.image ||
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          }
          className="w-full h-full rounded-full"
        />
      </div>
      <p className="text-center mt-1">{actor.name}</p>
    </div>
  );
};

export default ActorCard;
