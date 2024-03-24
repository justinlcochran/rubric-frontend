import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

function JudgeIdentityModal({ judgeIdModal, setJudgeIdModal }) {
    const [email, setEmail] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    let navigate = useNavigate()

    const onClose = () => {
        setJudgeIdModal(null)
    }

    const hardEmailArr = [
        'morgaine.goettl-meyer@cuanschutz.edu',
        'karla.velalopez@cuanschutz.edu',
        'paige.moseley@cuanschutz.edu',
        'lily.beck@cuanschutz.edu',
        'robert.mcgowan@cuanschutz.edu',
        'edgardo.linares@cuanschutz.edu',
        'andrea.jimenez-zambrano@cuanschutz.edu',
        'jaelynn.florence@cuanschutz.edu',
        'meagan.bean@cuanschutz.edu',
        'liesel.vonimhof@cuanschutz.edu',
        'stephanie.bersie@cuanschutz.edu',
        'oscar.2.mendez@cuanschutz.edu',
        'aitana.gonzales@cuanschutz.edu',
        'alexandria.becks@cuanschutz.edu',
        'dominic.yarbrough-montoya@cuanschutz.edu',
        'cristina.lau@cuanschutz.edu',
        'omnia.khan@gmail.com',
        'allison.dail@cuanschutz.edu',
        'tapasya.patel@cuanschutz.edu',
        'khaled.baraka@cuanschutz.edu',
        'franklinekene.nwachukwu@gmail.com',
        'pax@me.com',
        'sothary.chea@cuanchutz.edu',
        'Erika.desonie@cuanschutz.edu'
    ]

    const handleClose = (e) => {
        if ( e.target.id === "wrapper" ) onClose();
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleJudgeNav = () => {
        if (hardEmailArr.includes(email)) {
            navigate(`/judgeHome/${email}`)
        } else {
            navigate('/preview');
        }
    }

    return (
        <div className={"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center flex flex-col z-10"} id="wrapper" onClick={handleClose}>
            <div className={"flex flex-col"}>
                <div className={"relative bg-gray-200 p-2 m-4 rounded p-2  max-w-[1200px] min-w-[600px] mx-auto"}>
                    <button onClick={onClose} className="absolute -top-6 -right-6 m-2 p-2 w-10 rounded-full bg-red-500 text-dutch_white-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#fff" d="M14.12 12l5.3-5.3c.59-.59.59-1.54 0-2.12-.59-.59-1.54-.59-2.12 0L12 9.88 6.7 4.58c-.59-.59-1.54-.59-2.12 0-.59.59-.59 1.54 0 2.12L9.88 12l-5.3 5.3c-.59.59-.59 1.54 0 2.12.59.59 1.54.59 2.12 0L12 14.12l5.3 5.3c.59.59 1.54.59 2.12 0 .59-.59.59-1.54 0-2.12L14.12 12z"/>
                        </svg>
                    </button>
                    <div className={"bg-amber-200 p-4 text-black cursor-black rounded flex flex-col"}>
                        <p className={'font-bold text-lg'}>Enter your email:</p>
                        <input type={'text'} className={'p-2 text-center text-sm mt-1'} onChange={handleEmailChange} />
                        {(email) ? <div onClick={handleJudgeNav} className={'absolute -bottom-6 self-center align-middle shadow rounded bg-blue-300 hover:bg-blue-500 text-gray-900 font-bold cursor-pointer mx-auto max-w-[40%] p-2'}>Submit</div> : <div className={'absolute self-center align-middle -bottom-6 rounded bg-gray-400 text-gray-200 font-bold mx-auto max-w-[40%] p-2 select-none'}>Submit</div>}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default JudgeIdentityModal;