import Dropbox from "../Components/dropbox";
import DraggableItem from "../Components/draggableItem";

function HentRapport() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center ">
        <DraggableItem />
        <Dropbox />
      </div>
    </>
  );
}
export default HentRapport;
