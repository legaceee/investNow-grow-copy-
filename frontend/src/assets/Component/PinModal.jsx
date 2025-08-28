import Modal from "./Modal";
function PinModal() {
  return (
    <Modal>
      <div className="flex justify-center text-3xl m-3">
        <h2>ENTER YOUR PIN</h2>
      </div>
      <div className="flex justify-center gap-8 m-3">
        <input type="password" className="bg-slate-100 w-14 h-14" />

        <input type="password" className="bg-slate-100 w-14 h-14" />

        <input type="password" className="bg-slate-100 w-14 h-14" />

        <input type="password" className="bg-slate-100 w-14 h-14" />
      </div>
    </Modal>
  );
}

export default PinModal;
