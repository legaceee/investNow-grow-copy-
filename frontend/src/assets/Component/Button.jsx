function Button({ clickManage, children }) {
  return (
    <button
      className="bg-green-500 text-white rounded-md px-2 py-2 ml-4 hover:z-50"
      onClick={() => clickManage((clicked) => !clicked)}
    >
      {children}
    </button>
  );
}

export default Button;
