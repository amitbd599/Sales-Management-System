import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { FaChartBar, FaChartSimple, FaDollarSign, FaSeedling } from 'react-icons/fa6'
import { dashboard__Request__API } from '../api/Api';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
const DashboardComponent = () => {
    let [loading, setLoading] = useState(false)
    let [data_flow, setData_flow] = useState([])
    let [today_total_sale, setToday_total_sale] = useState([])
    let [today_total_sales_amount, setToday_total_sales_amount] = useState([])
    let [today_total_due_amount, setToday_total_due_amount] = useState([])
    let [today_total_paid_amount, setToday_total_paid_amount] = useState([])
    let [table_data, setTable_data] = useState([])
    let [bar_chat_monthly_report, setBar_chat_monthly_report] = useState([])
    let [bar_chat_monthly_sales, setBar_chat_monthly_sales] = useState([])
    useEffect(() => {
        setLoading(true)
        dashboard__Request__API().then((result) => {
            if (result) {
                setData_flow(result?.data_flow[0])
                setTable_data(result?.table_data)
                setBar_chat_monthly_report(result?.bar_chat_monthly_report)
                setBar_chat_monthly_sales(result?.bar_chat_monthly_sales)
                setToday_total_sale(result?.today_total_sale[0]?.items)
                setToday_total_sales_amount(result?.today_total_sales_amount[0]?.amount)
                setToday_total_due_amount(result?.today_total_due_amount[0]?.amount)
                setToday_total_paid_amount(result?.today_total_paid_amount[0]?.amount)
                setLoading(false)
            }
        })
    }, [])

    const months_report = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ].map(month => ({
        totalDueAmount: 0,
        totalPaymentAmount: 0,
        _id: month
    }));

    // Update months array with values from originalData
    bar_chat_monthly_report.forEach(data => {
        const monthIndex = months_report.findIndex(month => month._id === data._id);
        if (monthIndex !== -1) {
            months_report[monthIndex].totalDueAmount = data.totalDueAmount;
            months_report[monthIndex].totalPaymentAmount = data.totalPaymentAmount;
        }
    });
    let bar_chat_monthly_report_series = [{
        name: 'Total Payment',
        data: [
            months_report[0]['totalPaymentAmount'],
            months_report[1]['totalPaymentAmount'],
            months_report[2]['totalPaymentAmount'],
            months_report[3]['totalPaymentAmount'],
            months_report[4]['totalPaymentAmount'],
            months_report[5]['totalPaymentAmount'],
            months_report[6]['totalPaymentAmount'],
            months_report[7]['totalPaymentAmount'],
            months_report[8]['totalPaymentAmount'],
            months_report[9]['totalPaymentAmount'],
            months_report[10]['totalPaymentAmount'],
            months_report[11]['totalPaymentAmount']],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
        hoverBorderColor: 'rgba(255, 99, 132, 1)',
    }, {
        name: 'Total Due',
        data: [
            months_report[0]['totalDueAmount'],
            months_report[1]['totalDueAmount'],
            months_report[2]['totalDueAmount'],
            months_report[3]['totalDueAmount'],
            months_report[4]['totalDueAmount'],
            months_report[5]['totalDueAmount'],
            months_report[6]['totalDueAmount'],
            months_report[7]['totalDueAmount'],
            months_report[8]['totalDueAmount'],
            months_report[9]['totalDueAmount'],
            months_report[10]['totalDueAmount'],
            months_report[11]['totalDueAmount']]
    }]

    let bar_chat_monthly_report_series_options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
                hoverBorderColor: 'rgba(255, 99, 132, 1)',
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: [
                months_report[0]['_id'],
                months_report[1]['_id'],
                months_report[2]['_id'],
                months_report[3]['_id'],
                months_report[4]['_id'],
                months_report[5]['_id'],
                months_report[6]['_id'],
                months_report[7]['_id'],
                months_report[8]['_id'],
                months_report[9]['_id'],
                months_report[10]['_id'],
                months_report[11]['_id']]
        },
        yaxis: {
            title: {
                text: '$ (Sales View)'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val + " thousands"
                }
            }
        }
    }

    const months_sales = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ].map(month => ({
        totalSalesAmount: 0,
        _id: month
    }));
    // Update months array with values from originalData
    bar_chat_monthly_sales.forEach(data => {
        const monthIndex = months_sales.findIndex(month => month._id === data._id);
        if (monthIndex !== -1) {
            months_sales[monthIndex].totalSalesAmount = data.totalSalesAmount;
        }
    });

    let bar_chat_monthly_sales_series = [{
        name: 'series1',
        data: [months_sales[0]['totalSalesAmount'],
        months_sales[1]['totalSalesAmount'],
        months_sales[2]['totalSalesAmount'],
        months_sales[3]['totalSalesAmount'],
        months_sales[4]['totalSalesAmount'],
        months_sales[5]['totalSalesAmount'],
        months_sales[6]['totalSalesAmount'],
        months_sales[7]['totalSalesAmount'],
        months_sales[8]['totalSalesAmount'],
        months_sales[9]['totalSalesAmount'],
        months_sales[10]['totalSalesAmount'],
        months_sales[11]['totalSalesAmount']]
    }]

    let bar_chat_monthly_sales_series_options = {
        chart: {
            height: 350,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: '',
            categories: [
                months_report[0]['_id'],
                months_report[1]['_id'],
                months_report[2]['_id'],
                months_report[3]['_id'],
                months_report[4]['_id'],
                months_report[5]['_id'],
                months_report[6]['_id'],
                months_report[7]['_id'],
                months_report[8]['_id'],
                months_report[9]['_id'],
                months_report[10]['_id'],
                months_report[11]['_id']]
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val + " thousands"
                }
            }
        }
    }
    return (
        <div>
            <div className="px-[40px] py-[40px]">
                <div className=''>
                    <div className='grid grid-cols-12 gap-[30px]'>
                        <div className='col-span-12 md:col-span-6 2xl:col-span-3 bg-white rounded-md  p-[20px]'>


                            {
                                loading === true ? (<SkeletonTheme
                                    baseColor="#ebebeb"
                                    highlightColor="#f5f5f5"
                                    className="w-100vw"
                                >
                                    <div className="w-full block ">
                                        <Skeleton count={3} height={12} />
                                    </div>
                                </SkeletonTheme>) : (<div className='flex items-center gap-[20px]'>
                                    <div className='p-[10px] rounded-lg bg-purple-50 flex justify-center items-center w-[60px] h-[60px]'>
                                        <FaSeedling className='text-purple-500 text-[20px]' />
                                    </div>
                                    <div>
                                        <p className='text-sm'>Total invoice</p>

                                        <div className='flex gap-1 items-center pt-[6px]'>
                                            <p className='font-semibold text-gray-900 text-[20px]'>{!!data_flow?.totalCustomerCount === false ? 0 : data_flow?.totalCustomerCount}</p><p className='text-sm'>(Items)</p>
                                        </div>
                                        <p className='text-sm'>Today add <span className='bg-green-50 text-green-600 px-[5px] rounded-xl font-medium '>{!!today_total_sale === false ? 0 : today_total_sale}</span> new items</p>
                                    </div>
                                </div>)
                            }


                        </div>
                        <div className='col-span-12 md:col-span-6 2xl:col-span-3 bg-white rounded-md  p-[20px]'>
                            {
                                loading === true ? (<SkeletonTheme
                                    baseColor="#ebebeb"
                                    highlightColor="#f5f5f5"
                                    className="w-100vw"
                                >
                                    <div className="w-full block ">
                                        <Skeleton count={3} height={12} />
                                    </div>
                                </SkeletonTheme>) : (<div className='flex items-center gap-[20px]'>
                                    <div className='p-[10px] rounded-lg bg-cyan-50 flex justify-center items-center w-[60px] h-[60px]'>
                                        <FaDollarSign className='text-cyan-500 text-[20px]' />
                                    </div>
                                    <div>
                                        <p className='text-sm'>Total sale amount</p>

                                        <div className='flex gap-1 items-center pt-[6px]'>
                                            <p className='font-semibold text-gray-900 text-[20px]'>{!!data_flow?.totalSalesAmount === false ? 0 : data_flow?.totalSalesAmount}</p><p className='text-sm'>(Amount)</p>
                                        </div>
                                        <p className='text-sm '>Today sale amount <span className='bg-green-50 text-green-600 px-[5px] rounded-xl font-medium'>{!!today_total_sales_amount === false ? 0 : today_total_sales_amount}</span></p>
                                    </div>
                                </div>)
                            }

                        </div>
                        <div className='col-span-12 md:col-span-6 2xl:col-span-3 bg-white rounded-md  p-[20px]'>

                            {
                                loading === true ? (<SkeletonTheme
                                    baseColor="#ebebeb"
                                    highlightColor="#f5f5f5"
                                    className="w-100vw"
                                >
                                    <div className="w-full block ">
                                        <Skeleton count={3} height={12} />
                                    </div>
                                </SkeletonTheme>) : (<div className='flex items-center gap-[20px]'>
                                    <div className='p-[10px] rounded-lg bg-orange-50 flex justify-center items-center w-[60px] h-[60px]'>
                                        <FaChartBar className='text-orange-500 text-[20px]' />
                                    </div>
                                    <div>
                                        <p className='text-sm'>Total due customer</p>

                                        <div className='flex gap-1 items-center pt-[6px]'>
                                            <p className='font-semibold text-gray-900 text-[20px]'>{!!data_flow?.totalDueCustomer === false ? 0 : data_flow?.totalDueCustomer}</p><p className='text-sm'>(Person)</p>
                                        </div>
                                        <p className='text-sm'>Today due amount <span className='bg-red-50 text-red-600 px-[5px] rounded-xl '>{!!today_total_due_amount === false ? 0 : today_total_due_amount}</span></p>
                                    </div>
                                </div>)
                            }


                        </div>
                        <div className='col-span-12 md:col-span-6 2xl:col-span-3 bg-white rounded-md  p-[20px]'>
                            {
                                loading === true ? (<SkeletonTheme
                                    baseColor="#ebebeb"
                                    highlightColor="#f5f5f5"
                                    className="w-100vw"
                                >
                                    <div className="w-full block ">
                                        <Skeleton count={3} height={12} />
                                    </div>
                                </SkeletonTheme>) : (<div className='flex items-center gap-[20px]'>
                                    <div className='p-[10px] rounded-lg bg-pink-50 flex justify-center items-center w-[60px] h-[60px]'>
                                        <FaChartSimple className='text-pink-500 text-[20px]' />
                                    </div>
                                    <div>
                                        <p className='text-sm'>Total full paid customer</p>
                                        <div className='flex gap-1 items-center pt-[6px]'>
                                            <p className='font-semibold text-gray-900 text-[20px]'>{!!data_flow?.totalFullPaidCustomer === false ? 0 : data_flow?.totalFullPaidCustomer}</p><p className='text-sm'>(Person)</p>
                                        </div>
                                        <p className='text-sm'>Today paid amount <span className='bg-green-50 text-green-600 px-[5px] rounded-xl '>{!!today_total_paid_amount === false ? 0 : today_total_paid_amount}</span></p>
                                    </div>
                                </div>)
                            }

                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-12 gap-[30px]'>
                    <div className='col-span-12 xl:col-span-6 bg-white rounded-md  p-[20px] mt-[30px]'>
                        <h2 className='font-semibold text-gray-700 text-[18px]'>Monthly payment & due report</h2>

                        {
                            loading === true ? (<SkeletonTheme
                                baseColor="#ebebeb"
                                highlightColor="#f5f5f5"
                                className="w-100vw"
                            >
                                <div className="w-full block mt-[5px]">
                                    <Skeleton count={16} height={12} />
                                </div>
                            </SkeletonTheme>) : (<ReactApexChart options={bar_chat_monthly_report_series_options} series={bar_chat_monthly_report_series} type="bar" height={400} />)
                        }




                    </div>
                    <div className='col-span-12 xl:col-span-6 bg-white rounded-md  p-[20px] mt-[30px]'>
                        <h2 className='font-semibold text-gray-700 text-[18px]'>Monthly sales report</h2>

                        {
                            loading === true ? (<SkeletonTheme
                                baseColor="#ebebeb"
                                highlightColor="#f5f5f5"
                                className="w-100vw"
                            >
                                <div className="w-full block mt-[5px]">
                                    <Skeleton count={16} height={12} />
                                </div>
                            </SkeletonTheme>) : (<ReactApexChart options={bar_chat_monthly_sales_series_options} series={bar_chat_monthly_sales_series} type="area" height={400} />)
                        }


                    </div>
                </div>
                <div className='bg-white rounded-md  p-[20px] mt-[30px]'>



                    <div className="flex flex-col justify-center h-full">

                        {
                            loading === true ? (<SkeletonTheme
                                baseColor="#ebebeb"
                                highlightColor="#f5f5f5"
                                className="w-100vw"
                            >
                                <div className="w-full block ">
                                    <Skeleton count={15} height={12} />
                                </div>
                            </SkeletonTheme>) : (<div className="w-full  mx-auto bg-white  rounded-sm  ">
                                <header className="px-5 py-4 border-b border-gray-100">
                                    <h2 className="font-semibold text-gray-800">Customers</h2>
                                </header>
                                <div className="p-3">
                                    <div className="overflow-x-auto">
                                        <table className="table-auto w-full">
                                            <thead className="text-xs font-semibold uppercase text-gray-700 bg-gray-50">
                                                <tr>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Invoice ID</div>
                                                    </th>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Customer Name</div>
                                                    </th>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Created Date</div>
                                                    </th>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Delivery Date</div>
                                                    </th>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Paid</div>
                                                    </th>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Due</div>
                                                    </th>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Total</div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm divide-y divide-gray-100">
                                                {
                                                    table_data.map((item, index) =>
                                                        <tr key={index}>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left">{item?.invoiceID}</div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left">{item?.customerName}</div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left">{item?.startDate?.slice(0, 10)}</div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left">{item?.deliveryDate?.slice(0, 10)}</div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-medium text-green-500">
                                                                    {item?.payment}
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-medium text-red-500">
                                                                    {item?.due}
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-bold text-gray-800">
                                                                    {item?.total}
                                                                </div>
                                                            </td>

                                                        </tr>)
                                                }


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>)
                        }


                    </div>





                </div>
            </div>
        </div>
    )
}

export default DashboardComponent