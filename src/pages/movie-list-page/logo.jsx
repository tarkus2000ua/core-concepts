import { useNavigate, useSearchParams } from "react-router-dom";

const Logo = () => {
const [searchParams] = useSearchParams();
const navigate = useNavigate();
  return <div className="logo" onClick={() => navigate({ pathname: '/', search: searchParams.toString() })}>
    <span>
      <b>netflix</b>
    </span>
    <span>roulette</span>
  </div>
};

export default Logo;
