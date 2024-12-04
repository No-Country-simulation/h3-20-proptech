function IllustrationContainer({ src, alt }) {
  return (
    <div className="w-full h-full flex justify-center items-center p-0 m-0">
      <img
        src={src}
        alt={alt || "Ilustracion"} 
        className="max-w-[80%] max-h-[80%] object-contain object-center"
      />
    </div>
  );
}

export default IllustrationContainer;


