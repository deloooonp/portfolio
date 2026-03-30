import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import { Dock, Home, Navbar, Welcome } from "@/components";
import { Contact, Image, Text } from "@/components/overlays";
import {
  Finder,
  Photos,
  Resume,
  Safari,
  Terminal,
} from "@/windows";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <div>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Photos />

      <Home />
    </div>
  );
};

export default App;
