import Contacts from '@/components/shared/contacts'
import React from 'react'

export default function page() {
  return (
    <section id="contacts" className="max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 bg-white">
        <h2 className="mx-12 text-3xl font-semibold text-gray-800 uppercase my-6 p-4">
         Contacts
        </h2>       
        
       <Contacts/>
      </section>
  )
}
