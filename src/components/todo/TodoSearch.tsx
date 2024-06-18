export default function TodoSearch() {
  return (
    <div className='mt-2'>
      <div className='join m-2'>
        <div>
          <div>
            <input
              className='input input-bordered join-item'
              placeholder='Search'
            />
          </div>
        </div>
        <select className='select select-bordered join-item'>
          <option disabled>Filter</option>
          <option>Active</option>
          <option>Finished</option>
          <option>All</option>
        </select>
        <div className='indicator'>
          <button className='btn join-item'>Search</button>
        </div>
      </div>
    </div>
  );
}
