import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
  imgFit?: "cover" | "contain";
  imgPosition?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  const Wrapper = props.link ? "a" : "div";

  return (
    <div className="work-image">
      <Wrapper
        className="work-image-in"
        {...(props.link
          ? { href: props.link, target: "_blank", rel: "noopener noreferrer" }
          : {})}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        data-cursor={"disable"}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        <img
          src={props.image}
          alt={props.alt}
          style={{
            objectFit: props.imgFit ?? "cover",
            objectPosition: props.imgPosition ?? "center center",
          }}
        />
        {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
      </Wrapper>
    </div>
  );
};

export default WorkImage;
