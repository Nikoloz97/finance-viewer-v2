import { fetchInvestments } from "../lib/data";
import { Investment } from "../lib/definitions";

export default async function Investments() {
  const investments = await fetchInvestments(); // Fetch data inside the component

  return (
    <div>
      {investments &&
        investments.length &&
        investments.map((investment: Investment) => investment.brokerageName)}
    </div>
  );
}
