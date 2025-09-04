import Button from "./Button";
import Modal from "./Modal";
function PinModal() {
  return (
    <Modal>
      <div className="w-[100%] h-72 flex-col justify-center align-middle">
        <div className="flex justify-center text-3xl m-3">
          <h2>ENTER YOUR PIN</h2>
        </div>
        <div className="flex justify-center  gap-8 m-3 mt-10">
          <input
            type="password"
            className="bg-slate-100 w-14 h-14 text-center"
            maxLength={1}
          />

          <input
            type="password"
            className="bg-slate-100 w-14 h-14 text-center"
            maxLength={1}
          />

          <input
            type="password"
            className="bg-slate-100 w-14 h-14 text-center"
            maxLength={1}
          />

          <input
            type="password"
            className="bg-slate-100 w-14 h-14 text-center"
            maxLength={1}
          />
        </div>
        <div className="flex justify-center mt-16">
          <Button>CONTINUE</Button>
        </div>
      </div>
    </Modal>
  );
}

export default PinModal;
