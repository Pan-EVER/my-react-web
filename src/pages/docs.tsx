import { Button } from "antd";
import axios from "axios";

const DocsPage = () => {
  const fetchapi = ()=>{
    axios({url:'/api/user-info?test=umi'})
  }
  return (
    <div>
      <p>This is umi docs.</p>
      <Button onClick={fetchapi}>请求</Button>
    </div>
  );
};

export default DocsPage;
