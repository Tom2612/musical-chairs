import { useEffect, useState } from "react"
import { IConcert } from "../../../backend/src/models/concert.model"
import { api } from "../utils/api"

export default function Chairs() {
    const [concerts, setConcerts] = useState<IConcert[]>([]);
    
    const fetchData = async () => {
        api<IConcert[]>('concerts').then((res) => {
            setConcerts(res.data ?? [])
        })
    }

    useEffect(() => {
        fetchData();
    },[]);

    return (
        <div>Chairs</div>
    )
}
