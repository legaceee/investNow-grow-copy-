import Button from "./Button";
import Modal from "./Modal";
function PinModal() {
  return (
    <Modal>
      <div className="w-full min-h-72 flex-col justify-center align-middle p-4">
        <div className="flex justify-center text-3xl m-3">
          <h2>ENTER YOUR PIN</h2>
        </div>
        <div className="flex justify-center gap-3 sm:gap-8 m-3 mt-10 flex-wrap">
          <input
            type="password"
            className="bg-slate-100 w-10 h-10 sm:w-14 sm:h-14 text-center"
            maxLength={1}
          />

          <input
            type="password"
            className="bg-slate-100 w-10 h-10 sm:w-14 sm:h-14 text-center"
            maxLength={1}
          />

          <input
            type="password"
            className="bg-slate-100 w-10 h-10 sm:w-14 sm:h-14 text-center"
            maxLength={1}
          />

          <input
            type="password"
            className="bg-slate-100 w-10 h-10 sm:w-14 sm:h-14 text-center"
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
