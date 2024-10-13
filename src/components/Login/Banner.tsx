import loginBanner from "./assets/bannerLogin.jpg";

function Banner(): JSX.Element {
  return (
    <img
      src={loginBanner}
      alt="Banner Login"
      style={{ height: "400px", marginTop: "100px" }}
    />
  );
}

export default Banner;
