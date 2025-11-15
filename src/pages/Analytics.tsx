/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Analytics.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Package, CheckCircle, Truck, Clock, XCircle, RotateCcw } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useParcelAnalyticsQuery } from '@/redux/features/parcel/parcels.api';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function Analytics() {
    const { data, isLoading, isError } = useParcelAnalyticsQuery(undefined);
    const analytics = data?.data;

    // === Loading State ===
    if (isLoading) {
        return <AnalyticsSkeleton />;
    }

    // === Error State ===
    if (isError || !analytics) {
        return (
            <div className="p-6">
                <Card className="border-red-200 bg-red-50">
                    <CardContent className="pt-6">
                        <p className="text-red-700">Failed to load analytics data. Please try again later.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // === Pie Chart Data ===
    const pieData = [
        { name: 'Delivered', value: analytics.delivered },
        { name: 'In Transit', value: analytics.inTransit },
        { name: 'Pending', value: analytics.pending },
        { name: 'Cancelled', value: analytics.cancelled },
        { name: 'Returned', value: analytics.returned },
        { name: 'Rescheduled', value: analytics.rescheduled },
    ].filter(item => item.value > 0);

    // === Bar Chart Data ===
    const monthlyData = analytics.monthly.map((item: { month: any; count: any; }) => ({
        month: item.month,
        count: item.count,
    }));

    return (
        <div className="space-y-6 p-6 bg-gray-600 min-h-screen">
            {/* Page Title */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Parcel Analytics</h1>
                <p className="text-muted-foreground mt-1">Detailed overview of parcel statuses and trends</p>
            </div>

            {/* Overview Cards - 6 Cards in 2 rows on mobile, 3 on lg */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <OverviewCard title="Total Parcels" value={analytics.total} icon={<Package className="h-5 w-5" />} color="text-blue-600" />
                <OverviewCard title="Delivered" value={analytics.delivered} icon={<CheckCircle className="h-5 w-5" />} color="text-green-600" />
                <OverviewCard title="In Transit" value={analytics.inTransit} icon={<Truck className="h-5 w-5" />} color="text-blue-600" />

                <OverviewCard title="Pending" value={analytics.pending} icon={<Clock className="h-5 w-5" />} color="text-amber-600" />
                <OverviewCard title="Cancelled" value={analytics.cancelled} icon={<XCircle className="h-5 w-5" />} color="text-red-600" />
                <OverviewCard title="Returned" value={analytics.returned} icon={<RotateCcw className="h-5 w-5" />} color="text-purple-600" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Delivery Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent as number * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Bar Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Shipments</CardTitle>
                        <p className="text-sm text-muted-foreground">Last 6 months</p>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// === Reusable Card ===
function OverviewCard({
    title,
    value,
    icon,
    color,
}: {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className={`text-2xl font-bold ${color}`}>{value}</div>
                <p className="text-xs text-muted-foreground">Current count</p>
            </CardContent>
        </Card>
    );
}

// === Skeleton ===
function AnalyticsSkeleton() {
    return (
        <div className="space-y-6 p-6">
            <Skeleton className="h-10 w-64" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-5 w-5 rounded-full" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-16" />
                            <Skeleton className="h-3 w-20 mt-1" />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Skeleton className="h-80 rounded-xl" />
                <Skeleton className="h-80 rounded-xl" />
            </div>
        </div>
    );
}