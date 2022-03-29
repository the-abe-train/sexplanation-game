import Button from "../componenets/Button";
import Switch from "../componenets/Switch";

const data = [
  { name: "Today's guesses", value: 4 },
  { name: "Games won", value: 5 },
  { name: "Current streak", value: 2 },
  { name: "Max streak", value: 3 },
];

// TODO set up localstorage score tracking

export default function Stats() {
  return (
    <main className="mt-line-height mx-3">
      <section className="flex items-start justify-around w-full">
        <div className="flex flex-col justify-center w-fit">
          <table className="text-base table-auto w-full">
            <tbody>
              {data.map(({ name, value }) => {
                return (
                  <tr key={name} className="h-line-height">
                    <td>{name}</td>
                    <td className="text-right">{value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex mt-[20px] items-center">
            <Button
              colour="#FFC8FF"
              size="small"
              inverted={false}
              fn={() => console.log(true)}
            >
              Share score
            </Button>
            <button className="text-left text-sm hover:shadow-none text-red-700">
              Reset
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center w-fit mt-5">
          <Switch />
          <div className="flex mt-4">
            <Button
              colour="#FFC8FF"
              size="small"
              inverted={false}
              fn={() => console.log(true)}
            >
              Practice game
            </Button>
          </div>
        </div>
      </section>
      <section className="mt-24 flex flex-col justify-center space-y-8">
        <p className="text-center">
          Need to brush up on your sex ed? Here’s a good place to start:
        </p>
        <Button
          colour="#FFC8FF"
          size="large"
          inverted={false}
          fn={() => console.log(true)}
        >
          A Sexplanation
        </Button>
      </section>
    </main>
  );
}
