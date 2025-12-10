import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadToys } from '../store/actions/toy.actions.js'
import { toyService } from '../services/toy.service.js'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend);

export function ToyDashboard() {
    const toys = useSelector(storeState => storeState.toyModule.toys)

    useEffect(() => {
        if (!toys || !toys.length) loadToys()
    }, [])

    function getPricesPerLabel() {
        const labels = toyService.getLabels()

        const prices = labels.map(label => {
            const toysInLabel = toys.filter(toy => toy.labels.includes(label))

            if (!toysInLabel.length) return 0

            const total = toysInLabel.reduce((acc, toy) => acc + toy.price, 0)
            return total / toysInLabel.length
        })

        return { labels, prices }
    }

    const { labels, prices } = getPricesPerLabel()

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Avg Price per Label",
                data: prices,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                    "rgba(201, 203, 207, 0.6)",
                    "rgba(100, 255, 218, 0.6)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(201, 203, 207, 1)",
                    "rgba(100, 255, 218, 1)",
                ],
                borderWidth: 1,
            },
        ],
    }

    return (
        <div className="toy-dashboard">
            <h2>Toy Dashboard</h2>
            <h3>Average Price per Label</h3>
            <div className="chart-container" style={{ width: '50%', margin: '0 auto' }}>
                <Doughnut data={chartData} />
            </div>
        </div>
    )
}