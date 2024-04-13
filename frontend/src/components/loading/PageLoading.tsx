import ReactLoading from "react-loading";

const PageLoading = () => {
  return (
    <section
      data-modal-backdrop="static"
      tabIndex={-1}
      aria-hidden="true"
      className={`fixed left-0 right-0 top-0 z-40 flex h-screen w-screen items-center justify-center`}
    >
      <ReactLoading type="spin" color="#3b82f6" height="auto" width={50} />
    </section>
  );
};

export default PageLoading;
