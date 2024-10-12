import * as S from "./Box.styles";

type TProps = {
  children: JSX.Element[];
};

function Box({ children }: TProps): JSX.Element {
  return <S.Box>{children}</S.Box>;
}

export default Box;
