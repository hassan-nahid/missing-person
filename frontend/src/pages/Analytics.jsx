import { useEffect, useState } from "react";
import axios from "axios";
import Title from "../components/shared/Title";

const Analytics = () => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const missingResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/missing`);
                const foundResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/found`);

                const missingData = missingResponse.data.data;
                const foundData = foundResponse.data.data;

                // Analytics Calculations
                const totalMissing = missingData.length;
                const totalFound = foundData.length;

                const fAlive = foundData.filter((item) => item.caseStatus === "Alive").length;
                const fDead = foundData.filter((item) => item.caseStatus === "Dead").length;
                const mAlive = missingData.filter((item) => item.caseStatus === "Alive").length;
                const mDead = missingData.filter((item) => item.caseStatus === "Dead").length;

                const foundAlive = fAlive + mAlive;
                const foundDead = fDead + mDead;

                const mHighPriority = missingData.filter(
                    (item) => item.age < 18 || item.seriousIllnessOrDisabled
                ).length;

                
                const fHighPriority = foundData.filter(
                    (item) => item.age < 18 
                ).length;

                const highPriorityMissing = mHighPriority + fHighPriority;


                const mMale = missingData.filter((item) => item.gender === "Male").length;
                const mFemale = missingData.filter((item) => item.gender === "Female").length;
                const mOther = missingData.filter((item) => item.gender === "Other").length;

                const fMale = missingData.filter((item) => item.gender === "Male").length;
                const fFemale = missingData.filter((item) => item.gender === "Female").length;
                const fOther = missingData.filter((item) => item.gender === "Other").length;

                const Male = mMale + fMale;
                const Female = mFemale + fFemale;
                const Other = mOther + fOther;






                const caseTypes = missingData.reduce((acc, item) => {
                    if (item.caseType) acc[item.caseType] = (acc[item.caseType] || 0) + 1;
                    return acc;
                }, {});

                setAnalyticsData({
                    totalMissing,
                    totalFound,
                    foundAlive,
                    foundDead,
                    highPriorityMissing,
                    caseTypes,
                    Male,
                    Female,
                    Other
                });
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch analytics data:", error.message);
            }
        };

        fetchAnalyticsData();
    }, []);

    if (loading) return <div>Loading...</div>;

    const {
        totalMissing,
        totalFound,
        foundAlive,
        foundDead,
        highPriorityMissing,
        caseTypes,
        Male,
        Female,
        Other
    } = analyticsData;

    return (
        <div className="container mx-auto py-8 min-h-screen">
                <Title text={"Analytics"}/>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
                {/* Total Cases */}
                <div className="bg-blue-100 p-6 rounded shadow">
                    <h2 className="text-xl font-semibold">Total Missing Cases</h2>
                    <p className="text-3xl">{totalMissing}</p>
                </div>
                <div className="bg-green-100 p-6 rounded shadow">
                    <h2 className="text-xl font-semibold">Total Found Cases</h2>
                    <p className="text-3xl">{totalFound}</p>
                </div>

                {/* Found Breakdown */}
                <div className="bg-purple-100 p-6 rounded shadow">
                    <h2 className="text-xl font-semibold">Found Alive</h2>
                    <p className="text-3xl">{foundAlive}</p>
                </div>
                <div className="bg-red-100 p-6 rounded shadow">
                    <h2 className="text-xl font-semibold">Found Dead</h2>
                    <p className="text-3xl">{foundDead}</p>
                </div>

                {/* High Priority */}
                <div className="bg-yellow-100 p-6 rounded shadow">
                    <h2 className="text-xl font-semibold">High Priority Cases</h2>
                    <p className="text-3xl">{highPriorityMissing}</p>
                </div>

                {/* Gender Breakdown */}
                <div className="bg-gray-100 p-6 rounded shadow">
                    <h2 className="text-xl font-semibold">Gender Breakdown</h2>
                    <ul>
                        <li>Male: {Male}</li>
                        <li>Female: {Female}</li>
                        <li>Other: {Other}</li>
                    </ul>
                </div>

                {/* Case Types */}
                <div className="bg-teal-100 p-6 rounded shadow">
                    <h2 className="text-xl font-semibold">Case Types</h2>
                    <ul>
                        {Object.entries(caseTypes).map(([type, count]) => (
                            <li key={type}>
                                {type}: {count}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
