import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadToys } from '../store/actions/toy.actions.js'
import { toyService } from '../services/toy'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from "chart.js"
import { Doughnut, Line } from "react-chartjs-2"
import { utilService } from '../services/util.service.js'

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


export function ToyDashboard() {
    const toys = useSelector(storeState => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
    }, [])

    function getChartsData() {
        const labels = toyService.getLabels()

        const pricesData = labels.map(label => {
            const toysInLabel = toys.filter(toy => toy.labels.includes(label))
            if (!toysInLabel.length) return 0
            return toysInLabel.reduce((acc, toy) => acc + toy.price, 0) / toysInLabel.length
        })


        const inventoryData = labels.map(label => {
            return toys.filter(toy => toy.labels.includes(label) && toy.inStock).length
        })

        return { labels, pricesData, inventoryData }
    }

    const { labels, pricesData, inventoryData } = getChartsData()

    const backgroundColors = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(201, 203, 207, 0.2)',
        'rgba(100, 100, 100, 0.2)'
    ]

    const borderColors = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(201, 203, 207, 1)',
        'rgba(100, 100, 100, 1)'
    ]

    const priceChartData = {
        labels: labels,
        datasets: [{
            label: 'Avg Price',
            data: pricesData,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
        }],
    }

    const inventoryChartData = {
        labels: labels,
        datasets: [{
            label: 'Toys in Stock',
            data: inventoryData,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
        }],
    }

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sales Over Time (Mock Data)',
            },
        },
    };

    const lineLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const lineChartData = {
        labels: lineLabels,
        datasets: [
            {
                label: 'Sales 2024',
                data: lineLabels.map(() => utilService.getRandomIntInclusive(0, 1000)),

                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Sales 2025',
                data: lineLabels.map(() => utilService.getRandomIntInclusive(0, 1000)),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    }



    return (
        <section className="toy-dashboard">
            <h2>Toy Dashboard</h2>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', flexWrap: 'wrap' }}>

                <div className="chart-container" style={{ width: '40%', minWidth: '300px' }}>
                    <h3>Prices per Label</h3>
                    <Doughnut data={priceChartData} />
                </div>

                <div className="chart-container" style={{ width: '40%', minWidth: '300px' }}>
                    <h3>Inventory by Label</h3>
                    <Doughnut data={inventoryChartData} />
                </div>

                <div className="chart-container" style={{ width: '60%', minWidth: '300px', marginTop: '40px' }}>
                    <h3 style={{ textAlign: 'center' }}>Sales Analytics</h3>
                    <Line options={lineOptions} data={lineChartData} />
                </div>
            </div>
        </section>
    )
}
