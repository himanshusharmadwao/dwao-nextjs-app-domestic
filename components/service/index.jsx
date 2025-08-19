import React from 'react'
import ServiceWrapper from './serviceWrapper'

const ServicePage = async ({ serviceData }) => {

  return (
    <>
      <ServiceWrapper serviceData={serviceData} />
    </>
  )
}

export default ServicePage