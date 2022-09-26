import Liberation from "../components/timer";

export default function Timer() {

    const data = { users: [] }
    // Create 1000 users
    for (let i = 0; i < 1 ; i++) {
      data.users.push({ id: i, name: `user${i}` })
    }
    console.log(data)
return (
    <Liberation />
)
}