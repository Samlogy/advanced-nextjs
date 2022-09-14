import { useAmp } from "next/amp";
import Image from "next/image";

// amp page configuration
export const config = { amp: "hybrid" };

const About = ({ users }: { users: any }) => {
  const isAmp = useAmp();

  return (
    <div>
      <h2>AMP About Page</h2>
      {isAmp ? (
        <amp-img
          width="300"
          height="300"
          src="/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
          alt="a cool image"
          layout="responsive"
        />
      ) : (
        <Image
          width="300"
          height="300"
          src="/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
          alt="a cool image"
        />
      )}

      {users &&
        users.map((user: any, idx: number) => (
          <div
            key={idx}
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: ".75em",
              padding: ".5em",
              backgroundColor: "lightgray",
              width: "15em",
              borderRadius: "1em",
            }}
          >
            <span> {user.name} </span>
            <span> {user.email} </span>
            <span> {user.username} </span>
            <span> {user.phone} </span>
            <span> {user.website} </span>
          </div>
        ))}
    </div>
  );
};

export default About;

// ISR
export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  return {
    props: {
      users,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  };
}
