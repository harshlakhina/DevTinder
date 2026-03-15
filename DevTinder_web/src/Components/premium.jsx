function Premium() {
  return (
    <div className="flex gap-7 justify-center mt-8">
      <div className="card bg-base-100 w-96 shadow-sm">
     
        <div className="card-body items-center">
          <h2 className="card-title font-bold text-xl">Silver MemberShip</h2>
          <ul className="list">
            <li>Chat With Other People</li>
            <li>100 Connection Requests per day</li>
            <li>Blue Tick</li>
            <li>3 Month</li>
          </ul>
          <div className="card-actions">
            <button className="btn btn-secondary">Buy Silver</button>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 w-96 shadow-sm">
     
        <div className="card-body items-center">
            <h2 className="card-title font-bold text-xl">Gold MemberShip</h2>
          <ul className="list">
            <li>Chat With Other People</li>
            <li>infinite connection requets per/day</li>
            <li>Blue Tick</li>
            <li>6 Month</li>
          </ul>
          <div className="card-actions">
            <button className="btn btn-primary">Buy Gold</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Premium;
