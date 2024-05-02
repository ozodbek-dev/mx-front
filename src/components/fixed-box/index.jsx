function FixedBox({ children, className = "", rootClassName = "" }) {
  return (
    <div
      className={
        className
          ? className
          : "fixed bottom-0 right-0  h-[56px] flex items-center justify-center bg-[#fff] transition-all " +
            rootClassName
      }
    >
      {children}
    </div>
  );
}

export default FixedBox;
