import { MapPin } from 'lucide-react'
import React, { SetStateAction, Dispatch } from 'react'

interface props{
    setVehiclePanel: Dispatch<SetStateAction<boolean>>
    setPanel: Dispatch<SetStateAction<boolean>>
}

const LocationSearchPanel = (props: props) => {    
    // mockup-locations
    const LOCATIONS = [
        "Godawori-14, Thaiba, Lalitpur",
        "Jawlakhel, Lalitpur",
        "Bhaktapur Durbar Square",
        "Harisiddhi",
    ]
    return (
        // mockup data
        <div className='flex flex-col gap-4'>
            {
                LOCATIONS.map((items, idx) => (
                    <React.Fragment key={idx}>
                        <div onClick={()=>{
                            props.setVehiclePanel(true)
                            props.setPanel(false)
                            }} className='flex hover:cursor-pointer active:border-2 hover:bg-[#eee] p-4 rounded-2xl items-center gap-4 justify-start'>
                            <div className='bg-[#eee] h-10 w-10 rounded-full flex items-center justify-center'>
                                <MapPin />
                            </div>
                            <h4 className='font-medium text-lg'>{items}</h4>
                        </div>
                    </React.Fragment>
                ))
            }
        </div>
    )
}

export default LocationSearchPanel