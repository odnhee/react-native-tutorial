import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
  ShineOverlay,
  Shine,
  Loader,
} from "rn-placeholder";
export default ({ paddingTop, width }) => {
  return (
    <Placeholder
      Animation={ShineOverlay}
      Left={(props) => (
        <PlaceholderMedia style={{ width: width, paddingTop: paddingTop }} />
      )}
    />
  );
};
