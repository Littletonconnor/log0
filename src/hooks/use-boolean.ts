import * as React from "react";

export function useIsClicked() {
  const [clicked, setClicked] = React.useState(false);

  const setIsClicked = () => setClicked(true);
  const setIsNotClicked = () => setClicked(false);

  return { clicked, setIsClicked, setIsNotClicked };
}
