const data = [
  { name: "Today's guesses", value: 4 },
  { name: "Games won", value: 5 },
  { name: "Current streak", value: 2 },
  { name: "Max streak", value: 3 },
];

export default function Stats() {
  return (
    <div className="m-line-height">
      {/* <h2 className="text-2xl">Statistics</h2> */}
      <table className="text-base table-auto w-1/2">
        <tbody>
          {data.map(({ name, value }) => {
            return (
              <tr key={name} className="h-line-height">
                <td>{name}</td>
                <td>{value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
