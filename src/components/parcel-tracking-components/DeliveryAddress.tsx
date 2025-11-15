import { Card, CardContent, CardHeader } from '../ui/card'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DeliveryAddress({ receiver }: any) {
    return (
        <>
            {/* ───── Delivery address ───── */}
            <Card>
                <CardHeader>
                    <h3 className="font-semibold">Delivery Address</h3>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1 text-sm">
                        <p className="font-medium">{receiver.name}</p>
                        <p className="text-muted-foreground">{receiver.address}</p>
                        <p className="text-muted-foreground">{receiver.phone}</p>
                        <p className="text-muted-foreground">{receiver.email}</p>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
