import { Position, Toaster } from "@blueprintjs/core";

/** Singleton toaster instance. Create separate instances for different options. */
export default Toaster.create({
  className: "toaster",
  position: Position.BOTTOM_LEFT
});
