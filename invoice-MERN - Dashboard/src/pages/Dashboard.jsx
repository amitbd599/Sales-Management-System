import React, { Fragment, Suspense } from 'react'
import MasterLayout from '../layout/MasterLayout'
import DashboardComponent from '../components/DashboardComponent'

const Dashboard = () => {
    return (
        <Fragment>
            <Suspense fallback={""}>
                <MasterLayout>
                    <DashboardComponent />
                </MasterLayout>
            </Suspense>
        </Fragment>
    )
}

export default Dashboard