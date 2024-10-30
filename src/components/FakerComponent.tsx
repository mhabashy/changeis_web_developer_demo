import { useEffect } from "react";
import { useFakerStore } from "../stores/fakerStore";
import LoadingSpinner from "./LoadingSpinner";
import FakerCardCompoent from "./FakerCardCompent";


const FakerComponent = () => {
    const fakerCode = useFakerStore((state) => state.code);
    const fakerFetch = useFakerStore((status) => status.fetch);
    const fakerLoading = useFakerStore((state) => state.loading);
    const fakerError = useFakerStore((state) => state.error);
    const fakerData = useFakerStore((state) => state.data);

    useEffect(() => {
        fakerFetch();
    }, [fakerFetch]);
    
    if (fakerLoading) {
        return <LoadingSpinner />
    }

    return (
        <div className="flex items-center flex-col">
            {fakerData.map((f) => <FakerCardCompoent data={f} />)}
            {fakerError && <>
                Error {fakerCode}: {fakerError}
            </>}
        </div>
    );
}

export default FakerComponent;