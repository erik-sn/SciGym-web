import { Position, Toaster } from "@blueprintjs/core";
import { debounce } from "lodash";

// not used anymore -- replace?
/** Singleton toaster instance. Create separate instances for different options. */
const toaster = Toaster.create({
  className: "toaster",
  position: Position.BOTTOM_LEFT
});

// make sure we don't show too many at once
toaster.show = debounce(toaster.show, 250);

export default toaster;
