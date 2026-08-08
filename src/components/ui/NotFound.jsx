export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden px-6">
      <div className="absolute w-[600px] h-[600px] bg-purple-100 rounded-full blur-3xl opacity-40 top-[-200px] right-[-200px]" />
      <div className="absolute w-[500px] h-[500px] bg-indigo-100 rounded-full blur-3xl opacity-40 bottom-[-200px] left-[-200px]" />

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center z-10">
        <div>
          <h1 className="text-[90px] md:text-[120px] font-bold text-purple-500 leading-none">
            404
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-2">
            Oops! Page Not Found
          </h2>

          <p className="text-gray-500 mt-3 max-w-md">
            The page you’re looking for doesn’t exist or has been moved.
          </p>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-6 py-3 bg-purple-600 text-white rounded-full hover:scale-105 transition"
            >
              Back to Top
            </button>

            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 border text-black border-gray-300 rounded-full hover:bg-gray-100 transition"
            >
              Go Back
            </button>
          </div>
        </div>

        <div className="flex justify-center relative">
          <img
            src="/astronaut-404.png"
            alt="404 illustration"
            className="w-[320px] md:w-[420px] drop-shadow-xl animate-float"
          />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
