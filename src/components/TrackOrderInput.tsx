import { useId, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router"
export default function TrackOrderInput() {
    const navigate = useNavigate()
    const [value, setValue] = useState("")  // store input value
    const id = useId()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(value) // get the input value here
        navigate(`/track/${value}`)
    }

    return (
        <form onSubmit={handleSubmit} className="*:not-first:mt-2">
            <Label className="font-bold text-blue-600" htmlFor={id}>Track Your Order</Label>
            <div className="flex gap-2">
                <Input
                    id={id}
                    className="flex-1 md:w-[400px]"
                    placeholder="Tracking ID"
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button variant="outline" type="submit">Track</Button>
            </div>
        </form>
    )
}
