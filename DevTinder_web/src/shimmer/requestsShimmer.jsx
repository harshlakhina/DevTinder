import { Link } from "react-router-dom";

function RequestsShimmer() {
  return (
    <div className="flex justify-center bg-gradient-to-r from-[#145B32] via-[#459B8E] to-[#8BD3E7] min-h-[90vh] py-5">
      <div className="w-1/2 ">
        <ul className="list flex flex-col gap-5">
          <h1 className="text-center text-2xl font-bold text-white">
            Connections Requests
          </h1>

          <li className="bg-white/20 rounded-xl backdrop-blur-2xl border border-white/15 shadow-[0_0_30px_rgba(255,255,255,0.08)] flex justify-between p-3">
            <div className="h-10 w-12 bg-white/20 rounded-[8px]"></div>
            <div className="flex gap-3 ">
              <div className="h-10 w-14 bg-white/20 rounded-[8px]"></div>
              <div className="bg-white/20 h-10 w-14 rounded-[8px]"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default RequestsShimmer;
