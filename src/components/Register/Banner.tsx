import registerBanner from "./assests/registerBanner.jpg";

function Banner(): JSX.Element {
  return (
    <img
      src={registerBanner}
      alt="Banner Cadastre-se"
      style={{ height: "500px" }}
    />
  );
}

export default Banner;
