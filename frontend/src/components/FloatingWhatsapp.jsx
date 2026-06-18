import { FaWhatsapp } from "react-icons/fa";

function FloatingWhatsapp() {
  const whatsappNumber = "6285600829369";

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      className="
        fixed
        bottom-6
        right-6
        z-50
        flex
        items-center
        gap-3
        bg-green-500
        hover:bg-green-600
        text-white
        px-5
        py-4
        rounded-full
        shadow-2xl
        transition-all
        duration-300
        hover:scale-110
        animate-bounce
      "
    >
      <FaWhatsapp className="text-3xl" />

      <span className="font-semibold hidden sm:block">
        Chat Kami
      </span>
    </a>
  );
}

export default FloatingWhatsapp;