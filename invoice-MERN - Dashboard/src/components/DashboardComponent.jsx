import React from 'react'
import ReactApexChart from 'react-apexcharts';
import { FaChartBar, FaChartSimple, FaDollarSign, FaSeedling } from 'react-icons/fa6'
const DashboardComponent = () => {
    let series = [
        {
            name: 'Actual',
            data: [
                {
                    x: '2011',
                    y: 1292,

                },
                {
                    x: '2012',
                    y: 4432,

                },
                {
                    x: '2013',
                    y: 5423,

                },
                {
                    x: '2014',
                    y: 6653,

                },
                {
                    x: '2015',
                    y: 8133,

                },
                {
                    x: '2016',
                    y: 7132,

                },
                {
                    x: '2017',
                    y: 7332,

                },
                {
                    x: '2018',
                    y: 6553,

                }
            ]
        }
    ]
    let options = {
        chart: {
            height: 350,
            type: 'bar'
        },
        plotOptions: {
            bar: {
                columnWidth: '30%'
            }
        },
        colors: ['#00E396'],
        dataLabels: {
            enabled: false
        },
        legend: {
            show: true,
            showForSingleSeries: true,
            customLegendItems: ['Report View'],
            markers: {
                fillColors: ['#00E396', '#775DD0']
            }
        }
    }
    let options_2 = {
        chart: {
            height: 350,
            type: 'bar'
        },
        plotOptions: {
            bar: {
                columnWidth: '30%'
            }
        },
        colors: ['#E91E63'],
        dataLabels: {
            enabled: false
        },
        legend: {
            show: true,
            showForSingleSeries: true,
            customLegendItems: ['Report View'],
            markers: {
                fillColors: ['#E91E63']
            }
        }
    }
    return (
        <div>
            <div className="px-[40px] py-[40px]">
                <div className=''>
                    <div className='grid grid-cols-12 gap-[30px]'>
                        <div className='col-span-3 bg-white rounded-md  p-[20px]'>
                            <div className='flex items-center gap-[20px]'>
                                <div className='p-[10px] rounded-lg bg-purple-50 flex justify-center items-center w-[60px] h-[60px]'>
                                    <FaSeedling className='text-purple-500 text-[20px]' />
                                </div>
                                <div>
                                    <p className='text-sm'>Total invoice</p>
                                    <h3 className='font-semibold pt-[6px] text-[20px]'>19200</h3>
                                    <p className='text-sm'>Today add <span className='bg-green-50 text-green-600 px-[5px] rounded-xl '>120</span> new items</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-3 bg-white rounded-md  p-[20px]'>
                            <div className='flex items-center gap-[20px]'>
                                <div className='p-[10px] rounded-lg bg-cyan-50 flex justify-center items-center w-[60px] h-[60px]'>
                                    <FaDollarSign className='text-cyan-500 text-[20px]' />
                                </div>
                                <div>
                                    <p className='text-sm'>Total sale amount</p>
                                    <h3 className='font-semibold pt-[6px] text-[20px]'>19200</h3>
                                    <p className='text-sm'>Today sale <span className='bg-green-50 text-green-600 px-[5px] rounded-xl '>1200</span></p>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-3 bg-white rounded-md  p-[20px]'>
                            <div className='flex items-center gap-[20px]'>
                                <div className='p-[10px] rounded-lg bg-orange-50 flex justify-center items-center w-[60px] h-[60px]'>
                                    <FaChartBar className='text-orange-500 text-[20px]' />
                                </div>
                                <div>
                                    <p className='text-sm'>Total due customer</p>
                                    <h3 className='font-semibold pt-[6px] text-[20px]'>223</h3>
                                    <p className='text-sm'>Today due amount <span className='bg-red-50 text-red-600 px-[5px] rounded-xl '>12000</span></p>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-3 bg-white rounded-md  p-[20px]'>
                            <div className='flex items-center gap-[20px]'>
                                <div className='p-[10px] rounded-lg bg-pink-50 flex justify-center items-center w-[60px] h-[60px]'>
                                    <FaChartSimple className='text-pink-500 text-[20px]' />
                                </div>
                                <div>
                                    <p className='text-sm'>Total paid customer</p>
                                    <h3 className='font-semibold pt-[6px] text-[20px]'>521</h3>
                                    <p className='text-sm'>Today paid amount <span className='bg-green-50 text-green-600 px-[5px] rounded-xl '>15200</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-12 gap-[30px]'>
                    <div className='col-span-6 bg-white rounded-md  p-[20px] mt-[30px]'>
                        <h2 className='font-semibold text-gray-700 text-[18px]'>Month Sales</h2>
                        <ReactApexChart options={options} series={series} type="bar" height={400} />
                    </div>
                    <div className='col-span-6 bg-white rounded-md  p-[20px] mt-[30px]'>
                        <h2 className='font-semibold text-gray-700 text-[18px]'>Month Sales</h2>
                        <ReactApexChart options={options_2} series={series} type="bar" height={400} />
                    </div>
                </div>
                <div className='bg-white rounded-md  p-[20px] mt-[30px]'>



                    <div className="flex flex-col justify-center h-full">
                        {/* Table */}
                        <div className="w-full  mx-auto bg-white  rounded-sm  ">
                            <header className="px-5 py-4 border-b border-gray-100">
                                <h2 className="font-semibold text-gray-800">Customers</h2>
                            </header>
                            <div className="p-3">
                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full">
                                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                            <tr>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="font-semibold text-left">Name</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="font-semibold text-left">Email</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="font-semibold text-left">Spent</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="font-semibold text-center">Country</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm divide-y divide-gray-100">
                                            <tr>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                            <img
                                                                className="rounded-full"
                                                                src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg"
                                                                width={40}
                                                                height={40}
                                                                alt="Alex Shatov"
                                                            />
                                                        </div>
                                                        <div className="font-medium text-gray-800">
                                                            Alex Shatov
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left">alexshatov@gmail.com</div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-medium text-green-500">
                                                        $2,890.66
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-lg text-center">🇺🇸</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                            <img
                                                                className="rounded-full"
                                                                src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-06.jpg"
                                                                width={40}
                                                                height={40}
                                                                alt="Philip Harbach"
                                                            />
                                                        </div>
                                                        <div className="font-medium text-gray-800">
                                                            Philip Harbach
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left">philip.h@gmail.com</div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-medium text-green-500">
                                                        $2,767.04
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-lg text-center">🇩🇪</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                            <img
                                                                className="rounded-full"
                                                                src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-07.jpg"
                                                                width={40}
                                                                height={40}
                                                                alt="Mirko Fisuk"
                                                            />
                                                        </div>
                                                        <div className="font-medium text-gray-800">
                                                            Mirko Fisuk
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left">mirkofisuk@gmail.com</div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-medium text-green-500">
                                                        $2,996.00
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-lg text-center">🇫🇷</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                            <img
                                                                className="rounded-full"
                                                                src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-08.jpg"
                                                                width={40}
                                                                height={40}
                                                                alt="Olga Semklo"
                                                            />
                                                        </div>
                                                        <div className="font-medium text-gray-800">
                                                            Olga Semklo
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left">olga.s@cool.design</div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-medium text-green-500">
                                                        $1,220.66
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-lg text-center">🇮🇹</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                            <img
                                                                className="rounded-full"
                                                                src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-09.jpg"
                                                                width={40}
                                                                height={40}
                                                                alt="Burak Long"
                                                            />
                                                        </div>
                                                        <div className="font-medium text-gray-800">
                                                            Burak Long
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left">longburak@gmail.com</div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-medium text-green-500">
                                                        $1,890.66
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-lg text-center">🇬🇧</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>





                </div>
            </div>
        </div>
    )
}

export default DashboardComponent