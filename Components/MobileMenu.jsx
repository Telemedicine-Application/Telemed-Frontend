export default function MobileMenu({ onClose }) {
  return (
    <div className="md:hidden bg-white border-t">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {["home", "about", "features", "contact"].map((item) => (
          <a
            key={item}
            href={`#${item}`}
            onClick={onClose}
            className="block px-3 py-2 text-primary font-medium"
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </a>
        ))}
      </div>
    </div>
  );
}
