import "../styles/MusicButton.css";
import onIcon from "../assets/volume_on.svg";
import offIcon from "../assets/volume_off.svg";

function MusicButton({ musicOn, onClick })
{
  return (
    <button className="music-button" onClick={onClick}>
      <img src={musicOn ? onIcon : offIcon} id="music-icon" alt="volume icon"></img>
    </button>
  )
}

export default MusicButton;
