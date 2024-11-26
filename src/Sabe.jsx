import forestground from "./assets/forestground.svg";
import backgroundtree from "./assets/backgroundtree.png";
import sabe from "./assets/sabe.svg";

function Sabe() {
  return (
    <div id="sabearea">
      <img src={forestground} id="forestground"></img>
      <img src={backgroundtree} id="backgroundtree"></img>
      <img src={sabe} id="sabe"></img>
    </div>
  );
}
export default Sabe;
