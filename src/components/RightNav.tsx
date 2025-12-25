const navItems: string[] = ["HOME", "WORK", "ABOUT", "CONTACT"];

export default function RightNav() {
  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50">
      <ul className="flex flex-col gap-6 text-sm tracking-widest">
        {navItems.map((item) => (
          <li
            key={item}
            className="text-gray-400 hover:text-accent cursor-pointer transition"
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
}
