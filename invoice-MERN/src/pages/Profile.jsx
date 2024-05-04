import React, { Fragment, Suspense } from 'react'
import ProfileComponent from '../components/ProfileComponent'
import MasterLayout from '../layout/MasterLayout'

const Profile = () => {
    return (
        <Fragment>
            <Suspense fallback={""}>
                <MasterLayout>
                    <ProfileComponent />
                </MasterLayout>
            </Suspense>
        </Fragment>
    )
}

export default Profile