function Hero() {
  return (
    <div className="relative bg-[url('/hero.jpg')] bg-cover bg-no-repeat bg-center h-96">
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold text-center">
          Your favorite meals in your hands
        </h1>
      </div>
    </div>
  );
}

export default Hero;
