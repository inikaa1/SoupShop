import { RingLoader } from "react-spinners";

export default function Spinner({ size = 60 }) {  // Set a default value for size
    return (
        <RingLoader color={"#424E28"} size={size} speedMultiplier={1.5} />
    )
}
