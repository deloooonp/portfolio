import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import { Dock, Home, Navbar, Welcome } from "@/components";
import { Contact, Finder, Image, Photos, Resume, Terminal, Text } from "@/apps";

import { Analytics } from "@vercel/analytics/react";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <div>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Photos />

      <Home />

      <Analytics />
    </div>
  );
};

export default App;
