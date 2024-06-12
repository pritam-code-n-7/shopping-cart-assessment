export type buttonTypes = {
  type: "submit" | "button" | "reset";
  name: string;
  onClick?: () => void;
  "aria-label":string;
 
};
