import axios from "axios";
import { useEffect, useState } from "react";
export default function TopUpManager() {
  const [a, setA] = useState("");
  useEffect(() => {
    axios.get("http://chatclone.site/api/1.php/api?question=abc").then((res) => {
      console.log(res.data);
      const a = res.data;
      setA(a)
    });
  }, [a]);
  return <div>{a}</div>;
}
